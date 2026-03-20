'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ─── Shared Motion Variants ─── */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const VIEWPORT = { once: true, amount: 0.2 };

export const pageMotion = {
  fadeUp: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  } satisfies Variants,
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  } satisfies Variants,
  slideFromLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  } satisfies Variants,
  slideFromRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  } satisfies Variants,
  revealUp: {
    hidden: { opacity: 0, y: 60, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
  } satisfies Variants,
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
  } satisfies Variants,
  rotateIn: {
    hidden: { opacity: 0, rotateY: -8, scale: 0.96 },
    visible: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
  } satisfies Variants,
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  } satisfies Variants,
  staggerSlow: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  } satisfies Variants,
  staggerFast: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  } satisfies Variants,
  viewport: VIEWPORT,
};

/* ─── Utilities ─── */

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ');
}

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/* ─── Count-Up Hook ─── */

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* ─── Interfaces ─── */

interface SectionProps {
  children: ReactNode;
  className?: string;
}

interface AnimatedSectionProps extends SectionProps {
  animate?: boolean;
}

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

interface IntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'start' | 'between';
}

interface StatItem {
  label: string;
  value: string;
}

interface StatStripProps {
  items: StatItem[];
  className?: string;
}

interface PageCTAProps {
  eyebrow: string;
  title: string;
  buttonText: string;
  href: string;
}

/* ─── PageShell ─── */

export function PageShell({ children, className }: SectionProps) {
  return <div className={cx('page-shell', className)}>{children}</div>;
}

/* ─── PageSection (optionally animated) ─── */

export function PageSection({ children, className, animate = false }: AnimatedSectionProps) {
  if (!animate) {
    return <section className={cx('page-section page-container', className)}>{children}</section>;
  }

  return (
    <motion.section
      className={cx('page-section page-container', className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={pageMotion.fadeUp}
    >
      {children}
    </motion.section>
  );
}

/* ─── PageHero — cinematic word-by-word entrance ─── */

const heroWordVariants: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: -15, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroDescVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.6 } },
};

const heroAsideVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.8 } },
};

export function PageHero({ eyebrow, title, description, aside }: HeroProps) {
  const words = splitWords(title);

  return (
    <motion.section
      className="page-container grid gap-12 lg:grid-cols-[1.04fr_0.96fr]"
      initial="hidden"
      animate="visible"
      variants={heroStagger}
    >
      <div>
        <motion.p className="page-eyebrow" variants={pageMotion.slideFromLeft}>
          {eyebrow}
        </motion.p>
        <h1 className="page-title" style={{ perspective: '600px' }}>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={heroWordVariants}
              className="mr-[0.3em] inline-block"
              style={{ transformOrigin: 'center bottom' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>
      <div className="space-y-6 self-end">
        <motion.p className="page-copy" variants={heroDescVariants}>
          {description}
        </motion.p>
        {aside ? (
          <motion.div variants={heroAsideVariants}>{aside}</motion.div>
        ) : null}
      </div>
    </motion.section>
  );
}

/* ─── SectionIntro — scroll-triggered with animated underline ─── */

const introStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const introEyebrowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const introTitleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const introDescVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
};

export function SectionIntro({ eyebrow, title, description, align = 'between' }: IntroProps) {
  return (
    <motion.div
      className={cx(
        'mb-10 flex flex-col gap-5 md:gap-6',
        align === 'between' ? 'lg:flex-row lg:items-end lg:justify-between' : 'max-w-3xl'
      )}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={introStagger}
    >
      <div className={align === 'between' ? 'max-w-3xl' : undefined}>
        {eyebrow ? (
          <motion.p className="page-eyebrow relative inline-block" variants={introEyebrowVariants}>
            {eyebrow}
            <motion.span
              className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[#cfff28]"
              variants={underlineVariants}
            />
          </motion.p>
        ) : null}
        <motion.h2 className="page-section-title" variants={introTitleVariants}>
          {title}
        </motion.h2>
      </div>
      {description ? (
        <motion.p className="page-muted-copy max-w-2xl" variants={introDescVariants}>
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

/* ─── StatCard (internal) — count-up for numeric values ─── */

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const numericMatch = item.value.match(/^(\d+)(.*)$/);
  const isNumeric = !!numericMatch;
  const target = isNumeric ? parseInt(numericMatch![1], 10) : 0;
  const suffix = isNumeric ? numericMatch![2] : '';
  const { value, ref } = useCountUp(target);

  return (
    <motion.article
      className="page-panel"
      variants={pageMotion.scaleIn}
      custom={index}
    >
      <p className="page-kicker">{item.label}</p>
      <p
        ref={ref as React.Ref<HTMLParagraphElement>}
        className="mt-5 font-display text-3xl uppercase leading-none text-white md:text-4xl"
      >
        {isNumeric ? `${value}${suffix}` : item.value}
      </p>
    </motion.article>
  );
}

/* ─── StatStrip — staggered cards + count-up ─── */

export function StatStrip({ items, className }: StatStripProps) {
  return (
    <motion.div
      className={cx('grid gap-3 md:grid-cols-2 xl:grid-cols-4', className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={pageMotion.staggerContainer}
    >
      {items.map((item, i) => (
        <StatCard key={`${item.label}-${item.value}`} item={item} index={i} />
      ))}
    </motion.div>
  );
}

/* ─── PageCTA — shared call-to-action panel ─── */

export function PageCTA({ eyebrow, title, buttonText, href }: PageCTAProps) {
  return (
    <motion.div
      className="page-panel flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={pageMotion.fadeUp}
    >
      <div>
        <p className="page-eyebrow">{eyebrow}</p>
        <h3 className="page-section-title">{title}</h3>
      </div>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-[#cfff28] px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#cfff28] transition-all duration-300 hover:bg-[#cfff28] hover:text-black hover:shadow-[0_0_24px_rgba(207,255,40,0.3)]"
      >
        {buttonText}
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:rotate-45"
        />
      </Link>
    </motion.div>
  );
}

/* ─── GiantBgText — massive ghost typography like homepage Intro ─── */

interface GiantBgTextProps {
  text: string;
  className?: string;
}

export function GiantBgText({ text, className }: GiantBgTextProps) {
  return (
    <motion.h2
      className={cx(
        'pointer-events-none select-none whitespace-nowrap text-[20vw] font-black uppercase tracking-tighter text-white/[0.03]',
        className
      )}
      style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.06)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {text}
    </motion.h2>
  );
}

/* ─── EditorialQuote — Cormorant Garamond italic pull quote ─── */

interface EditorialQuoteProps {
  text: string;
  kicker?: string;
  className?: string;
}

export function EditorialQuote({ text, kicker, className }: EditorialQuoteProps) {
  return (
    <motion.article
      className={cx('page-panel relative', className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={pageMotion.fadeUp}
    >
      <span className="pointer-events-none absolute -left-2 -top-8 select-none font-editorial text-[8rem] leading-none text-neon-lime/20">
        &ldquo;
      </span>
      {kicker ? <p className="page-kicker">{kicker}</p> : null}
      <p className="mt-5 font-editorial text-[clamp(1.5rem,3.5vw,3rem)] italic leading-[1.2] text-white/85">
        {text}
      </p>
    </motion.article>
  );
}
