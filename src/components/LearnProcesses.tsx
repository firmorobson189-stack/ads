import React, { useState } from 'react';
import { ViewScreen, MorphoProcess } from '../types';
import { MORPHO_PROCESSES } from '../data/processes';
import { BookOpen, ArrowLeft, Gamepad2, Layers, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface LearnProcessesProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const LearnProcesses: React.FC<LearnProcessesProps> = ({ onNavigate }) => {
  const [selectedProcess, setSelectedProcess] = useState<MorphoProcess>('Empréstimo');

  const processList: MorphoProcess[] = [
    'Empréstimo',
    'Sufixação',
    'Redução',
    'Abreviação',
    'Composição',
    'Sigla',
    'Ressignificação'
  ];

  const activeMeta = MORPHO_PROCESSES[selectedProcess];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
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
            <BookOpen className="w-8 h-8 text-emerald-400" />
            <span>📚 APRENDA OS PROCESSOS</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Guia pedagógico de morfologia e formação de palavras aplicado ao vocabulário do Free Fire para o Ensino Fundamental II e Ensino Médio.
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

      {/* Process Selection Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {processList.map(proc => {
          const meta = MORPHO_PROCESSES[proc];
          const isSelected = selectedProcess === proc;
          return (
            <button
              key={proc}
              onClick={() => {
                sound.playSelect();
                setSelectedProcess(proc);
              }}
              className={`py-2 px-3.5 rounded-xl font-gamer text-base font-bold tracking-wide transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
              }`}
            >
              <span>{meta.iconSymbol}</span>
              <span>{proc}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Process Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl sm:text-4xl">{activeMeta.iconSymbol}</span>
          <div>
            <span className="text-xs uppercase font-gamer font-bold tracking-widest text-amber-400">
              Processo Morfológico
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-gamer text-white">
              {activeMeta.name}
            </h2>
          </div>
        </div>

        {/* Short Definition Prompt */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-1">
            Resumo Essencial
          </span>
          <p className="text-lg font-bold text-amber-300">
            "{activeMeta.shortDesc}"
          </p>
        </div>

        {/* Detailed Definition */}
        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
          <p>{activeMeta.definition}</p>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30">
            <h4 className="font-gamer font-bold text-amber-400 text-base mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Dica Gramatical para a Partida
            </h4>
            <p className="text-xs sm:text-sm text-slate-200">
              {activeMeta.grammarTip}
            </p>
          </div>
        </div>

        {/* Free Fire Examples */}
        <div className="border-t border-slate-800 pt-5">
          <span className="text-xs uppercase font-gamer font-bold tracking-wider text-slate-400 block mb-2">
            Exemplos Reais no Free Fire:
          </span>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs sm:text-sm text-emerald-300">
            {activeMeta.ffExample}
          </div>
        </div>
      </div>

      {/* Educational Section: Origem vs. Adaptação (Prompt Section 9) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-black font-gamer text-white mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span>Importante: Origem da Palavra vs. Processo de Formação</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          No jogo **FF-MORFO**, diferenciamos rigorosamente a <strong>origem da palavra</strong> (a língua de onde a raiz veio) do <strong>processo de formação e adaptação</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <h4 className="font-gamer font-bold text-amber-400 text-base mb-1">
              Exemplo: RUSHAR
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><strong>Origem:</strong> Inglês — <em>rush</em></li>
              <li><strong>Processo principal:</strong> Empréstimo linguístico</li>
              <li><strong>Adaptação:</strong> Sufixação com "-ar" (transformação em verbo português)</li>
              <li><strong>Formação:</strong> RUSH + AR</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <h4 className="font-gamer font-bold text-amber-400 text-base mb-1">
              Exemplo: CAPA
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><strong>Origem:</strong> Português — <em>capa</em></li>
              <li><strong>Processo principal:</strong> Ressignificação semântica</li>
              <li><strong>Contexto no Free Fire:</strong> O tiro na cabeça (headshot)</li>
              <li><strong>Uso:</strong> "Subir capa", "dei três capas"</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick All 7 Processes Cheat-Sheet Table */}
      <div className="mt-10">
        <h3 className="text-lg font-black font-gamer text-white mb-4">
          Tabela Comparativa Rápida dos 7 Processos
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-gamer font-bold">
                <th className="p-3">Processo</th>
                <th className="p-3">Definição Sintética</th>
                <th className="p-3">Gíria Típica de Free Fire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {processList.map(proc => {
                const item = MORPHO_PROCESSES[proc];
                return (
                  <tr key={proc} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold flex items-center gap-2 whitespace-nowrap">
                      <span>{item.iconSymbol}</span>
                      <span>{proc}</span>
                    </td>
                    <td className="p-3 text-slate-300">{item.shortDesc}</td>
                    <td className="p-3 font-mono text-amber-400 whitespace-nowrap">{item.ffExample.split('(')[0].trim()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
