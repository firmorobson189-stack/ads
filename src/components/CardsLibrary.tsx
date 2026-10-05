import React, { useState } from 'react';
import { ViewScreen, MorphoProcess, CardData } from '../types';
import { CARDS_DATA } from '../data/cards';
import { MORPHO_PROCESSES } from '../data/processes';
import { Layers, Search, Filter, ArrowLeft, Gamepad2, RotateCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface CardsLibraryProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const CardsLibrary: React.FC<CardsLibraryProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('TODOS');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    sound.playCardFlip();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCards = CARDS_DATA.filter(card => {
    const matchesSearch = 
      card.slang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.explanation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      selectedFilter === 'TODOS' || card.process === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    'TODOS',
    'Empréstimo',
    'Sufixação',
    'Redução',
    'Abreviação',
    'Composição',
    'Sigla',
    'Ressignificação'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
        <div>
          <button
            onClick={() => {
              sound.playSelect();
              onNavigate('HOME');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>
          <h1 className="text-3xl sm:text-5xl font-black font-gamer text-white tracking-wide flex items-center gap-3">
            <Layers className="w-8 h-8 text-orange-400" />
            <span>🃏 COLEÇÃO DE CARTAS FF-MORFO</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Explore todas as {CARDS_DATA.length} cartas de gírias do Free Fire. Clique em qualquer carta para virar e ver a morfologia completa!
          </p>
        </div>

        <button
          onClick={() => {
            sound.playSelect();
            onNavigate('SETUP');
          }}
          className="py-2.5 px-5 rounded-xl font-gamer text-base font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-orange-500/20"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Jogar Agora</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por gíria (ex: RUSHAR, CAPA, DIMA)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-400 font-semibold px-2 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtro:
          </span>
          {filterOptions.map(opt => (
            <button
              key={opt}
              onClick={() => {
                sound.playSelect();
                setSelectedFilter(opt);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-gamer font-bold tracking-wide transition-all whitespace-nowrap ${
                selectedFilter === opt
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 font-medium">Nenhuma carta encontrada com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map(card => {
            const isFlipped = !!flippedCards[card.id];
            const meta = MORPHO_PROCESSES[card.process];

            return (
              <div 
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="cursor-pointer perspective-1000 group h-80"
              >
                <div 
                  className={`relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d border shadow-xl ${
                    isFlipped 
                      ? 'border-emerald-500/60 rotate-y-180' 
                      : 'border-slate-800 hover:border-amber-500/60 hover:scale-[1.02]'
                  }`}
                >
                  {/* FRONT */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#161f32] via-[#0f172a] to-[#090d16] rounded-2xl p-5 backface-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-xs font-gamer font-bold text-orange-400 uppercase tracking-wider">
                          {card.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          #{String(card.id).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-3xl font-black font-gamer text-white tracking-wider my-2">
                        {card.slang}
                      </h3>

                      <p className="text-xs text-slate-300 line-clamp-3 mb-3">
                        {card.gameContext}
                      </p>

                      <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs italic text-amber-300">
                        "{card.example}"
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        {meta.iconSymbol} {card.process}
                      </span>
                      <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:underline">
                        <RotateCw className="w-3.5 h-3.5" /> Virar carta
                      </span>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#14233c] via-[#0f172a] to-[#090d16] rounded-2xl p-5 backface-hidden rotate-y-180 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                        <span className="text-xs font-gamer font-bold text-emerald-400 uppercase tracking-wider">
                          {meta.iconSymbol} {card.process}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          #{String(card.id).padStart(2, '0')}
                        </span>
                      </div>

                      <h4 className="text-xl font-black font-gamer text-white mb-2">
                        {card.slang}
                      </h4>

                      <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-xs mb-2">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Origem</span>
                        <span className="text-white font-bold">{card.origin}</span>
                      </div>

                      {card.formation && (
                        <div className="bg-amber-950/30 p-2 rounded-lg border border-amber-500/20 text-xs mb-2">
                          <span className="text-amber-400 font-bold">Formação: </span>
                          <span className="font-mono text-slate-200">{card.formation}</span>
                        </div>
                      )}

                      <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/50 p-2 rounded border border-slate-800/60">
                        {card.explanation}
                      </p>
                    </div>

                    <div className="pt-2 text-right">
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <RotateCw className="w-3 h-3" /> Clique para desvirar
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
