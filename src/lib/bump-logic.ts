import { COMBO_OF_THE_MONTH, PROMOTIONS } from '../constants';

export const BUMP_OPPORTUNITIES: Record<string, any> = {
  'resvis': {
    targetCombo: COMBO_OF_THE_MONTH,
    complementName: 'Coliplus',
    bumpPrice: 40000,
    savings: 35900,
  },
  'coliplus': {
    targetCombo: COMBO_OF_THE_MONTH,
    complementName: 'Resvis Factor',
    bumpPrice: 54000,
    savings: 35900,
  },
  'rtafull': {
    targetCombo: PROMOTIONS.find(p => p.id === 'promo-3'),
    complementName: 'Coliplus',
    bumpPrice: 36950,
    savings: 38950,
  },
  'resveratrol': {
    targetCombo: PROMOTIONS.find(p => p.id === 'promo-1'),
    complementName: 'Miskinne',
    bumpPrice: 24950,
    savings: 34950,
  }
};
