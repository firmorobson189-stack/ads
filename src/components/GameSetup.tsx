import React, { useState } from 'react';
import { GameSettings } from '../types';
import { Users, Play, ArrowLeft, Clock, Award, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

interface GameSetupProps {
  onStartGame: (settings: GameSettings) => void;
  onBack: () => void;
}

const DEFAULT_NAMES = ['João', 'Pedro', 'Lucas', 'Mariana', 'Beatriz'];

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, onBack }) => {
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [playerNames, setPlayerNames] = useState<string[]>([
    DEFAULT_NAMES[0],
    DEFAULT_NAMES[1],
    DEFAULT_NAMES[2]
  ]);
  const [totalRounds, setTotalRounds] = useState<number>(15);

  const handlePlayerCountChange = (count: number) => {
    sound.playSelect();
    setPlayerCount(count);
    const updatedNames = [...playerNames];
    while (updatedNames.length < count) {
      const nextIndex = updatedNames.length;
      updatedNames.push(DEFAULT_NAMES[nextIndex] || `Jogador ${nextIndex + 1}`);
    }
    setPlayerNames(updatedNames.slice(0, count));
  };

  const handleNameChange = (index: number, newName: string) => {
    const updated = [...playerNames];
    updated[index] = newName;
    setPlayerNames(updated);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();

    // Sanitize names
    const sanitized = playerNames.map((n, i) => n.trim() || `Jogador ${i + 1}`);
    onStartGame({
      playerCount,
      playerNames: sanitized,
      totalRounds
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 bg-tactical-grid">
      <div className="max-w-xl w-full bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              onBack();
            }}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Menu</span>
          </button>
          <div className="text-right">
            <span className="text-xs font-gamer uppercase tracking-widest text-amber-400 font-bold">FF-MORFO</span>
            <h2 className="text-lg font-bold text-white font-gamer">Configuração da Partida</h2>
          </div>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          {/* Section 1: Number of players */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Número de Jogadores</span>
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {[2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handlePlayerCountChange(num)}
                  className={`py-2.5 px-3 rounded-xl font-gamer text-lg font-bold tracking-wider transition-all ${
                    playerCount === num
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 border-2 border-amber-300 scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700/80 hover:text-white'
                  }`}
                >
                  {num} Jogadores
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Player names */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Nome dos Jogadores
            </label>
            <div className="space-y-2.5">
              {playerNames.map((name, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400 font-gamer shrink-0">
                    P{index + 1}
                  </span>
                  <input
                    type="text"
                    value={name}
                    maxLength={20}
                    required
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Nome do Jogador ${index + 1}`}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950/80 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Rounds */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Duração da Partida (Total de Rodadas)</span>
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {[10, 15, 20, 25].map(rounds => (
                <button
                  key={rounds}
                  type="button"
                  onClick={() => {
                    sound.playSelect();
                    setTotalRounds(rounds);
                  }}
                  className={`py-2 px-3 rounded-xl font-gamer text-base font-bold tracking-wider transition-all ${
                    totalRounds === rounds
                      ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/25 border-2 border-orange-300 scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700/80 hover:text-white'
                  }`}
                >
                  {rounds} Rodadas
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Tempo estimado: ~{Math.round(totalRounds * 1.0)} a {Math.round(totalRounds * 1.3)} minutos (15–25 min).
            </p>
          </div>

          {/* Start button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl font-gamer text-xl font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:via-orange-400 hover:to-red-400 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>🎮 COMEÇAR PARTIDA</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
