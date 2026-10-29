import { motion, useReducedMotion } from 'motion/react';

const hearts = [
  { left: '4%', size: 'clamp(26px, 3.6vw, 39px)', color: '#e96d8b', duration: 15, delay: 0.1, glyph: '♥' },
  { left: '13%', size: 'clamp(20px, 2.7vw, 30px)', color: '#f3a48f', duration: 13, delay: 2.2, glyph: '♡' },
  { left: '24%', size: 'clamp(27px, 3.8vw, 41px)', color: '#d85883', duration: 16, delay: 1.1, glyph: '♥' },
  { left: '37%', size: 'clamp(22px, 3vw, 33px)', color: '#e4a2b8', duration: 14, delay: 3.4, glyph: '♡' },
  { left: '51%', size: 'clamp(26px, 3.6vw, 39px)', color: '#f08492', duration: 17, delay: 0.8, glyph: '♥' },
  { left: '64%', size: 'clamp(21px, 2.8vw, 31px)', color: '#efae7d', duration: 13.5, delay: 2.8, glyph: '♡' },
  { left: '76%', size: 'clamp(28px, 3.9vw, 42px)', color: '#dc6088', duration: 16, delay: 1.8, glyph: '♥' },
  { left: '87%', size: 'clamp(22px, 3vw, 33px)', color: '#f09a9c', duration: 14.5, delay: 3.1, glyph: '♡' },
  { left: '96%', size: 'clamp(26px, 3.6vw, 38px)', color: '#e6a56f', duration: 15.5, delay: 1.4, glyph: '♥' },
  { left: '7%', size: 'clamp(20px, 2.6vw, 29px)', color: '#f28aa5', duration: 12.5, delay: 4.2, glyph: '♥' },
  { left: '92%', size: 'clamp(23px, 3vw, 34px)', color: '#db769e', duration: 13.8, delay: 2.6, glyph: '♡' },
];

export default function FloatingHearts() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="floating-heart-layer" aria-hidden="true">
      {hearts.map((heart, index) => (
        <motion.span
          className="floating-heart"
          key={`${heart.left}-${index}`}
          initial={{ y: '8vh', x: 0, opacity: 0, scale: 0.72, rotate: -12 }}
          animate={{
            y: ['8vh', '-108vh'],
            x: [0, 14, -8, 0],
            opacity: [0, 0.72, 0.58, 0],
            scale: [0.72, 1, 1.12],
            rotate: [-12, 9, -10],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: heart.left, color: heart.color, fontSize: heart.size }}
        >
          {heart.glyph}
        </motion.span>
      ))}
    </div>
  );
}
