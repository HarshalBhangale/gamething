import { useEffect, useState } from 'react';
import { Canvas } from '../components/game/Canvas';
import { HandTracking } from '../components/game/HandTracking';
import { Score } from '../components/game/Score';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('flappyHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const handleGameOver = (finalScore: number) => {
    setIsPlaying(false);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('flappyHighScore', finalScore.toString());
      toast({
        title: "New High Score!",
        description: `You achieved a new high score of ${finalScore}!`,
      });
    }
  };

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 bg-card/95 backdrop-blur">
        <div className="relative">
          <Canvas 
            isPlaying={isPlaying}
            onScore={(s) => setScore(s)}
            onGameOver={handleGameOver}
          />
          <HandTracking />
          
          <div className="absolute top-4 right-4">
            <Score current={score} high={highScore} />
          </div>
          
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  Flappy Hand
                </h1>
                <p className="text-muted-foreground">
                  Use your index finger to control the bird
                </p>
                <Button 
                  size="lg"
                  onClick={startGame}
                  className="bg-primary hover:bg-primary/90"
                >
                  {score > 0 ? 'Play Again' : 'Start Game'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
