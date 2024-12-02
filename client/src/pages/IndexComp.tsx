import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function IndexComponent() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 bg-card/95 backdrop-blur">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Welcome to Flappy Hand
          </h1>
          <p className="text-muted-foreground text-lg">
            A fun and interactive game where you control the bird with your hand movements
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/game/play'}
            className="bg-primary hover:bg-primary/90"
          >
            Play Now
          </Button>
        </div>
      </Card>
    </div>
  );
}
