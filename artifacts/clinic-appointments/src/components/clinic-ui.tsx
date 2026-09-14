import { type ReactNode } from 'react';
import { ArrowRight, CalendarDays, ChevronDown, Clock3, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" data-testid="link-home-logo">
      <span className="grid size-10 place-items-center rounded-[13px] bg-secondary text-foreground shadow-[4px_4px_0_hsl(var(--primary))]">
        <span className="font-display text-xl font-extrabold">+</span>
      </span>
      <span className="font-display text-lg font-extrabold tracking-[-.04em]">NimbleCare</span>
    </Link>
  );
}

export function Header() {
  const [location] = useLocation();
  const links = [
    { href: '/', label: 'Book a visit' },
    { href: '/my-appointments', label: 'My appointments' },
    { href: '/clinic', label: 'Clinic details' },
  ];
  return (
    <header className="relative z-10 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted ${location === link.href ? 'bg-muted text-primary' : 'text-muted-foreground'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/my-appointments" className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary md:flex" data-testid="link-check-booking">
          Check a booking <ArrowRight className="size-4" />
        </Link>
        <Link href="/my-appointments" className="grid size-10 place-items-center rounded-full bg-muted text-primary md:hidden" data-testid="link-mobile-booking">
          <CalendarDays className="size-4" />
        </Link>
      </div>
    </header>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-[100dvh] bg-background">{children}</div>;
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-2"><span className="grid size-6 place-items-center rounded-md bg-secondary text-xs font-bold text-foreground">+</span> NimbleCare</div>
        <p>Good care should fit into your day.</p>
      </div>
    </footer>
  );
}

export function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-primary"><span className="h-px w-7 bg-secondary" />{children}</p>;
}

export function ErrorNotice({ onRetry, message = 'We could not load this just now.' }: { onRetry?: () => void; message?: string }) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5" data-testid="status-error">
      <p className="font-semibold text-foreground">A small hiccup</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry && <button onClick={onRetry} className="mt-4 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background transition hover:opacity-85" data-testid="button-retry">Try again</button>}
    </div>
  );
}

export function EmptyState({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center" data-testid="status-empty">
      <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-muted text-primary"><Sparkles className="size-5" /></div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{detail}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function DetailPill({ icon, children }: { icon: 'clock' | 'pin' | 'phone'; children: ReactNode }) {
  const Icon = icon === 'clock' ? Clock3 : icon === 'pin' ? MapPin : Phone;
  return <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Icon className="size-4 text-primary" />{children}</span>;
}

export function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-muted-foreground">
      <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Your details stay private</span>
      <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-primary" /> Usually under a minute</span>
    </div>
  );
}

export function SelectChevron() {
  return <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />;
}