export interface PetProfile {
  name: string;
  type: string;
  personality: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
}

export interface Pet extends PetProfile {
  imageUrl: string;
}

export type GameState = 'idle' | 'hatching' | 'hatched' | 'error';
