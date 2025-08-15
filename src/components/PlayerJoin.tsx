import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PlayerJoinProps {
  onJoin: (name: string, team: 'terrorist' | 'counter-terrorist') => void;
  isVisible: boolean;
}

export const PlayerJoin = ({ onJoin, isVisible }: PlayerJoinProps) => {
  const [playerName, setPlayerName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<'terrorist' | 'counter-terrorist'>('counter-terrorist');

  if (!isVisible) return null;

  const handleJoin = () => {
    if (playerName.trim()) {
      onJoin(playerName.trim(), selectedTeam);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Counter-Strike MVP
            </h1>
            <p className="text-muted-foreground">
              Join the tactical battlefield
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="playerName">Player Name</Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your callsign"
                className="text-center font-semibold"
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              />
            </div>

            <div className="space-y-3">
              <Label>Select Team</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={selectedTeam === 'counter-terrorist' ? 'default' : 'outline'}
                  onClick={() => setSelectedTeam('counter-terrorist')}
                  className={`h-20 flex-col gap-2 ${
                    selectedTeam === 'counter-terrorist' 
                      ? 'bg-ct-blue hover:bg-ct-blue/90 text-ct-blue-foreground' 
                      : 'border-ct-blue/50 hover:bg-ct-blue/10'
                  }`}
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-ct-blue text-ct-blue-foreground"
                  >
                    CT
                  </Badge>
                  <span className="text-sm">Counter-Terrorist</span>
                </Button>

                <Button
                  variant={selectedTeam === 'terrorist' ? 'destructive' : 'outline'}
                  onClick={() => setSelectedTeam('terrorist')}
                  className={`h-20 flex-col gap-2 ${
                    selectedTeam === 'terrorist' 
                      ? '' 
                      : 'border-destructive/50 hover:bg-destructive/10'
                  }`}
                >
                  <Badge variant="destructive">T</Badge>
                  <span className="text-sm">Terrorist</span>
                </Button>
              </div>
            </div>

            <Button
              onClick={handleJoin}
              disabled={!playerName.trim()}
              className="w-full h-12 text-lg font-semibold"
            >
              Join Game
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Use WASD to move, mouse to aim, click to shoot</p>
          </div>
        </div>
      </Card>
    </div>
  );
};