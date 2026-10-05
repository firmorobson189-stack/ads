import React, { useState, useEffect } from 'react';
import { CardData, MorphoProcess, Player, TurnStep, GameSettings } from '../types';
import { MORPHO_PROCESSES } from '../data/processes';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Info, 
  Target, 
  User, 
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface GameBoardProps {
  settings: GameSettings;
  deck: CardData[];
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onFinishGame: () => void;
  onExitToMenu: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  settings,
  deck,
  players,
  onUpdatePlayers,
  onFinishGame,
  onExitToMenu
}) => {
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [step, setStep] = useState<TurnStep>('CHOOSE_PROCESS');
  const [selectedProcess, setSelectedProcess] = useState<MorphoProcess | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [pointsAwarded, setPointsAwarded] = useState<number>(0);
  const [feedbackAnim, setFeedbackAnim] = useState<string | null>(null);

  // Determine current card
  const currentCardIndex = (currentRound - 1) % deck.length;
  const currentCard = deck[currentCardIndex];
  const currentPlayer = players[currentPlayerIndex];

  // Process list array
  const processKeys: MorphoProcess[] = [
    'Empréstimo',
    'Sufixação',
    'Redução',
    'Abreviação',
    'Composição',
    'Sigla',
    'Ressignificação'
  ];

  // Reset step states when round or player changes
  const startNewTurn = () => {
    setStep('CHOOSE_PROCESS');
    setSelectedProcess(null);
    setSelectedOrigin(null);
    setIsCardFlipped(false);
    setPointsAwarded(0);
    setFeedbackAnim(null);
  };

  // Step 3: Handle Process Selection
  const handleSelectProcess = (process: MorphoProcess) => {
    sound.playSelect();
    setSelectedProcess(process);
    setStep('CHOOSE_ORIGIN');
  };

  // Step 4: Handle Origin Selection & Calculate Points
  const handleSelectOrigin = (origin: string) => {
    setSelectedOrigin(origin);
    setIsCardFlipped(true);
    sound.playCardFlip();

    const isProcessCorrect = selectedProcess === currentCard.process;
    const isOriginCorrect = origin === currentCard.origin;

    let pts = 0;
    if (isProcessCorrect && isOriginCorrect) {
      pts = 3;
      setFeedbackAnim('+3');
      sound.playCorrect();
      triggerConfetti(2000);
    } else if (isProcessCorrect && !isOriginCorrect) {
      pts = 2;
      setFeedbackAnim('+2');
      sound.playCorrect();
    } else if (!isProcessCorrect && isOriginCorrect) {
      pts = 1;
      setFeedbackAnim('+1');
      sound.playPartial();
    } else {
      pts = 0;
      setFeedbackAnim('0');
      sound.playWrong();
    }

    setPointsAwarded(pts);

    // Update Player Record
    const updatedPlayers = players.map((p, idx) => {
      if (idx !== currentPlayerIndex) return p;
      return {
        ...p,
        score: p.score + pts,
        correctProcessCount: p.correctProcessCount + (isProcessCorrect ? 1 : 0),
        correctOriginCount: p.correctOriginCount + (isOriginCorrect ? 1 : 0),
        perfectCardsCount: p.perfectCardsCount + (pts === 3 ? 1 : 0),
        answers: [
          ...p.answers,
          {
            cardId: currentCard.id,
            slang: currentCard.slang,
            chosenProcess: selectedProcess!,
            chosenOrigin: origin,
            processCorrect: isProcessCorrect,
            originCorrect: isOriginCorrect,
            pointsEarned: pts,
            roundNumber: currentRound
          }
        ]
      };
    });

    onUpdatePlayers(updatedPlayers);
    setStep('REVEAL_ANSWER');
  };

  // Handle Next Player or Game Over
  const handleNextTurn = () => {
    sound.playSelect();
    if (currentRound >= settings.totalRounds) {
      onFinishGame();
      return;
    }

    const nextRound = currentRound + 1;
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

    setCurrentRound(nextRound);
    setCurrentPlayerIndex(nextPlayerIndex);
    startNewTurn();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Top Game Bar: Round Counter & Turn Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:px-6 mb-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Partida em Andamento
            </span>
            <span className="text-xl sm:text-2xl font-black font-gamer text-amber-400 tracking-wider">
              RODADA {currentRound}/{settings.totalRounds}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2.5 bg-slate-950/80 px-4 py-1.5 rounded-xl border border-orange-500/30">
            <User className="w-4 h-4 text-orange-400" />
            <div className="text-left">
              <span className="block text-[10px] uppercase text-slate-400 font-bold">Vez de Jogar:</span>
              <span className="text-base sm:text-lg font-black font-gamer text-white tracking-wide">
                {currentPlayer.name}
              </span>
            </div>
          </div>
        </div>

        {/* Action / Quit */}
        <button
          onClick={() => {
            if (window.confirm('Deseja realmente sair da partida atual e voltar ao menu? O progresso será encerrado.')) {
              sound.playSelect();
              onExitToMenu();
            }
          }}
          className="text-xs text-slate-400 hover:text-rose-400 transition-colors py-1 px-3 rounded-lg border border-slate-800 hover:border-rose-500/40"
        >
          Sair da Partida
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Stage (Card + Questions) - 8 cols */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          {/* 3D Card Display */}
          <div className="w-full max-w-lg mb-6 perspective-1000">
            <div 
              className={`relative w-full rounded-2xl transition-transform duration-700 transform-style-3d shadow-2xl border-2 ${
                isCardFlipped 
                  ? 'border-emerald-500/60 shadow-emerald-950/40' 
                  : 'border-orange-500/50 shadow-orange-950/40 glow-orange'
              } ${isCardFlipped ? 'rotate-y-180' : ''}`}
            >
              
              {/* CARD FRONT: Shown during questions */}
              <div className="w-full bg-gradient-to-b from-[#161f32] via-[#0f172a] to-[#0b0f19] rounded-2xl p-6 sm:p-8 backface-hidden">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎴</span>
                    <span className="text-xs font-gamer uppercase tracking-widest text-orange-400 font-bold">
                      {currentCard.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Carta #{String(currentCard.id).padStart(2, '0')}
                  </span>
                </div>

                <div className="text-center py-4 sm:py-6">
                  <h2 className="text-4xl sm:text-6xl font-black font-gamer text-white tracking-widest drop-shadow-md">
                    {currentCard.slang}
                  </h2>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300">
                    <span className="text-slate-400">Contexto:</span> {currentCard.gameContext}
                  </div>
                </div>

                <div className="mt-4 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-center">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Exemplo de Uso no Free Fire
                  </span>
                  <p className="text-sm font-medium text-amber-300/90 italic">
                    "{currentCard.example}"
                  </p>
                </div>
              </div>

              {/* CARD BACK: Revealed after answering */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#15233b] via-[#0f172a] to-[#090d16] rounded-2xl p-6 sm:p-8 backface-hidden rotate-y-180 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-gamer uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Gabarito Morfológico
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      #{String(currentCard.id).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black font-gamer text-white tracking-wider mb-2">
                    {currentCard.slang}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Processo</span>
                      <span className="text-slate-100 font-bold">
                        {MORPHO_PROCESSES[currentCard.process].iconSymbol} {currentCard.process}
                      </span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Origem</span>
                      <span className="text-slate-100 font-bold">{currentCard.origin}</span>
                    </div>
                  </div>

                  {currentCard.formation && (
                    <div className="bg-amber-950/30 border border-amber-500/20 p-2 rounded-lg text-xs mb-2">
                      <span className="text-amber-400 font-bold">Formação: </span>
                      <span className="text-slate-200 font-mono">{currentCard.formation}</span>
                      {currentCard.relatedProcess && (
                        <span className="block text-[11px] text-slate-300 mt-0.5">
                          <strong className="text-slate-400">Adaptação:</strong> {currentCard.relatedProcess}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    {currentCard.explanation}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* QUESTION BOX: Follows Prompt Requirement */}
          <div className="w-full max-w-lg bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            
            {/* Header prompt */}
            <div className="text-center mb-5">
              <span className="inline-block text-xs uppercase font-bold tracking-widest text-amber-400 font-gamer mb-1">
                Pergunta da Rodada
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                "De onde surgiu essa gíria e qual processo de formação de palavras está presente nela?"
              </h3>
            </div>

            {/* STEP 3: Choose Process */}
            {step === 'CHOOSE_PROCESS' && (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-slate-300">
                    1️⃣ Escolha o Processo de Formação:
                  </span>
                  <span className="text-amber-400 font-medium">Vale +2 Pontos</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {processKeys.map((proc) => {
                    const meta = MORPHO_PROCESSES[proc];
                    return (
                      <button
                        key={proc}
                        onClick={() => handleSelectProcess(proc)}
                        className={`p-3 rounded-xl border text-left transition-all font-gamer text-base font-bold flex items-center justify-between group hover:scale-[1.02] active:scale-[0.98] ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{meta.iconSymbol}</span>
                          <span>{proc}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-slate-400 text-center mt-4">
                  Dica: Pense se a palavra veio do inglês, foi encurtada, recebeu sufixo ou ganhou novo sentido!
                </p>
              </div>
            )}

            {/* STEP 4: Choose Origin */}
            {step === 'CHOOSE_ORIGIN' && (
              <div>
                <div className="mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">Processo Escolhido: </span>
                    <span className="text-white font-bold">
                      {selectedProcess && MORPHO_PROCESSES[selectedProcess].iconSymbol} {selectedProcess}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playSelect();
                      setStep('CHOOSE_PROCESS');
                    }}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Alterar
                  </button>
                </div>

                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-slate-300">
                    2️⃣ De onde surgiu "{currentCard.slang}"?
                  </span>
                  <span className="text-amber-400 font-medium">Vale +1 Ponto</span>
                </div>

                <div className="space-y-2.5">
                  {currentCard.originOptions.map((opt, idx) => {
                    const letters = ['A', 'B', 'C', 'D'];
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOrigin(opt)}
                        className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-400/80 text-left transition-all font-gamer text-base font-bold text-slate-200 flex items-center gap-3 group hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-amber-400 font-bold group-hover:border-amber-400 transition-colors">
                          {letters[idx]}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: Reveal Answer & Detailed Explanation */}
            {step === 'REVEAL_ANSWER' && (
              <div>
                {/* Points banner animation */}
                <div className={`text-center py-3 px-4 rounded-xl mb-4 border ${
                  pointsAwarded === 3
                    ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-amber-400 text-amber-300'
                    : pointsAwarded > 0
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                }`}>
                  <div className="text-2xl sm:text-3xl font-black font-gamer tracking-wider flex items-center justify-center gap-2">
                    {pointsAwarded === 3 && <span>⭐ +3 PONTOS! (RESPOSTA PERFEITA!)</span>}
                    {pointsAwarded === 2 && <span>⭐ +2 PONTOS! (PROCESSO CORRETO!)</span>}
                    {pointsAwarded === 1 && <span>⭐ +1 PONTO! (ORIGEM CORRETA!)</span>}
                    {pointsAwarded === 0 && <span>0 PONTOS (NÃO FOI DESSA VEZ!)</span>}
                  </div>
                </div>

                {/* Answer breakdown section */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-4 space-y-3">
                  <h4 className="text-xs uppercase font-gamer tracking-widest text-slate-400 font-bold border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>📖 RESPOSTA COMPLETA</span>
                    <span className="text-amber-400">Gíria: {currentCard.slang}</span>
                  </h4>

                  {/* Process validation */}
                  <div className="flex items-start justify-between text-xs pb-2 border-b border-slate-800/60">
                    <div>
                      <span className="text-slate-400 block">Processo de Formação:</span>
                      <span className="text-white font-bold">
                        {MORPHO_PROCESSES[currentCard.process].iconSymbol} {currentCard.process}
                      </span>
                      {selectedProcess !== currentCard.process && (
                        <span className="block text-rose-400 text-[11px]">
                          Você escolheu: {selectedProcess}
                        </span>
                      )}
                    </div>
                    <div>
                      {selectedProcess === currentCard.process ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                          <CheckCircle2 className="w-3.5 h-3.5" /> +2 pts
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40">
                          <XCircle className="w-3.5 h-3.5" /> 0 pts
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Origin validation */}
                  <div className="flex items-start justify-between text-xs pb-2 border-b border-slate-800/60">
                    <div>
                      <span className="text-slate-400 block">Origem da Gíria:</span>
                      <span className="text-white font-bold">{currentCard.origin}</span>
                      {selectedOrigin !== currentCard.origin && (
                        <span className="block text-rose-400 text-[11px]">
                          Você escolheu: {selectedOrigin}
                        </span>
                      )}
                    </div>
                    <div>
                      {selectedOrigin === currentCard.origin ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                          <CheckCircle2 className="w-3.5 h-3.5" /> +1 pt
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40">
                          <XCircle className="w-3.5 h-3.5" /> 0 pts
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Morphological explanation */}
                  <div className="text-xs text-slate-300 pt-1 space-y-1.5">
                    {currentCard.relatedProcess && (
                      <p>
                        <strong className="text-slate-400">Adaptação:</strong> {currentCard.relatedProcess}
                      </p>
                    )}
                    {currentCard.formation && (
                      <p>
                        <strong className="text-slate-400">Formação:</strong>{' '}
                        <span className="font-mono text-amber-300">{currentCard.formation}</span>
                      </p>
                    )}
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-slate-400">Explicação:</strong> {currentCard.explanation}
                    </p>
                    <p className="text-slate-400 italic pt-1">
                      "{currentCard.example}"
                    </p>
                  </div>
                </div>

                {/* Next Player / Finish Button */}
                <button
                  onClick={handleNextTurn}
                  className="w-full py-3.5 px-6 rounded-xl font-gamer text-lg font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:via-orange-400 hover:to-red-400 shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <span>
                    {currentRound >= settings.totalRounds
                      ? '🏆 VER RESULTADO FINAL'
                      : '➡️ PRÓXIMO JOGADOR'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Sidebar: Real-time Scoreboard (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-gamer font-bold text-lg text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>🏆 PLACAR AO VIVO</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {players.length} Jogadores
              </span>
            </div>

            {/* Players ranking list */}
            <div className="space-y-2.5">
              {[...players]
                .sort((a, b) => b.score - a.score)
                .map((p, index) => {
                  const isCurrent = p.id === currentPlayer.id;
                  return (
                    <div
                      key={p.id}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-500/80 shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-gamer font-bold ${
                          index === 0
                            ? 'bg-amber-400 text-slate-950'
                            : index === 1
                            ? 'bg-slate-300 text-slate-950'
                            : index === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <span className={`font-gamer font-bold text-sm tracking-wide ${
                            isCurrent ? 'text-amber-400' : 'text-slate-200'
                          }`}>
                            {p.name}
                          </span>
                          {isCurrent && (
                            <span className="block text-[10px] text-amber-400 font-medium">
                              ● Jogando agora
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-gamer font-black text-lg text-white tabular-nums">
                          {p.score} <span className="text-amber-400 text-sm">⭐</span>
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {p.correctProcessCount}P / {p.correctOriginCount}O
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Quick Scoring Rules reminder */}
            <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
              <span className="block font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                Sistema de Pontos por Carta:
              </span>
              <div className="flex items-center justify-between">
                <span>Processo correto:</span>
                <span className="text-emerald-400 font-bold">+2 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Origem correta:</span>
                <span className="text-emerald-400 font-bold">+1 pt</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Os dois corretos:</span>
                <span className="text-amber-400 font-bold">+3 pts ⭐</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
