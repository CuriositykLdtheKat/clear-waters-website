import { Link } from "@tanstack/react-router";
import logo from "@/assets/clear-waters-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center">
          <img
            src={logo.url}
            alt="Clear Waters Bookkeeping"
            className="h-14 w-auto sm:h-18"
            width={800}
            height={300}
          />
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
            to="/contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  );
}