"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { logout } from "@/lib/api";

const features = [
  { title: "Discover", description: "Explore useful ideas, information and knowledge from different fields.", icon: "✦", href: "/articles" },
  { title: "Learn", description: "Access educational materials, guides and explanations designed to help you grow.", icon: "◈", href: "#" },
  { title: "Research", description: "Explore research topics, organize sources and build your own research projects.", icon: "⌕", href: "/research" },
  { title: "Resources", description: "Find useful documents, tools, references and materials in one place.", icon: "▣", href: "#" },
  { title: "Opportunities", description: "Discover opportunities, programs and useful possibilities for your future.", icon: "↗", href: "#" },
  { title: "Campaigns", description: "Learn about important causes, awareness campaigns and educational initiatives.", icon: "◎", href: "/campaigns/oo24" },
];

const categories = [
  { title: "Education", description: "Learning, study and educational knowledge.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85" },
  { title: "Technology", description: "Technology, computing and digital innovation.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85" },
  { title: "Research", description: "Ideas, discoveries and research-based information.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85" },
  { title: "Environment", description: "Nature, climate and our changing world.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85" },
  { title: "Society", description: "People, communities and social development.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85" },
  { title: "Personal Development", description: "Mindset, discipline, skills and personal growth.", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85" },
];

function ArrowIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>; }
function SearchIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>; }
function MenuIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) setIsLoggedIn(true);
    }
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!search.trim()) return;
    window.location.href = `/articles?q=${search.trim()}`;
  }

  function handleLogout() {
    logout();
  }

  return (
    <main className="min-h-screen bg-white text-slate-950 font-sans">
      {/* HERO SECTION */}
      <section className="relative min-h-[760px] overflow-hidden bg-[#071526]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=90')" }} />
        <div className="absolute inset-0 bg-[#061426]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_32%),linear-gradient(180deg,rgba(3,15,29,0.25),#061426_92%)]" />
        <div className="absolute -right-40 top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* NAVBAR */}
        <header className="relative z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
            <Link className="group flex items-center gap-3" href="/">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
                <span className="text-lg font-black">F</span>
              </div>
              <span className="text-xl font-black tracking-[0.16em] text-white">
                FEBROS<span className="text-cyan-300">16</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-7 lg:flex">
              <Link className="text-sm font-medium text-white transition hover:text-cyan-300" href="/">Home</Link>
              <Link className="text-sm font-medium text-slate-300 transition hover:text-cyan-300" href="/articles">Knowledge (Makala)</Link>
              <Link className="text-sm font-medium text-slate-300 transition hover:text-cyan-300" href="/research">Research (Tafiti)</Link>
              <Link className="text-sm font-medium text-slate-300 transition hover:text-cyan-300" href="/campaigns/oo24">Campaigns</Link>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link aria-label="Search" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-300" href="/articles">
                <SearchIcon/>
              </Link>

              {/* DYNAMIC AUTH BUTTONS */}
              {isLoggedIn ? (
                <>
                  <Link className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200" href="/dashboard">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                    Ondoka
                  </button>
                </>
              ) : (
                <>
                  <Link className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" href="/login">Sign in</Link>
                  <Link className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200" href="/register">Create account</Link>
                </>
              )}
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"><MenuIcon/></button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
             <div className="mx-5 mb-5 rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl lg:hidden">
                 <div className="flex flex-col gap-1">
                   <Link className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-cyan-300" href="/">Home</Link>
                   <Link className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-cyan-300" href="/articles">Knowledge</Link>
                   <Link className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-cyan-300" href="/research">Research</Link>
                   <Link className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-cyan-300" href="/campaigns/oo24">Campaigns</Link>
                 </div>
                 <div className="mt-2 border-t border-white/10 pt-3 flex flex-col gap-2">
                    {isLoggedIn ? (
                        <>
                           <Link className="block rounded-xl bg-cyan-300 px-4 py-3 text-center text-sm font-bold text-slate-950" href="/dashboard">Dashboard</Link>
                           <button onClick={handleLogout} className="w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-red-400 bg-red-950/30">Ondoka</button>
                        </>
                    ) : (
                        <>
                           <Link className="block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white bg-slate-800" href="/login">Sign in</Link>
                           <Link className="block rounded-xl bg-cyan-300 px-4 py-3 text-center text-sm font-bold text-slate-950" href="/register">Create account</Link>
                        </>
                    )}
                 </div>
             </div>
          )}
        </header>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex max-w-7xl px-5 pb-20 pt-24 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-200 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300" />
              DISCOVER · LEARN · RESEARCH
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[82px]">
              Knowledge that
              <span className="block text-cyan-300">takes you further.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover knowledge, research, educational resources, opportunities and useful information — all in one growing platform.
            </p>
            <form onSubmit={handleSearch} className="mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center rounded-2xl border border-white/15 bg-white/10 px-4 shadow-2xl backdrop-blur-xl transition focus-within:border-cyan-300/60 focus-within:bg-white/15">
                <SearchIcon/>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search topics, research, resources..." className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-400 sm:text-base" />
              </div>
              <button type="submit" className="rounded-2xl bg-cyan-300 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200">
                Search
              </button>
            </form>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-7">
              <div><p className="text-2xl font-black text-white">100+</p><p className="mt-1 text-xs text-slate-400">Articles</p></div>
              <div><p className="text-2xl font-black text-white">50+</p><p className="mt-1 text-xs text-slate-400">Resources</p></div>
              <div><p className="text-2xl font-black text-white">20+</p><p className="mt-1 text-xs text-slate-400">Opportunities</p></div>
              <div><p className="text-2xl font-black text-white">10+</p><p className="mt-1 text-xs text-slate-400">Campaigns</p></div>
            </div>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div id="discover" className="relative z-20 mx-auto -mb-28 max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href} className="group rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-900/85">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10 text-xl text-cyan-300">{feature.icon}</div>
                  <div className="text-slate-500 transition group-hover:text-cyan-300"><ArrowIcon/></div>
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section id="categories" className="bg-white px-5 pb-24 pt-48 lg:px-8 lg:pb-32 lg:pt-52">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">Explore</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">Explore by category</h2>
              <p className="mt-4 text-base leading-7 text-slate-500">Start with an area that interests you and discover useful information, ideas and resources.</p>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition hover:text-cyan-600" href="/articles">View all categories <ArrowIcon/></Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link className="group relative h-72 overflow-hidden rounded-3xl bg-slate-900" href="/articles" key={category.title}>
                <img src={category.image} alt={category.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">{category.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold text-cyan-300">Explore <ArrowIcon/></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="learn" className="bg-slate-50 px-5 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-cyan-300 px-7 py-14 text-center sm:px-12">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-800/60">The journey starts here</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Learn something. Research something. Discover something.</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-slate-800" href="/register">Start exploring</Link>
            <Link className="rounded-xl border border-slate-950/15 bg-white/30 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-white/50" href="/research">Explore research</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
             <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-cyan-300"><span className="text-lg font-black">F</span></div>
              <span className="text-xl font-black tracking-[0.14em] text-slate-950">FEBROS<span className="text-cyan-600">16</span></span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">A growing platform for knowledge, research, education, information, resources and discovery.</p>
          </div>
          <div><h3 className="text-sm font-bold text-slate-950">Platform</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <Link className="hover:text-cyan-600" href="/articles">Articles</Link>
              <Link className="hover:text-cyan-600" href="/research">Research</Link>
              <Link className="hover:text-cyan-600" href="/campaigns/oo24">Campaigns</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
