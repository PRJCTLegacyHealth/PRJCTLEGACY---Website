import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight,
  Instagram,
  Linkedin,
  Mail,
  Clock,
  Activity
} from 'lucide-react';

/**
 * PRJCT: Legacy - Allied Health & Performance Infographic
 * Single-file React component using Tailwind CSS and Lucide-React.
 */

const App = () => {
  const [activeTab, setActiveTab] = useState('clinical');
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  // StatBar Sub-component for the data section
  const StatBar = ({ percentage, label, description, delay = 0 }) => {
    const [width, setWidth] = useState(0);
    const barRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setWidth(percentage), delay);
          }
        },
        { threshold: 0.5 }
      );

      if (barRef.current) observer.observe(barRef.current);
      return () => observer.disconnect();
    }, [percentage, delay]);

    return (
      <div className="mb-8" ref={barRef}>
        <div className="flex justify-between mb-3">
          <span className="text-white font-bold text-lg">{label}</span>
          <span className="text-[#B0B0B0] font-mono">{percentage}%</span>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-3 mb-3 overflow-hidden border border-[#222]">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out bg-[#6A1E2B]" 
            style={{ width: `${width}%` }}
          ></div>
        </div>
        <p className="text-sm text-[#B0B0B0]/70 italic">{description}</p>
      </div>
    );
  };

  const tabData = {
    clinical: {
      title: "Chronic Disease Management",
      tag: "PRJCT: LEGACY HEALTH",
      stats: [
        { p: 47, l: "Australians with Chronic Conditions", d: "Nearly half of the population suffers from 1+ chronic conditions." },
        { p: 85, l: "Condition Improvement with Exercise", d: "Exercise is a Tier 1 treatment for Type 2 Diabetes, CVD, and Osteoporosis." }
      ],
      pathways: ["NDIS Support", "Medicare (EPC)", "DVA Services", "WorkCover"]
    },
    general: {
      title: "General Wellness & Longevity",
      tag: "PRJCT: LEGACY",
      stats: [
        { p: 15, l: "Adults Meeting Activity Guidelines", d: "Most adults fail to meet the required strength training guidelines." },
        { p: 40, l: "Reduced Mortality Risk", d: "Regular resistance training is linked to a 40% reduction in all-cause mortality." }
      ]
    },
    athlete: {
      title: "Athlete Development",
      tag: "PRJCT: LEGACY",
      stats: [
        { p: 55, l: "Injury Risk Reduction", d: "Structured S&C programs reduce sports injury rates by over half." },
        { p: 22, l: "Performance Output Increase", d: "Average power output increase after 12 weeks of periodized training." }
      ]
    }
  };

  // Your Halaxy Link
  const bookingLink = "https://www.halaxy.com/profile/mr-nick-belvedere/exercise-physiologist/1148711";

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white font-sans selection:bg-[#6A1E2B] selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#222]">
        <div className="absolute top-0 right-1/2 w-[60vw] h-[60vw] bg-[#6A1E2B] rounded-full blur-[180px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-[#6A1E2B]"></div>
            <span className="text-[#B0B0B0] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold">Allied Health & Performance</span>
            <div className="h-[1px] w-12 bg-[#6A1E2B]"></div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
            PRJCT: <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B0B0B0]">LEGACY</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-2xl mx-auto leading-relaxed mb-10">
            Bridging the gap between clinical rehabilitation and high-performance athletics. 
            <span className="block mt-4 text-white font-bold">I don’t just get you back on track, <span className="text-[#6A1E2B]">I build bodies that last.</span></span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('distinction').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-[#6A1E2B] text-white font-bold rounded hover:bg-[#6A1E2B]/80 transition-colors uppercase tracking-wide text-sm flex items-center justify-center"
            >
              The Difference
            </button>
            <a 
              href={bookingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-4 border border-[#333] bg-[#1a1a1a] text-white font-bold rounded hover:bg-white hover:text-black transition-colors uppercase tracking-wide text-sm flex items-center justify-center"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </header>

      {/* --- THE DISTINCTION SECTION --- */}
      <section 
        id="distinction" 
        ref={setRef('distinction')}
        className={`bg-[#0a0a0a] border-b border-[#222] transition-all duration-1000 ${isVisible.distinction ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="w-full py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Physio vs. <span className="text-[#6A1E2B]">Physiology</span></h2>
            <div className="h-1 w-20 bg-[#222] mx-auto mb-6"></div>
            <p className="text-[#B0B0B0] text-lg leading-relaxed">
              Many confuse Exercise Physiology (EP) with Physiotherapy. While we work together, our roles are distinct. 
              <br /><br />
              <span className="text-white font-medium">Think of Physio as the "Mechanic" fixing the acute breakdown, and EP as the "Engineer" optimizing the machine for the long haul.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="p-8 md:p-10 rounded-2xl border border-[#333] bg-[#111] hover:border-[#444] transition-colors">
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-[#222]">
                <div className="p-4 rounded-xl bg-[#222] text-[#B0B0B0]">
                  <Clock size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Physiotherapy</h3>
                  <span className="text-sm text-[#B0B0B0] uppercase tracking-widest">Acute Care</span>
                </div>
              </div>
              <ul className="space-y-5">
                {["Diagnosis of acute injuries", "Hands-on manual therapy", "Immediate pain relief", "Early-stage rehabilitation"].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#B0B0B0]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#444] mt-2.5 shrink-0"></div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-4 text-white font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0"></div>
                  <span className="text-lg">Goal: Restoring normal function</span>
                </li>
              </ul>
            </div>
            
            <div className="p-8 md:p-10 rounded-2xl border border-[#6A1E2B]/50 bg-gradient-to-b from-[#1a0508] to-[#0e0e0e] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6A1E2B] blur-[80px] opacity-20"></div>
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/10 relative z-10">
                <div className="p-4 rounded-xl bg-[#6A1E2B] text-white">
                  <Activity size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Ex. Physiology</h3>
                  <span className="text-sm text-[#B0B0B0] uppercase tracking-widest">Chronic & Performance</span>
                </div>
              </div>
              <ul className="space-y-5 relative z-10">
                {["Management of chronic conditions", "Exercise as medicine prescription", "Long-term behavior change", "Strength & conditioning for rehab"].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/90">
                    <CheckCircle2 size={20} className="text-[#6A1E2B] shrink-0 mt-1" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-4 text-white font-bold">
                  <CheckCircle2 size={20} className="text-[#6A1E2B] shrink-0 mt-1" />
                  <span className="text-lg">Goal: Optimizing performance & capacity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- DATA SECTION --- */}
      <section 
        id="data" 
        ref={setRef('data')}
        className={`w-full py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000 ${isVisible.data ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">The Spectrum of <span className="text-[#6A1E2B]">Care</span></h2>
            <p className="text-[#B0B0B0] mb-10 text-lg">
              PRJCT: Legacy operates across the entire health continuum. Whether managing a heart condition or preparing for a national championship, the principles of physiology remain the same.
            </p>
            
            <div className="flex flex-col gap-3">
              {[
                { id: 'clinical', label: 'Clinical Population', icon: <Plus size={24} /> },
                { id: 'general', label: 'Healthy Population', icon: <Users size={24} /> },
                { id: 'athlete', label: 'Elite Performance', icon: <BarChart3 size={24} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-6 text-left rounded-xl border transition-all flex items-center justify-between font-bold text-xl group ${
                    activeTab === tab.id 
                      ? 'border-[#6A1E2B] bg-[#6A1E2B]/10 text-white' 
                      : 'border-transparent bg-[#111] text-[#666] hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {tab.icon}
                    {tab.label}
                  </div>
                  <ChevronRight className={`transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#111] p-10 rounded-2xl border border-[#222] flex flex-col justify-center min-h-[500px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-[#222]">
              <h3 className="text-3xl font-bold">{tabData[activeTab].title}</h3>
              <span className="text-[#6A1E2B] font-mono text-sm mt-2 md:mt-0 tracking-wider">{tabData[activeTab].tag}</span>
            </div>
            
            {tabData[activeTab].stats.map((stat, i) => (
              <StatBar key={activeTab + i} percentage={stat.p} label={stat.l} description={stat.d} delay={i * 200} />
            ))}

            {tabData[activeTab].pathways && (
              <div className="mt-10 pt-6 border-t border-[#222]">
                <p className="text-sm uppercase tracking-widest text-[#555] mb-4 font-bold">Pathways</p>
                <div className="grid grid-cols-2 gap-4">
                  {tabData[activeTab].pathways.map((path, i) => (
                    <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] text-[#B0B0B0] text-center hover:border-[#6A1E2B] transition-colors cursor-default text-sm">
                      {path}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- PROTOCOL SECTION --- */}
      <section 
        id="protocol" 
        ref={setRef('protocol')}
        className={`w-full py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000 ${isVisible.protocol ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-bold mb-6">The Legacy <span className="text-[#6A1E2B]">Protocol</span></h2>
             <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">Our four-stage methodology designed to take any individual from baseline to peak performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Assess', desc: 'Comprehensive musculoskeletal screening and baseline metrics.' },
            { step: '02', title: 'Program', desc: 'Bespoke prescription tailored to your pathology or goals.' },
            { step: '03', title: 'Adapt', desc: 'Progressive overload and adaptation monitored through regular testing.' },
            { step: '04', title: 'Overcome', desc: 'Surpassing limitations and establishing new physical standards.' }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-xl bg-[#111] border border-[#222] hover:border-[#6A1E2B]/50 transition-colors group">
              <div className="text-5xl font-black text-[#222] group-hover:text-[#6A1E2B]/20 mb-4 transition-colors">{item.step}</div>
              <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
              <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#222] bg-[#050505] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
            Ready to build your <br />
            <span className="text-[#6A1E2B]">Legacy?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto mb-16">
            <a href="mailto:referrals@prjctlegacy.com" className="block p-8 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-[#6A1E2B] transition-all group text-left">
              <h4 className="text-white font-bold text-xl mb-1 group-hover:text-[#6A1E2B] uppercase tracking-tight">Referrals</h4>
              <p className="text-[#666] text-sm">Clinical pathways for GPs & Physios</p>
            </a>
            <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="block p-8 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-[#6A1E2B] transition-all group text-left">
              <h4 className="text-white font-bold text-xl mb-1 group-hover:text-[#6A1E2B] uppercase tracking-tight">Consultations</h4>
              <p className="text-[#666] text-sm">Book Initial Assessment</p>
            </a>
          </div>

          <div className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center text-[#444] text-sm">
            <p>&copy; {new Date().getFullYear()} PRJCT: Legacy.</p>
            <div className="flex gap-8 mt-4 md:mt-0 font-medium">
              <a href="https://instagram.com/prjct_legacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><Instagram size={16}/> Instagram</a>
              <a href="https://linkedin.com/company/prjct-legacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a>
              <a href="mailto:info@prjctlegacy.com" className="hover:text-white transition-colors flex items-center gap-2"><Mail size={16}/> Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;