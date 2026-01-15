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
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-stone-800 hover:bg-stone-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-700 ease-out group backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-4 py-2 bg-stone-900/95 text-white text-xs font-light tracking-wide rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
        Book a shoot
      </span>
    </motion.button>
  );
}
