import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: 90,
  },
  in: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    }
  },
  out: {
    opacity: 0,
    rotateY: -90,
    transition: {
      duration: 0.3,
    }
  }
};

export default function Home() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Profile', href: '/profile' },
    { name: 'Work', href: '/works' },
    { name: 'Membership', href: '/membership' },
    { name: 'About', href: '/about' },
  ];

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen bg-slate-900 text-gray-100 p-6 origin-center"
    >
      {/* HEADER */}
      <header className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">JK Constructions</h1>
          <p className="text-slate-400 text-sm">Building Dreams</p>
        </div>

        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-slate-300 hover:text-indigo-400 transition font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="mt-14 text-center">
        <h2 className="text-4xl font-bold text-indigo-300">We Build Your Vision</h2>
        <p className="text-slate-400 mt-3 text-lg">
          Reliable, modern and durable construction solutions for homes and businesses.
        </p>

        <button className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold">
          Get a Free Quote
        </button>

        {/* HERO IMAGE */}
        <div className="mt-10 h-80 w-full overflow-hidden rounded-xl border border-slate-700">
          <img
            src="https://www.constructionplacements.com/wp-content/uploads/2024/06/Construction-Engineering-Specializations-A-Comprehensive-Guide.jpg"
            alt="Construction hero"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold text-indigo-300">About Us</h3>
        <p className="text-slate-400 mt-3 leading-relaxed">
          JK Constructions has over 10 years of experience delivering high-quality 
          residential, commercial, and industrial building projects. We focus on 
          precision, safety, and customer satisfaction.
        </p>
      </section>

      {/* SERVICES */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold text-indigo-300">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            "Residential Construction",
            "Commercial Construction",
            "Renovation & Remodeling",
            "Interior Designing",
            "Structural Engineering",
            "Project Planning & Management"
          ].map((service) => (
            <div key={service} className="p-5 bg-slate-800 rounded-xl border border-slate-700">
              <h4 className="font-semibold text-indigo-300 text-lg">{service}</h4>
              <p className="text-slate-400 text-sm mt-2">
                Professional and high-quality solutions to match your needs.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold text-indigo-300">Featured Projects</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {/* PROJECT 1 */}
          <div className="h-48 bg-slate-800 rounded-xl border border-slate-700 p-0 overflow-hidden">
            <img 
              src="https://cdn.dwello.in/articles/assets/5116358d-dc3a-4f0c-a613-a18b35dfabfd/ghcedcbd.jpeg"
              className="w-full h-full object-cover"
            />
          </div>

          {/* PROJECT 2 */}
          <div className="h-48 bg-slate-800 rounded-xl border border-slate-700 p-0 overflow-hidden">
            <img 
              src="https://www.prontopanels.com/wp-content/uploads/2023/02/LC3-1-1024x682.png"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold text-indigo-300">Why Choose Us?</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            "Experienced Team",
            "On-Time Delivery",
            "Quality Materials",
            "Affordable Pricing",
            "100% Safety Standards",
            "Customer-Focused Service"
          ].map((point) => (
            <div key={point} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="font-semibold text-indigo-300">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold text-indigo-300">What Our Clients Say</h3>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <p className="text-slate-300">
              “Amazing work! They delivered my home project on time and with great quality.”
            </p>
            <p className="text-indigo-400 mt-3">– Sandeep R</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <p className="text-slate-300">
              “Professional and reliable. Highly recommended for commercial construction.”
            </p>
            <p className="text-indigo-400 mt-3">– Priya K</p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mt-16 text-center py-10 bg-slate-800 rounded-xl border border-slate-700">
        <h3 className="text-3xl font-bold text-indigo-300">Ready to Start Your Project?</h3>
        <p className="text-slate-400 mt-3">Let us build something amazing together.</p>
        <button className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold">
          Contact Us
        </button>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 py-6 border-t border-slate-700 text-center text-slate-500">
        JK Constructions © {new Date().getFullYear()} • All Rights Reserved
      </footer>
    </motion.main>
  );
}
