import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Search, Share2, AlertCircle, CheckCircle, XCircle, HelpCircle, Shield, Download, AlertTriangle, Landmark, Globe } from 'lucide-react';

const TRANSLATIONS = {
  en: {
    appTitle: "ElectionCheck",
    tagline: "India's AI-powered election fact checker",
    placeholder: "Type any claim or question about Indian elections...",
    checkBtn: "Check",
    theClaim: "The Claim",
    theFacts: "The Facts",
    confidence: "Confidence Score",
    source: "Source",
    share: "Share this fact-check",
    checkAnother: "← Check another claim",
    howItWorksTitle: "How Indian Elections Work",
    mythsTitle: "Common Myths & Questions",
    verifyThis: "Verify this",
    footer: "Powered by Groq AI · Data sourced from Election Commission of India · Built for PromptWars Virtual",
    languageName: "English",
    myths: [
      "EVMs can be hacked remotely",
      "You need Aadhaar to vote",
      "NRIs can vote from abroad online",
      "Your vote is not secret — officials can see it",
      "Not voting means your vote goes to the winner",
      "You can vote in any booth across India"
    ],
    steps: [
      { icon: "🗓️", title: "Election Announced", desc: "EC announces schedule and Model Code of Conduct begins" },
      { icon: "📝", title: "Voter Registration", desc: "Citizens verify their name on Electoral Roll" },
      { icon: "🏃", title: "Campaigning", desc: "Parties and candidates campaign across constituencies" },
      { icon: "🗳️", title: "Voting Day", desc: "Voters visit assigned booth and cast vote on EVM" },
      { icon: "🔢", title: "Vote Counting", desc: "Votes counted under strict EC supervision" },
      { icon: "🏆", title: "Result & Oath", desc: "Winners declared and take oath of office" }
    ]
  },
  hi: {
    appTitle: "इलेक्शनचेक",
    tagline: "भारत का एआई-संचालित चुनाव फैक्ट चेकर",
    placeholder: "भारतीय चुनावों के बारे में कोई भी दावा या प्रश्न टाइप करें...",
    checkBtn: "जांचें",
    theClaim: "दावा",
    theFacts: "तथ्य",
    confidence: "कॉन्फिडेंस स्कोर",
    source: "स्रोत",
    share: "इस फैक्ट-चेक को साझा करें",
    checkAnother: "← दूसरा दावा जांचें",
    howItWorksTitle: "भारतीय चुनाव कैसे काम करते हैं",
    mythsTitle: "सामान्य मिथक और प्रश्न",
    verifyThis: "इसे सत्यापित करें",
    footer: "ग्रोक एआई द्वारा संचालित · डेटा भारत के चुनाव आयोग से लिया गया · प्रॉम्प्टवार्स वर्चुअल के लिए निर्मित",
    languageName: "Hindi",
    myths: [
      "ईवीएम को दूर से हैक किया जा सकता है",
      "वोट देने के लिए आधार की आवश्यकता है",
      "एनआरआई विदेश से ऑनलाइन वोट कर सकते हैं",
      "आपका वोट गुप्त नहीं है - अधिकारी इसे देख सकते हैं",
      "वोट न देने का मतलब है कि आपका वोट विजेता को जाता है",
      "आप भारत भर के किसी भी बूथ पर वोट कर सकते हैं"
    ],
    steps: [
      { icon: "🗓️", title: "चुनाव की घोषणा", desc: "चुनाव आयोग कार्यक्रम की घोषणा करता है और आचार संहिता लागू होती है" },
      { icon: "📝", title: "मतदाता पंजीकरण", desc: "नागरिक मतदाता सूची में अपना नाम सत्यापित करते हैं" },
      { icon: "🏃", title: "चुनाव प्रचार", desc: "पार्टियां और उम्मीदवार निर्वाचन क्षेत्रों में प्रचार करते हैं" },
      { icon: "🗳️", title: "मतदान का दिन", desc: "मतदाता आवंटित बूथ पर जाते हैं और ईवीएम पर वोट डालते हैं" },
      { icon: "🔢", title: "मतगणना", desc: "चुनाव आयोग की कड़ी निगरानी में वोटों की गिनती होती है" },
      { icon: "🏆", title: "परिणाम और शपथ", desc: "विजेताओं की घोषणा होती है और वे पद की शपथ लेते हैं" }
    ]
  },
  te: {
    appTitle: "ఎలక్షన్ చెక్",
    tagline: "భారతదేశపు AI ఆధారిత ఎన్నికల ఫ్యాక్ట్ చెకర్",
    placeholder: "భారతీయ ఎన్నికల గురించి ఏదైనా క్లెయిమ్ లేదా ప్రశ్నను టైప్ చేయండి...",
    checkBtn: "తనిఖీ చేయండి",
    theClaim: "క్లెయిమ్",
    theFacts: "వాస్తవాలు",
    confidence: "కాన్ఫిడెన్స్ స్కోర్",
    source: "మూలం",
    share: "ఈ ఫ్యాక్ట్ చెక్‌ను షేర్ చేయండి",
    checkAnother: "← మరొక క్లెయిమ్‌ను తనిఖీ చేయండి",
    howItWorksTitle: "భారతీయ ఎన్నికలు ఎలా పనిచేస్తాయి",
    mythsTitle: "సాధారణ అపోహలు & ప్రశ్నలు",
    verifyThis: "దీన్ని ధృవీకరించండి",
    footer: "Groq AI ద్వారా పవర్ చేయబడింది · ఎలక్షన్ కమీషన్ ఆఫ్ ఇండియా నుండి తీసుకోబడిన డేటా · ప్రాంప్ట్ వార్స్ వర్చువల్ కోసం నిర్మించబడింది",
    languageName: "Telugu",
    myths: [
      "ఈవీఎంలను రిమోట్‌గా హ్యాక్ చేయవచ్చు",
      "ఓటు వేయడానికి ఆధార్ అవసరం",
      "ప్రవాస భారతీయులు విదేశాల నుండి ఆన్‌లైన్‌లో ఓటు వేయవచ్చు",
      "మీ ఓటు రహస్యం కాదు — అధికారులు చూడగలరు",
      "ఓటు వేయకపోవడం అంటే మీ ఓటు విజేతకు వెళుతుంది",
      "మీరు భారతదేశం అంతటా ఏ బూత్‌లోనైనా ఓటు వేయవచ్చు"
    ],
    steps: [
      { icon: "🗓️", title: "ఎన్నికల ప్రకటన", desc: "ఈసీ షెడ్యూల్‌ను ప్రకటిస్తుంది మరియు ప్రవర్తనా నియమావళి ప్రారంభమవుతుంది" },
      { icon: "📝", title: "ఓటరు నమోదు", desc: "పౌరులు ఓటరు జాబితాలో తమ పేరును ధృవీకరిస్తారు" },
      { icon: "🏃", title: "ప్రచారం", desc: "పార్టీలు మరియు అభ్యర్థులు నియోజకవర్గాల్లో ప్రచారం చేస్తారు" },
      { icon: "🗳️", title: "పోలింగ్ రోజు", desc: "ఓటర్లు కేటాయించిన బూత్‌కు వెళ్లి ఈవీఎంలో ఓటు వేస్తారు" },
      { icon: "🔢", title: "ఓట్ల లెక్కింపు", desc: "ఈసీ కఠిన పర్యవేక్షణలో ఓట్ల లెక్కింపు" },
      { icon: "🏆", title: "ఫలితం & ప్రమాణ స్వీకారం", desc: "విజేతలు ప్రకటించబడతారు మరియు పదవీ ప్రమాణ స్వీకారం చేస్తారు" }
    ]
  }
};

