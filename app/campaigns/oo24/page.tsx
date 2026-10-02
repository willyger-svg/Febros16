import Link from 'next/link';

export default function OO24Campaign() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden text-slate-200 font-sans">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-8 sm:p-12 relative z-10 backdrop-blur-sm text-center">
        <div className="mb-6">
          <Link href="/" className="text-xl font-extrabold tracking-tighter text-slate-400 hover:text-white transition-colors mb-2 inline-block">
            FEBROS<span className="text-blue-500">16</span>
          </Link>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          OO24 <span className="text-blue-500">—</span> Out Of X
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed mb-8">
          Huu ni msingi wa kampeni yetu kubwa itakayofuata (Campaigns Engine Phase). 
          Jukwaa hili linaandaliwa ili kuruhusu uendeshaji wa miradi, harambee, na usambazaji wa rasilimali.
        </p>
        
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-blue-400 font-semibold mb-2">Malengo ya Kampeni:</h3>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Kufikia vijana 'Out of School' au 'Out of Employment'.</li>
            <li>Kutoa rasilimali za kielimu na kiteknolojia.</li>
            <li>Kuunganisha wafadhili na watafiti.</li>
          </ul>
        </div>
        
        <Link 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
        >
          Rudi Nyumbani
        </Link>
      </div>
    </main>
  );
}
