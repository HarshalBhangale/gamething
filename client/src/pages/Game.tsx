// import { useEffect, useState } from 'react';
// import { Canvas } from '../components/game/Canvas';
// import { HandTracking } from '../components/game/HandTracking';
// import { Score } from '../components/game/Score';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';

// export default function Game() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [highScore, setHighScore] = useState(0);
//   const [participants, setParticipants] = useState(0);
//   const [prizePool, setPrizePool] = useState(0);
//   const [timeRemaining, setTimeRemaining] = useState('');
//   const { toast } = useToast();
  
//   useEffect(() => {
//     const savedHighScore = localStorage.getItem('flappyHighScore');
//     if (savedHighScore) {
//       setHighScore(parseInt(savedHighScore));
//     }

//     // Fetch tournament data
//     const fetchTournamentData = async () => {
//       // Mock data - replace with actual API call
//       setParticipants(142);
//       setPrizePool(1000);
      
//       // Calculate time remaining
//       const endDate = new Date('2024-02-01'); // Replace with actual end date
//       const now = new Date();
//       const diff = endDate.getTime() - now.getTime();
//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       setTimeRemaining(`${days}d ${hours}h`);
//     };

//     fetchTournamentData();
//   }, []);

//   const handleGameOver = (finalScore: number) => {
//     setIsPlaying(false);
//     if (finalScore > highScore) {
//       setHighScore(finalScore);
//       localStorage.setItem('flappyHighScore', finalScore.toString());
//       toast({
//         title: "New High Score! 🎉",
//         description: `Congratulations! You achieved a new high score of ${finalScore}!`,
//         className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
//       });
//     }
//   };

//   const startGame = () => {
//     setIsPlaying(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex">
//       {/* Tournament Sidebar */}
//       <div className="w-96 bg-black/70 backdrop-blur-xl p-8 border-r border-white/20 shadow-2xl">
//         <div className="space-y-8">
//           <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500">
//             Live Tournament
//           </h2>
          
//           <div className="grid gap-6">
//             <div className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition-colors">
//               <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Participants</p>
//               <p className="text-yellow-300 text-3xl font-bold mt-1">{participants}</p>
//             </div>
//             <div className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition-colors">
//               <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Prize Pool</p>
//               <p className="text-yellow-300 text-3xl font-bold mt-1">${prizePool}</p>
//             </div>
//             <div className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition-colors">
//               <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Time Remaining</p>
//               <p className="text-yellow-300 text-3xl font-bold mt-1">{timeRemaining}</p>
//             </div>
//           </div>

//           <div className="border-t border-white/20 pt-6">
//             <h3 className="text-xl font-semibold text-white mb-4">Top Players</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <span className="text-yellow-300 font-bold">1</span>
//                   <span className="text-white">Player123</span>
//                 </div>
//                 <span className="text-yellow-300 font-semibold">324</span>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-400 font-bold">2</span>
//                   <span className="text-white">MoonKing</span>
//                 </div>
//                 <span className="text-yellow-300 font-semibold">287</span>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <span className="text-orange-400 font-bold">3</span>
//                   <span className="text-white">BirdMaster</span>
//                 </div>
//                 <span className="text-yellow-300 font-semibold">245</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Game Area */}
//       <div className="flex-1 p-8 flex items-center justify-center">
//         <Card className="w-full max-w-5xl p-10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border-2 border-white/30">
//           <div className="relative">
//             <Canvas 
//               isPlaying={isPlaying}
//               onGameOver={handleGameOver}
//             />
//             <HandTracking />
            
//             <div className="absolute top-8 right-8">
//               <Score high={highScore} />
//             </div>
            
//             {!isPlaying && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl">
//                 <div className="text-center space-y-8 p-12 bg-white/10 rounded-2xl backdrop-blur-xl border-2 border-white/20 shadow-2xl">
//                   <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
//                     Moon Rise : ID 7
//                   </h1>
//                   <div className="space-y-6">
//                     <p className="text-white text-xl font-semibold">
//                       🎮 Use your index finger to control the bird
//                     </p>
//                     <p className="text-white/90 text-base">
//                       Make sure your hand is visible to the camera
//                     </p>
//                     <div className="flex justify-center gap-4 pt-4">
//                       <Button 
//                         size="lg"
//                         onClick={startGame}
//                         className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-bold px-12 py-7 text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse"
//                       >
//                         Start Game
//                       </Button>
//                     </div>
//                     {highScore > 0 && (
//                       <p className="text-yellow-300 text-lg font-semibold mt-4">
//                         🏆 High Score: {highScore}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importing useRouter for redirection
import { Canvas } from '../components/game/Canvas';
import { HandTracking } from '../components/game/HandTracking';
import { Score } from '../components/game/Score';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [prizePool, setPrizePool] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const { toast } = useToast();
  // const router = useRouter(); // Initialize Next.js router for redirection

  useEffect(() => {
    const savedHighScore = localStorage.getItem('flappyHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    // Fetch tournament data (mock data)
    const fetchTournamentData = async () => {
      setParticipants(142);
      setPrizePool(1000);
      
      const endDate = new Date('2024-02-01'); // Replace with actual end date
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeRemaining(`${days}d ${hours}h`);
    };

    fetchTournamentData();
  }, []);

  // Handle the game over scenario
  const handleGameOver = (finalScore: number) => {
    setIsPlaying(false); // Stop the game
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('flappyHighScore', finalScore.toString());
      toast({
        title: "New High Score! 🎉",
        description: `Congratulations! You achieved a new high score of ${finalScore}!`,
        className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      });
    }

    // After the toast is shown, automatically redirect to the leaderboard page
    setTimeout(() => {
      window.location.href = 'http://localhost:3000/leaderboard';
    }, 500); // 2-second delay to allow the user to see the toast message
  };

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex">
      {/* Tournament Sidebar */}
      <div className="w-96 bg-black/70 backdrop-blur-xl p-8 border-r border-white/20 shadow-2xl">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500">
            Live Tournament
          </h2>
          <div className="grid gap-6">
            {/* Stats */}
            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition-colors">
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Participants</p>
              <p className="text-yellow-300 text-3xl font-bold mt-1">{participants}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition-colors">
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Prize Pool</p>
              <p className="text-yellow-300 text-3xl font-bold mt-1">${prizePool}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition-colors">
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Time Remaining</p>
              <p className="text-yellow-300 text-3xl font-bold mt-1">{timeRemaining}</p>
            </div>
          </div>

          {/* Top Players */}
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Top Players</h3>
            {/* List top players here */}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <Card className="w-full max-w-5xl p-10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border-2 border-white/30">
          <div className="relative">
            <Canvas 
              isPlaying={isPlaying}
              onGameOver={handleGameOver}
            />
            <HandTracking />
            
            <div className="absolute top-8 right-8">
              <Score high={highScore} />
            </div>

            {/* Game Over State */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl">
                <div className="text-center space-y-8 p-12 bg-white/10 rounded-2xl backdrop-blur-xl border-2 border-white/20 shadow-2xl">
                  <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                    Game Over
                  </h1>
                  <div className="space-y-6">
                    <p className="text-white text-xl font-semibold">
                      🎮 Use your index finger to control the bird
                    </p>
                    <p className="text-white/90 text-base">
                      Make sure your hand is visible to the camera
                    </p>
                    {/* Do not show Start Game button */}
                    <Button 
                        size="lg"
                        onClick={startGame}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-bold px-12 py-7 text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse"
                      >
                        Start Game
                      </Button>
                    {highScore > 0 && (
                      <p className="text-yellow-300 text-lg font-semibold mt-4">
                        🏆 High Score: {highScore}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
