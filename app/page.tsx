import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden text-slate-200 font-sans">
      
      {/* Miale ya mwanga (Glow Effects) kwa nyuma */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] opacity-50"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10 border-b border-slate-800/50">
        <div className="text-2xl font-extrabold tracking-tighter text-white">
          FEBROS<span className="text-blue-500">16</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <Link href="#" className="hover:text-white transition-colors">Gundua</Link>
          <Link href="#" className="hover:text-white transition-colors">Tafiti</Link>
          <Link href="#" className="hover:text-white transition-colors">Fursa</Link>
          <Link href="#" className="hover:text-white transition-colors">Maudhui</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
            Ingia
          </Link>
          <Link href="/register" className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            Jiunge
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Toleo la Kwanza Liko Njiani</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-8 max-w-5xl">
          Gundua, Jifunze na Fanya <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Tafiti za Kina
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed">
          FEBROS16 ni jukwaa la kisasa linalounganisha watu na maarifa, taarifa, elimu, rasilimali, na fursa. Kusanya vyanzo vyako, chambua, na uelewe ulimwengu wako.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all transform hover:scale-105">
            Anza Kufanya Utafiti
          </button>
          <button className="px-8 py-4 bg-slate-900 border border-slate-800 text-white font-medium rounded-full hover:bg-slate-800 hover:border-slate-700 transition-all">
            Gundua Rasilimali
          </button>
        </div>
      </section>

    </main>
  );
}
