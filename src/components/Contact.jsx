import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

const Contact = () => {
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const checkDevice = () => {
      const hasPointerDevice = window.matchMedia('(pointer: fine)').matches;
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
      setIsDesktop(hasPointerDevice && isLargeScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
    container: typeof window !== 'undefined' ? undefined : null
  });

  const y = useTransform(scrollYProgress, [0, 1], isDesktop ? [100, -100] : [0, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [deviceInfo, setDeviceInfo] = useState({
    ip_address: 'Fetching...',
    device: '',
    browser: '',
    time: ''
  });

  useEffect(() => {
    // Get device and browser info
    const getDeviceInfo = () => {
      const ua = navigator.userAgent;
      let device = 'Desktop';
      let browser = 'Unknown';

      // Detect device
      if (/mobile/i.test(ua)) {
        device = 'Mobile';
      } else if (/tablet|ipad/i.test(ua)) {
        device = 'Tablet';
      }

      // Detect browser
      if (ua.indexOf('Firefox') > -1) {
        browser = 'Firefox';
      } else if (ua.indexOf('SamsungBrowser') > -1) {
        browser = 'Samsung Internet';
      } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
        browser = 'Opera';
      } else if (ua.indexOf('Trident') > -1) {
        browser = 'Internet Explorer';
      } else if (ua.indexOf('Edge') > -1) {
        browser = 'Edge';
      } else if (ua.indexOf('Chrome') > -1) {
        browser = 'Chrome';
      } else if (ua.indexOf('Safari') > -1) {
        browser = 'Safari';
      }

      return { device, browser };
    };

    // Get IP address
    const fetchIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const info = getDeviceInfo();
        setDeviceInfo({
          ip_address: data.ip,
          device: info.device,
          browser: info.browser,
          time: new Date().toLocaleString()
        });
      } catch (error) {
        const info = getDeviceInfo();
        setDeviceInfo({
          ip_address: 'Unable to fetch',
          device: info.device,
          browser: info.browser,
          time: new Date().toLocaleString()
        });
      }
    };

    fetchIPAddress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const serviceId = 'service_e5h205c';
      const templateId = 'template_uk1st7r';
      const publicKey = 'nPMLdwo3JFiMQwEmw';

      // Prepare template parameters with device info
      const templateParams = {
        name: formData.name,
        email: formData.email,
        from_email: formData.email,
        message: formData.message,
        ip_address: deviceInfo.ip_address,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        time: new Date().toLocaleString()
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // Hide error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ahmadomar6511@gmail.com',
      action: 'mailto:ahmadomar6511@gmail.com',
      clickable: true
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+964 776 698 6183',
      action: 'tel:+9647766986183',
      clickable: true
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sulaymaniah, Iraq',
      action: null,
      clickable: false
    }
  ];

  return (
    <section id="contact" ref={ref} className="relative sm:py-24 py-12 px-6 bg-white dark:bg-gray-900 overflow-hidden" aria-label="Contact form section">
      {/* Parallax background - Only on desktop */}
      {isDesktop && (
        <motion.div
          style={{ y }}
          className="absolute top-40 left-20 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
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
          viewport={{ once: true, margin: "-100px", amount: 0.2 }}
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
                <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Jhon Dee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                Your Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="contact-message"
                name="message"
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
              icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              iconPosition="right"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  Failed to send message. Please try again or contact me directly.
                </p>
              </motion.div>
            )}
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
              Or reach me directly at
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Wrapper = info.clickable ? 'a' : 'div';
                const wrapperProps = info.clickable
                  ? { href: info.action, target: info.label === 'Email' ? '_blank' : undefined, rel: info.label === 'Email' ? 'noopener noreferrer' : undefined }
                  : {};

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <Wrapper
                      {...wrapperProps}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                        info.clickable
                          ? 'hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 border border-transparent cursor-pointer group'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        info.clickable
                          ? 'bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50'
                          : 'bg-primary-100 dark:bg-primary-900/30'
                      }`}>
                        <info.icon className={`w-5 h-5 transition-transform ${
                          info.clickable
                            ? 'text-primary-600 dark:text-primary-400 group-hover:scale-110'
                            : 'text-primary-600 dark:text-primary-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                          {info.label}
                        </div>
                        <div className={`text-sm font-semibold truncate transition-colors ${
                          info.clickable
                            ? 'text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {info.value}
                        </div>
                      </div>
                      {info.clickable && (
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