const VERDICT_COLORS = {
  "TRUE": { bg: "bg-green-500", text: "text-green-500", border: "border-green-500", icon: CheckCircle },
  "FALSE": { bg: "bg-red-500", text: "text-red-500", border: "border-red-500", icon: XCircle },
  "PARTIALLY TRUE": { bg: "bg-yellow-500", text: "text-yellow-500", border: "border-yellow-500", icon: AlertCircle },
  "MISLEADING": { bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500", icon: AlertTriangle }
};

export default function App() {
  const [language, setLanguage] = useState('en');
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const resultRef = useRef(null);

  const t = TRANSLATIONS[language];

  const handleCheck = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    setClaim(query);

    try {
      const apiKey = import.meta.env.VITE_GROQ_KEY;
      
      if (!apiKey) {
        throw new Error("API key is missing. Please set VITE_GROQ_KEY in your .env file.");
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          response_format: { type: "json_object" },
          messages: [
            {
              role: 'system',
              content: `You are an Indian election fact-checker. When given a claim or question, respond ONLY in this exact JSON format: { "verdict": "TRUE" or "FALSE" or "PARTIALLY TRUE" or "MISLEADING", "explanation": "3-4 sentence plain language explanation", "source": "Official source name", "source_url": "https://eci.gov.in or other official URL", "confidence": 80 }. Please write the 'explanation' field in ${t.languageName}.`
            },
            {
              role: 'user',
              content: query
            }
          ]
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "Failed to fetch from Groq API");
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        const parsedResult = JSON.parse(content);
        setResult(parsedResult);
      } catch (e) {
        throw new Error("Failed to parse API response as JSON. Groq may not have returned valid JSON.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#0A0F2C',
        scale: 2
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'electioncheck-fact.png';
      a.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to generate shareable image.");
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white font-sans flex flex-col">
      {/* Header with Language Toggle */}
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl p-1 z-50">
        <Globe className="w-4 h-4 ml-2 text-electric-blue" />
        <button 
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${language === 'en' ? 'bg-electric-blue text-white' : 'text-blue-100 hover:text-white'}`}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('hi')}
          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${language === 'hi' ? 'bg-electric-blue text-white' : 'text-blue-100 hover:text-white'}`}
        >
          हिंदी
        </button>
        <button 
          onClick={() => setLanguage('te')}
          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${language === 'te' ? 'bg-electric-blue text-white' : 'text-blue-100 hover:text-white'}`}
        >
          తెలుగు
        </button>
      </div>

      {/* Hero Section */}
      <header className="pt-20 pb-12 px-6 text-center border-b border-white/10 glass-card relative">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-electric-blue" />
            <h1 className="text-5xl font-extrabold tracking-tight">{t.appTitle}</h1>
          </div>
          <p className="text-xl text-blue-200 font-light">{t.tagline}</p>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
        {/* Search Section */}
        <div className="mb-16">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleCheck(claim); }}
            className="relative group"
          >
            <input
              type="text"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-white/5 border-2 border-white/20 rounded-2xl py-5 pl-6 pr-36 text-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:bg-white/10 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={loading || !claim.trim()}
              className="absolute right-2 top-2 bottom-2 bg-electric-blue hover:bg-blue-600 disabled:bg-blue-800 disabled:opacity-50 text-white px-6 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              {loading ? (
                <span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  {t.checkBtn}
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="mb-16 animate-fade-in-up">
            <button 
              onClick={() => { setResult(null); setClaim(''); }}
              className="mb-6 flex items-center text-blue-300 hover:text-white transition-colors font-medium text-lg"
            >
              {t.checkAnother}
            </button>
            <div 
              ref={resultRef}
              className="glass-card rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              {/* Shareable Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-2">{t.theClaim}</h3>
                  <p className="text-2xl font-bold leading-snug">"{claim}"</p>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  <Shield className="w-5 h-5 text-electric-blue" />
                  <span className="font-bold tracking-wide">{t.appTitle}</span>
                </div>
              </div>

              {/* Verdict Badge */}
              <div className="my-8 flex items-center gap-4">
                {(() => {
                  // Verdict keys remain in English as returned by JSON API
                  const styling = VERDICT_COLORS[result.verdict] || VERDICT_COLORS["PARTIALLY TRUE"];
                  const Icon = styling.icon;
                  return (
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-full ${styling.bg} text-white font-black text-xl tracking-wide shadow-lg`}>
                      <Icon className="w-7 h-7" />
                      {result.verdict}
                    </div>
                  );
                })()}
              </div>

              {/* Explanation */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-3">{t.theFacts}</h3>
                <p className="text-lg text-blue-50 leading-relaxed font-medium">
                  {result.explanation}
                </p>
              </div>

              {/* Footer Meta Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-2">{t.confidence}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-electric-blue rounded-full relative overflow-hidden"
                        style={{ width: `${result.confidence}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <span className="font-bold text-xl">{result.confidence}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-2">{t.source}</h3>
                  <a 
                    href={result.source_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-electric-blue hover:text-blue-400 font-medium transition-colors hover:underline"
                  >
                    {result.source}
                    <Share2 className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-xl"
              >
                <Download className="w-5 h-5" />
                {t.share}
              </button>
            </div>
          </div>
        )}

        {/* How It Works & Myths */}
        {!result && !loading && (
          <div className="space-y-16 animate-fade-in-up">
            {/* How Indian Elections Work Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Landmark className="text-electric-blue w-6 h-6" />
                {t.howItWorksTitle}
              </h2>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
                {t.steps.map((step, idx) => (
                  <div key={idx} className="glass-card min-w-[280px] max-w-[280px] p-6 rounded-2xl shrink-0 snap-start flex flex-col hover:-translate-y-1 transition-transform border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{step.icon}</span>
                      <div className="w-8 h-8 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center font-bold text-sm shrink-0">
                        {idx + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed flex-grow">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Myths Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <HelpCircle className="text-electric-blue w-6 h-6" />
                {t.mythsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.myths.map((myth, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCheck(myth)}
                    className="glass-card hover:bg-white/10 text-left p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl group flex flex-col justify-between"
                  >
                    <p className="text-lg font-medium text-blue-50 group-hover:text-white mb-4">"{myth}"</p>
                    <span className="text-sm text-electric-blue font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t.verifyThis} <Search className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-white/10 mt-auto">
        <p className="text-sm mb-2">{t.footer}</p>
      </footer>
    </div>
  );
}
