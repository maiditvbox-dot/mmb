
import { ClothingPart, ClothingPartOption } from './types';

export const DEFAULT_BACKGROUND_COLOR = '#000080'; // Deep Royal Blue

export const CLOTHING_PART_OPTIONS: ClothingPartOption[] = [
  { value: ClothingPart.Neckline, label: 'Neckline' },
  { value: ClothingPart.Cuff, label: 'Cuff' },
  { value: ClothingPart.Border, label: 'Border' },
  { value: ClothingPart.Motif, label: 'Standalone Motif' },
];
