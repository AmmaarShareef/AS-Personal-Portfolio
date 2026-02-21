import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import clashRoyaleImg from '../assets/clash-royale.jpg';
import goofyRivia from '../assets/GoofyRivia.png';
import pheonixImg from '../assets/pheonix.png';

const projectsData = [
  {
    id: 1,
    title: "Clash Royale Bot",
    description: "Built a real-time computer vision pipeline using YOLOv8, OpenCV, and MSS for screen capture to detect and classify Clash Royale cards from live gameplay, including a custom-trained YOLOv8 model on my own labeled dataset. Integrated Python-based event logic for elixir tracking, card-cycle timing, and opponent deck prediction.",
    tags: ["YOLOv8", "OpenCV", "Python", "Computer Vision"],
    image: clashRoyaleImg,
    color: "from-purple-600 to-blue-600",
    github: "https://github.com/AmmaarShareef/Clash-Royale-Bot"
  },
  {
    id: 2,
    title: "Multiplayer Trivia game",
    description: "GoofyRivia is a local Jackbox‑style murder trivia game built with TypeScript, React (frontend), and Node.js/Express (backend). Players can join a lobby, receive questions, and play in real time — all locally on your machine.",
    tags: ["OpenCV", "Python", "Image Processing"],
    image: goofyRivia,
    color: "from-green-500 to-cyan-500",
    github: "https://github.com/AmmaarShareef/GoofyRivia"
  },
  {
    id: 3,
    title: "Pheonix AID",
    description: "A wildfire precaution and response system frontend. Designed to provide real-time alerts and resource management for emergency responders and affected communities.",
    tags: ["React", "Frontend", "UI/UX"],
    image: pheonixImg,
    color: "from-orange-500 to-red-600",
    github: "https://github.com/AmmaarShareef/MEC-2025-Frontend"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center px-6 py-10 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-16 text-center cursor-default"
        >
          Latest Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 h-[400px] hover:h-[750px] flex flex-col"
            >
              {/* Image Section */}
              <div className="h-64 w-full relative overflow-hidden shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10`} />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow relative bg-[#0a0a0a]">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-36 left-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col gap-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub className="text-xl" />
                      <span className="text-sm font-medium border-b border-transparent group-hover/link:border-white transition-all">View Code</span>
                    </a>
                  )}
                </div>

                {/* Initial state description (truncated or hidden) */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Hover to expand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
