import { Card } from '@/components/ui/card';
import { useRecoilValue } from 'recoil';
import { scoreAtom } from '@/store/atoms/game';
import { useEffect } from 'react';


interface ScoreProps {
  high: number;
}

export function Score({ high }: ScoreProps) {
  const score = useRecoilValue(scoreAtom);

  return (
    <Card className="p-4 bg-card/90 backdrop-blur">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Score</div>
        <div className="text-3xl font-bold text-primary">{score}</div>
        <div className="text-sm text-muted-foreground">High Score</div>
        <div className="text-xl font-semibold">{high}</div>
      </div>
    </Card>
  );
}
