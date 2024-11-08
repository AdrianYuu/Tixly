import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 border-t-4 border-b-4 border-transparent border-t-customSoLightPurple border-b-customSoLightPurple rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default LoadingSpinner;