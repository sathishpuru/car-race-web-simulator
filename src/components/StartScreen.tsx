import { motion } from 'framer-motion';

const StartScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-white text-6xl mb-4">Car Race</h1>
      <p className="text-white text-2xl mb-8">Use the arrow keys to move</p>
      <motion.button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Start Game
      </motion.button>
    </motion.div>
  );
};

export default StartScreen;