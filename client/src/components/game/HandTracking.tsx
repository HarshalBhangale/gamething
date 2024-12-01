import { useEffect, useRef, useState } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';
import { gameConfig } from '../../lib/game';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function HandTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handTrackingRef = useRef<{ camera?: Camera; hands?: Hands }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function initializeHandTracking() {
      if (!videoRef.current) return;

      try {
        setIsLoading(true);

        // Create Hands instance with explicit solution path
        const hands = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`;
          }
        });

        // Wait for MediaPipe to be ready
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Configure hands with more conservative settings
        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 0,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
          selfieMode: true
        });

        // Setup result handler
        hands.onResults((results) => {
          if (results.multiHandLandmarks?.[0]) {
            const indexFinger = results.multiHandLandmarks[0][8];
            if (indexFinger) {
              const y = indexFinger.y * gameConfig.height;
              window.dispatchEvent(
                new CustomEvent('handMove', { detail: { y } })
              );
            }
          }
        });

        // Initialize hands first
        await hands.initialize();

        if (!isMounted) return;

        // Request camera permissions first
        await navigator.mediaDevices.getUserMedia({ video: true });

        // Create and start camera
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && handTrackingRef.current.hands) {
              try {
                await handTrackingRef.current.hands.send({ image: videoRef.current });
              } catch (err) {
                // Silently handle frame processing errors
                if (!err.message?.includes('Input frame is empty')) {
                  console.warn('Frame processing error:', err);
                }
              }
            }
          },
          width: 640,
          height: 480
        });

        // Store references
        handTrackingRef.current = { hands, camera };

        // Start camera
        await camera.start();
        
        if (isMounted) {
          setIsInitialized(true);
          setIsLoading(false);
          
          toast({
            title: "Ready to play!",
            description: "Move your hand up and down to control the bird",
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Hand tracking initialization error:', error);
        if (isMounted) {
          setIsLoading(false);
          toast({
            title: "Camera access needed",
            description: "Please allow camera access to play with hand controls",
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    }

    // Initialize tracking
    initializeHandTracking();

    // Cleanup function
    return () => {
      isMounted = false;
      const { camera, hands } = handTrackingRef.current;
      if (camera) {
        camera.stop();
      }
      if (hands) {
        hands.close();
      }
    };
  }, [toast]);

  return (
    <div className="fixed bottom-4 left-4 w-32 h-24 overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm border border-primary/20">
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isInitialized ? "opacity-50" : "opacity-25"
        )}
        playsInline
        muted
        autoPlay
        style={{ transform: 'scaleX(-1)' }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-primary animate-pulse">
          Starting camera...
        </div>
      )}
      {!isInitialized && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-destructive">
          Camera needed
        </div>
      )}
    </div>
  );
}
