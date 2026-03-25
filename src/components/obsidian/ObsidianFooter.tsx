const footerLinks = {
  Platform: ['Automation', 'Analytics', 'Integrations'],
  Company: ['Journal', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security'],
};

export default function ObsidianFooter() {
  return (
    <footer className="border-t border-[#494847]/15 bg-[#0e0e0e]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-14">
          {/* Brand */}
          <div className="max-w-xs space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d394ff] to-[#aa30fa] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="3" fill="#4a0076" />
                  <circle cx="7" cy="7" r="6" stroke="#4a0076" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#e5e2e1] font-headline">Obsidian Lens</span>
            </div>
            <p className="text-sm text-[#adaaaa]/60 leading-relaxed">
              Defining the standard for creative CRM software. Building the bridge between data and artistry.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="space-y-5">
                <h6 className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#adaaaa]/50 uppercase">
                  {section}
                </h6>
                <ul className="space-y-3.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#adaaaa]/50 hover:text-[#d394ff] transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#494847]/10 max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#e5e2e1]/25">
          © 2024 Obsidian Lens. All rights reserved.
        </span>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'API Status'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#e5e2e1]/25 hover:text-[#d394ff] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
