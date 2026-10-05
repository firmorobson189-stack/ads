import React from 'react';
import { ViewScreen } from '../types';
import { Info, ArrowLeft, Gamepad2, GraduationCap, BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface AboutModalProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onNavigate }) => {
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
            <Info className="w-8 h-8 text-blue-400" />
            <span>ℹ️ SOBRE O FF-MORFO</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Projeto educativo de morfologia da língua portuguesa e cultura gamer juvenil.
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

      <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        
        {/* Proposal */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-black font-gamer text-white mb-3 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <span>Objetivo Pedagógico</span>
          </h2>
          <p className="mb-3">
            O <strong>FF-MORFO</strong> nasceu para transformar o ensino de <strong>morfologia e processos de formação de palavras</strong> em uma experiência interativa, lúdica e conectada com a realidade dos estudantes do <strong>Ensino Fundamental II (6º ao 9º ano)</strong> e do <strong>Ensino Médio</strong>.
          </p>
          <p>
            Em vez de memorizar regras abstratas em listas descontextualizadas, os estudantes investigam como a comunidade brasileira de jogadores cria, importa, adapta e ressignifica palavras cotidianamente no universo do Free Fire.
          </p>
        </div>

        {/* BNCC Alignment */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-black font-gamer text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <span>Alinhamento com a BNCC (Base Nacional Comum Curricular)</span>
          </h2>
          <p className="mb-4">
            O jogo desenvolve habilidades centrais de Língua Portuguesa previstas na BNCC:
          </p>
          <ul className="space-y-2.5 list-disc list-inside text-slate-300 text-sm">
            <li>
              <strong>(EF07LP03)</strong> Formação de palavras: analisar a estrutura e os processos de derivação (sufixação, prefixação) e composição na língua contemporânea.
            </li>
            <li>
              <strong>(EF08LP04)</strong> Empréstimos linguísticos e neologismos: identificar e compreender o uso de termos estrangeiros adaptados à língua portuguesa.
            </li>
            <li>
              <strong>(EM13LP02)</strong> Variação linguística e identidades juvenis: reconhecer a criatividade lexical em práticas da cultura digital e dos esportes eletrônicos.
            </li>
          </ul>
        </div>

        {/* Legal & Educational Disclaimer */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Aviso Educacional e Legal</span>
          </div>
          <p>
            O <strong>FF-MORFO</strong> é uma ferramenta pedagógica autônoma e independente voltada exclusivamente para o ensino de linguística e gramática em ambientes escolares e de estudo.
          </p>
          <p>
            Não utiliza logotipos, trilhas sonoras, personagens ou materiais protegidos oficiais. Todos os elementos visuais e códigos foram desenvolvidos exclusivamente para este propósito educacional.
          </p>
        </div>

      </div>

    </div>
  );
};
