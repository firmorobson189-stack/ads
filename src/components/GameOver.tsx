import React, { useEffect, useState } from 'react';
import { Player, ViewScreen } from '../types';
import { Trophy, Medal, RotateCcw, Home, Layers, BookOpen, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface GameOverProps {
  players: Player[];
  onRestartGame: () => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  players,
  onRestartGame,
  onNavigate
}) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Sort players descending by score
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  useEffect(() => {
    sound.playVictory();
    triggerConfetti(3500);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Victory Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 mb-4 shadow-xl">
          <Trophy className="w-12 h-12 animate-bounce" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-gamer tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
          🏆 FIM DA PARTIDA!
        </h1>
        <p className="text-slate-300 text-base sm:text-lg font-gamer mt-2">
          Parabéns a todos os jogadores! Confiram o desempenho morfológico:
        </p>
      </div>

      {/* Podium Highlight */}
      <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center pb-6 border-b border-slate-800">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold font-gamer">
            Grande Campeão(ã)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-gamer text-white mt-1">
            👑 {winner.name}
          </h2>
          <div className="mt-2 text-2xl font-black font-gamer text-amber-400">
            {winner.score} PONTOS ⭐
          </div>
        </div>

        {/* Full Players Ranking */}
        <div className="mt-6 space-y-3">
          {sortedPlayers.map((player, index) => {
            const totalQuestions = player.answers.length;
            const fullCorrect = player.perfectCardsCount;
            const wrongCount = player.answers.filter(a => !a.processCorrect && !a.originCorrect).length;

            return (
              <div
                key={player.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  index === 0
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-lg'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl font-gamer font-bold flex items-center justify-center text-sm ${
                    index === 0
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                      : index === 1
                      ? 'bg-slate-300 text-slate-950'
                      : index === 2
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {index + 1}º
                  </span>

                  <div>
                    <h3 className="text-lg font-black font-gamer text-white">
                      {player.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-emerald-400 font-medium">
                        ✅ {player.correctProcessCount} processos corretos
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-400 font-medium">
                        🌎 {player.correctOriginCount} origens corretas
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-rose-400 font-medium">
                        ❌ {wrongCount} erros totais
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-2xl font-black font-gamer text-amber-400 tabular-nums">
                      {player.score}
                    </span>
                    <span className="text-xs text-slate-400 block">pontos</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed History Accordion Toggle */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={() => {
              sound.playSelect();
              setShowHistory(!showHistory);
            }}
            className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
          >
            <span>{showHistory ? 'Ocultar Detalhes das Rodadas' : 'Ver Gabarito de Cada Jogador'}</span>
            {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showHistory && (
            <div className="mt-4 text-left space-y-4 max-h-96 overflow-y-auto pr-1">
              {sortedPlayers.map(p => (
                <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-gamer font-bold text-amber-400 text-sm mb-2">
                    Respostas de {p.name}:
                  </h4>
                  {p.answers.length === 0 ? (
                    <p className="text-xs text-slate-500">Nenhuma carta respondida.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {p.answers.map((ans, i) => (
                        <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-white block">
                              {ans.slang}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Processo: {ans.processCorrect ? '✅' : '❌'} {ans.chosenProcess}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              Origem: {ans.originCorrect ? '✅' : '❌'} {ans.chosenOrigin}
                            </span>
                          </div>
                          <span className="font-gamer font-bold text-amber-400 text-sm">
                            +{ans.pointsEarned} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Action Buttons: Requirements: 🔄 JOGAR NOVAMENTE, 🏠 MENU, 🃏 VER CARTAS, 📚 APRENDER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <button
          onClick={() => {
            sound.playSelect();
            onRestartGame();
          }}
          className="py-3.5 px-4 rounded-xl font-gamer text-lg font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>🔄 JOGAR NOVAMENTE</span>
        </button>

        <button
          onClick={() => {
            sound.playSelect();
            onNavigate('HOME');
          }}
          className="py-3.5 px-4 rounded-xl font-gamer text-lg font-bold uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5 text-amber-400" />
          <span>🏠 MENU</span>
        </button>

        <button
          onClick={() => {
            sound.playSelect();
            onNavigate('CARDS_LIBRARY');
          }}
          className="py-3.5 px-4 rounded-xl font-gamer text-lg font-bold uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
        >
          <Layers className="w-5 h-5 text-orange-400" />
          <span>🃏 VER CARTAS</span>
        </button>

        <button
          onClick={() => {
            sound.playSelect();
            onNavigate('LEARN');
          }}
          className="py-3.5 px-4 rounded-xl font-gamer text-lg font-bold uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <span>📚 APRENDER</span>
        </button>
      </div>

    </div>
  );
};
