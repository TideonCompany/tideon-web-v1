'use client'

import { GithubLogo, LinkedinLogo, XLogo } from '@phosphor-icons/react'

const footerLinks = {
  Services: ['FDM Printing', 'SLA Resin', 'SLS Nylon', 'Post-Processing', 'Quality Assurance'],
  Materials: ['Engineering Thermoplastics', 'Photopolymer Resins', 'SLS Powders', 'Flexible Materials', 'Metal Composites'],
  Company: ['About Tideon', 'Case Studies', 'Engineering Blog', 'Careers', 'Press & Media'],
  Support: ['Get a Quote', 'Design Guidelines', 'File Preparation', 'Tolerance Specs', 'Shipping & Delivery'],
}

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0A0A0B] border-t border-black/[0.08] dark:border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-16 pb-10">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-6 h-6 bg-[#00F5D1] rounded-[5px]" />
              <span className="text-gray-900 dark:text-white font-semibold tracking-tight text-[17px]">Tideon</span>
            </div>
            <p className="text-zinc-600 text-[13px] leading-relaxed max-w-[28ch] mb-6">
              Industrial 3D manufacturing for engineers who can&apos;t afford to compromise on quality.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: LinkedinLogo, href: '#' },
                { icon: XLogo, href: '#' },
                { icon: GithubLogo, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.07] flex items-center justify-center text-zinc-600 hover:text-gray-800 dark:hover:text-zinc-300 hover:border-black/[0.15] dark:hover:border-white/[0.13] transition-all duration-200"
                >
                  <Icon size={15} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(footerLinks).map(([group, items]) => (
              <div key={group}>
                <div className="text-zinc-500 text-[11px] font-semibold uppercase tracking-widest mb-4">
                  {group}
                </div>
                <ul className="flex flex-col gap-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-zinc-500 dark:text-zinc-700 hover:text-gray-800 dark:hover:text-zinc-300 text-[13px] transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certification badges */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['ISO 9001:2015', 'AS9100D', 'ISO 13485 Medical', 'ITAR Registered', 'RoHS Compliant'].map((cert) => (
            <div
              key={cert}
              className="text-[10px] font-semibold text-zinc-600 border border-black/[0.08] dark:border-white/[0.06] px-3 py-1 rounded-full tracking-wider uppercase"
            >
              {cert}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-black/[0.07] dark:border-white/[0.05]">
          <div className="text-zinc-500 dark:text-zinc-700 text-[12px]">
            © 2026 Tideon Manufacturing Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <a key={item} href="#" className="text-zinc-500 dark:text-zinc-700 hover:text-zinc-500 text-[12px] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
