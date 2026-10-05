import React from 'react';
import { ViewScreen } from '../types';
import { Gamepad2, BookOpen, Layers, HelpCircle, Info, Sparkles, Flame, Shield, Target } from 'lucide-react';
import { sound } from '../utils/audio';

interface HomeMenuProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const HomeMenu: React.FC<HomeMenuProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-tactical-grid">
      {/* Subtle glowing ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        
        {/* Main Title Badge / Icon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-950/40 text-orange-400 text-xs sm:text-sm font-semibold mb-6 tracking-wide shadow-inner">
          <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>Jogo de Cartas Educativo · Morfologia da Língua Portuguesa</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black font-gamer tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-sm mb-3">
          🎴 FF-MORFO
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-bold text-amber-400 font-gamer tracking-wide mb-4 max-w-xl">
          "Descubra como surgiram as gírias do Free Fire!"
        </p>

        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex items-center justify-center gap-3 text-sm text-slate-400 mb-8 font-medium">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            2–5 jogadores
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">15–25 minutos</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Ensino Fundamental II & Médio</span>
        </div>

        {/* Interactive Sample Card Teaser */}
        <div className="mb-10 w-full max-w-sm perspective-1000 group">
          <div className="relative bg-gradient-to-b from-slate-900 via-slate-900/95 to-[#0d121f] border border-orange-500/40 rounded-2xl p-5 shadow-2xl shadow-orange-950/40 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs">
              <span className="text-orange-400 font-bold uppercase tracking-wider font-gamer flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> Gíria de Combate
              </span>
              <span className="text-slate-400">Carta Exemplo</span>
            </div>

            <div className="text-3xl font-black font-gamer text-white tracking-widest my-2">
              RUSHAR
            </div>

            <p className="text-xs text-slate-300 italic mb-3 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              "De onde surgiu essa gíria e qual processo de formação de palavras está presente nela?"
            </p>

            <div className="grid grid-cols-2 gap-2 text-left text-xs">
              <div className="p-2 rounded bg-blue-950/40 border border-blue-500/30">
                <span className="block text-[10px] text-blue-400 uppercase font-bold">Processo</span>
                <span className="text-slate-200 font-semibold">🔵 Empréstimo (+2)</span>
              </div>
              <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30">
                <span className="block text-[10px] text-amber-400 uppercase font-bold">Origem</span>
                <span className="text-slate-200 font-semibold">Inglês — rush (+1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="w-full max-w-md flex flex-col gap-3.5">
          {/* 🎮 JOGAR */}
          <button
            onClick={() => {
              sound.playSelect();
              onNavigate('SETUP');
            }}
            className="w-full py-4 px-6 rounded-xl font-gamer text-xl font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:via-orange-400 hover:to-red-400 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Gamepad2 className="w-6 h-6" />
            <span>🎮 JOGAR</span>
          </button>

          {/* Secondary Grid Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* 📖 COMO JOGAR */}
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('RULES');
              }}
              className="py-3 px-4 rounded-xl font-gamer text-base sm:text-lg font-bold tracking-wide text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>📖 COMO JOGAR</span>
            </button>

            {/* 🃏 CARTAS */}
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('CARDS_LIBRARY');
              }}
              className="py-3 px-4 rounded-xl font-gamer text-base sm:text-lg font-bold tracking-wide text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Layers className="w-5 h-5 text-orange-400" />
              <span>🃏 CARTAS</span>
            </button>

            {/* 📚 APRENDER */}
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('LEARN');
              }}
              className="py-3 px-4 rounded-xl font-gamer text-base sm:text-lg font-bold tracking-wide text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>📚 APRENDER</span>
            </button>

            {/* ℹ️ SOBRE */}
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('ABOUT');
              }}
              className="py-3 px-4 rounded-xl font-gamer text-base sm:text-lg font-bold tracking-wide text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Info className="w-5 h-5 text-blue-400" />
              <span>ℹ️ SOBRE</span>
            </button>
          </div>
        </div>

        {/* The 7 Morphological Processes Quick Pill Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 max-w-2xl w-full">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
            7 Processos de Formação Presentes no Jogo:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-300">
            <span className="px-2.5 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">🔵 Empréstimo</span>
            <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">🟡 Sufixação</span>
            <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">🟢 Redução</span>
            <span className="px-2.5 py-1 rounded bg-orange-950/60 border border-orange-500/30 text-orange-300">🟠 Abreviação</span>
            <span className="px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300">🔴 Composição</span>
            <span className="px-2.5 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">🟣 Sigla</span>
            <span className="px-2.5 py-1 rounded bg-amber-900/40 border border-amber-600/30 text-amber-200">🟤 Ressignificação</span>
          </div>
        </div>

      </div>
    </div>
  );
};
