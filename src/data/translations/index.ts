import { Language } from '../../types';
import { AppTranslation } from './types';
import { en } from './en';
import { hi } from './hi';
import { or } from './or';

export * from './types';
export { en, hi, or };

export const translations: Record<Language, AppTranslation> = {
  en,
  hi,
  or,
};
