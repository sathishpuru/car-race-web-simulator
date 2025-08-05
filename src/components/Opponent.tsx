
import { motion } from 'framer-motion';

const Opponent = ({ position }: { position: { x: number; y: number } }) => {
  return (
    <motion.img
      src="/opponent.svg"
      alt="Opponent"
      className="absolute w-10 h-20"
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
