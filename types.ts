
export enum ClothingPart {
  Neckline = 'Neckline',
  Cuff = 'Cuff',
  Border = 'Border',
  Motif = 'Standalone Motif',
}

export interface ClothingPartOption {
  value: ClothingPart;
  label: string;
}
