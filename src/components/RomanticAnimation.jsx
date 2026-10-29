import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import RiveCharacterAdapter from './romantic/RiveCharacterAdapter.jsx';
import RomanticCharacterFallback from './romantic/RomanticCharacterFallback.jsx';
import { riveCharacterConfig } from '../animation/riveCharacterConfig.js';

const DEFAULT_OFFSET = { x: 0, y: 0 };
const FINALE_HEARTS = Array.from({ length: 32 }, (_, index) => index);
const CONCEPTUAL_PHASES = new Set([
  'idle', 'walk', 'turn_to_photo', 'blow_kiss', 'turn_to_user', 'happy',
]);

function quadraticPoint(start, control, end, progress) {
  const inverse = 1 - progress;
  return {
    x: inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x,
    y: inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y,
  };
}

export default function RomanticAnimation({
  active,
  stageRef,
  photoRef,
  positionOffset = DEFAULT_OFFSET,
  replayKey = 0,
  riveConfig = riveCharacterConfig,
}) {
  const characterRef = useRef(null);
  const mouthRef = useRef(null);
  const photoParticleRef = useRef(null);
  const photoGlyphRef = useRef(null);
  const viewerParticleRef = useRef(null);
  const viewerGlyphRef = useRef(null);
  const finaleMessageRef = useRef(null);
  const finaleHeartsRef = useRef([]);
  const phaseRef = useRef('idle');
  const layoutRef = useRef(null);
  const flightRef = useRef(null);
  const [phase, setPhase] = useState('idle');
  const [facing, setFacing] = useState('user');
  const reduceMotion = useReducedMotion() === true;

  const changePhase = useCallback((nextPhase, nextFacing) => {
    if (!CONCEPTUAL_PHASES.has(nextPhase)) return;
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
    if (nextFacing) setFacing(nextFacing);
  }, []);

  useLayoutEffect(() => {
    if (!active || !stageRef?.current || !photoRef?.current || !characterRef.current) return undefined;

    const stage = stageRef.current;
    const character = characterRef.current;
    const photo = photoRef.current;
    const mouth = mouthRef.current;
    const photoParticle = photoParticleRef.current;
    const photoGlyph = photoGlyphRef.current;
    const viewerParticle = viewerParticleRef.current;
    const viewerGlyph = viewerGlyphRef.current;
    const finaleMessage = finaleMessageRef.current;
    const finaleHearts = finaleHeartsRef.current.filter(Boolean);
    let context;
    let setPhotoX;
    let setPhotoY;
    let setPhotoOpacity;
    let setPhotoScale;
    let setPhotoRotation;
    let setViewerX;
    let setViewerY;
    let setViewerOpacity;
    let setViewerScale;
    let setViewerRotation;
    let setCharacterX;
    let setCharacterY;
    let hasArrived = false;
    let walkStartX = 0;
    let walkStartY = 0;

    const recalculateLayout = () => {
      const stageRect = stage.getBoundingClientRect();
      const photoRect = photo.getBoundingClientRect();
      const characterWidth = character.offsetWidth || 90;
      const characterHeight = character.offsetHeight || 104;
      const maxX = Math.max(8, stageRect.width - characterWidth - 8);
      const targetX = gsap.utils.clamp(
        8,
        maxX,
        photoRect.left - stageRect.left - characterWidth - 14 + positionOffset.x,
      );
      const targetY = gsap.utils.clamp(
        8,
        Math.max(8, stageRect.height - characterHeight - 8),
        photoRect.top - stageRect.top + photoRect.height * 0.52 - characterHeight * 0.31 + positionOffset.y,
      );

      layoutRef.current = {
        stageRect,
        character: {
          x: targetX,
          y: targetY,
          startX: -stageRect.left - characterWidth - 18,
        },
        photo: {
          x: photoRect.left - stageRect.left + photoRect.width / 2,
          y: photoRect.top - stageRect.top + photoRect.height / 2,
        },
        viewer: {
          x: window.innerWidth / 2 - stageRect.left,
          y: window.innerHeight / 2 - stageRect.top,
        },
      };

      return layoutRef.current;
    };

    const renderFlight = (values) => {
      const flight = flightRef.current;
      const currentLayout = layoutRef.current;
      if (!flight || !currentLayout) return;

      const particle = flight.kind === 'photo' ? photoParticle : viewerParticle;
      const setters = flight.kind === 'photo'
        ? [setPhotoX, setPhotoY, setPhotoOpacity, setPhotoScale, setPhotoRotation]
        : [setViewerX, setViewerY, setViewerOpacity, setViewerScale, setViewerRotation];
      setters[3](values.scale);
      setters[4](values.rotation);
      const centerOffsetX = (particle.offsetWidth || 0) / 2;
      const centerOffsetY = (particle.offsetHeight || 0) / 2;

      const end = flight.kind === 'photo'
        ? currentLayout.photo
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const control = {
        x: (flight.start.x + end.x) / 2,
        y: Math.min(flight.start.y, end.y) - Math.min(54, currentLayout.stageRect.height * 0.12),
      };
      const point = quadraticPoint(flight.start, control, end, values.progress);
      setters[0](point.x - centerOffsetX);
      setters[1](point.y - centerOffsetY);
      setters[2](values.opacity);
    };

    const prepareFlight = (kind) => {
      recalculateLayout();
      const stageRect = stage.getBoundingClientRect();
      const mouthRect = mouth.getBoundingClientRect();
      const start = kind === 'photo'
        ? {
            x: mouthRect.left - stageRect.left + mouthRect.width / 2,
            y: mouthRect.top - stageRect.top + mouthRect.height / 2,
          }
        : {
            x: mouthRect.left + mouthRect.width / 2,
            y: mouthRect.top + mouthRect.height / 2,
          };

      flightRef.current = { kind, start };
      const particle = kind === 'photo' ? photoParticle : viewerParticle;
      const setters = kind === 'photo'
        ? [setPhotoX, setPhotoY, setPhotoOpacity, setPhotoScale, setPhotoRotation]
        : [setViewerX, setViewerY, setViewerOpacity, setViewerScale, setViewerRotation];
      setters[2](0.96);
      setters[3](kind === 'viewer' ? 0.55 : 0.48);
      setters[4](0);
      setters[0](start.x - (particle.offsetWidth || 0) / 2);
      setters[1](start.y - (particle.offsetHeight || 0) / 2);
    };

    const wait = { progress: 0 };
    const walk = { progress: 0 };
    const photoFlight = { progress: 0, opacity: 0.96, scale: 0.48, rotation: 0 };
    const viewerFlight = { progress: 0, opacity: 0.96, scale: 0.55, rotation: 0 };
    let timeline;

    context = gsap.context(() => {
      setPhotoX = gsap.quickSetter(photoParticle, 'x', 'px');
      setPhotoY = gsap.quickSetter(photoParticle, 'y', 'px');
      setPhotoOpacity = gsap.quickSetter(photoParticle, 'opacity');
      const photoBaseFontSize = gsap.utils.clamp(27, 38, window.innerWidth * 0.04);
      const photoFontSizeSetter = gsap.quickSetter(photoGlyph, 'fontSize', 'px');
      setPhotoScale = (factor) => photoFontSizeSetter(photoBaseFontSize * factor);
      setPhotoRotation = gsap.quickSetter(photoGlyph, 'rotation', 'deg');
      setViewerX = gsap.quickSetter(viewerParticle, 'x', 'px');
      setViewerY = gsap.quickSetter(viewerParticle, 'y', 'px');
      setViewerOpacity = gsap.quickSetter(viewerParticle, 'opacity');
      const viewerBaseFontSize = gsap.utils.clamp(42, 60, window.innerWidth * 0.058);
      const viewerFontSizeSetter = gsap.quickSetter(viewerGlyph, 'fontSize', 'px');
      setViewerScale = (factor) => viewerFontSizeSetter(viewerBaseFontSize * factor);
      setViewerRotation = gsap.quickSetter(viewerGlyph, 'rotation', 'deg');
      setCharacterX = gsap.quickSetter(character, 'x', 'px');
      setCharacterY = gsap.quickSetter(character, 'y', 'px');
      timeline = gsap.timeline({ paused: true });
      const initialLayout = recalculateLayout();
      gsap.set(character, {
        x: initialLayout.character.startX,
        y: initialLayout.character.y,
        autoAlpha: 0,
      });
      gsap.set([photoParticle, viewerParticle], { x: 0, y: 0, opacity: 0 });
      gsap.set([photoGlyph, viewerGlyph], { scale: 1, rotation: 0 });
      setPhotoScale(0.3);
      setViewerScale(0.3);
      gsap.set(finaleMessage, { autoAlpha: 0, xPercent: -50, scale: 0.72, y: 14 });
      gsap.set(finaleHearts, { autoAlpha: 0, scale: 0.3 });

      if (reduceMotion) {
        timeline
          .to(wait, { progress: 1, duration: 0.08 })
          .call(() => {
            recalculateLayout();
            gsap.set(character, { x: layoutRef.current.character.x, y: layoutRef.current.character.y, autoAlpha: 1 });
            hasArrived = true;
            changePhase('happy', 'user');
          });
        timeline.play(0);
        return;
      }

      timeline
        .to(wait, { progress: 1, duration: 0.78, ease: 'none' })
        .call(() => {
          const layout = recalculateLayout();
          walk.progress = 0;
          walkStartX = layout.character.startX;
          walkStartY = layout.character.y;
          gsap.set(character, { x: layout.character.startX, y: layout.character.y, autoAlpha: 1 });
          changePhase('walk');
        })
        .to(walk, {
          progress: 1,
          duration: 2.3,
          ease: 'power2.out',
          onUpdate: () => {
            const target = layoutRef.current?.character;
            if (!target) return;
            setCharacterX(walkStartX + (target.x - walkStartX) * walk.progress);
            setCharacterY(walkStartY + (target.y - walkStartY) * walk.progress);
          },
          onComplete: () => {
            hasArrived = true;
            changePhase('idle');
          },
        })
        .call(() => changePhase('turn_to_photo', 'photo'), null, '+=0.16')
        .call(() => changePhase('blow_kiss'), null, '+=0.42')
        .call(() => prepareFlight('photo'), null, '+=0.12')
        .to(photoFlight, {
          progress: 1,
          opacity: 1,
          scale: 2.8,
          rotation: 12,
          duration: 1.12,
          ease: 'power1.inOut',
          onUpdate: () => renderFlight(photoFlight),
        })
        .to(photoFlight, {
          opacity: 0,
          scale: 2.8,
          rotation: 12,
          duration: 0.32,
          ease: 'power1.out',
          onUpdate: () => renderFlight(photoFlight),
        }, '+=0.2')
        .call(() => changePhase('idle'))
        .to(photo, { scale: 1.045, duration: 0.16, ease: 'power1.out' })
        .to(photo, { scale: 1, duration: 0.28, ease: 'elastic.out(1, 0.55)' })
        .call(() => changePhase('turn_to_user', 'user'), null, '+=0.18')
        .call(() => changePhase('blow_kiss'), null, '+=0.4')
        .call(() => prepareFlight('viewer'), null, '+=0.12')
        .to(viewerFlight, {
          progress: 1,
          opacity: 1,
          scale: 6.2,
          rotation: 8,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: () => renderFlight(viewerFlight),
        })
        .fromTo(finaleMessage,
          { autoAlpha: 0, xPercent: -50, scale: 0.72, y: 16 },
          { autoAlpha: 1, xPercent: -50, scale: 1, y: 0, duration: 0.48, ease: 'back.out(1.7)' },
          '+=0.08',
        );

      const burstStart = timeline.duration() + 0.1;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const spreadX = Math.min(250, viewportWidth * 0.36);
      const spreadY = Math.min(190, viewportHeight * 0.28);

      finaleHearts.forEach((heart, index) => {
        const fromLeft = index % 2 === 0;
        const startX = fromLeft ? -38 : viewportWidth + 38;
        const startY = viewportHeight * (0.08 + Math.random() * 0.84);
        const targetX = viewportWidth / 2 + (Math.random() * 2 - 1) * spreadX;
        const targetY = viewportHeight / 2 + (Math.random() * 2 - 1) * spreadY;
        const finalScale = 0.85 + Math.random() * 0.9;

        timeline.fromTo(heart,
          {
            x: startX,
            y: startY,
            autoAlpha: 0,
            scale: 0.28,
            rotation: fromLeft ? -28 : 28,
          },
          {
            x: targetX,
            y: targetY,
            autoAlpha: 1,
            scale: finalScale,
            rotation: (Math.random() * 2 - 1) * 42,
            duration: 1.35 + Math.random() * 0.35,
            ease: 'power3.out',
          },
          burstStart + (index % 8) * 0.035,
        );
      });

      const finaleFadeStart = burstStart + 1.95;
      timeline
        .to(viewerFlight, {
          opacity: 0,
          scale: 6.2,
          duration: 0.52,
          ease: 'power2.in',
          onUpdate: () => renderFlight(viewerFlight),
        }, finaleFadeStart)
        .to(finaleMessage, {
          autoAlpha: 0,
          scale: 0.72,
          y: -12,
          duration: 0.46,
          ease: 'power2.in',
        }, finaleFadeStart)
        .to(finaleHearts, {
          autoAlpha: 0,
          scale: 0.45,
          duration: 0.48,
          ease: 'power2.in',
          stagger: { each: 0.008, from: 'center' },
        }, finaleFadeStart)
        .to(character, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, finaleFadeStart)
        .call(() => changePhase('happy', 'user'));

      timeline.play(0);
    }, stage);
    const refreshLayout = () => {
      const layout = recalculateLayout();
      if (hasArrived && ['idle', 'happy'].includes(phaseRef.current)) {
        setCharacterX(layout.character.x);
        setCharacterY(layout.character.y);
      }
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(refreshLayout);
    observer?.observe(stage);
    observer?.observe(photo);
    window.addEventListener('resize', refreshLayout, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', refreshLayout);
      timeline.kill();
      context.revert();
      flightRef.current = null;
    };
  }, [active, changePhase, photoRef, positionOffset.x, positionOffset.y, reduceMotion, replayKey, stageRef]);

  if (!active) return null;

  return (
    <>
      <motion.div
        className="romantic-animation"
        role="group"
        aria-label="Animación romántica de dos besos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.38 }}
      >
        <div ref={characterRef} className={`romantic-character romantic-character--${phase}`}>
          <div className={`romantic-character-art romantic-phase-${phase} romantic-facing-${facing}`}>
            <RiveCharacterAdapter
              config={riveConfig}
              phase={phase}
              facing={facing}
              fallback={<RomanticCharacterFallback phase={phase} facing={facing} />}
            />
            <span
              ref={mouthRef}
              className="romantic-mouth-anchor"
              style={{
                left: `${(riveConfig?.mouthAnchor?.x ?? 0.51) * 100}%`,
                top: `${(riveConfig?.mouthAnchor?.y ?? 0.31) * 100}%`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        <span ref={photoParticleRef} className="romantic-kiss-particle romantic-kiss-particle--photo" aria-hidden="true">
          <span ref={photoGlyphRef} className="romantic-kiss-glyph romantic-kiss-glyph--photo">💋</span>
        </span>
      </motion.div>

      {typeof document !== 'undefined' && createPortal(
        <div className="romantic-finale-layer">
          <span ref={viewerParticleRef} className="romantic-kiss-particle romantic-kiss-particle--viewer" aria-hidden="true">
            <span ref={viewerGlyphRef} className="romantic-kiss-glyph romantic-kiss-glyph--viewer">💋</span>
          </span>
          <span ref={finaleMessageRef} className="romantic-finale-message" role="status" aria-live="polite">Te amo</span>
          {FINALE_HEARTS.map((heart) => (
            <span
              key={heart}
              ref={(node) => { finaleHeartsRef.current[heart] = node; }}
              className="romantic-finale-heart"
              aria-hidden="true"
            >♥</span>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}

