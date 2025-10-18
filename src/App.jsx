import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import IdleScreen from './components/IdleScreen';

function App() {
  return (
    <div className="relative bg-white dark:bg-gray-900 scroll-smooth">
      <CursorFollower />
      <IdleScreen />
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>
      
      <Footer />
    </div>
  );
}

export default App;
