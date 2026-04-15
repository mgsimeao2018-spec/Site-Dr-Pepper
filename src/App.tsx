/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { Menu, X, ArrowDown, Check, Instagram, Twitter, Youtube, Send } from 'lucide-react';

// --- Components ---

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.section>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Our Story', href: '#story' },
    { name: 'Find a Store', href: '#' },
    { name: 'Fan Club', href: '#fan-club' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 flex items-center ${scrolled ? 'bg-drpepper-red shadow-lg' : 'bg-drpepper-red border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-10 w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Dr Pepper logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white font-semibold text-sm uppercase tracking-tight hover:opacity-80 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-white text-drpepper-red px-5 py-2 rounded font-extrabold text-[13px] uppercase hover:scale-105 active:scale-95 transition-transform">
            Find Dr Pepper
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-drpepper-red border-t border-drpepper-dark overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-white text-lg font-bold py-2"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-white text-drpepper-red py-3 rounded-full font-bold text-lg">
                Find Dr Pepper
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-drpepper-red pt-16 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-editorial-texture opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-10 w-full grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h1 className="text-white font-sans text-6xl md:text-[92px] font-black uppercase leading-[0.85] mb-6 tracking-tighter">
            23 flavours.<br />Zero explanations.
          </h1>
          <p className="text-drpepper-offwhite text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-10 font-medium leading-relaxed">
            The one and only Dr Pepper. Irresistibly different since 1885. Not for everyone. For you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-white text-drpepper-red px-8 py-4 rounded font-black text-sm uppercase hover:scale-105 active:scale-95 transition-transform shadow-xl">
              Find Dr Pepper
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded font-black text-sm uppercase hover:bg-white/10 active:scale-95 transition-all">
              Explore Flavours
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center md:justify-center"
        >
          {/* Real Product Can Image */}
          <img 
            src="/can.png" 
            alt="Dr Pepper original — authentic blend of 23 flavours" 
            className="h-[280px] md:h-[420px] w-auto object-contain relative z-10 -mb-10 md:-mb-10"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
            referrerPolicy="no-referrer"
          />
          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          ></motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white opacity-60"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

const Ticker = () => {
  const items = [
    "Over 140 years of bold flavour",
    "Loved in 50+ countries",
    "23 unique flavour notes",
    "America's #1 unique soft drink",
    "Over 10 billion cans sold"
  ];

  return (
    <div className="bg-drpepper-black h-10 overflow-hidden border-t border-drpepper-dark flex items-center">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...items, ...items, ...items].map((item, i) => (
          <React.Fragment key={i}>
            <span className="text-white text-sm font-bold uppercase tracking-tight mx-5">{item}</span>
            <span className="text-drpepper-red text-xl">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ProductRange = () => {
  const products = [
    { name: "Original", desc: "The OG 23 Flavours", color: "bg-drpepper-red", image: "/original.jpg" },
    { name: "Diet Pepper", desc: "Bold Taste, No Sugar", color: "bg-[#2A2A2A]", image: "/diet.jpg" },
    { name: "Zero Sugar", desc: "Maximum Pepper Flavour", color: "bg-drpepper-black", image: "/zero.jpg" },
    { name: "Cherry", desc: "Smooth Dark Cherry Mix", color: "bg-[#7A0000]", image: "/cherry.jpg" },
    { name: "Cream Soda", desc: "Smooth, velvety vanilla notes", color: "bg-[#F5ECD7]", darkText: true, image: "/cream-soda.jpg" },
    { name: "Strawberries & Cream", desc: "Sweet berry meets smooth cream", color: "bg-[#D4607A]", image: "/strawberries.jpg" },
  ];

  return (
    <Section id="products" className="bg-drpepper-offwhite py-16">
      <div className="max-w-7xl mx-auto px-10 flex items-center gap-10">
        <div className="grid-title vertical-rl rotate-180 font-black uppercase text-2xl border-l-4 border-drpepper-red pl-2 text-drpepper-black flex-shrink-0">
          Pick Your Pepper
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              whileHover={{ y: -5 }}
              className={`${product.color} rounded-lg p-4 shadow-sm flex flex-col items-center justify-between h-[280px] transition-transform duration-200 cursor-pointer group overflow-hidden`}
            >
              <div className="relative w-full h-40 flex items-center justify-center">
                {product.name === "Original" ? (
                  <img 
                    src="/can.png" 
                    alt={product.name} 
                    className="h-[120px] w-auto object-contain drop-shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-[180px] w-auto object-contain"
                    onError={(e) => {
                      // Fallback to placeholder if AI image not found
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.name}/600/600`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className="w-full text-left">
                <h3 className={`text-sm font-black uppercase ${product.darkText ? 'text-drpepper-black' : 'text-white'}`}>
                  {product.name}
                </h3>
                <p className={`text-[10px] opacity-70 ${product.darkText ? 'text-drpepper-black' : 'text-white'}`}>
                  {product.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const BrandStory = () => {
  const milestones = [
    { year: "1885", text: "First served in Waco, Texas" },
    { year: "1904", text: "Introduced at the World's Fair" },
    { year: "1963", "text": "\"Be a Pepper\" campaign launches" },
    { year: "2024", text: "Still unexplainably good" },
  ];

  return (
    <Section id="story" className="bg-brand-story py-24 relative">
      <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <h2 className="text-white font-sans text-[120px] font-black leading-none mb-4 drop-shadow-lg">1885</h2>
          <p className="text-white text-2xl leading-relaxed mb-8 font-medium drop-shadow-md">
            Born in a Waco, Texas pharmacy, Dr Pepper was different from day one. No one could explain the taste — and that was always the point.
          </p>
          <a href="#" className="text-white font-bold text-lg border-b-2 border-white pb-1 hover:opacity-80 transition-opacity">
            Read Our Story
          </a>
        </div>

        <div className="relative pl-12 bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
          {/* Timeline Line */}
          <div className="absolute left-[55px] top-12 bottom-12 w-[2px] bg-white/30"></div>
          
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[12px] top-2 w-6 h-6 rounded-full bg-white border-4 border-drpepper-red shadow-sm"></div>
                <div className="pl-8">
                  <h4 className="text-xl font-bold text-white">{m.year}</h4>
                  <p className="text-white/70">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const FanClub = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <Section id="fan-club" className="bg-drpepper-red py-24 text-center relative overflow-hidden">
      {/* Section 11c: Fan Club Illustration Background */}
      <div className="absolute inset-0 bg-fan-club opacity-15 mix-blend-overlay"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <h2 className="text-white font-sans text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Join the Pepper People.</h2>
        <p className="text-drpepper-offwhite text-xl mb-12 font-medium opacity-90">
          Get exclusive deals, early flavour drops, and merch. No spam. Just Pepper.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row max-w-lg mx-auto shadow-2xl"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white px-6 py-4 text-black focus:outline-none rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none text-lg font-medium"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 font-black text-lg rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 uppercase tracking-tight"
              >
                I'm In <Send size={18} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 inline-block border border-white/20"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-drpepper-red" size={32} />
              </div>
              <h3 className="text-white text-2xl font-black uppercase">You're a Pepper now.</h3>
              <p className="text-white/80 font-medium">Check your inbox for your first drop.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-white/50 text-sm font-medium">
          By signing up you agree to our privacy policy. Unsubscribe anytime.
        </p>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-[#666] h-[60px] flex items-center">
      <div className="max-w-7xl mx-auto px-10 w-full flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-4">
          <img 
            src="/logo.png" 
            alt="Dr Pepper logo" 
            className="h-10 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div>&copy; 2025 Dr Pepper / Keurig Dr Pepper. All rights reserved.</div>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full z-[60] p-4"
        >
          <div className="max-w-4xl mx-auto bg-drpepper-black text-white p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-300 text-center md:text-left">
              We use cookies to enhance your experience and show you the most relevant Pepper content. By clicking "Accept All", you agree to our use of cookies.
            </p>
            <div className="flex gap-4 flex-shrink-0">
              <button onClick={handleAccept} className="bg-drpepper-red text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                Accept All
              </button>
              <button onClick={handleAccept} className="bg-white/10 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white/20 transition-colors">
                Manage
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const footer = document.querySelector('footer');
      const footerTop = footer?.getBoundingClientRect().top || Infinity;
      
      setVisible(window.scrollY > heroHeight && footerTop > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-20 right-10 z-40 bg-drpepper-red text-white px-6 py-3 rounded-full font-black shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-transform uppercase text-sm"
        >
          Find Dr Pepper Nearby
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Nav />
      <Hero />
      <Ticker />
      <ProductRange />
      <BrandStory />
      <FanClub />
      <Footer />
      
      {/* Polish Elements */}
      <StickyCTA />
      <CookieBanner />
    </div>
  );
}
