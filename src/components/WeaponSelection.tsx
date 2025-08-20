import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Weapon } from "../models/GameModel";

interface WeaponSelectionProps {
  weapons: Weapon[];
  playerMoney: number;
  onPurchase: (weaponId: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const WeaponSelection = ({ 
  weapons, 
  playerMoney, 
  onPurchase, 
  isVisible, 
  onClose 
}: WeaponSelectionProps) => {
  if (!isVisible) return null;

  const weaponsByType = weapons.reduce((acc, weapon) => {
    if (!acc[weapon.type]) acc[weapon.type] = [];
    acc[weapon.type].push(weapon);
    return acc;
  }, {} as Record<string, Weapon[]>);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rifle': return 'primary';
      case 'pistol': return 'secondary';
      case 'sniper': return 'warning';
      case 'smg': return 'accent';
      default: return 'muted';
    }
  };

  const getWeaponIcon = (type: string, name: string) => {
    // Specific weapon icons
    if (name.includes('AK-47')) return '🔫';
    if (name.includes('M4A4') || name.includes('M4A1-S')) return '🏹';
    if (name.includes('AWP')) return '🎯';
    if (name.includes('Glock')) return '🔫';
    if (name.includes('USP') || name.includes('Desert Eagle')) return '🔫';
    if (name.includes('P90') || name.includes('MP9')) return '⚡';
    if (name.includes('SSG 08')) return '🎯';
    if (name.includes('Nova')) return '💥';
    
    // Fallback by type
    switch (type) {
      case 'rifle': return '🔫';
      case 'pistol': return '🔫';
      case 'sniper': return '🎯';
      case 'smg': return '⚡';
      case 'shotgun': return '💥';
      default: return '🔫';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[80vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Weapon Selection
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-lg font-mono">
                Money: <span className="text-primary font-bold">${playerMoney}</span>
              </span>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(weaponsByType).map(([type, typeWeapons]) => (
              <div key={type} className="space-y-4">
                <h3 className="text-xl font-semibold capitalize flex items-center gap-2">
                  <Badge variant="outline" className="px-3 py-1">
                    {type}
                  </Badge>
                </h3>
                
                <div className="space-y-3">
                  {typeWeapons.map((weapon) => {
                    const canAfford = playerMoney >= weapon.price;
                    
                    return (
                      <Card 
                        key={weapon.id}
                        className={`p-4 transition-all duration-200 hover:shadow-lg ${
                          canAfford 
                            ? 'border-primary/50 hover:border-primary' 
                            : 'opacity-50 border-muted'
                        }`}
                      >
                        <div className="space-y-3">
                           <div className="flex justify-between items-start">
                             <div className="flex items-center gap-3">
                               <div className="text-3xl">
                                 {getWeaponIcon(weapon.type, weapon.name)}
                               </div>
                               <div>
                                 <h4 className="font-bold text-lg">{weapon.name}</h4>
                                 <Badge 
                                   variant="secondary" 
                                   className="text-xs mt-1"
                                 >
                                   {weapon.type.toUpperCase()}
                                 </Badge>
                               </div>
                             </div>
                             <div className="text-right">
                               <div className="text-2xl font-bold text-primary">
                                 ${weapon.price}
                               </div>
                             </div>
                           </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Damage:</span>
                              <div className="font-bold">{weapon.damage}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Accuracy:</span>
                              <div className="font-bold">{weapon.accuracy}%</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Fire Rate:</span>
                              <div className="font-bold">{weapon.fireRate} RPM</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Magazine:</span>
                              <div className="font-bold">{weapon.magazineSize}</div>
                            </div>
                          </div>

                          <Button
                            onClick={() => onPurchase(weapon.id)}
                            disabled={!canAfford}
                            className="w-full"
                            variant={canAfford ? "default" : "secondary"}
                          >
                            {canAfford ? 'Purchase' : 'Insufficient Funds'}
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};