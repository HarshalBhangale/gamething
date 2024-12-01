import { Card } from '@/components/ui/card';

interface ScoreProps {
  current: number;
  high: number;
}

export function Score({ current, high }: ScoreProps) {
  return (
    <Card className="p-4 bg-card/90 backdrop-blur">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Score</div>
        <div className="text-3xl font-bold text-primary">{current}</div>
        <div className="text-sm text-muted-foreground">High Score</div>
        <div className="text-xl font-semibold">{high}</div>
      </div>
    </Card>
  );
}
