import { atom } from 'recoil';

// Define the interface for our game state
interface GameScore {
  currentScore: number;
  highScore: number;
}

// Create the score atom
export const scoreAtom = atom<number>({
  key: 'scoreState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value
});

// Create the high score atom
export const highScoreAtom = atom<number>({
  key: 'highScoreState',
  default: parseInt(localStorage.getItem('flappyHighScore') || '0'),
}); 