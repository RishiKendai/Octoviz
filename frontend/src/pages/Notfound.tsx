import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const githubColors = [
  'bg-[#151b23]',
  'bg-[#033a16]',
  'bg-[#196c2e]',
  'bg-[#2ea043]',
  'bg-[#56d364]',
];

function Notfound() {
  const [squares, setSquares] = useState<
    { id: number; size: number; left: number; delay: number; duration: number; opacity: number; colorClass: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 12) + 8,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
      opacity: Math.random() * 0.5 + 0.3,
      colorClass: githubColors[Math.floor(Math.random() * githubColors.length)],
    }));
    setSquares(generated);
  }, []);

  return (
    <div className="relative w-screen h-dvh overflow-hidden text-center">
      {/* Background squares */}
      {squares.map((square) => (
        <div
          key={square.id}
          className={clsx('absolute rounded-sm', square.colorClass)}
          style={{
            width: `${square.size}px`,
            height: `${square.size}px`,
            left: `${square.left}%`,
            top: `-20px`,
            animation: `fall ${square.duration}s linear ${square.delay}s infinite`,
            opacity: square.opacity,
          }}
        />
      ))}

      {/* Centered Message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-7xl font-bold text-(--clr-secondary)">404</h1>
        <p className="text-md mt-1 font-semibold text-white">Whoops! Looks like you're lost</p>
        <Link className='text-md mt-1 font-semibold text-white bg-(--clr-secondary) hover:brightness-75 px-4 py-2 rounded-full' to='/'>Let's go home!</Link>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(110dvh);
          }
        }
      `}</style>
    </div>
  );
};

export default Notfound;
