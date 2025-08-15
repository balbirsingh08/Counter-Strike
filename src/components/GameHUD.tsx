// View Components - Game's Output Layer (Presentation)
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Player, GameState } from "../models/GameModel";

interface GameHUDProps {
  gameState: GameState;
  currentPlayer: Player | null;
}

export const GameHUD = ({ gameState, currentPlayer }: GameHUDProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTeamColor = (team: 'terrorist' | 'counter-terrorist') => {
    return team === 'terrorist' ? 'destructive' : 'ct-blue';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top HUD - Scores and Time */}
      <div className="flex justify-center pt-4">
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 pointer-events-auto">
          <div className="flex items-center gap-6 px-6 py-3">
            {/* Terrorist Score */}
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="px-3 py-1">
                T
              </Badge>
              <span className="text-2xl font-bold text-destructive">
                {gameState.terroristScore}
              </span>
            </div>

            {/* Timer */}
            <div className="flex flex-col items-center">
              <div className="text-2xl font-mono font-bold text-primary">
                {formatTime(gameState.roundTime)}
              </div>
              <div className="text-sm text-muted-foreground">
                Round {gameState.roundNumber}
              </div>
            </div>

            {/* Counter-Terrorist Score */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-ct-blue">
                {gameState.counterTerroristScore}
              </span>
              <Badge 
                variant="secondary" 
                className="px-3 py-1 bg-ct-blue text-ct-blue-foreground"
              >
                CT
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Left - Player Stats */}
      {currentPlayer && (
        <div className="absolute bottom-4 left-4">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 pointer-events-auto">
            <div className="p-4 space-y-3">
              {/* Player Info */}
              <div className="flex items-center gap-3">
                <Badge 
                  variant={currentPlayer.team === 'terrorist' ? 'destructive' : 'secondary'}
                  className={currentPlayer.team === 'counter-terrorist' ? 'bg-ct-blue text-ct-blue-foreground' : ''}
                >
                  {currentPlayer.team === 'terrorist' ? 'T' : 'CT'}
                </Badge>
                <span className="font-semibold">{currentPlayer.name}</span>
              </div>

              {/* Health Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span className="font-mono">{currentPlayer.health}/100</span>
                </div>
                <Progress 
                  value={currentPlayer.health} 
                  className="h-2 bg-muted"
                />
              </div>

              {/* Armor Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Armor</span>
                  <span className="font-mono">{currentPlayer.armor}/100</span>
                </div>
                <Progress 
                  value={currentPlayer.armor} 
                  className="h-2 bg-muted [&>div]:bg-armor"
                />
              </div>

              {/* Money */}
              <div className="flex justify-between items-center">
                <span className="text-sm">Money</span>
                <span className="font-mono text-primary font-bold">
                  ${currentPlayer.money}
                </span>
              </div>

              {/* KDA */}
              <div className="flex justify-between text-sm">
                <span>K/D/A</span>
                <span className="font-mono">
                  {currentPlayer.kills}/{currentPlayer.deaths}/{currentPlayer.assists}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Bottom Right - Weapon Info */}
      {currentPlayer && currentPlayer.weapons.length > 0 && (
        <div className="absolute bottom-4 right-4">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 pointer-events-auto">
            <div className="p-4">
              {currentPlayer.weapons.map((weapon, index) => (
                <div key={weapon.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{weapon.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {weapon.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span>Ammo</span>
                    <span>{weapon.currentAmmo}/{weapon.reserveAmmo}</span>
                  </div>
                  {index < currentPlayer.weapons.length - 1 && (
                    <hr className="border-border/50" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Phase Indicator */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <Badge 
          variant="outline" 
          className="px-4 py-2 text-lg bg-background/80 backdrop-blur-sm"
        >
          {gameState.phase.toUpperCase()}
        </Badge>
      </div>
    </div>
  );
};