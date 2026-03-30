'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// ─── Floating frosted ellipse (framer-motion) ─────────────────────────────────
function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = 'from-[#d394ff]/[0.12]',
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
            animate={{ opacity: 1, y: 0, rotate }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn('absolute pointer-events-none', className)}
        >
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width, height }}
                className="relative"
            >
                <div
                    className={cn(
                        'absolute inset-0 rounded-full',
                        'bg-gradient-to-r to-transparent',
                        gradient,
                        'backdrop-blur-[2px] border border-[#d394ff]/[0.12]',
                        'shadow-[0_8px_32px_0_rgba(211,148,255,0.08)]',
                        'after:absolute after:inset-0 after:rounded-full',
                        'after:bg-[radial-gradient(circle_at_50%_50%,rgba(211,148,255,0.1),transparent_70%)]'
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

// ─── Fade-up animation variant ────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.58, delay: 0.3 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

// ─── Mock-up swap state labels ────────────────────────────────────────────────
const DAYS_A = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const BARS_A = [40, 65, 50, 90, 70, 85];

export default function ObsidianHero() {
    return (
        <section className="relative mx-auto flex min-h-screen max-w-[1440px] items-center overflow-hidden px-6 pb-24 pt-36 md:px-12">

            {/* ── Floating shapes ────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
                <ElegantShape
                    delay={0.3}
                    width={560}
                    height={130}
                    rotate={12}
                    gradient="from-[#d394ff]/[0.12]"
                    className="left-[-8%] top-[15%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={460}
                    height={110}
                    rotate={-15}
                    gradient="from-[#aa30fa]/[0.10]"
                    className="right-[-4%] bottom-[20%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={260}
                    height={70}
                    rotate={-8}
                    gradient="from-[#c97cff]/[0.09]"
                    className="left-[5%] bottom-[10%]"
                />
                <ElegantShape
                    delay={0.65}
                    width={190}
                    height={52}
                    rotate={22}
                    gradient="from-[#d394ff]/[0.10]"
                    className="right-[20%] top-[10%]"
                />
                <ElegantShape
                    delay={0.75}
                    width={130}
                    height={36}
                    rotate={-25}
                    gradient="from-[#aa30fa]/[0.08]"
                    className="left-[28%] top-[6%]"
                />
                <ElegantShape
                    delay={0.9}
                    width={320}
                    height={78}
                    rotate={6}
                    gradient="from-[#c97cff]/[0.07]"
                    className="right-[5%] top-[40%]"
                />
            </div>

            {/* ── Content grid ───────────────────────────────────── */}
            <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_1fr]">

                {/* Left — text */}
                <div className="relative z-10 max-w-[680px]">

                    {/* Eyebrow */}
                    <motion.div
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9b3ff] backdrop-blur-xl">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d394ff]" />
                            Editorial Intelligence
                        </span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="font-headline text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
                        <motion.span
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="block"
                        >
                            Your social universe.
                        </motion.span>
                        <motion.span
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="block bg-gradient-to-b from-white via-[#f0dcff] to-[#c97cff] bg-clip-text text-transparent"
                        >
                            One quiet system.
                        </motion.span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-7 max-w-[620px] text-[17px] leading-8 text-[#b1adad]"
                    >
                        A refined command layer for creative brands to plan, track, and
                        synchronize Instagram, LinkedIn, and Facebook with clarity.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        custom={4}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <button className="rounded-2xl bg-[#d394ff] px-8 py-4 text-sm font-bold text-[#4a0076] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(211,148,255,0.28)] active:scale-[0.98]">
                            Start Free
                        </button>
                        <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/8">
                            Watch Overview
                        </button>
                    </motion.div>

                    {/* Meta */}
                    <motion.div
                        custom={5}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#7f7b7b]"
                    >
                        <span>No credit card required</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[#575252] sm:inline-block" />
                        <span>Fast onboarding</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[#575252] sm:inline-block" />
                        <span>Built for brand teams</span>
                    </motion.div>
                </div>

                {/* Right — mockup */}
                <motion.div
                    custom={3}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="relative group hidden lg:block"
                >
                    <div className="relative">
                        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#d394ff]/20 to-[#aa30fa]/10 blur-2xl opacity-30 transition-opacity duration-1000 group-hover:opacity-60" />

                        <div className="relative overflow-hidden rounded-2xl border border-[#494847]/20 bg-[#1a1919]/70 p-6 backdrop-blur-xl">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="h-3 w-3 rounded-full bg-[#d73357]/50" />
                                    <div className="h-3 w-3 rounded-full bg-[#f47788]/50" />
                                    <div className="h-3 w-3 rounded-full bg-[#d394ff]/50" />
                                </div>
                                <div className="h-5 w-28 rounded-full bg-[#262626]" />
                            </div>

                            <div className="relative h-[320px]">
                                {/* Panel A */}
                                <div className="absolute inset-0">
                                    <div className="grid h-64 grid-cols-2 gap-4">
                                        <div className="space-y-3 rounded-xl bg-[#131313] p-4">
                                            <div className="h-3 w-2/3 rounded-full bg-[#d394ff]/20" />
                                            <div className="h-20 w-full rounded-lg bg-gradient-to-br from-[#d394ff]/10 to-transparent" />
                                            <div className="space-y-1.5">
                                                <div className="h-2 w-full rounded-full bg-[#262626]" />
                                                <div className="h-2 w-5/6 rounded-full bg-[#262626]" />
                                                <div className="h-2 w-4/6 rounded-full bg-[#262626]" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-1 flex-col justify-end rounded-xl bg-[#131313] p-4">
                                                <div className="font-headline text-3xl font-extrabold leading-none text-[#d394ff]">
                                                    84%
                                                </div>
                                                <div className="mt-1 text-[0.6rem] uppercase tracking-widest text-[#adaaaa]/60">
                                                    Growth Velocity
                                                </div>
                                            </div>

                                            <div className="flex flex-1 items-end gap-1.5 rounded-xl border border-[#d394ff]/10 bg-[#262626]/50 p-4">
                                                {BARS_A.map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 rounded-t bg-gradient-to-t from-[#d394ff] to-[#aa30fa]/40"
                                                        style={{ height: `${h}%` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between px-1">
                                        {DAYS_A.map((d) => (
                                            <span key={d} className="text-[0.6rem] uppercase tracking-widest text-[#adaaaa]/30">
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(255,255,255,0.03))]" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
