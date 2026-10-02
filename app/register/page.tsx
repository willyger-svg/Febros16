import Link from 'next/link';

export default function Register() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden text-slate-200 font-sans">
      
      {/* Miale ya mwanga (Glow Effects) kwa nyuma */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white inline-block mb-2">
            FEBROS<span className="text-blue-500">16</span>
          </Link>
          <h1 className="text-xl font-semibold text-slate-300">Tengeneza Akaunti Mpya</h1>
          <p className="text-sm text-slate-500 mt-2">Jiunge ili kuanza kufanya utafiti wa kina</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Jina Kamili</label>
            <input 
              type="text" 
              placeholder="Weka jina lako"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Barua Pepe (Email)</label>
            <input 
              type="email" 
              placeholder="mfano@email.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Nenosiri (Password)</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-600"
            />
          </div>

          <button 
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] mt-4"
          >
            Kamilisha Usajili
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Tayari una akaunti?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Ingia hapa
          </Link>
        </div>
      </div>
    </main>
  );
}
