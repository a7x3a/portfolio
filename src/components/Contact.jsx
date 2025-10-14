import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ahmadomar6511@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+964 776 698 6183',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sulaymaniah, Iraq',
    }
  ];

  return (
    <section id="contact" ref={ref} className="relative py-16 sm:py-20 md:py-32 bg-white dark:bg-gray-900 overflow-hidden" aria-label="Contact form section">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute top-40 left-20 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Get In Touch
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            Have a project in mind? Send me a message!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 md:p-10 shadow-xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10" />
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Form Title */}
            <div className="text-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5">
                Send me a message
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                I'll get back to you as soon as possible
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Jhon Dee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                Your Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Tell me about your project or idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                required
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full shadow-lg hover:shadow-xl"
              icon={<Send className="w-4 h-4" />}
              iconPosition="right"
            >
              Send Message
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
              Or reach me directly at
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                      {info.label}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
