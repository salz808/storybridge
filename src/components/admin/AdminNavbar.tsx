'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNavbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Launchpad', href: '/admin' },
    { name: 'Visitors', href: '/admin/visitors' },
    { name: 'Impact', href: '/admin/impact' },
    { name: 'Prayer', href: '/admin/prayer' },
    { name: 'Campaigns', href: '/admin/campaigns' },
    { name: 'Sermons', href: '/admin/sermons' },
    { name: 'Partners', href: '/admin/partners' },
    { name: 'ROI', href: '/admin/analytics/roi' },
    { name: 'Analytics', href: '/admin/analytics' },
    { name: 'StoryBox', href: '/admin/stories' },
    { name: 'Integrations', href: '/admin/integrations' },
    { name: 'Profile', href: '/admin/profile' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-brand-midnight/5 p-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
           <Link href="/admin" className="w-10 h-10 bg-brand-midnight rounded-xl flex items-center justify-center text-brand-gold font-serif font-bold text-xl transition-transform hover:scale-105 active:scale-95">S</Link>
           <span className="font-serif font-bold text-brand-midnight text-2xl tracking-tight hidden sm:inline-block">
             StoryBridge <span className="text-brand-gold text-xs font-sans uppercase tracking-[0.3em] ml-2">Studio</span>
           </span>
        </div>
        <div className="flex gap-4 md:gap-10 text-[10px] md:text-xs font-bold text-brand-slate uppercase tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`transition-all pb-1 border-b-2 ${
                  isActive 
                    ? 'text-brand-gold border-brand-gold' 
                    : 'border-transparent hover:text-brand-midnight hover:border-brand-midnight/20'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-4">
           <div className="w-8 h-8 rounded-full bg-brand-parchment border border-brand-gold/20 flex items-center justify-center text-[10px] text-brand-gold font-bold">GC</div>
        </div>
      </div>
    </nav>
  );
}
