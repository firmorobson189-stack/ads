import React, { useState } from 'react';
import { ViewScreen, GameSettings, Player, CardData } from './types';
import { CARDS_DATA } from './data/cards';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { HomeMenu } from './components/HomeMenu';
import { GameSetup } from './components/GameSetup';
import { GameBoard } from './components/GameBoard';
import { GameOver } from './components/GameOver';
import { CardsLibrary } from './components/CardsLibrary';
import { LearnProcesses } from './components/LearnProcesses';
import { HowToPlayModal } from './components/HowToPlayModal';
import { AboutModal } from './components/AboutModal';

// Fisher-Yates shuffle for randomized decks
function shuffleCards(array: CardData[]): CardData[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('HOME');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Game configuration
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    playerCount: 3,
    playerNames: ['João', 'Pedro', 'Lucas'],
    totalRounds: 15
  });

  // Active match state
  const [deck, setDeck] = useState<CardData[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  // Toggle audio
  const handleToggleMute = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
  };

  // Start new match
  const handleStartGame = (settings: GameSettings) => {
    setGameSettings(settings);

    // Build fresh players list
    const newPlayers: Player[] = settings.playerNames.map((name, index) => ({
      id: index + 1,
      name,
      score: 0,
      correctProcessCount: 0,
      correctOriginCount: 0,
      perfectCardsCount: 0,
      answers: []
    }));

    // Shuffle deck
    const shuffledDeck = shuffleCards(CARDS_DATA);
    setDeck(shuffledDeck);
    setPlayers(newPlayers);
    setIsGameOver(false);
    setCurrentScreen('GAME');
  };

  // Re-match with same settings
  const handleRestartGame = () => {
    handleStartGame(gameSettings);
  };

  return (
    <div className="min-h-screen bg-[#0b0e17] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Bar Contract */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setIsGameOver(false);
          setCurrentScreen(screen);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full">
        {currentScreen === 'HOME' && (
          <HomeMenu onNavigate={(screen) => setCurrentScreen(screen)} />
        )}

        {currentScreen === 'SETUP' && (
          <GameSetup
            onStartGame={handleStartGame}
            onBack={() => setCurrentScreen('HOME')}
          />
        )}

        {currentScreen === 'GAME' && !isGameOver && (
          <GameBoard
            settings={gameSettings}
            deck={deck}
            players={players}
            onUpdatePlayers={(updated) => setPlayers(updated)}
            onFinishGame={() => setIsGameOver(true)}
            onExitToMenu={() => setCurrentScreen('HOME')}
          />
        )}

        {currentScreen === 'GAME' && isGameOver && (
          <GameOver
            players={players}
            onRestartGame={handleRestartGame}
            onNavigate={(screen) => {
              setIsGameOver(false);
              setCurrentScreen(screen);
            }}
          />
        )}

        {currentScreen === 'RULES' && (
          <HowToPlayModal onNavigate={(screen) => setCurrentScreen(screen)} />
        )}

        {currentScreen === 'CARDS_LIBRARY' && (
          <CardsLibrary onNavigate={(screen) => setCurrentScreen(screen)} />
        )}

        {currentScreen === 'LEARN' && (
          <LearnProcesses onNavigate={(screen) => setCurrentScreen(screen)} />
        )}

        {currentScreen === 'ABOUT' && (
          <AboutModal onNavigate={(screen) => setCurrentScreen(screen)} />
        )}
      </main>

      {/* Quiet, Anti-slop Footer */}
      <footer className="border-t border-slate-900 bg-[#070a12] py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>FF-MORFO · Jogo Educativo de Morfologia e Gírias do Free Fire</span>
          <span className="text-slate-600">Alinhado à BNCC · Ensino Fundamental II e Ensino Médio</span>
        </div>
      </footer>
    </div>
  );
}
