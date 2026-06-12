import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white">
          Movie Explorer
        </Link>
        <nav>
          <Link className="text-sm text-slate-300 transition hover:text-white" to="/">
            Browse
          </Link>
        </nav>
      </div>
    </header>

    <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
  </div>
);

export default Layout;
