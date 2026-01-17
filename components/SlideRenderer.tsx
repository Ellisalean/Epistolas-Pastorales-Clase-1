
import React, { useState, useEffect } from 'react';
import { Slide, RevealItem } from '../types';
import * as LucideIcons from 'lucide-react';
import { useLessonStore } from '../store/useLessonStore';

interface SlideRendererProps {
  slide: Slide;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  if (!slide) return null;

  const { markSlideComplete, setNote, notes, currentSlideIndex, resetLesson } = useLessonStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<RevealItem | null>(null);
  
  const [internalStep, setInternalStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<RevealItem | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);

  const [dragAssignments, setDragAssignments] = useState<Record<string, string>>({}); 
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [rejectionId, setRejectionId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isAppClosing, setIsAppClosing] = useState(false);

  useEffect(() => {
    setInternalStep(0);
    setActiveTab(0);
    setActiveHotspot(null);
    setActiveMenuItem(0);
    setDragAssignments({});
    setDraggedItemId(null);
    setRejectionId(null);
    setShowCelebration(false);
    setSelectedOption(null);
    setExpandedItem(null);
    setFlippedCards({});
    setIsAppClosing(false);
  }, [currentSlideIndex, slide.id]);

  const toggleCard = (idx: number) => {
    setFlippedCards(prev => {
      const newState = { ...prev, [idx]: !prev[idx] };
      const flippedCount = Object.values(newState).filter(Boolean).length;
      if (flippedCount >= 1) markSlideComplete(currentSlideIndex);
      return newState;
    });
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.setData('itemId', id);
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const onDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const item = slide.interaction?.dragItems?.find(i => i.id === itemId);

    if (item) {
      if (item.categoryId === categoryId) {
        setDragAssignments(prev => {
          const newAssignments = { ...prev, [itemId]: categoryId };
          if (Object.keys(newAssignments).length === slide.interaction?.dragItems?.length) {
            markSlideComplete(currentSlideIndex);
            setShowCelebration(true);
          }
          return newAssignments;
        });
      } else {
        setRejectionId(itemId);
        setTimeout(() => setRejectionId(null), 800);
      }
    }
    setDraggedItemId(null);
  };

  const handleAbandon = () => {
    setIsAppClosing(true);
    setTimeout(() => {
      window.location.href = "about:blank";
    }, 800);
  };

