import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AppBackground from '../../components/AppBackground';

export default function TermsPage() {
  return (
    <div className="min-h-screen relative font-sans selection:bg-blue-500/30">
      <AppBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Rudi Nyumbani
        </Link>
        
        <div className="backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">FEBROS16 — TERMS & CONDITIONS</h1>
            <p className="text-slate-400 text-sm">
              <span className="font-semibold text-slate-300">Tarehe ya kuanza kutumika:</span> 4/9/2026<br />
              <span className="font-semibold text-slate-300">Mara ya mwisho kusasishwa:</span> 3/9/2026
            </p>
          </div>

          <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Karibu FEBROS16.</p>
            <p>Masharti haya ya Matumizi (“Masharti”) yanaweka kanuni na masharti yanayotumika unapofikia au kutumia tovuti, programu, huduma, maudhui na vipengele vingine vinavyotolewa na FEBROS16 (“Huduma”).</p>
            <p>Kwa kuunda akaunti, kufikia au kutumia FEBROS16, unathibitisha kwamba umesoma, umeelewa na unakubali kufungwa na Masharti haya. Ikiwa hukubaliani na Masharti haya, tafadhali usitumie Huduma.</p>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">1. Kuhusu FEBROS16</h2>
              <p>FEBROS16 ni jukwaa linalolenga kutoa taarifa, elimu, zana za kujitathmini, maudhui ya kujifunza, ufuatiliaji wa maendeleo na rasilimali zinazohusiana na digital wellbeing, tabia za kidijitali na kujenga mabadiliko chanya ya maisha.</p>
              <p className="mt-2">Huduma zinaweza kubadilika na kupanuka kadiri FEBROS16 inavyoendelea kutengenezwa.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">2. Madhumuni ya Huduma</h2>
              <p>FEBROS16 imeundwa kwa madhumuni ya:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
                <li>kutoa elimu na taarifa;</li>
                <li>kusaidia watumiaji kujitambua na kuelewa tabia zao;</li>
                <li>kusaidia watumiaji kufuatilia maendeleo yao;</li>
                <li>kutoa maudhui na rasilimali za kujifunza;</li>
                <li>kusaidia utafiti na ukusanyaji wa taarifa kwa madhumuni yaliyoelezwa kwa uwazi;</li>
                <li>kujenga mazingira yanayohamasisha digital wellbeing na mabadiliko chanya.</li>
              </ul>
              <p className="mt-4 font-semibold text-rose-300">FEBROS16 si mbadala wa ushauri, uchunguzi au matibabu kutoka kwa mtaalamu mwenye sifa stahiki.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">3. Assessment na Tathmini ya Mtumiaji</h2>
              <p>Mtumiaji anaweza kuombwa kujibu maswali kabla au baada ya kuanza kutumia baadhi ya vipengele vya FEBROS16.</p>
              <p className="mt-2">Majibu hayo yanaweza kutumiwa kutoa tathmini ya awali, insights, mapendekezo ya maudhui au kusaidia mtumiaji kuelewa mifumo ya tabia zake.</p>
              <p className="mt-2">Tathmini hizi:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>si diagnosis ya kitabibu;</li>
                <li>si uthibitisho kwamba mtumiaji ana ugonjwa au tatizo fulani;</li>
                <li>hazipaswi kutumiwa kama mbadala wa mtaalamu wa afya au mshauri;</li>
                <li>zinaweza kubadilishwa kadiri mfumo na mbinu za tathmini zinavyoboreshwa.</li>
              </ul>
              <p className="mt-4 font-semibold text-white">Mtumiaji anawajibika kutoa majibu kwa uaminifu kadiri anavyoweza.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">4. Akaunti ya Mtumiaji</h2>
              <p>Baadhi ya vipengele vinaweza kuhitaji mtumiaji kufungua akaunti.</p>
              <p className="mt-2">Mtumiaji anawajibika:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>kutoa taarifa sahihi anapohitajika;</li>
                <li>kulinda taarifa za kuingia kwenye akaunti;</li>
                <li>kutomruhusu mtu mwingine kutumia akaunti yake bila ruhusa;</li>
                <li>kutuarifu anapoamini akaunti yake imetumiwa bila ruhusa.</li>
              </ul>
              <p className="mt-4">FEBROS16 inaweza kuchukua hatua zinazofaa endapo akaunti itatumika kinyume na Masharti haya.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">5. Matumizi Yanayoruhusiwa</h2>
              <p>Mtumiaji anakubali kutumia FEBROS16 kwa madhumuni halali na kwa kuheshimu watumiaji wengine.</p>
              <p className="mt-2">Mtumiaji hataruhusiwa kutumia Huduma:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>kwa madhumuni haramu;</li>
                <li>kujaribu kupata taarifa au akaunti za watu wengine bila ruhusa;</li>
                <li>kuvuruga au kuharibu mifumo ya FEBROS16;</li>
                <li>kusambaza malware au code yenye madhara;</li>
                <li>kujaribu kuvuka au kuondoa hatua za usalama;</li>
                <li>kufanya scraping, automated abuse au matumizi mengine yanayoweza kuathiri huduma bila ruhusa;</li>
                <li>kutumia Huduma kwa namna inayokiuka haki za watu wengine.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">6. Maudhui ya FEBROS16</h2>
              <p>Maudhui yanayopatikana kwenye FEBROS16 yanaweza kujumuisha makala, maelezo, tafiti, picha, video, links, guides, educational materials na aina nyingine za taarifa.</p>
              <p className="mt-2">Tunajitahidi kutoa taarifa zenye manufaa na, inapowezekana, zinazotegemea vyanzo vinavyoaminika. Hata hivyo, hatuhakikishi kwamba kila maudhui yatakuwa sahihi, kamili, ya sasa au yanafaa kwa kila mtu katika kila hali.</p>
              <p className="mt-2 font-semibold text-white">Mtumiaji anapaswa kutumia busara na kufanya utafiti wa ziada pale inapohitajika.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">7. Si Huduma ya Dharura au Matibabu</h2>
              <p className="font-semibold text-rose-300">FEBROS16 haikusudiwi kutoa huduma ya dharura, diagnosis, psychotherapy au matibabu ya kitabibu.</p>
              <p className="mt-2">Ikiwa mtumiaji ana hali inayohitaji msaada wa haraka, anapaswa kutafuta msaada kutoka kwa mtaalamu anayefaa au huduma za dharura zinazopatikana katika eneo lake.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">8. Research na Data</h2>
              <p>Baadhi ya vipengele vya FEBROS16 vinaweza kusaidia katika utafiti na uchambuzi wa mienendo ya jumla.</p>
              <p className="mt-2">Iwapo taarifa za mtumiaji zitatumika kwa madhumuni ya research, FEBROS16 itazingatia sera yake ya faragha na masharti yanayohusika.</p>
              <p className="mt-2">Tunapokusanya au kutumia data kwa madhumuni ya utafiti, tutalenga kupunguza taarifa zisizohitajika na, inapofaa, kutumia data kwa namna ambayo haiwezi kumtambulisha mtumiaji binafsi.</p>
              <p className="mt-2">Maelezo kamili kuhusu ukusanyaji, matumizi, uhifadhi na haki za mtumiaji yataelezwa kwenye <strong>Privacy Policy</strong> ya FEBROS16.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">9. Faragha</h2>
              <p>Matumizi ya taarifa binafsi yanatawaliwa na <strong>FEBROS16 Privacy Policy</strong>.</p>
              <p className="mt-2">Mtumiaji anapaswa kusoma Privacy Policy ili kuelewa:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>taarifa zinazokusanywa;</li>
                <li>kwa nini zinakusanywa;</li>
                <li>jinsi zinavyotumika;</li>
                <li>jinsi zinavyohifadhiwa;</li>
                <li>muda wa kuzihifadhi;</li>
                <li>haki za mtumiaji kuhusu taarifa zake.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">10. Intellectual Property</h2>
              <p>Isipokuwa pale ambapo imeelezwa vinginevyo, muundo, brand, logo, maandishi, graphics, software, database structure na maudhui yaliyoundwa na FEBROS16 ni mali ya FEBROS16 au wamiliki wake halali.</p>
              <p className="mt-2">Mtumiaji hataruhusiwa kunakili, kuuza, kusambaza, kureproduce au kutumia sehemu za Huduma kwa madhumuni ya kibiashara bila ruhusa inayohitajika.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">11. Third-Party Services na Integrations</h2>
              <p>FEBROS16 inaweza kutumia au kuunganishwa na huduma za wahusika wengine, kama vile hosting providers, analytics services, authentication providers, payment providers, APIs au huduma nyingine.</p>
              <p className="mt-2">Huduma hizo zinaweza kuwa na masharti na sera zao binafsi.</p>
              <p className="mt-2">FEBROS16 haiwajibiki moja kwa moja kwa mabadiliko, hitilafu au sera za huduma za wahusika wengine ambazo ziko nje ya udhibiti wake.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">12. Upatikanaji wa Huduma</h2>
              <p>Tunajitahidi kuweka FEBROS16 inapatikana na kufanya kazi kwa uhakika.</p>
              <p className="mt-2">Hata hivyo, huduma inaweza kusimamishwa kwa muda kutokana na:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>maintenance;</li>
                <li>updates;</li>
                <li>technical failures;</li>
                <li>security incidents;</li>
                <li>matatizo ya hosting au third-party services;</li>
                <li>sababu nyingine zilizo nje ya uwezo wetu.</li>
              </ul>
              <p className="mt-4">Hatuhakikishi kwamba Huduma itapatikana bila kukatika au bila hitilafu wakati wote.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">13. Mabadiliko ya Huduma</h2>
              <p>FEBROS16 ni mfumo unaoendelea kujengwa na kuboreshwa.</p>
              <p className="mt-2">Kwa hiyo tunaweza mara kwa mara:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>kuongeza vipengele vipya;</li>
                <li>kuondoa vipengele;</li>
                <li>kubadilisha muundo wa mfumo;</li>
                <li>kubadilisha namna vipengele vinavyofanya kazi;</li>
                <li>kuboresha assessment;</li>
                <li>kubadilisha algorithms, recommendations au user experience;</li>
                <li>kuongeza au kupunguza aina za maudhui.</li>
              </ul>
              <p className="mt-4">Mabadiliko hayo yanaweza kufanyika bila taarifa ya awali pale ambapo ni muhimu kwa usalama, maintenance au uendeshaji wa kawaida wa Huduma.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">14. Mabadiliko ya Masharti haya</h2>
              <p>Tunaweza kusasisha au kubadilisha Masharti haya mara kwa mara ili kuakisi mabadiliko katika Huduma, teknolojia, sheria, usalama au namna tunavyoendesha FEBROS16.</p>
              <p className="mt-2">Tunapofanya mabadiliko muhimu, tutajaribu kutoa taarifa kwa njia inayofaa, ambayo inaweza kujumuisha:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>kuweka toleo jipya kwenye tovuti;</li>
                <li>kubadilisha tarehe ya “Mara ya mwisho kusasishwa”;</li>
                <li>kutoa taarifa ndani ya akaunti ya mtumiaji;</li>
                <li>kutuma taarifa kupitia njia ya mawasiliano inayopatikana, pale inapofaa.</li>
              </ul>
              <p className="mt-4">Toleo jipya litaanza kutumika kuanzia tarehe iliyoonyeshwa kwenye Masharti yaliyosasishwa, isipokuwa kama tutaeleza vinginevyo.</p>
              <p className="mt-2">Ikiwa mtumiaji ataendelea kutumia FEBROS16 baada ya Masharti yaliyosasishwa kuanza kutumika, matumizi hayo yatachukuliwa kuwa ni kukubali Masharti yaliyosasishwa.</p>
              <p className="mt-2">Ikiwa mtumiaji hakubaliani na mabadiliko hayo, anaweza kuacha kutumia Huduma na, pale inapowezekana, kufunga akaunti yake.</p>
              <p className="mt-4 font-semibold text-white">Tarehe ya mwisho kusasishwa itaonyeshwa wazi juu ya ukurasa huu ili mtumiaji aweze kutambua toleo la sasa la Masharti.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">15. Kusimamisha au Kufunga Akaunti</h2>
              <p>Mtumiaji anaweza kuacha kutumia FEBROS16 wakati wowote.</p>
              <p className="mt-2">FEBROS16 inaweza kusimamisha au kufunga akaunti ikiwa mtumiaji:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>amekiuka Masharti haya;</li>
                <li>ametumia Huduma kwa madhara au matumizi yasiyoruhusiwa;</li>
                <li>amejaribu kuvuruga usalama wa mfumo;</li>
                <li>ametumia akaunti kwa udanganyifu;</li>
                <li>au pale ambapo hatua hiyo inahitajika kwa sababu za kisheria au kiusalama.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">16. Disclaimer</h2>
              <p>FEBROS16 inatoa Huduma kwa madhumuni ya elimu, taarifa, kujitambua na digital wellbeing.</p>
              <p className="mt-2">Kwa kiwango kinachoruhusiwa na sheria husika, hatuhakikishi kwamba matumizi ya FEBROS16 yatasababisha matokeo fulani, kuondoa tabia fulani, au kufikia kiwango maalum cha mabadiliko.</p>
              <p className="mt-2">Matokeo ya kila mtumiaji yanaweza kutofautiana.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">17. Limitation of Liability</h2>
              <p>Kwa kiwango kinachoruhusiwa na sheria, FEBROS16 haitawajibika kwa hasara au madhara yanayotokana na matumizi yasiyofaa ya Huduma, utegemezi usiofaa wa taarifa, kukatika kwa huduma, au huduma za wahusika wengine.</p>
              <p className="mt-2">Kifungu hiki hakilengi kuondoa haki au wajibu ambao hauwezi kuondolewa kisheria.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">18. Sheria na Mamlaka Husika</h2>
              <p>Masharti haya yatafasiriwa kwa kuzingatia sheria zinazotumika katika mamlaka ambayo FEBROS16 inaendesha shughuli zake, isipokuwa pale ambapo sheria husika inahitaji vinginevyo.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">19. Mawasiliano</h2>
              <p>Kwa maswali kuhusu Masharti haya, mtumiaji anaweza kuwasiliana na FEBROS16 kupitia:</p>
              <ul className="mt-2 space-y-1">
                <li><strong>Email:</strong> <a href="mailto:wshavu@gmail.com" className="text-blue-400 hover:underline">wshavu@gmail.com</a></li>
                <li><strong>Website:</strong> <a href="https://febros16.com" className="text-blue-400 hover:underline">https://febros16.com</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 mt-8">20. Kukubali Masharti</h2>
              <p>Kwa kuunda akaunti, kuendelea kutumia FEBROS16 au kutumia vipengele vinavyohitaji kukubali Masharti, mtumiaji anathibitisha kwamba amesoma, ameelewa na anakubali Masharti haya.</p>
            </section>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <h3 className="text-lg font-black text-white tracking-widest">FEBROS16</h3>
              <p className="text-slate-400 italic font-serif mt-1">Knowledge. Awareness. Growth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
