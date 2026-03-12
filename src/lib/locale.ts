import { LocalizedValue, SupportedLocale } from '../../types';

export function resolveLocale(language?: string): SupportedLocale {
  if (!language) return 'en';
  if (language.startsWith('pt')) return 'pt';
  if (language.startsWith('es')) return 'es';
  return 'en';
}

export function pickLocalized<T>(value: LocalizedValue<T>, language?: string): T {
  return value[resolveLocale(language)];
}