  const renderIcon = (iconName: string, size = 24) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent && (typeof IconComponent === 'function' || typeof IconComponent === 'object')) {
      return <IconComponent size={size} />;
    }
    return <LucideIcons.Info size={size} />;
  };

  const isBg = slide.visual.position === 'background';

  if (isAppClosing) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
         <div className="w-24 h-24 bg-red-600 rounded-full animate-ping opacity-25 absolute" />
         <p className="text-white font-black uppercase tracking-[0.8em] animate-pulse">Sesión Finalizada</p>
      </div>
    );
  }

  // Completion Slide (Final)
  if (slide.id === 'slide-12' || slide.type === 'completion') {
    return (
      <div className="h-full w-full relative flex items-center justify-center overflow-hidden bg-[#111111] p-12 lg:p-24">
         <div className="absolute inset-0 z-0">
           <img src={slide.visual.source} className="w-full h-full object-cover opacity-30" alt="" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]" />
         </div>
         <div className="relative z-10 text-center space-y-12 animate-in zoom-in-95 duration-1000 max-w-4xl">
            <div className="inline-block p-6 bg-red-600 rounded-[2.5rem] shadow-[0_0_50px_rgba(239,68,68,0.5)] animate-bounce mb-8">
               {renderIcon('Trophy', 64)}
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">{slide.title}</h2>
              <p className="text-xl lg:text-3xl font-bold text-red-500 uppercase tracking-[0.4em]">{slide.subtitle}</p>
            </div>
            <div className="space-y-4">
              <p className="text-xl lg:text-2xl font-light text-slate-300 leading-relaxed opacity-90">{slide.content}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-10">
               <button onClick={resetLesson} className="px-12 py-6 bg-white/5 border border-white/10 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:bg-red-600 transition-all flex items-center gap-3">
                 {renderIcon('RotateCcw', 18)} Reiniciar Curso
               </button>
               <button onClick={handleAbandon} className="px-12 py-6 bg-red-600 rounded-full font-black uppercase text-xs tracking-[0.4em] shadow-xl hover:scale-105 transition-all">
                 Finalizar Sesión
               </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative flex flex-col overflow-y-auto custom-scrollbar bg-[#111111]">
      {isBg && (
        <div className="absolute inset-0 z-0">
          <img src={slide.visual.source} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />
        </div>
      )}

      <div className={`relative z-10 flex-1 flex flex-col items-center justify-center ${slide.type === 'split-slider' || slide.type === 'image-list-reveal' || slide.type === 'info-menu-reveal' || slide.type === 'tabs-reveal' || slide.type === 'stepped-overlay' || slide.type === 'interactive-video' || slide.type === 'timeline' || slide.type === 'flashcards' || slide.type === 'intro' ? 'p-0' : 'p-8 lg:p-12 max-w-7xl mx-auto w-full'}`}>
        
        {/* Intro Slide Layout */}
        {slide.type === 'intro' && (
          <div className="w-full max-w-5xl text-center space-y-12 animate-in zoom-in-95 duration-1000 p-12 flex flex-col items-center">
             <div className="space-y-6">
                <div className="inline-block px-6 py-2 bg-red-600/20 border border-red-600/30 rounded-full mb-4">
                  <span className="text-red-500 font-black uppercase text-[10px] tracking-[0.4em]">Nueva Clase • Epístolas Pastorales</span>
                </div>
                <h1 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  {slide.title}
                </h1>
                <div className="w-32 h-2 bg-red-600 mx-auto rounded-full shadow-[0_0_30px_rgba(239,68,68,0.5)]" />
                <p className="text-xl lg:text-3xl font-black text-red-500 uppercase tracking-[0.5em] opacity-90">
                  {slide.subtitle}
                </p>
             </div>
             
             <div className="space-y-8 max-w-3xl mx-auto">
                <p className="text-xl lg:text-3xl font-light text-slate-200 leading-relaxed italic opacity-95">
                   "{slide.content}"
                </p>
             </div>

             <div className="flex flex-wrap justify-center gap-12 pt-8 border-t border-white/10 w-full max-w-4xl">
                <div className="flex items-center gap-5 text-white/60">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 shadow-xl">
                      {renderIcon('Clock', 28)}
                   </div>
                   <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-red-500">Duración</p>
                      <p className="text-lg font-bold text-white">45 Minutos</p>
                   </div>
                </div>
                <div className="flex items-center gap-5 text-white/60">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 shadow-xl">
                      {renderIcon('Target', 28)}
                   </div>
                   <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-red-500">Objetivo</p>
                      <p className="text-lg font-bold text-white">Sana Doctrina</p>
                   </div>
                </div>
                <div className="flex items-center gap-5 text-white/60">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 shadow-xl">
                      {renderIcon('ShieldCheck', 28)}
                   </div>
                   <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-red-500">Nivel</p>
                      <p className="text-lg font-bold text-white">Liderazgo</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {slide.type === 'flashcards' && slide.interaction?.revealItems && (
          <div className="w-full h-full flex flex-col p-6 lg:p-10 overflow-hidden">
             <div className="mb-4 text-center shrink-0">
                <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
                <div className="w-16 h-1.5 bg-red-600 rounded-full mx-auto mt-2" />
                <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] mt-2">{slide.subtitle}</p>
             </div>
             <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center py-2">
                {slide.interaction.revealItems.map((item, idx) => (
                  <div key={idx} className="perspective-1000 h-[380px] lg:h-[420px] w-full group">
                    <div onClick={() => toggleCard(idx)} className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${flippedCards[idx] ? 'rotate-y-180' : ''}`}>
                      <div className="absolute inset-0 backface-hidden bg-[#222222] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col hover:border-red-600 transition-colors">
                         <div className="flex-1 relative overflow-hidden">
                            <img src={item.image} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent" />
                         </div>
                         <div className="p-6 text-center space-y-3">
                            <div className="w-10 h-10 bg-red-600 rounded-xl mx-auto flex items-center justify-center text-white shadow-xl">
                               {renderIcon(item.icon, 20)}
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-tight text-white leading-tight min-h-[2.5rem] flex items-center justify-center">{item.title}</h4>
                            <span className="text-[7px] font-black text-red-500 uppercase tracking-widest block opacity-50">Toca para descubrir</span>
                         </div>
                      </div>
                      <div className="absolute inset-0 backface-hidden bg-red-600 rounded-[2.5rem] border border-white/20 shadow-2xl rotate-y-180 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">Respuesta Teológica</h4>
                         <p className="text-lg lg:text-xl font-bold text-white leading-relaxed drop-shadow-md">{item.text}</p>
                         <div className="mt-6 pt-6 border-t border-white/20 w-full">
                            {renderIcon('CheckCircle2', 24)}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {slide.type === 'timeline' && slide.interaction?.revealItems && (
          <div className="w-full h-full flex flex-col p-12 lg:p-16">
             <div className="mb-12 text-left shrink-0">
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
                <div className="w-24 h-2 bg-red-600 rounded-full mt-4" />
                <p className="text-xs font-bold text-red-500 uppercase tracking-[0.4em] mt-3">{slide.subtitle}</p>
             </div>
             <div className="flex-1 relative flex flex-col lg:flex-row gap-12 min-h-0">
                <div className="w-full lg:w-1/3 overflow-y-auto pr-4 custom-scrollbar space-y-4">
                   {slide.interaction.revealItems.map((item, idx) => (
                      <button key={idx} onClick={() => { setActiveTab(idx); markSlideComplete(currentSlideIndex); }} className={`w-full p-8 rounded-[2rem] border transition-all duration-500 text-left flex items-start gap-6 group ${activeTab === idx ? 'bg-red-600 border-red-500 shadow-2xl scale-105 z-10' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                         <div className={`p-4 rounded-2xl shrink-0 ${activeTab === idx ? 'bg-white/20' : 'bg-red-600/20 text-red-500'}`}>{renderIcon(item.icon, 24)}</div>
                         <div>
                            <h4 className={`text-xl font-black uppercase tracking-tight ${activeTab === idx ? 'text-white' : 'text-slate-200'}`}>{item.title}</h4>
                            <p className={`text-sm font-bold opacity-60 ${activeTab === idx ? 'text-white' : 'text-red-500'}`}>{item.text}</p>
                         </div>
                      </button>
                   ))}
                </div>
                <div className="flex-1 bg-[#1a1a1a] rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row ring-1 ring-white/5">
                   <div className="flex-[1.2] p-12 lg:p-20 overflow-y-auto custom-scrollbar flex flex-col gap-10">
                      <div key={activeTab} className="space-y-10 animate-in fade-in duration-500">
                         <div className="space-y-4">
                            <h3 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">{slide.interaction.revealItems[activeTab].title}</h3>
                            <div className="w-16 h-1.5 bg-red-600 rounded-full" />
                         </div>
                         <p className="text-2xl font-black text-red-500 italic border-l-8 border-red-500 pl-8 bg-red-500/5 py-4 rounded-r-2xl">"{slide.interaction.revealItems[activeTab].text}"</p>
                         <p className="text-xl lg:text-2xl font-light text-slate-300 leading-relaxed whitespace-pre-wrap opacity-90">{slide.interaction.revealItems[activeTab].longContent}</p>
                      </div>
                   </div>
                   <div className="flex-1 relative min-h-[400px] lg:min-h-full">
                      <img key={activeTab} src={slide.interaction.revealItems[activeTab].image} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-1000" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent hidden lg:block" />
                   </div>
                </div>
             </div>
          </div>
        )}

        {slide.type === 'interactive-video' && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#111111] p-12 lg:p-16 overflow-hidden">
            <div className="w-full max-w-5xl aspect-video relative animate-in zoom-in-95 duration-700 shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden border border-white/10 bg-black">
               <iframe 
                 src={slide.content} 
                 className="absolute inset-0 w-full h-full border-none" 
                 allowFullScreen 
                 allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
                 title={slide.title}
                 onLoad={() => markSlideComplete(currentSlideIndex)} 
               />
               <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[3rem]" />
            </div>
            <div className="mt-8 text-center">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.6em]">Laboratorio de Consejería • Módulo Interactivo</p>
            </div>
          </div>
        )}

        {slide.type === 'tabs-reveal' && slide.interaction?.revealItems && (
          <div className="h-full w-full flex flex-col p-8 lg:p-16">
             <div className="mb-6 text-white shrink-0">
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-1">{slide.title}</h2>
                <div className="w-16 h-1 bg-red-500 rounded-full" />
                <p className="mt-2 text-[9px] font-black text-red-500 uppercase tracking-[0.5em] opacity-80">{slide.subtitle}</p>
             </div>
             <div className="flex-1 flex flex-col min-h-0">
                <div className="flex flex-wrap gap-1.5 shrink-0">
                   {slide.interaction.revealItems.map((item, idx) => (
                      <button key={idx} onClick={() => { setActiveTab(idx); markSlideComplete(currentSlideIndex); }} className={`px-10 py-5 rounded-t-[2rem] font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 min-w-[160px] relative overflow-hidden ${activeTab === idx ? 'bg-red-500 text-white shadow-2xl z-10 scale-105 origin-bottom' : 'bg-[#222222] text-white/30 hover:bg-[#2a2a2a]'}`}>
                         {item.title}
                      </button>
                   ))}
                </div>
                <div className="flex-1 flex flex-col lg:flex-row bg-[#2a2a2a] rounded-b-[4rem] rounded-tr-[4rem] overflow-hidden shadow-2xl border border-white/5 relative">
                   <div className="flex-[1.2] p-12 lg:p-20 overflow-y-auto custom-scrollbar flex flex-col justify-center gap-10">
                      <div key={activeTab} className="space-y-10 animate-in fade-in duration-500">
                         <div className="space-y-4">
                            <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">{slide.interaction.revealItems[activeTab].title}</h3>
                            <div className="w-16 h-1.5 bg-red-500 rounded-full" />
                         </div>
                         <p className="text-2xl lg:text-3xl font-bold text-red-500 leading-snug border-l-8 border-red-500 pl-10 bg-red-500/5 py-6 rounded-r-3xl italic">{slide.interaction.revealItems[activeTab].text}</p>
                         <p className="text-xl lg:text-2xl font-light text-slate-300 leading-relaxed max-w-3xl opacity-90">{slide.interaction.revealItems[activeTab].longContent}</p>
                      </div>
                   </div>
                   <div className="flex-1 relative min-h-[450px] lg:min-h-full">
                      <img key={activeTab} src={slide.interaction.revealItems[activeTab].image} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-700" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a2a] via-transparent to-transparent hidden lg:block" />
                   </div>
                </div>
             </div>
          </div>
        )}

        {slide.type === 'info-menu-reveal' && slide.interaction?.revealItems && (
          <div className="h-full w-full flex flex-col lg:flex-row bg-[#111111] p-12 lg:p-20 gap-12 items-center justify-center">
             <div className="w-full lg:w-[25%] flex flex-col gap-4 shrink-0">
                {slide.interaction.revealItems.map((item, idx) => (
                   <button key={idx} onClick={() => { setActiveMenuItem(idx); markSlideComplete(currentSlideIndex); }} className={`relative flex items-center justify-between px-10 py-6 rounded-2xl transition-all duration-300 font-black uppercase text-[11px] tracking-[0.2em] ${activeMenuItem === idx ? 'bg-white text-[#111111] shadow-2xl scale-110 z-10' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}>
                      <span>{item.title}</span>
                      {activeMenuItem === idx && <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-600 rounded-r-2xl" />}
                   </button>
                ))}
             </div>
             <div className="flex-1 max-w-7xl w-full flex flex-col lg:flex-row bg-white rounded-[4rem] shadow-2xl overflow-hidden animate-in slide-in-from-right-12 duration-1000">
                <div className="flex-[1.3] p-12 lg:p-20 flex flex-col gap-10">
                   <div className="space-y-5">
                      <h3 className="text-4xl lg:text-6xl font-black text-[#111111] uppercase tracking-tighter leading-none">{slide.interaction.revealItems[activeMenuItem].title}</h3>
                      <div className="w-20 h-2 bg-red-600 rounded-full" />
                   </div>
                   <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar-dark text-[#333333]">
                      <p className="text-2xl lg:text-3xl font-bold leading-snug mb-10 italic opacity-90 border-l-8 border-red-600 pl-10 py-3">{slide.interaction.revealItems[activeMenuItem].text}</p>
                      <p className="text-xl lg:text-2xl font-medium leading-relaxed opacity-80 whitespace-pre-wrap">{slide.interaction.revealItems[activeMenuItem].longContent}</p>
                   </div>
                </div>
                <div className="flex-1 relative min-h-[450px] lg:min-h-full">
                   <img key={activeMenuItem} src={slide.interaction.revealItems[activeMenuItem].image} className="absolute inset-0 w-full h-full object-cover scale-105 animate-in fade-in duration-700" alt="" />
                   <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:block hidden" />
                </div>
             </div>
          </div>
        )}

        {slide.type === 'stepped-overlay' && slide.interaction?.revealItems && (
           <div className="w-full h-full flex items-center justify-center p-12 lg:p-24 bg-[#111111]">
             <div className="relative w-full max-w-6xl bg-[#1a1a1a] rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
                <div className="p-12 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#222222]/50">
                   <h3 className="text-4xl font-black uppercase text-white tracking-tighter">{slide.title}</h3>
                   <div className="flex gap-4">
                      <button onClick={() => setInternalStep(Math.max(0, internalStep - 1))} className="p-4 bg-white/5 rounded-2xl text-white hover:bg-red-600 transition-all">{renderIcon('ChevronLeft', 24)}</button>
                      <button onClick={() => { const n = Math.min(slide.interaction!.revealItems!.length - 1, internalStep + 1); setInternalStep(n); if (n === slide.interaction!.revealItems!.length - 1) markSlideComplete(currentSlideIndex); }} className="p-4 bg-white/5 rounded-2xl text-white hover:bg-red-600 transition-all">{renderIcon('ChevronRight', 24)}</button>
                   </div>
                </div>
                <div className="flex-1 relative overflow-hidden text-white flex flex-col bg-gradient-to-br from-[#1a1a1a] to-[#222222]">
                   {slide.interaction.revealItems.map((item, i) => (
                     <div key={i} className={`absolute inset-0 p-16 flex flex-col lg:flex-row gap-16 transition-all duration-700 ${i === internalStep ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-12 z-0 pointer-events-none'}`}>
                        <img src={item.image} className="lg:w-[45%] aspect-square object-cover rounded-[2.5rem] shadow-2xl border border-white/5 animate-in zoom-in-95 duration-1000" />
                        <div className="flex-1 space-y-10 flex flex-col justify-center text-left">
                           <h4 className="text-6xl font-black uppercase tracking-tighter text-white">{item.title}</h4>
                           <div className="relative p-8 rounded-3xl border-l-8 border-red-600 bg-red-600/5">
                             <p className="text-2xl font-black text-red-500 italic">"{item.text}"</p>
                           </div>
                           <p className="text-xl lg:text-2xl opacity-80 text-slate-300 font-light leading-relaxed max-w-2xl">{item.longContent}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           </div>
        )}

        {slide.type === 'drag-drop' && (
           <div className="w-full h-full flex flex-col gap-10 relative p-12">
              <div className="text-center space-y-3 shrink-0">
                 <h2 className="text-5xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
                 <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">{slide.subtitle}</p>
              </div>
              <div className="w-full p-8 bg-white/5 rounded-[3rem] border border-white/10 flex flex-wrap justify-center gap-4 shrink-0 shadow-inner min-h-[140px]">
                 {slide.interaction?.dragItems?.map((item) => (
                    !dragAssignments[item.id] && (
                      <div key={item.id} draggable onDragStart={(e) => onDragStart(e, item.id)} className={`px-8 py-5 bg-[#2a2a2a] rounded-[1.5rem] border border-white/5 text-white font-bold text-center cursor-grab hover:border-red-600/50 transition-all flex items-center gap-3 ${rejectionId === item.id ? 'animate-shake border-red-500 bg-red-500/10' : ''}`}>
                        {renderIcon('Move', 16)}
                        {item.label}
                      </div>
                    )
                 ))}
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
                 {slide.interaction?.dragCategories?.map((cat) => (
                    <div key={cat.id} onDragOver={onDragOver} onDrop={(e) => onDrop(e, cat.id)} className="flex flex-col p-10 bg-[#1a1a1a] rounded-[4rem] border-2 border-dashed border-white/10 relative group hover:border-red-600/40 transition-all shadow-2xl overflow-hidden">
                       <h4 className="text-2xl font-black uppercase tracking-tight text-slate-400 group-hover:text-red-500 transition-colors text-center mb-8">{cat.title}</h4>
                       <div className="flex-1 flex flex-wrap gap-4 items-start justify-center overflow-y-auto custom-scrollbar">
                          {Object.entries(dragAssignments).map(([itemId, catId]) => {
                             if (catId !== cat.id) return null;
                             const item = slide.interaction?.dragItems?.find(i => i.id === itemId);
                             return (
                                <div key={itemId} className="px-6 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest text-center shadow-lg flex items-center gap-2 animate-in zoom-in-75">
                                   {renderIcon('CheckCircle2', 14)}
                                   {item?.label}
                                </div>
                             );
                          })}
                       </div>
                    </div>
                 ))}
              </div>
              {showCelebration && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
                  <div className="p-20 bg-black/40 backdrop-blur-xl rounded-[5rem] border border-red-600/30 flex flex-col items-center gap-8 ring-4 ring-red-600/10 animate-in zoom-in-95 duration-500">
                    {renderIcon('Trophy', 64)}
                    <div className="text-center space-y-2">
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white">¡Misión Cumplida!</h3>
                      <p className="text-xs font-bold text-red-500 uppercase tracking-[0.5em]">Dominio teológico total</p>
                    </div>
                  </div>
                </div>
              )}
           </div>
        )}

        {slide.type === 'hermeneutics' && (
          <div className="w-full flex flex-col gap-12 p-12">
            <div className="space-y-6 max-w-5xl text-left">
               <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">{slide.title}</h2>
               <div className="w-24 h-2 bg-red-600 rounded-full" />
               <p className="text-xl lg:text-3xl font-light opacity-90 leading-relaxed italic text-slate-300 border-l-8 border-red-600 pl-8 max-w-4xl animate-in slide-in-from-left-8">"{slide.content}"</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
               <div className="lg:w-[40%] relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl min-h-[300px]">
                  <img src={slide.visual.source} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
               </div>
               <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {slide.interaction?.revealItems?.map((item, i) => (
                    <button key={i} onClick={() => setExpandedItem(item)} className="flex items-center gap-5 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 transition-all hover:bg-white/10 hover:border-red-600/40 group hover:scale-[1.02] text-left">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-red-600 text-white transition-all shadow-lg shrink-0">
                          {renderIcon(item.icon, 24)}
                       </div>
                       <div className="text-white">
                          <span className="block font-black uppercase text-[10px] tracking-[0.2em] opacity-50 mb-1">{item.title}</span>
                          <span className="block font-bold text-sm tracking-tight">{item.text}</span>
                       </div>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        )}

        {slide.type === 'hotspot-reveal' && slide.interaction?.revealItems && (
           <div className="w-full h-full relative flex items-center justify-center p-8 lg:p-12">
              <div className="absolute inset-0 z-0 rounded-[4.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                 <img src={slide.visual.source} className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-110" alt="Map" />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
                 <div className="absolute top-16 left-16 text-white z-10">
                    <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">{slide.title}</h3>
                    <p className="text-sm font-bold text-red-500 uppercase tracking-[0.5em] mt-2">{slide.subtitle}</p>
                 </div>
                 {slide.interaction.revealItems.map((item, idx) => (
                    <button key={idx} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => setActiveHotspot(item)} className="absolute z-20 group -translate-x-1/2 -translate-y-1/2">
                       <div className="absolute w-12 h-12 bg-red-600/40 rounded-full animate-ping" />
                       <div className={`relative w-10 h-10 ${activeHotspot === item ? 'bg-white text-red-600 scale-125' : 'bg-red-600 text-white'} rounded-full flex items-center justify-center transition-all duration-300`}>
                          {renderIcon(item.icon, 18)}
                       </div>
                    </button>
                 ))}
              </div>
              {activeHotspot && (
                <div className="relative z-30 w-full max-w-2xl animate-in zoom-in-95">
                   <div className="bg-[#111111]/98 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl flex flex-col gap-8 ring-1 ring-white/5 max-h-[85vh] overflow-y-auto custom-scrollbar">
                      <div className="flex items-center justify-between border-b border-white/5 pb-6">
                         <div className="space-y-1">
                            <h4 className="text-3xl font-black uppercase text-white tracking-tighter">{activeHotspot.title}</h4>
                            <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{activeHotspot.text}</p>
                         </div>
                         <button onClick={() => setActiveHotspot(null)} className="p-3 bg-white/5 rounded-full text-white/40 hover:text-white transition-all hover:bg-red-600">{renderIcon('X', 20)}</button>
                      </div>
                      <div className="space-y-6">
                         <p className="text-lg lg:text-xl opacity-90 text-slate-200 leading-relaxed font-light whitespace-pre-wrap">{activeHotspot.longContent}</p>
                      </div>
                      <button onClick={() => { setActiveHotspot(null); markSlideComplete(currentSlideIndex); }} className="w-full py-6 bg-red-600 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.5em] text-white hover:scale-105 transition-all shadow-xl">Continuar Exploración</button>
                   </div>
                </div>
              )}
           </div>
        )}

        {slide.type === 'interactive-reveal' && slide.interaction?.type === 'grid-cards' && (
           <div className="w-full flex flex-col gap-10 p-12">
              <div className="space-y-2 text-left">
                 <h2 className="text-5xl font-black uppercase tracking-tighter text-white">{slide.title}</h2>
                 <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">{slide.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {slide.interaction.revealItems?.map((item, i) => (
                  <button key={i} onClick={() => setExpandedItem(item)} className="group relative h-[400px] rounded-[3rem] overflow-hidden border border-white/10 bg-[#2a2a2a] text-left transition-all hover:scale-[1.02]">
                    <img src={item.image} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                      <div className="mb-5 p-3 bg-red-600 rounded-xl w-fit text-white shadow-xl">{renderIcon(item.icon, 24)}</div>
                      <h4 className="text-2xl font-black uppercase text-white mb-2">{item.title}</h4>
                      <p className="text-base opacity-70 italic text-slate-300">{item.text}</p>
                    </div>
                  </button>
                ))}
              </div>
           </div>
        )}

        {expandedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 lg:p-16">
            <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setExpandedItem(null)} />
            <div className="relative w-full max-w-7xl bg-[#111111] rounded-[5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] border border-white/10 animate-in zoom-in-95">
                <div className="flex-1 min-h-[400px] lg:min-h-full">
                  <img src={expandedItem.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-12 lg:p-24 overflow-y-auto space-y-10 text-white custom-scrollbar bg-[#111111]">
                  <button onClick={() => setExpandedItem(null)} className="absolute top-10 right-10 p-4 bg-white/5 rounded-full hover:bg-red-600 transition-all">{renderIcon('X', 28)}</button>
                  <h3 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">{expandedItem.title}</h3>
                  <p className="text-2xl font-bold text-red-600 leading-tight italic border-l-8 border-red-600 pl-8 bg-red-600/5 p-6 rounded-2xl">"{expandedItem.text}"</p>
                  <p className="text-xl font-light opacity-90 leading-relaxed text-slate-200">{expandedItem.longContent}</p>
                  <button onClick={() => { setExpandedItem(null); markSlideComplete(currentSlideIndex); }} className="px-12 py-5 bg-red-600 rounded-full font-black uppercase text-xs tracking-[0.4em]">Regresar</button>
                </div>
            </div>
          </div>
        )}

        {slide.type === 'split-slider' && slide.interaction?.revealItems && (
           <div className="w-full h-full flex flex-col bg-[#111111] overflow-hidden">
              <div className="relative h-[35vh] lg:h-[40vh] w-full overflow-hidden shrink-0">
                 <img key={internalStep} src={slide.interaction.revealItems[internalStep].image || slide.visual.source} className="w-full h-full object-cover animate-in fade-in duration-700" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent" />
                 <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-600" />
              </div>
              <div className="flex-1 relative flex flex-col items-center justify-start p-6 lg:p-10">
                 <div className="w-full max-w-5xl h-full flex flex-col justify-between items-center relative gap-6">
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 lg:space-y-6 overflow-y-auto custom-scrollbar">
                       <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white animate-in zoom-in-95">{slide.interaction.revealItems[internalStep].title}</h3>
                       <p className="text-xl lg:text-2xl font-black text-red-600 italic border-l-6 border-red-600 pl-6 bg-red-600/5 py-3 rounded-r-2xl shrink-0">"{slide.interaction.revealItems[internalStep].text}"</p>
                       <p className="text-lg lg:text-xl font-light text-slate-300 max-w-3xl leading-relaxed opacity-90">{slide.interaction.revealItems[internalStep].longContent}</p>
                    </div>
                    <div className="flex gap-8 items-center pb-4 shrink-0">
                       <button onClick={() => setInternalStep(Math.max(0, internalStep - 1))} className="p-4 bg-white/5 border border-white/10 rounded-full text-slate-500 hover:text-red-500 transition-all disabled:opacity-5" disabled={internalStep === 0}>{renderIcon('ChevronLeft', 24)}</button>
                       <div className="flex gap-2">
                          {slide.interaction.revealItems.map((_, i) => (
                             <div key={i} className={`h-1.5 transition-all duration-300 rounded-full ${i === internalStep ? 'w-8 bg-red-600' : 'w-2 bg-white/10'}`} />
                          ))}
                       </div>
                       <button onClick={() => { const n = Math.min(slide.interaction!.revealItems!.length - 1, internalStep + 1); setInternalStep(n); if (n === slide.interaction!.revealItems!.length - 1) markSlideComplete(currentSlideIndex); }} className="p-4 bg-white/5 rounded-2xl text-white hover:bg-red-600 transition-all disabled:opacity-5" disabled={internalStep === slide.interaction.revealItems.length - 1}>{renderIcon('ChevronRight', 24)}</button>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {slide.type === 'quiz' && slide.interaction?.options && (
          <div className="w-full max-w-3xl space-y-10 animate-in slide-in-from-bottom-12 p-12">
             <div className="text-center space-y-4">
                <h2 className="text-5xl font-black uppercase text-white">{slide.title}</h2>
                <p className="text-xs font-bold text-red-500 uppercase tracking-[0.4em]">{slide.subtitle}</p>
             </div>
             <div className="grid grid-cols-1 gap-4">
                {slide.interaction.options.map((opt) => (
                  <button key={opt.id} onClick={() => { setSelectedOption(opt.id); markSlideComplete(currentSlideIndex); }} className={`w-full p-6 rounded-[2rem] border-2 text-left transition-all ${selectedOption === opt.id ? (opt.isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                     <div className="flex items-center gap-5">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedOption === opt.id ? (opt.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white') : 'border-white/20'}`}>
                           {selectedOption === opt.id ? (opt.isCorrect ? renderIcon('Check', 16) : renderIcon('X', 16)) : null}
                        </div>
                        <span className="text-lg font-bold text-white">{opt.label}</span>
                     </div>
                  </button>
                ))}
             </div>
          </div>
        )}

        {slide.type === 'reflection' && (
           <div className="w-full max-w-4xl space-y-10 animate-in slide-in-from-bottom-12 p-12">
              <div className="space-y-4 text-center">
                 <h2 className="text-5xl lg:text-6xl font-black uppercase text-white leading-none">{slide.title}</h2>
                 <div className="w-16 h-2 bg-red-600 mx-auto rounded-full" />
              </div>
              <p className="text-2xl font-light opacity-85 italic text-center text-white leading-relaxed">"{slide.content}"</p>
              <textarea className="w-full h-64 p-10 bg-white/5 border border-white/10 rounded-[3rem] text-xl focus:border-red-600 transition-all text-white outline-none placeholder:text-white/10 custom-scrollbar" placeholder="Escribe tu bitácora espiritual aquí..." value={notes[slide.id] || ''} onChange={(e) => { setNote(slide.id, e.target.value); markSlideComplete(currentSlideIndex); }} />
           </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(239,68,68,0.25); border-radius: 12px; }
        .custom-scrollbar-dark::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default SlideRenderer;
