import React from 'react';
import { ViewScreen } from '../types';
import { Volume2, VolumeX, BookOpen, Layers, HelpCircle, Gamepad2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playSelect();
            onNavigate('HOME');
          }}
          className="text-xl sm:text-2xl font-black font-gamer tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:opacity-90 transition-opacity flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
        >
          <span className="text-xl">🎴</span>
          <span>FF-MORFO</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              sound.playSelect();
              onNavigate('SETUP');
            }}
            className={`transition-colors hover:text-amber-400 pb-0.5 ${
              currentScreen === 'SETUP' || currentScreen === 'GAME'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            Jogar
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              onNavigate('RULES');
            }}
            className={`transition-colors hover:text-amber-400 pb-0.5 ${
              currentScreen === 'RULES'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            Como Jogar
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              onNavigate('CARDS_LIBRARY');
            }}
            className={`transition-colors hover:text-amber-400 pb-0.5 ${
              currentScreen === 'CARDS_LIBRARY'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            Cartas
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              onNavigate('LEARN');
            }}
            className={`transition-colors hover:text-amber-400 pb-0.5 ${
              currentScreen === 'LEARN'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            Aprender
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              onNavigate('ABOUT');
            }}
            className={`transition-colors hover:text-amber-400 pb-0.5 ${
              currentScreen === 'ABOUT'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            Sobre
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Ativar som' : 'Silenciar som'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title={isMuted ? 'Ativar som' : 'Desativar som'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>

          {currentScreen !== 'GAME' && currentScreen !== 'SETUP' && (
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('SETUP');
              }}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-bold tracking-wide uppercase font-gamer text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 rounded-lg shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Jogar Agora
            </button>
          )}

          {/* Mobile navigation menu shortcut */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('RULES');
              }}
              className="p-2 text-slate-400 hover:text-amber-400"
              title="Regras"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('CARDS_LIBRARY');
              }}
              className="p-2 text-slate-400 hover:text-amber-400"
              title="Cartas"
            >
              <Layers className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                onNavigate('LEARN');
              }}
              className="p-2 text-slate-400 hover:text-amber-400"
              title="Aprender"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
