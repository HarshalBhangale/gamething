export const gameConfig = {
  width: 800,
  height: 600,
  gravity: 0.5,
  flapStrength: 8,
  pipeSpawnInterval: 2000, // milliseconds
};

export const calculateScore = (distance: number): number => {
  return Math.floor(distance / 100);
};

export const difficultyLevels = {
  easy: {
    pipeSpeed: 2,
    pipeGap: 200,
  },
  medium: {
    pipeSpeed: 3,
    pipeGap: 150,
  },
  hard: {
    pipeSpeed: 4,
    pipeGap: 120,
  },
};
