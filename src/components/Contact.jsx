import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('ammhood1602@gmail.com');
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
  };

  const socials = [
    { icon: FaGithub, href: "https://github.com/AmmaarShareef", label: "GitHub", color: "hover:text-white" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/ammaar-shareef-936922313/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: FaInstagram, href: "https://www.instagram.com/shafeezy_amr/", label: "Instagram", color: "hover:text-pink-500" },
    { icon: FaEnvelope, href: "#", label: "Email", color: "hover:text-red-400", onClick: handleEmailClick },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-10 relative z-10">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
            Let's Connect
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
            I'll try my best to get back to you!
          </p>

          <div className="flex justify-center gap-8 md:gap-12">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                onClick={social.onClick}
                target={social.href === '#' ? undefined : "_blank"}
                rel={social.href === '#' ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className={`text-4xl md:text-5xl text-gray-400 transition-colors duration-300 cursor-pointer ${social.color}`}
                aria-label={social.label}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/5"
          >
            <p className="text-sm text-gray-500">
              Copyright © Ammaar Shareef 2025
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed Toast Notification */}
      <AnimatePresence>
        {showCopyToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-white text-black px-6 py-3 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
