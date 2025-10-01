import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white font-chakra p-4">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <AlertTriangle className="mx-auto h-24 w-24 text-accent" />
        </motion.div>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-8xl font-extrabold text-white tracking-wider"
        >
          We Are On It!
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl text-gray-300"
        >
          Oops! Page Not Found
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-gray-400">
            We are currently in beta and working hard to build a better experience.
          </p>
          <Link to="/dashboard">
            <Button className="mt-6 bg-accent hover:bg-accent/80 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
              <Home className="mr-2 h-5 w-5" />
              Go Back Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;