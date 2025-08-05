
import { motion } from 'framer-motion';

const Opponent = ({ position }: { position: { x: number; y: number } }) => {
  return (
    <motion.div
      className="absolute w-10 h-20 bg-blue-500 rounded-t-full rounded-b-md"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
};

export default Opponent;
