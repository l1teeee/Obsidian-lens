'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const links = ['Platform', 'Analytics', 'Showcase', 'Pricing'];

export default function ObsidianNav() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useGSAP(
        () => {
            gsap.set(
                [
                    '[data-nav="inner"]',
                    '[data-nav="logo"]',
                    '[data-nav="link"]',
                    '[data-nav="actions"]',
                ],
                { willChange: 'transform, opacity, filter' }
            );

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            tl.fromTo(
                '[data-nav="inner"]',
                { opacity: 0, y: -10, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }
            )
                .fromTo(
                    '[data-nav="logo"]',
                    { opacity: 0, y: -8, filter: 'blur(8px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.35 },
                    '-=0.28'
                )
                .fromTo(
                    '[data-nav="link"]',
                    { opacity: 0, y: -8, filter: 'blur(6px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 0.28,
                        stagger: 0.05,
                    },
                    '-=0.18'
                )
                .fromTo(
                    '[data-nav="actions"]',
                    { opacity: 0, y: -6, filter: 'blur(6px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3 },
                    '-=0.16'
                );
        },
        { scope: navRef }
    );

    const handleScrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const target = document.getElementById(id);
        if (!target) return;

        gsap.to(window, {
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTo: {
                y: target,
                offsetY: 96,
            },
        });
    };

    return (
        <nav ref={navRef} className="fixed left-0 top-0 z-50 w-full">
            <div
                data-nav="inner"
                style={{ opacity: 0 }}
                className={`relative transition-all duration-500 ${
                    scrolled
                        ? 'border-b border-[#494847]/20 bg-[#0e0e0e]/72 shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl'
                        : 'border-b border-transparent bg-[#0e0e0e]/92 backdrop-blur-xl'
                }`}
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01),transparent_38%,transparent)]" />
                </div>

                <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
                    <a
                        href="#"
                        data-nav="logo"
                        style={{ opacity: 0 }}
                        className="group relative flex items-center gap-3"
                    >
                        <div className="flex flex-col leading-none">
              <span className="font-headline text-[1.02rem] font-bold tracking-tight text-[#f3efef]">
                Obsidian Lens
              </span>
                            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-[#8d8888]">
                Editorial OS
              </span>
                        </div>
                    </a>

                    <div className="hidden items-center gap-8 md:flex">
                        {links.map((link) => (
                            <a
                                key={link}
                                data-nav="link"
                                href={`#${link}`}
                                onClick={handleScrollTo(link)}
                                style={{ opacity: 0 }}
                                className="group relative text-sm font-medium text-[#adaaaa] transition-colors duration-300 hover:text-[#f3e6ff]"
                            >
                                <span>{link}</span>
                                <span className="absolute left-0 top-full mt-1 h-px w-0 bg-[#d394ff] transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    <div
                        data-nav="actions"
                        style={{ opacity: 0 }}
                        className="flex items-center gap-3 md:gap-5"
                    >
                        <a href="/login" className="hidden text-sm font-medium text-[#adaaaa] transition-colors duration-300 hover:text-[#f3e6ff] md:block">
                            Login
                        </a>

                        <a href="/register" className="rounded-xl bg-[#d394ff] px-5 py-2.5 text-sm font-bold text-[#4a0076] shadow-[0_0_24px_rgba(211,148,255,0.18)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_34px_rgba(211,148,255,0.32)] active:scale-[0.98]">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}