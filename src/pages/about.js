import Link from "next/link"; 
import { motion } from 'framer-motion';

// --- Navbar Component for consistency ---
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

// Framer Motion variants - Same variants are used for all pages (no change)
const pageVariants = {
  initial: { opacity: 0, rotateY: 90 },
  in: { opacity: 1, rotateY: 0, transition: { duration: 0.5, delay: 0.2 } },
  out: { opacity: 0, rotateY: -90, transition: { duration: 0.3 } }
};

export default function About() {
  const currentPath = '/about'; // Define current path for Navbar highlighting
  
  return (
    <motion.main 
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      // Applied Dark Theme
      className="min-h-screen bg-slate-900 origin-center"
    >
      {/* Navbar is added here */}
      <Navbar activePath={currentPath} />
      
      <header className="text-center py-10 px-6">
        {/* Updated: Text color to fit dark theme */}
        <h1 className="text-4xl font-bold text-indigo-400">Our Company Vision</h1>
        {/* Updated: Text color to fit dark theme */}
        <p className="text-slate-400 mt-2">Driving innovation and sustainability in construction since 2010.</p>
      </header>
      
      <section 
          // Updated: Card background and shadow for dark theme
          className="bg-slate-800 shadow-xl shadow-slate-950/50 p-6 rounded-2xl max-w-4xl mx-auto space-y-4 m-6 border border-slate-700/50"
      >
        {/* Updated: Text color */}
        <p className="text-slate-300">
          JK Constructions was founded on the principle of delivering **uncompromised quality** and transparency in every build. We are a team of certified civil engineers, architects, and project managers dedicated to transforming client visions into reality efficiently and ethically.
        </p>
        {/* Updated: Text color */}
        <p className="text-slate-300">
          Our core values include **Safety First**, **Client Partnership**, and **Sustainable Building Practices**.
        </p>
      </section>

      {/* Footer is removed */}
    </motion.main>
  );
}