import { motion } from 'framer-motion';

const Road = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-gray-800"
      style={{ perspective: '100px' }}
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-gray-600"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-white"
          animate={{ translateY: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Road;