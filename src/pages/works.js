import Link from "next/link"; 
import { motion } from 'framer-motion';

// --- Navbar Component for consistency (Not Modified) ---
const Navbar = ({ activePath }) => {
  // Define all navigation links with their display names and routes
  const navLinks = [
    { name: 'Home', href: '/' }, 
    { name: 'Profile', href: '/profile' }, 
    { name: 'Work', href: '/works' }, 
    { name: 'Membership', href: '/membership' }, 
    { name: 'About', href: '/about' }, 
  ];

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-slate-900 border-b border-slate-800">
      {/* Top-Left Heading (JK Constructions) */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-indigo-400">JK Constructions</h1>
        <p className="text-slate-400 text-sm mt-0.5">Building Dreams</p>
      </div>

      {/* Navigation Bar (Top-Right) */}
      <nav>
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                // Highlights the current page
                className={`
                  transition duration-150 font-medium whitespace-nowrap
                  ${activePath === link.href ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-300 hover:text-indigo-400'}
                `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
// --- End of Navbar Component ---


// --- Work Project Data (Image URLs as previously generated) ---
const workProjects = [
    {
        id: 1,
        title: "The Grand Residential Tower",
        summary: "A 40-story luxury apartment building completed on time and under budget. Featuring sustainable materials and smart home integration in every unit.",
        year: 2024,
        image: "https://img3.exportersindia.com/product_images/bc-full/2020/12/8184679/best-apartments-and-flats-construction-company-in-1607674899-5653962.jpeg", // AI-generated image for Grand Residential Tower
        tags: ['Residential', 'High-Rise', 'Sustainable']
    },
    {
        id: 2,
        title: "City Center Commercial Hub",
        summary: "A modern commercial complex designed for mixed-use, including retail spaces and A-grade offices. Architectural design focused on natural light and open floor plans.",
        year: 2023,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1nK2q_UTGs7bAX_FdMXk3-90RyquF_kk6Gg&s", // AI-generated image for City Center Commercial Hub
        tags: ['Commercial', 'Mixed-Use', 'Urban']
    },
    {
        id: 3,
        title: "Eco-Friendly Housing Development",
        summary: "A community of 50 low-energy homes, utilizing solar power and rainwater harvesting systems. A testament to our commitment to green building practices.",
        year: 2022,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-uXxhHBPefyXpFv_z-IW54ebQWbee5iNwSA&s", // AI-generated image for Eco-Friendly Housing Development
        tags: ['Residential', 'Green Building', 'Community']
    },
];


// --- Framer Motion Variants (Not Modified) ---
const pageVariants = {
  initial: { opacity: 0, rotateY: 90 },
  in: { 
    opacity: 1, 
    rotateY: 0, 
    transition: { duration: 0.5, delay: 0.2, }
  },
  out: { 
    opacity: 0, 
    rotateY: -90, 
    transition: { duration: 0.3, }
  }
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};


// --- WorkCard Component (UPDATED: object-contain for images) ---
const WorkCard = ({ project }) => (
    <motion.div 
        className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500 transition duration-300 shadow-lg shadow-slate-950/30 flex flex-col h-full"
        variants={itemVariants}
    >
        <div className="h-32 overflow-hidden rounded-lg mb-4 flex items-center justify-center bg-slate-700"> {/* Added bg-slate-700 for letterbox background */}
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-contain rounded-lg transform hover:scale-105 transition-transform duration-500" // Changed object-cover to object-contain
            />
        </div>
        
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-indigo-400">{project.title}</h3>
            <span className="text-sm font-semibold text-slate-400 bg-slate-700 px-3 py-1 rounded-full">{project.year}</span>
        </div>
        
        <p className="text-slate-300 mb-4 flex-grow">{project.summary}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-slate-700/50">
            {project.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-indigo-300 bg-indigo-900/50 px-2 py-0.5 rounded-full border border-indigo-900">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);


// --- Works Page Component (Export Default) ---
export default function Works() {
  const currentPath = '/works';
  
  return (
    <motion.main 
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen bg-slate-900 origin-center pb-12"
    >
      <Navbar activePath={currentPath} />
      
      <header className="text-center py-10 px-6">
        <h1 className="text-5xl font-extrabold text-indigo-400">Our Portfolio & Works</h1>
        <p className="text-slate-400 mt-2 text-lg">Explore our recent projects and engineering excellence in construction.</p>
      </header>
      
      {/* Portfolio Grid */}
      <motion.section 
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
      >
        {workProjects.map((project) => (
            <WorkCard key={project.id} project={project} />
        ))}
      </motion.section>

      {workProjects.length === 0 && (
          <div className="text-center py-10">
              <p className="text-slate-400 text-lg">No projects currently listed. Check back soon for our latest work!</p>
          </div>
      )}

      {/* NEW SECTION: Our Commitment to Excellence */}
      <section className="mt-16 max-w-4xl mx-auto px-6">
        <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700">
            <h2 className="text-3xl font-bold text-blue-400 mb-4 text-center">
                🏗️ Our Commitment to Excellence
            </h2>
            <p className="text-slate-300 mb-4 leading-relaxed">
                At **JK Constructions**, our portfolio is a testament to our dedication to **quality, innovation, and client satisfaction**. We believe that every structure we build is not just a project, but a foundation for a brighter future. Our team utilizes the latest **sustainable building techniques** and precision engineering to deliver projects that are both enduring and environmentally responsible.
            </p>
            <p className="text-slate-400 text-sm italic border-l-4 border-indigo-500 pl-4 py-2">
                "Building Dreams" is more than our tagline; it's our promise to deliver exceptional value and craftsmanship on every site, from residential homes to large-scale commercial hubs.
            </p>
        </div>
      </section>
      
    </motion.main>
  );
}