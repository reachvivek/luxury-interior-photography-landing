"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hi! I'm interested in your interior photography services.",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-stone-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
    </motion.button>
  );
}
