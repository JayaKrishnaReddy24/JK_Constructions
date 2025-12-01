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

// Framer Motion variants
const pageVariants = {
  initial: { opacity: 0, rotateY: 90 },
  in: { opacity: 1, rotateY: 0, transition: { duration: 0.5, delay: 0.2 } },
  out: { opacity: 0, rotateY: -90, transition: { duration: 0.3 } }
};

// --- Membership Tiers Data ---
const membershipTiers = [
  {
    name: "Tier 1: Foundation",
    price: "$99/year",
    description: "The essential starting point for your construction journey.",
    benefits: [
      "5% discount on all interior design services.",
      "Monthly newsletter with design tips.",
      "Standard consultation booking.",
    ],
    buttonColor: "bg-indigo-600 hover:bg-indigo-500",
  },
  {
    name: "Tier 2: Blueprint (Recommended)",
    price: "$299/year",
    description: "Ideal for clients planning major renovations or new builds.",
    benefits: [
      "15% discount on all interior design services.",
      "Priority scheduling for renovation consultations.",
      "Exclusive access to digital project management tools.",
      "Quarterly site visit review (when applicable).",
    ],
    buttonColor: "bg-green-500 hover:bg-green-400", // Highlight this tier
  },
  {
    name: "Tier 3: Apex",
    price: "$499/year",
    description: "Our premium service for long-term projects and major investments.",
    benefits: [
      "25% discount on all interior design services.",
      "Dedicated member support line.",
      "Highest priority scheduling and on-demand consultations.",
      "Access to exclusive material suppliers and wholesale pricing.",
    ],
    buttonColor: "bg-red-600 hover:bg-red-500",
  },
];
// --- End of Membership Tiers Data ---


export default function Membership() {
  const currentPath = '/membership'; // Define current path for Navbar highlighting

  // Function to handle button click and simulate payment request
  const handleCheckout = (tierName, tierPrice) => {
    alert(
      `Redirecting to Payment Gateway...\n\nYou have selected: ${tierName}\nAmount Due: ${tierPrice}\n\n(In a real application, this would redirect you to a secure checkout page like Stripe or PayPal.)`
    );
  };
  
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
        <h1 className="text-4xl font-extrabold text-green-400">
          🔑 Exclusive Membership Tiers
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Choose the level of partnership that best fits your construction and design goals. Each tier unlocks greater benefits and savings.
        </p>
      </header>
      
      {/* --- Membership Tiers Section (Smaller Boxes) --- */}
      <section className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipTiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`
                bg-slate-800 shadow-xl p-5 rounded-xl border border-slate-700 
                flex flex-col transform transition-transform duration-300 hover:scale-[1.03]
                ${index === 1 ? 'shadow-green-500/30' : 'shadow-slate-950/50'}
              `}
            >
              <div className="flex-grow">
                {/* Tier Name */}
                <h2 className={`text-xl font-bold mb-2 ${index === 1 ? 'text-green-400' : 'text-indigo-300'}`}>
                  {tier.name}
                </h2>
                {/* Tier Price */}
                <p className="text-4xl font-extrabold text-white mb-3">
                  {tier.price}
                </p>
                {/* Tier Description */}
                <p className="text-slate-400 mb-5 text-sm border-b border-slate-700 pb-3">
                  {tier.description}
                </p>
                
                {/* Benefits List */}
                <h3 className="text-base font-semibold text-slate-200 mb-2">What's Included:</h3>
                <ul className="list-none space-y-2 text-slate-300">
                  {tier.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex items-start">
                      {/* Checkmark Icon */}
                      <svg 
                        className="w-4 h-4 mr-2 flex-shrink-0 text-green-500 mt-0.5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-xs">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action Button with Payment Simulation */}
              <button
                onClick={() => handleCheckout(tier.name, tier.price)}
                className={`
                  mt-6 w-full text-white py-2 rounded-lg font-semibold uppercase tracking-wider transition duration-200
                  ${tier.buttonColor}
                `}
              >
                Choose {tier.name.split(':')[1].trim()}
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* --- End of Membership Tiers Section --- */}

    </motion.main>
  );
}