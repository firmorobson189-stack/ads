import React from 'react';
import { ViewScreen } from '../types';
import { HelpCircle, ArrowLeft, Gamepad2, Award, Users, Clock, CheckCircle2, Star } from 'lucide-react';
import { sound } from '../utils/audio';

interface HowToPlayModalProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
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
            <HelpCircle className="w-8 h-8 text-amber-400" />
            <span>📖 COMO JOGAR O FF-MORFO</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Regras simples, dinâmicas e educativas para jogar em sala de aula ou com amigos.
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

      {/* Info strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <Users className="w-6 h-6 text-amber-400" />
          <div>
            <span className="block text-xs uppercase text-slate-400 font-bold">Jogadores</span>
            <span className="font-gamer font-bold text-white text-lg">2 a 5 Jogadores</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <Clock className="w-6 h-6 text-orange-400" />
          <div>
            <span className="block text-xs uppercase text-slate-400 font-bold">Duração Média</span>
            <span className="font-gamer font-bold text-white text-lg">15 a 25 Minutos</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <Award className="w-6 h-6 text-emerald-400" />
          <div>
            <span className="block text-xs uppercase text-slate-400 font-bold">Pontuação Máx.</span>
            <span className="font-gamer font-bold text-white text-lg">Até 3 ⭐ por carta</span>
          </div>
        </div>
      </div>

      {/* The 5 Steps Rule Flow */}
      <div className="space-y-4 mb-10">
        <h2 className="text-xl sm:text-2xl font-black font-gamer text-white mb-4">
          A Rodada Passo a Passo (Regra Principal)
        </h2>

        {/* Step 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-gamer font-black text-xl shrink-0">
            1
          </div>
          <div>
            <h3 className="font-gamer font-bold text-lg text-white">
              Revelação da Carta da Rodada
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Uma carta de Free Fire é sorteada no centro da mesa (ex: <strong>RUSHAR</strong>, <strong>CAPA</strong>, <strong>DIMA</strong>, <strong>HS</strong>). A tela avisa de quem é a vez de jogar.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-gamer font-black text-xl shrink-0">
            2
          </div>
          <div>
            <h3 className="font-gamer font-bold text-lg text-white">
              A Grande Pergunta
            </h3>
            <p className="text-sm text-slate-300 mt-1 italic text-amber-300 font-semibold">
              "De onde surgiu essa gíria e qual processo de formação de palavras está presente nela?"
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-gamer font-black text-xl shrink-0">
            3
          </div>
          <div>
            <h3 className="font-gamer font-bold text-lg text-white">
              Identificação do Processo (+2 Pontos)
            </h3>
            <p className="text-sm text-slate-300 mt-1 mb-3">
              O jogador escolhe entre os 7 processos morfológicos disponíveis:
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 font-bold">🔵 Empréstimo</span>
              <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 font-bold">🟡 Sufixação</span>
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">🟢 Redução</span>
              <span className="px-2.5 py-1 rounded bg-orange-950/60 border border-orange-500/30 text-orange-300 font-bold">🟠 Abreviação</span>
              <span className="px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300 font-bold">🔴 Composição</span>
              <span className="px-2.5 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-bold">🟣 Sigla</span>
              <span className="px-2.5 py-1 rounded bg-amber-900/40 border border-amber-600/30 text-amber-200 font-bold">🟤 Ressignificação</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-gamer font-black text-xl shrink-0">
            4
          </div>
          <div>
            <h3 className="font-gamer font-bold text-lg text-white">
              Identificação da Origem (+1 Ponto)
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              O jogador responde a alternativa de onde a gíria se originou (ex: Português, Inglês — rush, Espanhol, Francês).
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-gamer font-black text-xl shrink-0">
            5
          </div>
          <div>
            <h3 className="font-gamer font-bold text-lg text-white">
              Gabarito, Explicação e Pontuação
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              A carta vira em 3D, mostrando a origem, a raiz, a adaptação com sufixo e o exemplo. Os pontos são somados ao placar e a vez passa para o próximo jogador!
            </p>
          </div>
        </div>
      </div>

      {/* Scoring Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-black font-gamer text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Tabela de Pontuação por Rodada</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-xs text-slate-400 uppercase font-bold">Processo Correto</span>
            <span className="text-2xl font-black font-gamer text-emerald-400">+2 PONTOS</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-xs text-slate-400 uppercase font-bold">Origem Correta</span>
            <span className="text-2xl font-black font-gamer text-blue-400">+1 PONTO</span>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/50">
            <span className="block text-xs text-amber-300 uppercase font-bold">Ambos Corretos</span>
            <span className="text-2xl font-black font-gamer text-amber-400">+3 PONTOS ⭐</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-xs text-slate-400 uppercase font-bold">Nenhum Correto</span>
            <span className="text-2xl font-black font-gamer text-rose-400">0 PONTOS</span>
          </div>
        </div>
      </div>

    </div>
  );
};
