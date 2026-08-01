import { Link } from "@tanstack/react-router";
import { BrandWordmark } from "@/components/brand-wordmark";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/book", label: "Book" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center">
          <span className="sr-only">Clear Waters Bookkeeping</span>
          <BrandWordmark size="md" />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hidden text-muted-foreground transition-colors hover:text-primary sm:inline"
              activeProps={{ className: "hidden sm:inline text-foreground font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  );
}