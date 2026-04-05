import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share, PlusSquare, Smartphone, Globe, Download, Monitor, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Install() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const webAddress = "driveinusa.atlantadaniel.com";

  const steps = [
    {
      id: 1,
      title: "OPEN BROWSER",
      description: "Launch your preferred browser on iPhone or Android.",
      icon: <Globe className="w-8 h-8 text-retro-cyan" />,
      color: "border-retro-cyan"
    },
    {
      id: 2,
      title: "NAVIGATE",
      description: (
        <>
          Go to <a href={`https://${webAddress}`} target="_blank" rel="noopener noreferrer" className="text-retro-cyan hover:underline">{webAddress}</a> in your browser.
        </>
      ),
      icon: <Smartphone className="w-8 h-8 text-retro-yellow" />,
      color: "border-retro-yellow"
    },
    {
      id: 3,
      title: "TAP MENU",
      description: "Tap 'Share' or the 'Three Dots'.",
      icon: <div className="flex gap-2">
        <Share className="w-6 h-6 text-retro-pink" />
        <MoreVertical className="w-6 h-6 text-retro-pink" />
      </div>,
      color: "border-retro-pink"
    },
    {
      id: 4,
      title: "ADD TO HOME",
      description: "Select 'Add to Home Screen' from the options.",
      icon: <PlusSquare className="w-8 h-8 text-white" />,
      color: "border-white"
    }
  ];

  return (
    <div className="min-h-screen bg-retro-navy text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-retro-cyan md:hover:text-white transition-colors font-retro uppercase text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Movies
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-6xl md:text-7xl mb-4 neon-text tracking-tighter">
              INSTALL THE <span className="text-retro-pink">APP</span>
            </h1>
            <p className="text-retro-yellow font-retro uppercase tracking-[0.3em] text-sm mb-2">
              Take the Drive-In Experience Anywhere
            </p>
            <div className="h-1 w-32 bg-retro-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-retro-pink/10 border-2 border-retro-pink p-8 rounded-3xl text-center mb-16"
        >
          <Download className="w-12 h-12 text-retro-pink mx-auto mb-4 animate-bounce" />
          <h2 className="font-display text-4xl mb-4">WHY INSTALL?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-retro uppercase tracking-widest">
            <div className="p-4 bg-black/20 rounded-xl border border-white/10">
              <Monitor className="w-5 h-5 mx-auto mb-2 text-retro-cyan" />
              Full Screen View
            </div>
            <div className="p-4 bg-black/20 rounded-xl border border-white/10">
              <Smartphone className="w-5 h-5 mx-auto mb-2 text-retro-yellow" />
              Home Screen Icon
            </div>
            <div className="p-4 bg-black/20 rounded-xl border border-white/10">
              <Globe className="w-5 h-5 mx-auto mb-2 text-white" />
              Fast Access
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-retro-navy/50 border-2 ${step.color} p-8 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors`}
            >
              <div className="absolute right-4 top-0 text-8xl font-display opacity-5 text-white group-hover:opacity-10 transition-opacity">
                {step.id}
              </div>
              
              <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block">
                {step.icon}
              </div>
              
              <h3 className="font-display text-3xl mb-2 tracking-tight">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed font-sans">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <footer className="text-center pb-12">
          <p className="text-gray-600 font-retro text-[10px] uppercase tracking-[0.5em]">
            {webAddress} &bull; 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
