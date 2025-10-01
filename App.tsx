import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, Music, X, Mail, Sparkles } from 'lucide-react';
import Music1 from './music/music1.mp3';
import Music2 from './music/music2.mp3'
import Music3 from './music/music3.mp3'

import Img1 from './images/pic1.gif';
import Img2 from './images/pic2.jpg';
import Img3 from './images/pic3.jpg';

import ScrollReveal from './components/ScrollReveal';
import HeartCatcherGame from './components/HeartCatcherGame';
import EnvelopeGif from './images/intro.gif';
import HelloGif from './images/hellokitty.gif'
import PaperAirplaneImg from './images/aeroplane.png';
import { textConfig } from './textConfig';


// Optimized Paper Airplane Component with reduced animations
const PaperAirplane = memo(({ delay = 0, onComplete }) => {
  const [hearts, setHearts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Reduced heart generation frequency for better performance
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        delay: Math.random() * 0.3
      };
      setHearts(prev => [...prev.slice(-8), newHeart]); // Limit to 8 hearts max
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 2000); // Reduced duration
    }, 250); // Reduced frequency

    const stopHearts = setTimeout(() => {
      clearInterval(heartInterval);
    }, 5000); // Reduced duration

    const hideAirplane = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 6000); // Reduced duration

    return () => {
      clearInterval(heartInterval);
      clearTimeout(stopHearts);
      clearTimeout(hideAirplane);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  const simpleVariants = shouldReduceMotion ? {
    initial: { x: -150, y: 200, opacity: 0 },
    animate: { x: 1200, y: 200, opacity: 1 }
  } : {
    initial: { 
      x: -150, 
      y: typeof window !== 'undefined' ? window.innerHeight * 0.2 : 200, 
      rotate: 15,
      scale: 1
    },
    animate: { 
      x: typeof window !== 'undefined' ? window.innerWidth + 150 : 1200, 
      y: typeof window !== 'undefined' ? [
        window.innerHeight * 0.2,
        window.innerHeight * 0.15,
        window.innerHeight * 0.35
      ] : [200, 150, 350],
      rotate: [15, 5, 25],
      scale: [1, 1.2, 1.1]
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <motion.div
        className="absolute"
        initial={simpleVariants.initial}
        animate={simpleVariants.animate}
        transition={{ 
          duration: shouldReduceMotion ? 4 : 6,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          <motion.img
            src={PaperAirplaneImg}
            alt="Paper Airplane"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
            style={{
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))"
            }}
          />
          
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute -left-8 top-1/2 transform -translate-y-1/2"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Reduced hearts trail */}
      {!shouldReduceMotion && hearts.slice(-5).map(heart => ( // Limit visible hearts
        <motion.div
          key={heart.id}
          className="absolute"
          initial={{ 
            x: -100, 
            y: typeof window !== 'undefined' ? window.innerHeight * 0.2 + Math.random() * 60 - 30 : 200,
            opacity: 1,
            scale: 0.4
          }}
          animate={{ 
            x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 600,
            y: typeof window !== 'undefined' ? window.innerHeight * 0.2 + Math.random() * 150 - 75 : 200,
            opacity: 0,
            scale: [0.4, 0.8, 0]
          }}
          transition={{ 
            duration: 2,
            delay: heart.delay,
            ease: "easeOut"
          }}
        >
          <Heart 
            className="w-4 h-4 text-pink-400" 
            fill="currentColor"
          />
        </motion.div>
      ))}

      {!shouldReduceMotion && (
        <motion.div
          className="absolute"
          initial={{ 
            x: -80, 
            y: typeof window !== 'undefined' ? window.innerHeight * 0.2 - 40 : 160,
            opacity: 0
          }}
          animate={{ 
            x: typeof window !== 'undefined' ? window.innerWidth * 0.4 : 480,
            y: typeof window !== 'undefined' ? window.innerHeight * 0.2 - 40 : 160,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 4,
            delay: 1
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-pink-200">
            <p className="text-xs md:text-sm font-comic text-pink-600 font-semibold whitespace-nowrap">
              💕 A special message is coming your way...
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
});

// Optimized Background Animation Component
const BackgroundAnimation = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;

  return (
    <motion.div 
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {[...Array(10)].map((_, i) => ( // Reduced from 25 to 10
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 2, // Slower animations
            repeat: Infinity,
            delay: Math.random() * 5 + 1
          }}
        />
      ))}
    </motion.div>
  );
});

// Optimized EnvelopeAnimation component
const EnvelopeAnimation = memo(({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showAirplane, setShowAirplane] = useState(false);
  const [airplaneCompleted, setAirplaneCompleted] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const airplaneTimer = setTimeout(() => {
      setShowAirplane(true);
      setShowWelcomeMessage(true);
    }, 100);
    
    return () => clearTimeout(airplaneTimer);
  }, []);

  const handleAirplaneComplete = useCallback(() => {
    setAirplaneCompleted(true);
    setShowWelcomeMessage(false);
    setTimeout(() => setShowEnvelope(true), 200);
  }, []);

  const handleEnvelopeClick = useCallback(() => {
    if (!isOpen && airplaneCompleted) {
      setIsOpen(true);
      setTimeout(() => setShowLetter(true), 600);
      setTimeout(() => onOpenComplete(), 2000);
    }
  }, [isOpen, airplaneCompleted, onOpenComplete]);

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <BackgroundAnimation />

      <AnimatePresence>
        {showAirplane && !airplaneCompleted && (
          <PaperAirplane delay={0} onComplete={handleAirplaneComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showWelcomeMessage && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                className="mb-6 sm:mb-8 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={HelloGif} 
                  alt="Special animation" 
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain"
                  style={{
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))"
                  }}
                />
              </motion.div>

              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 font-comic leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Something Special is Coming...
              </motion.h1>
              
              {!shouldReduceMotion && (
                <motion.div
                  className="flex justify-center mt-4 sm:mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showEnvelope && (
          <motion.div
            className="cursor-pointer relative z-20"
            onClick={handleEnvelopeClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          >
            {!shouldReduceMotion && (
              <motion.div
                className="absolute -top-24 sm:-top-28 md:-top-32 left-1/2 transform -translate-x-1/2 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 z-30"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: [-10, 0, -10], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <img 
                  src={EnvelopeGif} 
                  alt="Animated hearts" 
                  className="w-full h-full object-contain"
                  style={{ pointerEvents: 'none' }}
                />
              </motion.div>
            )}

            <motion.div
              className="w-72 h-48 sm:w-80 sm:h-52 md:w-[360px] md:h-[240px] bg-gradient-to-br from-white to-blue-50 border-2 border-blue-300 rounded-xl shadow-2xl relative overflow-hidden"
              animate={isOpen ? { scale: 0.95, opacity: 0.7 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 w-0 h-0 border-l-[144px] border-r-[144px] border-t-[96px] sm:border-l-[160px] sm:border-r-[160px] sm:border-t-[104px] md:border-l-[180px] md:border-r-[180px] md:border-t-[120px] border-l-transparent border-r-transparent border-t-blue-300"
                initial={{ rotateX: 0 }}
                animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformOrigin: 'top' }}
              />

              <motion.div 
                className="absolute top-[40%] left-1/2 -translate-x-1/2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full p-2 md:p-3 shadow-xl"
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" />
              </motion.div>

              {showLetter && (
                <motion.div
                  className="absolute inset-x-2 md:inset-x-4 top-2 h-[180px] md:h-[200px] bg-white rounded-xl shadow-2xl p-3 md:p-4 text-center border border-gray-100"
                  initial={{ y: 200, opacity: 0, scale: 0.8 }}
                  animate={{ y: -20, opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-500 mr-1" fill="currentColor" />
                    <p className="text-sm md:text-base text-gray-700 font-comic font-semibold">{textConfig.ui.envelopePreview}</p>
                    <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-500 ml-1" fill="currentColor" />
                  </div>
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mx-auto" />
                </motion.div>
              )}
            </motion.div>

            {!isOpen && airplaneCompleted && (
              <motion.div
                className="text-blue-700 text-sm md:text-lg font-medium text-center mt-4 md:mt-6 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg max-w-xs md:max-w-none"
                initial={{ opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { 
                  opacity: [0, 1, 0], 
                  y: [10, 5, 10]
                }}
                transition={shouldReduceMotion ? { duration: 0.5 } : { 
                  duration: 2.5, 
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                ✨ {textConfig.ui.envelopeHint} ✨
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Optimized Floating Hearts Component
const FloatingHearts = memo(({ hearts, onRemove }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <AnimatePresence>
      {hearts.slice(-10).map((heart) => ( // Limit to 10 hearts max
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none z-40"
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={shouldReduceMotion ? 
            { scale: [1, 0], y: -50, opacity: [1, 0] } :
            { scale: [1, 1.5, 0], y: -100, opacity: [1, 0.8, 0], rotate: [0, 180, 360] }
          }
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: shouldReduceMotion ? 1 : 2, ease: "easeOut" }}
          style={{ left: heart.x - 10, top: heart.y - 10 }}
          onAnimationComplete={() => onRemove(heart.id)}
        >
          <Heart className={`${heart.color} w-6 h-6`} fill="currentColor" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
});

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [initialLetterOpened, setInitialLetterOpened] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [showGame, setShowGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaylistPlaying, setIsPlaylistPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Memoized playlist data
  const playlist = useMemo(() => [
    { title: "Dil Ka Jo Haal Hai", info: "🤌", src: Music1 },
    { title: "If the world was ending", info: "😁", src: Music2 },
    { title: "Me Gustas Tu", info: "🙂", src: Music3 },
  ], []);

  // Move sticky notes memo here to avoid conditional hook call
  const stickyNotes = useMemo(() => textConfig.stickyNotes.map((text, index) => ({
    text,
    style: [
      { top: '8%', left: '4%', zIndex: 30 },
      { top: '20%', right: '6%', zIndex: 30 },
      { bottom: '18%', left: '5%', zIndex: 30 },
      { bottom: '12%', right: '8%', zIndex: 30 },
      { top: '50%', left: '2%', zIndex: 30 }
    ][index],
    delay: (index + 1) * 0.3
  })), []);

  useEffect(() => {
    if (initialLetterOpened && !showContent) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    }
  }, [initialLetterOpened, showContent]);

  const toggleMusic = useCallback(() => {
    const audio = document.getElementById('bgMusic');
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Optimized heart adding with throttling
  const addHeart = useCallback((e) => {
    const newHeart = { 
      id: Date.now(), 
      x: e.clientX, 
      y: e.clientY,
      color: ['text-pink-500', 'text-red-400', 'text-purple-500'][Math.floor(Math.random() * 3)]
    };
    setHearts(prev => [...prev.slice(-8), newHeart]); // Limit hearts to 8
  }, []);

  const removeHeart = useCallback((heartId) => {
    setHearts(prev => prev.filter(h => h.id !== heartId));
  }, []);

  const playSong = useCallback((song, index) => {
    // Stop any currently playing song
    if (currentSong && currentSong.audio) {
      currentSong.audio.pause();
    }

    // Create new audio instance
    const audio = new Audio(song.src);
    audio.loop = false;
    
    // Play the song
    audio.play().then(() => {
      setCurrentSong({ ...song, audio, index });
      setIsPlaylistPlaying(true);
    }).catch(error => {
      console.error("Error playing song:", error);
    });

    // Handle song end
    audio.addEventListener('ended', () => {
      setIsPlaylistPlaying(false);
      setCurrentSong(null);
    });
  }, [currentSong]);

  const stopSong = useCallback(() => {
    if (currentSong && currentSong.audio) {
      currentSong.audio.pause();
      setCurrentSong(null);
      setIsPlaylistPlaying(false);
    }
  }, [currentSong]);

  // Early return AFTER all hooks
  if (!initialLetterOpened) {
    return <EnvelopeAnimation onOpenComplete={() => { setInitialLetterOpened(true); setShowLetter(true); }} />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8 cursor-pointer relative overflow-hidden" 
      onClick={addHeart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Optimized background animation */}
      {!shouldReduceMotion && (
        <motion.div 
          className="fixed inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {[...Array(10)].map((_, i) => ( // Reduced from 15 to 10
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-200 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 2, // Slower animations
                repeat: Infinity,
                delay: Math.random() * 5 + 1
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Optimized Floating Hearts */}
      <FloatingHearts hearts={hearts} onRemove={removeHeart} />

      {/* Main content with optimized animations */}
      <motion.div 
        className="max-w-6xl mx-auto space-y-20 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ScrollReveal animation="fade" duration={0.8} delay={0.5}>
          <motion.div 
            className="text-center pt-12"
            whileInView={shouldReduceMotion ? {} : { scale: [0.95, 1] }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 font-comic"
            >
              {textConfig.greeting.name},
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-700 font-comic max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {textConfig.greeting.message}
            </motion.p>
            {!shouldReduceMotion && (
              <motion.div
                className="mt-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto" />
              </motion.div>
            )}
          </motion.div>
        </ScrollReveal>

        {/* Optimized Letter Card */}
        <ScrollReveal animation="zoom" duration={0.6} delay={0.1}>
          <motion.div
            className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 p-8 md:p-10 text-center rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-2 border-pink-200 overflow-hidden"
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(236, 72, 153, 0.2)"
            }}
            onClick={(e) => { e.stopPropagation(); setShowLetter(true); }}
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-pink-200 to-transparent rounded-full -translate-x-10 -translate-y-10 opacity-50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-200 to-transparent rounded-full translate-x-8 translate-y-8 opacity-50" />
            
            {!shouldReduceMotion && (
              <>
                <motion.div 
                  className="absolute top-4 right-4"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-pink-300" fill="currentColor" />
                </motion.div>
                <motion.div 
                  className="absolute bottom-4 left-4"
                  animate={{ y: [2, -2, 2] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Heart className="w-3 h-3 text-purple-300" fill="currentColor" />
                </motion.div>
              </>
            )}

            <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white">
              <Mail className="w-10 h-10 text-pink-600" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-3">
                {textConfig.letter.title}
              </h2>
              <p className="text-gray-600 font-comic text-xl leading-relaxed">{textConfig.letter.subtitle}</p>
              
              <div className="flex justify-center items-center mt-4 space-x-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-pink-300" />
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-purple-300" />
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* OPTIMIZED PLAYLIST SECTION */}
        <ScrollReveal animation="slide" duration={0.6} delay={0.2}>
          <motion.div
            className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-8 md:p-10 text-center rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-blue-200 overflow-hidden"
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)"
            }}
          >
            {/* Simplified decorative elements */}
            {!shouldReduceMotion && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div 
                  className="absolute top-6 left-8 text-blue-200 text-2xl"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ♪
                </motion.div>
                <motion.div 
                  className="absolute bottom-6 right-8 text-blue-300 text-xl"
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  ♬
                </motion.div>
              </div>
            )}

            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white">
              <Music className="w-10 h-10 text-blue-600" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-comic mb-3">
                Songs Dedicated To You
              </h2>
              <p className="text-gray-600 font-comic text-xl leading-relaxed mb-4">
                Songs that remind me of you ✨
              </p>
              
              {/* Current Playing Song Display */}
              {currentSong && (
                <motion.div 
                  className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-4 mb-4 border border-blue-200"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-comic text-blue-700 font-semibold">🎵 Now Playing:</p>
                  <p className="font-comic text-gray-700">{currentSong.title} - {currentSong.info}</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2 overflow-hidden">
                    <motion.div 
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: currentSong.audio ? currentSong.audio.duration || 30 : 30,
                        ease: "linear"
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Interactive Playlist */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mt-4 border border-blue-100">
                <div className="space-y-2 text-left">
                  {playlist.map((song, index) => (
                    <motion.div 
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        currentSong && currentSong.index === index 
                          ? 'bg-blue-100 border-2 border-blue-300' 
                          : 'bg-blue-50/50 hover:bg-blue-100/70'
                      }`}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentSong && currentSong.index === index) {
                          stopSong();
                        } else {
                          playSong(song, index);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          currentSong && currentSong.index === index 
                            ? 'bg-blue-500' 
                            : 'bg-blue-400'
                        }`} />
                        <div>
                          <span className="font-comic text-gray-700 text-sm font-semibold">{song.title}</span>
                          <p className="font-comic text-gray-500 text-xs">{song.info}</p>
                        </div>
                      </div>
                      <div className="text-blue-500">
                        {currentSong && currentSong.index === index ? (
                          <span className="text-xl">⏸</span>
                        ) : (
                          <span className="text-xl">▶</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Control Buttons */}
                <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-blue-200">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPlaylistPlaying) {
                        stopSong();
                      } else if (playlist.length > 0) {
                        playSong(playlist[0], 0);
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-comic text-sm transition-all duration-200"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    {isPlaylistPlaying ? 'Stop' : 'Play All'}
                  </motion.button>
                </div>
              </div>
              
              {/* Decorative divider */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-300" />
                <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-indigo-300" />
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Optimized Game Card */}
        <ScrollReveal animation="slide" duration={0.6} delay={0.3}>
          <motion.div
            className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 p-8 md:p-10 text-center rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-2 border-purple-200 overflow-hidden"
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(147, 51, 234, 0.2)"
            }}
            onClick={(e) => { e.stopPropagation(); setShowGame(true); }}
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-x-12 -translate-y-12 opacity-40" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-200 to-transparent rounded-full translate-x-10 translate-y-10 opacity-40" />
            
            {!shouldReduceMotion && (
              <motion.div 
                className="absolute top-6 right-6"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            )}

            <div className="relative z-10 bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white">
              <Heart className="w-10 h-10 text-pink-600" fill="currentColor" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-comic mb-3">
                {textConfig.game.title}
              </h2>
              <p className="text-gray-600 font-comic text-xl leading-relaxed">{textConfig.game.subtitle}</p>
              
              {gameCompleted && (
                <motion.div 
                  className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border-2 border-pink-200 shadow-inner"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                >
                  <p className="text-pink-600 font-comic font-semibold text-lg">✨ {textConfig.game.completionMessage}</p>
                </motion.div>
              )}
              
              <div className="flex justify-center items-center mt-4 space-x-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-300" />
                <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-pink-300" />
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Optimized Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {textConfig.panels.slice(0, 2).map((panel, i) => (
            <ScrollReveal key={i} animation="slide" delay={i * 0.2} duration={0.6}>
              <motion.div
                className="comic-panel bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-blue-100"
                whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="comic-speech-bubble mb-6 bg-gradient-to-r from-blue-50 to-pink-50 p-4 rounded-xl">
                  <p className="font-comic text-xl text-gray-800 leading-relaxed">💭 {panel.text}</p>
                </div>
                <motion.img 
                  src={i === 0 ? Img1 : Img2} 
                  alt="panel" 
                  className="rounded-xl mb-6 w-full h-72 object-cover shadow-lg border-2 border-white"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <p className="text-gray-700 font-comic text-center text-lg font-semibold">{panel.caption}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Optimized Poem Section */}
        <ScrollReveal animation="flip" threshold={0.3} duration={1}>
          <motion.div 
            className="comic-panel bg-gradient-to-br from-white via-pink-50 to-purple-50 p-10 rounded-3xl shadow-3xl relative overflow-hidden border border-pink-200"
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6 font-comic text-center">
              {textConfig.poem.title}
            </h2>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border-2 border-dashed border-pink-300 shadow-inner">
              <p className="text-gray-700 italic leading-loose font-comic text-center text-xl">
                {textConfig.poem.lines.map((line, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {line}
                    {index < textConfig.poem.lines.length - 1 && <br />}
                  </motion.span>
                ))}
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <Heart className="w-8 h-8 text-purple-500" fill="currentColor" />
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Optimized Extra Panel */}
        <ScrollReveal animation="zoom" duration={0.8} threshold={0.4}>
          <motion.div
            className="comic-panel bg-gradient-to-br from-white to-yellow-50 p-8 rounded-3xl shadow-3xl hover:shadow-4xl transition-all duration-300 border border-yellow-200"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="comic-speech-bubble mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl">
              <p className="font-comic text-xl text-gray-800 leading-relaxed">💝 "{textConfig.panels[2].text}"</p>
            </div>
            <motion.img 
              src={Img3} 
              alt="Apology doodle" 
              className="rounded-2xl mb-6 w-full h-80 object-cover shadow-xl border-4 border-white"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              transition={{ duration: 0.2 }}
            />
            <p className="text-gray-700 font-comic text-center text-xl font-semibold">{textConfig.panels[2].caption}</p>
          </motion.div>
        </ScrollReveal>
      </motion.div>

      {/* Optimized Letter Modal */}
      <AnimatePresence>
        {showLetter && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-xl flex items-center justify-center p-4 z-50" 
            onClick={() => setShowLetter(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 p-8 md:p-12 max-w-3xl w-full rounded-3xl shadow-3xl overflow-y-auto max-h-[90vh] border-2 border-pink-200"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Simplified background elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200 to-transparent rounded-full -translate-x-16 -translate-y-16 opacity-30" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200 to-transparent rounded-full translate-x-14 translate-y-14 opacity-30" />
              </div>

              {/* Optimized close button */}
              <motion.button 
                onClick={() => setShowLetter(false)} 
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg border border-pink-200 z-20"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 90 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <div className="relative z-10">
                <motion.div 
                  className="flex items-center justify-center mb-8"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-2xl border-2 border-dashed border-pink-300">
                    <div className="flex items-center justify-center space-x-3">
                      <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                      <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-comic m-0">
                        {textConfig.letter.recipient}
                      </h3>
                      <Heart className="w-8 h-8 text-purple-500" fill="currentColor" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-inner border-2 border-pink-100 relative"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,240,245,0.95) 100%)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-pink-200 opacity-30" />
                  <div className="absolute left-12 top-0 bottom-0 w-px bg-pink-200 opacity-20" />
                  
                  <div className="space-y-6 font-comic text-gray-700 leading-relaxed text-lg relative z-10">
                    {textConfig.letter.paragraphs.map((paragraph, index) => (
                      <motion.p 
                        key={index}
                        className="relative"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {index === 0 && (
                          <span className="text-6xl font-bold text-pink-300 absolute -left-4 -top-2 leading-none select-none">
                            "
                          </span>
                        )}
                        <span className="relative z-10">{paragraph}</span>
                      </motion.p>
                    ))}
                    
                    <motion.div 
                      className="text-right mt-8 pt-6 border-t border-pink-200 border-dashed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                        With all my love,
                      </p>
                      <p className="text-xl text-pink-600 font-comic" style={{ whiteSpace: 'pre-line' }}>
                        {textConfig.letter.signature}
                      </p>
                      
                      <div className="flex justify-end items-center mt-4 space-x-2">
                        <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <Heart className="w-5 h-5 text-purple-400" fill="currentColor" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Modal */}
      <AnimatePresence>
        {showGame && (
          <HeartCatcherGame 
            onComplete={() => setGameCompleted(true)} 
            onClose={() => setShowGame(false)} 
            winMessage={textConfig.game.winMessage}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;