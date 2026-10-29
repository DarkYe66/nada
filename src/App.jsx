import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import FloatingHearts from './components/FloatingHearts.jsx';
import RomanticAnimation from './components/RomanticAnimation.jsx';
import { memories } from './data/memories.js';
import musicTrack from './assets/audio/musica.mp3';

function ClosedEnvelope({ reduceMotion }) {
  return (
    <motion.div
      className="closed-letter"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.86, filter: 'blur(4px)' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.48, type: 'spring', bounce: 0.3 }}
    >
      <motion.div
        className="envelope"
        animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="envelope-paper">Una carta solo para ti</span>
        <span className="envelope-back" />
        <span className="envelope-front" />
        <motion.span
          className="wax-seal"
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], boxShadow: ['0 0 0 #e9ba7a00', '0 0 22px #e9ba7a99', '0 0 0 #e9ba7a00'] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ♥
        </motion.span>
      </motion.div>
      <p className="envelope-caption">Un pedacito de mi corazón, para ti</p>
      <span className="envelope-hint">Ábrela para descubrir tu sorpresa</span>
    </motion.div>
  );
}

function MemoryView({ memory, index, total, reduceMotion, isFinal, photoRef }) {
  return (
    <motion.div
      className="memory-view"
      key={memory.image}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.96, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.97, filter: 'blur(4px)' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.48, ease: 'easeOut' }}
    >
      <div className="memory-count">
        <span>Recuerdo {index + 1} de {total}</span>
        <span className="progress-track" aria-hidden="true">
          <motion.span
            className="progress-fill"
            initial={false}
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
          />
        </span>
      </div>

      <div className={`photo-placement${isFinal ? ' photo-placement-final' : ''}`}>
        <motion.figure
          className="photo-print"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 5, scale: 0.9 }}
          animate={{ opacity: 1, rotate: -1.5, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.62, delay: reduceMotion ? 0 : 0.08, type: 'spring', bounce: 0.25 }}
        >
          <img ref={isFinal ? photoRef : undefined} src={memory.image} alt={memory.caption} />
          <figcaption>{memory.caption}</figcaption>
        </motion.figure>
      </div>

      <motion.p
        className="memory-phrase"
        key={memory.phrase}
        aria-live="polite"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.35, delay: reduceMotion ? 0 : 0.2 }}
      >
        {memory.phrase}
      </motion.p>
    </motion.div>
  );
}

