import { motion } from "framer-motion";
import { CheckCircle, User } from "lucide-react";

export default function RightCard() {
  const features = [
    "User friendly dashboard",
    "Real-time analytics",
    "Personalized Recommendations",
    "Powerful Insights",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-2/3 bg-black text-white p-12 flex flex-col justify-center items-center"
    >
      <div className="max-w-md  font-madefor">
        <h2 className="text-3xl font-bold mb-6">Join MyWellness Community</h2>
        <p className="text-gray-400 mb-8">
          Get personalized recommendations insights with your personal chatbot assistance 
        </p>
        <div className="relative mb-12">
        </div>
        <ul className="text-left space-y-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <CheckCircle className="text-green-400" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
