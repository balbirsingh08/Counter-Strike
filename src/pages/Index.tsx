import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GameModel } from "../models/GameModel";
import { GamePresenter } from "../presenters/GamePresenter";
import { ReactGameView } from "../views/GameView";
import { GameHUD } from "../components/GameHUD";
import { WeaponSelection } from "../components/WeaponSelection";
import { PlayerJoin } from "../components/PlayerJoin";

const Index = () => {
  const [gameModel] = useState(() => new GameModel());
  const [gamePresenter] = useState(() => new GamePresenter(gameModel));
  const [gameView] = useState(() => new ReactGameView());
  const [showWeaponSelection, setShowWeaponSelection] = useState(false);
  const [showPlayerJoin, setShowPlayerJoin] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  // Connect the view to the presenter
  useEffect(() => {
    gamePresenter.setView(gameView);
  }, [gamePresenter, gameView]);

  const handlePlayerJoin = (name: string, team: 'terrorist' | 'counter-terrorist') => {
    gamePresenter.handlePlayerJoin(name, team);
    setShowPlayerJoin(false);
    setGameStarted(true);
  };

  const handleWeaponPurchase = (weaponId: string) => {
    gamePresenter.handleWeaponPurchase(weaponId);
    setShowWeaponSelection(false);
  };

  const handleStartRound = () => {
    gamePresenter.handleRoundStart();
  };

  const handleDamageTest = () => {
    const currentPlayer = gamePresenter.getCurrentPlayer();
    if (currentPlayer) {
      gamePresenter.handleDamage(currentPlayer.id, 25);
    }
  };

  const currentGameState = gamePresenter.getCurrentGameState();
  const currentPlayer = gamePresenter.getCurrentPlayer();
  const availableWeapons = gamePresenter.getAvailableWeapons();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,140,0,0.1),transparent_50%)]" />
      </div>

      {/* Player Join Modal */}
      <PlayerJoin 
        onJoin={handlePlayerJoin}
        isVisible={showPlayerJoin}
      />

      {/* Weapon Selection Modal */}
      <WeaponSelection
        weapons={availableWeapons}
        playerMoney={currentPlayer?.money || 0}
        onPurchase={handleWeaponPurchase}
        isVisible={showWeaponSelection}
        onClose={() => setShowWeaponSelection(false)}
      />

      {/* Game HUD */}
      {gameStarted && (
        <GameHUD 
          gameState={currentGameState}
          currentPlayer={currentPlayer}
        />
      )}

      {/* Main Game Area */}
      {gameStarted && (
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8 p-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Counter-Strike MVP
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Model-View-Presenter architecture implementation of tactical FPS gameplay
              </p>
            </div>

            {/* Game Controls */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setShowWeaponSelection(true)}
                variant="default"
                size="lg"
                className="px-8"
              >
                Buy Weapons (B)
              </Button>
              
              <Button
                onClick={handleStartRound}
                variant="secondary"
                size="lg"
                className="px-8"
              >
                Start Round
              </Button>
              
              <Button
                onClick={handleDamageTest}
                variant="outline"
                size="lg"
                className="px-8"
              >
                Take Damage (Test)
              </Button>
            </div>

            {/* Game Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
              <div className="text-center">
                <h3 className="font-semibold text-primary mb-2">Model</h3>
                <p className="text-muted-foreground">
                  Authoritative game state, player data, weapon stats, and game rules
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-secondary mb-2">View</h3>
                <p className="text-muted-foreground">
                  React components, HUD elements, animations, and visual presentation
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-primary mb-2">Presenter</h3>
                <p className="text-muted-foreground">
                  Input handling, game logic, state updates, and view coordination
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
