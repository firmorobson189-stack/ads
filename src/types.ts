/**
 * FF-MORFO Types and Interfaces
 */

export type MorphoProcess = 
  | 'Empréstimo'
  | 'Sufixação'
  | 'Redução'
  | 'Abreviação'
  | 'Composição'
  | 'Sigla'
  | 'Ressignificação';

export interface MorphoProcessMeta {
  name: MorphoProcess;
  colorName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  iconSymbol: string;
  shortDesc: string;
  definition: string;
  grammarTip: string;
  ffExample: string;
}

export interface CardData {
  id: number;
  slang: string;
  category: 'Ação & Combate' | 'Itens & Economia' | 'Comunicação & Tática' | 'Perfil & E-sports';
  gameContext: string;
  example: string;
  process: MorphoProcess;
  relatedProcess?: string;
  formation?: string;
  origin: string;
  originOptions: string[];
  explanation: string;
}

export interface PlayerAnswerRecord {
  cardId: number;
  slang: string;
  chosenProcess: MorphoProcess;
  chosenOrigin: string;
  processCorrect: boolean;
  originCorrect: boolean;
  pointsEarned: number;
  roundNumber: number;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  correctProcessCount: number;
  correctOriginCount: number;
  perfectCardsCount: number;
  answers: PlayerAnswerRecord[];
}

export type ViewScreen = 
  | 'HOME' 
  | 'SETUP' 
  | 'GAME' 
  | 'RULES' 
  | 'CARDS_LIBRARY' 
  | 'LEARN' 
  | 'ABOUT';

export type TurnStep = 
  | 'CHOOSE_PROCESS' 
  | 'CHOOSE_ORIGIN' 
  | 'REVEAL_ANSWER';

export interface GameSettings {
  playerCount: number;
  playerNames: string[];
  totalRounds: number;
}
