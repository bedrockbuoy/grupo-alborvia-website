import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  TrendingUp, 
  Cpu, 
  ArrowRight, 
  Menu, 
  X, 
  Mail, 
  ChevronDown,
  Send,
  User,
  MessageSquare
} from 'lucide-react';
import './App.css';

/* --- REUSABLE ANIMATION COMPONENTS --- */

// Floating Geometrical Shapes Background
const GeometricBackground = ({ variant = "default" }: { variant?: string }) => {
  const shapes = [
    // Golden rotating square
    {
      width: 120, height: 120,
      top: "8%", left: "5%",
      className: "geo-shape geo-square",
      duration: 25
    },
    // Large blue orb
    {
      width: 400, height: 400,
      top: "30%", right: "-15%",
      className: "geo-shape geo-orb-blue",
      duration: 20
    },
    // Floating triangle
    {
      width: 150, height: 150,
      bottom: "15%", left: "10%",
      className: "geo-shape geo-triangle",
      duration: 30
    },
    // Small accent circle 1
    {
      width: 24, height: 24,
      top: "25%", right: "18%",
      className: "geo-shape geo-dot-gold",
      duration: 12
    },
    // Small accent square 2
    {
      width: 18, height: 18,
      bottom: "35%", left: "35%",
      className: "geo-shape geo-dot-orange",
      duration: 15
    },
    // Hexagon
    {
      width: 100, height: 100,
      top: "60%", right: "8%",
      className: "geo-shape geo-hexagon",
      duration: 35
    },
    // Diamond
    {
      width: 80, height: 80,
      top: "15%", right: "30%",
      className: "geo-shape geo-diamond",
      duration: 22
    },
    // Concentric circles
    {
      width: 200, height: 200,
      bottom: "20%", right: "25%",
      className: "geo-shape geo-circles",
      duration: 40
    },
  ];

  return (
    <div className="geometric-bg">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={shape.className}
          style={{
            width: shape.width,
            height: shape.height,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 360],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* SVG Geometric Elements */}
      <svg className="geo-svg geo-svg-1" viewBox="0 0 100 100" fill="none">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="geo-svg geo-svg-2" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="geo-svg geo-svg-3" viewBox="0 0 100 100" fill="none">
        <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 }
        }
      }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* --- SUB-COMPONENTS --- */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Soluciones", href: "#divisiones" },
    { name: "Nosotros", href: "#nosotros" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="navbar-logo"
        >
          <div className="logo-icon"></div>
          <div className="logo-text">Grupo <span>Alborvia</span></div>
        </motion.a>

        <div className="navbar-links">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="nav-link"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact-form"
            className="nav-cta"
          >
            Contactar
          </motion.a>
        </div>

        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-inner">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact-form" 
                className="mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contactar Ahora →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <section className="hero-section">
      {/* Animated gradient background */}
      <motion.div className="hero-gradient-bg" style={{ y: y1 }} />
      <div className="hero-overlay" />
      <div className="hero-noise" />
      
      <GeometricBackground />

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-badge"
        >
          <span className="badge-dot" />
          GLOBAL TRADING & LOGISTICS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title"
        >
          El camino al
          <span className="hero-title-accent">Amanecer Global</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-subtitle"
        >
          Uniendo la riqueza natural de México con la tecnología del futuro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-buttons"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#divisiones"
            className="btn-primary"
          >
            Nuestras Divisiones <ChevronDown size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact-form"
            className="btn-secondary"
          >
            Hablemos de Negocios
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="scroll-line"
      >
        <div className="scroll-line-inner" />
      </motion.div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
  accentColor: string;
}

const ServiceCard = ({ icon: Icon, title, description, accentColor }: ServiceCardProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="service-card"
      onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior: 'smooth'})}
    >
      <div className="service-card-glow" style={{ background: accentColor }} />
      <div className="service-card-pattern" />
      
      <div className="service-card-content">
        <div className="service-icon">
          <Icon className="icon" />
        </div>
        
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        
        <div className="service-link">
          Explorar <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Trading Global",
      description: "Gestión y arbitraje de materias primas. Conectamos recursos naturales con la demanda industrial global.",
      accentColor: "rgba(245, 158, 11, 0.15)"
    },
    {
      icon: Globe,
      title: "Expansión Internacional",
      description: "Socio local para marcas globales. Soft-landing estratégico y cumplimiento normativo en mercados emergentes.",
      accentColor: "rgba(59, 130, 246, 0.15)"
    },
    {
      icon: Cpu,
      title: "Logística 4.0 & AI",
      description: "Optimización de rutas y predicción de demanda mediante algoritmos avanzados de Inteligencia Artificial.",
      accentColor: "rgba(168, 85, 247, 0.15)"
    }
  ];

  return (
    <section id="divisiones" className="services-section">
      <GeometricBackground variant="services" />
      <div className="container">
        <FadeInUp>
          <div className="section-header">
            <span className="section-label">Nuestros Servicios</span>
            <h2 className="section-title">Pilares de Negocio</h2>
            <div className="section-line" />
            <p className="section-subtitle">
              Infraestructura, comercio y tecnología convergen en nuestras soluciones.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} delay={index * 0.2} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { value: "3", label: "Continentes" },
    { value: "24/7", label: "Operaciones" },
    { value: "10+", label: "Años" },
    { value: "AI", label: "Tecnología" },
  ];

  return (
    <section id="nosotros" className="about-section">
      <div className="about-gradient" />
      <GeometricBackground variant="about" />

      <div className="container about-container">
        <div className="about-text">
          <FadeInUp>
            <div className="about-label">
              <div className="label-line" />
              <span>Nuestra Esencia</span>
            </div>
            <h2 className="about-title">
              Visión sin fronteras.
              <span className="about-title-muted">Raíces profundas.</span>
            </h2>
            <p className="about-description">
              En Grupo Alborvia, entendemos el amanecer como una oportunidad constante. 
              Integramos la potencia industrial de México con los estándares globales más exigentes.
            </p>
            <p className="about-description">
              Operamos en la intersección de la logística tradicional y la inteligencia 
              artificial, creando valor sostenible que perdura.
            </p>
            <a href="#contact-form" className="about-link">
              Conoce al equipo <ArrowRight size={16} />
            </a>
          </FadeInUp>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:karen@alborvia.com?subject=Contacto de ${formState.name}&body=${formState.message}`;
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact-form" className="contact-section">
      <GeometricBackground variant="contact" />
      <div className="contact-fade-top" />
      
      <div className="container">
        <div className="contact-card">
          {/* Info Side */}
          <div className="contact-info">
            <div className="contact-info-content">
              <h3 className="contact-title">Hablemos</h3>
              <p className="contact-subtitle">
                ¿Listo para iniciar un nuevo proyecto o expandir sus operaciones? 
                Nuestro equipo está listo para ayudar.
              </p>
              
              <div className="contact-details">
                <div className="contact-detail">
                  <div className="detail-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>karen@alborvia.com</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="detail-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4>Oficinas</h4>
                    <p>CDMX • San Francisco</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-decoration">
              <Send size={32} />
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <div className="input-wrapper">
                    <User size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Tu nombre"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrapper">
                    <Mail size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="nombre@empresa.com"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Mensaje</label>
                <div className="input-wrapper textarea-wrapper">
                  <MessageSquare size={18} />
                  <textarea 
                    required
                    rows={4}
                    placeholder="¿En qué podemos ayudarte?"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="form-submit"
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3 className="footer-logo">
            Grupo <span>Alborvia</span>
          </h3>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Grupo Alborvia S.A. de C.V.
          </p>
        </div>
        
        <div className="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