export default function App() {
  const audioRef = useRef(null);
  const memoryStageRef = useRef(null);
  const photoRef = useRef(null);
  const [finalPhotoNode, setFinalPhotoNode] = useState(null);
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicNeedsGesture, setMusicNeedsGesture] = useState(false);
  const [kissCycle, setKissCycle] = useState(0);
  const currentMemory = memories[activeIndex];

  const setFinalPhotoRef = useCallback((node) => {
    photoRef.current = node;
    setFinalPhotoNode(node);
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.48;
      await audio.play();
      setIsMusicPlaying(true);
      setMusicNeedsGesture(false);
    } catch {
      setIsMusicPlaying(false);
      setMusicNeedsGesture(true);
    }
  }, []);

  useEffect(() => {
    void startMusic();
  }, [startMusic]);

  const openSurprise = () => {
    void startMusic();
    setActiveIndex(0);
    setIsOpen(true);
  };

  const goNext = () => {
    void startMusic();
    if (activeIndex === memories.length - 1) {
      setIsOpen(false);
      setActiveIndex(0);
      return;
    }

    const nextIndex = activeIndex + 1;
    setActiveIndex(nextIndex);
    if (nextIndex === memories.length - 1) {
      setKissCycle((cycle) => cycle + 1);
    }
  };

  const goPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((index) => index - 1);
      if (activeIndex === memories.length - 1) {
        setKissCycle((cycle) => cycle + 1);
      }
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void startMusic();
    } else {
      audio.pause();
      setIsMusicPlaying(false);
      setMusicNeedsGesture(false);
    }
  };

  const musicLabel = isMusicPlaying ? 'Pausar música' : 'Activar música';

  return (
    <div className="app-shell">
      <FloatingHearts />
      <div className="ambient-light ambient-light-one" aria-hidden="true" />
      <div className="ambient-light ambient-light-two" aria-hidden="true" />

      <main className="birthday-card">
        <header className="card-header">
          <div className="brand-lockup">
            <span className="brand-seal" aria-hidden="true">♥</span>
            <span>Para mi amor</span>
          </div>
          <p>Una carta que guardaba para ti</p>
          <span className="header-sparkle" aria-hidden="true">✦</span>
        </header>

        <div className="birthday-layout">
          <section className="letter-copy" aria-labelledby="birthday-title">
            <motion.span
              className="eyebrow"
              initial={reduceMotion ? undefined : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.55 }}
            >
              Para mi persona favorita
            </motion.span>
            <motion.h1
              id="birthday-title"
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
            >
              ¡Feliz cumpleaños,<br /><em>mi amor!</em>
            </motion.h1>
            <motion.p
              className="intro-copy"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.55, delay: reduceMotion ? 0 : 0.18 }}
            >
              Gracias por ser tú, por tu sonrisa y por hacer mis días más felices. Te quiero muchísimo, tete. ❤️
            </motion.p>
            <div className="letter-divider" aria-hidden="true"><span>♥</span></div>
            <motion.p
              className="letter-hint"
              key={isOpen ? `open-${activeIndex}` : 'closed-hint'}
              initial={reduceMotion ? undefined : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
            >
              {isOpen
                ? 'Cada recuerdo guarda un pedacito de todo lo que te amo.'
                : 'Preparé una sorpresa con nuestros recuerdos. Vamos a descubrirlos uno por uno.'}
            </motion.p>

            <div className="action-row">
              <motion.button
                className="surprise-button"
                type="button"
                onClick={isOpen ? goNext : openSurprise}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                aria-label={!isOpen ? 'Abrir mi sorpresa' : activeIndex === memories.length - 1 ? 'Volver a empezar' : 'Mostrar el siguiente recuerdo'}
              >
                {!isOpen ? 'Abrir mi sorpresa' : activeIndex === memories.length - 1 ? 'Volver a empezar' : 'Siguiente recuerdo'}
                <span aria-hidden="true">{!isOpen ? '✦' : '♥'}</span>
              </motion.button>

              <motion.button
                className={`music-button${isMusicPlaying ? ' is-playing' : ''}`}
                type="button"
                onClick={toggleMusic}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                aria-label={musicLabel}
                aria-pressed={isMusicPlaying}
              >
                <span className="music-icon" aria-hidden="true">♫</span>
                {musicLabel}
              </motion.button>
            </div>

            {musicNeedsGesture && !isMusicPlaying && (
              <p className="audio-hint" role="status">Toca “Activar música” si tu navegador bloqueó el inicio automático.</p>
            )}
          </section>

          <section
            ref={memoryStageRef}
            className={`memory-stage${isOpen && activeIndex === memories.length - 1 ? ' memory-stage--kiss' : ''}`}
            aria-label="Sorpresa de cumpleaños"
          >
            <span className="stage-sparkle sparkle-one" aria-hidden="true">✦</span>
            <span className="stage-sparkle sparkle-two" aria-hidden="true">✧</span>
            <span className="stage-sparkle sparkle-three" aria-hidden="true">✦</span>

            <AnimatePresence mode="wait" initial={false}>
              {!isOpen ? (
                <ClosedEnvelope key="envelope" reduceMotion={reduceMotion} />
              ) : (
                <motion.div
                  className="memory-content"
                  key={`memory-${activeIndex}`}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
                >
                  <MemoryView
                    memory={currentMemory}
                    index={activeIndex}
                    total={memories.length}
                    reduceMotion={reduceMotion}
                    isFinal={activeIndex === memories.length - 1}
                    photoRef={setFinalPhotoRef}
                  />
                  <nav className="memory-navigation" aria-label="Navegar recuerdos">
                    <motion.button
                      type="button"
                      onClick={goPrevious}
                      disabled={activeIndex === 0}
                      aria-label="Recuerdo anterior"
                      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                    >
                      ←
                    </motion.button>
                    <span>Un recuerdo a la vez</span>
                    <motion.button
                      type="button"
                      onClick={goNext}
                      aria-label={activeIndex === memories.length - 1 ? 'Volver a empezar' : 'Siguiente recuerdo'}
                      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                    >
                      →
                    </motion.button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isOpen && activeIndex === memories.length - 1 && finalPhotoNode && (
                <RomanticAnimation
                  key={`romantic-${kissCycle}`}
                  active
                  stageRef={memoryStageRef}
                  photoRef={photoRef}
                  replayKey={kissCycle}
                />
              )}
            </AnimatePresence>
          </section>
        </div>

        <footer className="card-footer">
          <span>Hecho despacito y con <strong>mucho amor</strong>, para ti.</span>
          <span aria-hidden="true">♥ &nbsp; ✦ &nbsp; ♥</span>
        </footer>
      </main>

      <audio
        ref={audioRef}
        src={musicTrack}
        autoPlay
        loop
        preload="auto"
        onPlay={() => { setIsMusicPlaying(true); setMusicNeedsGesture(false); }}
        onPause={() => setIsMusicPlaying(false)}
      />
    </div>
  );
}
