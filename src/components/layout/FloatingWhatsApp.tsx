"use client";
import { MessageCircle } from "lucide-react";
import { WA_LINK } from "@/lib/constants";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
    return (
        <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center hover:bg-green-600 transition-colors"
            >
                <MessageCircle className="h-8 w-8" />
            </motion.div>
        </a>
    );
}
