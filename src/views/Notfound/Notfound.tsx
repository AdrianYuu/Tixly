import { Helmet } from 'react-helmet-async';

import { motion } from 'framer-motion';
import NotfoundComponent from '../../components/NotFound';

function Notfound() {
  return (
    <>
      <Helmet>
        <title>Tixly | Notfound</title>
      </Helmet>

      <motion.section
        className="flex flex-col gap-2  mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NotfoundComponent />
      </motion.section>
    </>
  );
}

export default Notfound;
