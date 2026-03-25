'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ObsidianHero() {
    const rootRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!contentRef.current) return;

        let swapTween: gsap.core.Timeline | null = null;
        let swapTimeout: number | null = null;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.to(contentRef.current, {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                scale: 1,
                duration: 0.72,
                ease: 'power2.out',
            })
                .from(
                    '[data-h="eyebrow"]',
                    {
                        opacity: 0,
                        y: 10,
                        filter: 'blur(8px)',
                        duration: 0.42,
                        ease: 'power2.out',
                    },
                    '-=0.45'
                )
                .from(
                    '[data-h="title"]',
                    {
                        opacity: 0,
                        y: 18,
                        filter: 'blur(10px)',
                        duration: 0.58,
                        stagger: 0.08,
                        ease: 'power3.out',
                    },
                    '-=0.28'
                )
                .from(
                    '[data-h="sub"]',
                    {
                        opacity: 0,
                        y: 12,
                        filter: 'blur(8px)',
                        duration: 0.45,
                        ease: 'power2.out',
                    },
                    '-=0.3'
                )
                .from(
                    '[data-h="actions"]',
                    {
                        opacity: 0,
                        y: 10,
                        duration: 0.4,
                        ease: 'power2.out',
                    },
                    '-=0.25'
                )
                .from(
                    '[data-h="meta"]',
                    {
                        opacity: 0,
                        y: 8,
                        duration: 0.35,
                        ease: 'power2.out',
                    },
                    '-=0.2'
                )
                .from(
                    '[data-h="mockup"]',
                    {
                        opacity: 0,
                        y: 20,
                        scale: 0.985,
                        filter: 'blur(10px)',
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.48'
                );

            gsap.to('[data-h="orb-1"]', {
                x: 12,
                y: -8,
                duration: 4.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            gsap.to('[data-h="orb-2"]', {
                x: -10,
                y: 8,
                duration: 5.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            gsap.to('[data-h="mockup-shell"]', {
                y: -6,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            const stateA = rootRef.current?.querySelector('[data-state="a"]') as HTMLDivElement | null;
            const stateB = rootRef.current?.querySelector('[data-state="b"]') as HTMLDivElement | null;

            let active: 'a' | 'b' = 'a';

            if (stateA && stateB) {
                gsap.set(stateA, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    pointerEvents: 'auto',
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                });

                gsap.set(stateB, {
                    opacity: 0,
                    y: 8,
                    filter: 'blur(8px)',
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                });

                const runSwap = () => {
                    const fromEl = active === 'a' ? stateA : stateB;
                    const toEl = active === 'a' ? stateB : stateA;

                    swapTween = gsap.timeline({
                        onComplete: () => {
                            active = active === 'a' ? 'b' : 'a';
                            swapTimeout = window.setTimeout(runSwap, 1800);
                        },
                    });

                    swapTween
                        .set(toEl, {
                            opacity: 0,
                            y: 8,
                            filter: 'blur(8px)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        })
                        .set(fromEl, {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            pointerEvents: 'auto',
                            zIndex: 2,
                        })
                        .to(
                            fromEl,
                            {
                                opacity: 0,
                                y: -8,
                                filter: 'blur(8px)',
                                duration: 0.55,
                                ease: 'power2.inOut',
                                pointerEvents: 'none',
                            },
                            0
                        )
                        .to(
                            toEl,
                            {
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                                duration: 0.62,
                                ease: 'power2.out',
                                pointerEvents: 'auto',
                            },
                            0.12
                        );
                };

                swapTimeout = window.setTimeout(runSwap, 1600);
            }
        }, rootRef);

        return () => {
            if (swapTween) swapTween.kill();
            if (swapTimeout) window.clearTimeout(swapTimeout);
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative mx-auto flex min-h-screen max-w-[1440px] items-center overflow-hidden px-6 pb-24 pt-36 md:px-12"
        >
            <div className="pointer-events-none absolute inset-0 -z-20">
                <div
                    data-h="orb-1"
                    className="absolute left-1/2 top-[8%] h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(211,148,255,0.22) 0%, rgba(170,48,250,0.09) 45%, transparent 72%)',
                    }}
                />
                <div
                    data-h="orb-2"
                    className="absolute right-[8%] top-[18%] h-[280px] w-[280px] rounded-full opacity-20 blur-3xl"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(211,148,255,0.18) 0%, rgba(170,48,250,0.06) 50%, transparent 74%)',
                    }}
                />
            </div>

            <div
                ref={contentRef}
                className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_1fr]"
                style={{
                    opacity: 0,
                    filter: 'blur(12px)',
                    transform: 'translateY(16px) scale(0.988)',
                    willChange: 'opacity, filter, transform',
                }}
            >
                <div className="relative z-10 max-w-[680px]">
                    <div data-h="eyebrow" className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9b3ff] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d394ff]" />
              Editorial Intelligence
            </span>
                    </div>

                    <h1 className="font-headline text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            <span data-h="title" className="block">
              Your social universe.
            </span>
                        <span
                            data-h="title"
                            className="block bg-gradient-to-b from-white via-[#f0dcff] to-[#c97cff] bg-clip-text text-transparent"
                        >
              One quiet system.
            </span>
                    </h1>

                    <p
                        data-h="sub"
                        className="mt-7 max-w-[620px] text-[17px] leading-8 text-[#b1adad]"
                    >
                        A refined command layer for creative brands to plan, track, and
                        synchronize Instagram, LinkedIn, and Facebook with clarity.
                    </p>

                    <div
                        data-h="actions"
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <button className="rounded-2xl bg-[#d394ff] px-8 py-4 text-sm font-bold text-[#4a0076] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(211,148,255,0.28)] active:scale-[0.98]">
                            Start Free
                        </button>

                        <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/8">
                            Watch Overview
                        </button>
                    </div>

                    <div
                        data-h="meta"
                        className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#7f7b7b]"
                    >
                        <span>No credit card required</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[#575252] sm:inline-block" />
                        <span>Fast onboarding</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[#575252] sm:inline-block" />
                        <span>Built for brand teams</span>
                    </div>
                </div>

                <div data-h="mockup" className="relative group hidden lg:block">
                    <div data-h="mockup-shell" className="relative">
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
                                <div data-state="a" className="absolute inset-0">
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
                                                {[40, 65, 50, 90, 70, 85].map((h, i) => (
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
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                                            <span
                                                key={d}
                                                className="text-[0.6rem] uppercase tracking-widest text-[#adaaaa]/30"
                                            >
                        {d}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                <div data-state="b" className="absolute inset-0">
                                    <div className="grid h-64 grid-cols-[1.15fr_0.85fr] gap-4">
                                        <div className="rounded-xl bg-[#131313] p-4">
                                            <div className="mb-4 flex items-center justify-between">
                                                <div>
                                                    <div className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7f7b7b]">
                                                        Campaign Sync
                                                    </div>
                                                    <div className="mt-2 text-xl font-semibold text-white">
                                                        24 assets aligned
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border border-[#d394ff]/20 bg-[#d394ff]/10 px-3 py-1.5 text-[10px] font-medium text-[#d9b3ff]">
                                                    Live
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {[
                                                    'Instagram launch sequence',
                                                    'LinkedIn executive post',
                                                    'Facebook paid creative set',
                                                ].map((item) => (
                                                    <div
                                                        key={item}
                                                        className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                                                    >
                                                        <span className="text-sm text-[#d6d2d2]">{item}</span>
                                                        <span className="text-xs text-[#8f8a8a]">Synced</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="rounded-xl bg-white/[0.04] p-4 backdrop-blur-xl">
                                                <div className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7f7b7b]">
                                                    Engagement Lift
                                                </div>
                                                <div className="mt-3 text-4xl font-semibold leading-none text-white">
                                                    84%
                                                </div>
                                                <div className="mt-2 text-sm text-[#a9a4a4]">
                                                    In the last 30 days
                                                </div>
                                            </div>

                                            <div className="rounded-xl bg-[#111111]/85 p-4">
                                                <div className="mb-4 text-[0.62rem] uppercase tracking-[0.22em] text-[#7f7b7b]">
                                                    Velocity
                                                </div>

                                                <div className="flex h-28 items-end gap-2">
                                                    {[35, 52, 46, 68, 82, 74, 92].map((h, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex-1 rounded-t-[10px] bg-gradient-to-t from-[#d394ff] via-[#c06eff] to-white/40"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    ))}
                                                </div>

                                                <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.18em] text-[#6f6a6a]">
                                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                                                        <span key={d}>{d}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(255,255,255,0.03))]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}