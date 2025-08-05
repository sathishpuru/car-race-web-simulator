
import { motion } from 'framer-motion';

const Car = ({ position }: { position: { x: number; y: number } }) => {
  return (
    <motion.img
      src="/car.svg"
      alt="Car"
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

export default Car;
