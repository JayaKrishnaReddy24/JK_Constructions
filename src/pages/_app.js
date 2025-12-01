import '../styles/globals.css'; // Your global styles/Tailwind import
import { AnimatePresence } from 'framer-motion';

// This is the core file that enables the page transitions
function MyApp({ Component, pageProps, router }) {
  return (
    // AnimatePresence handles mounting and unmounting components for exit animations
    <AnimatePresence mode="wait" initial={false}>
      <div key={router.route} style={{ perspective: '1000px', overflowX: 'hidden' }}>
        <Component {...pageProps} />
      </div>
    </AnimatePresence>
  );
}

export default MyApp;