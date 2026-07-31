import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="surface-deep mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Clear Waters Bookkeeping</p>
          <p className="mt-3 max-w-xs text-sm opacity-80">
            Navigating your finances so you can sail your business forward.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold uppercase tracking-widest opacity-70">Explore</p>
          <ul className="space-y-2 opacity-90">
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold uppercase tracking-widest opacity-70">Get in touch</p>
          <p className="opacity-90">hello@clearwatersbookkeeping.com</p>
          <p className="mt-2 opacity-90">Remote support across the U.S.</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs opacity-70">
          © {new Date().getFullYear()} Clear Waters Bookkeeping. All rights reserved.
        </p>
      </div>
    </footer>
  );
}