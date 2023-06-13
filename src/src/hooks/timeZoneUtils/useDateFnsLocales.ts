/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  bg,
  ca,
  cs,
  da,
  de,
  deAT,
  el,
  enAU,
  enCA,
  enGB,
  enIE,
  enNZ,
  enUS,
  es,
  et,
  eu,
  fi,
  fr,
  gl,
  hr,
  hu,
  it,
  ja,
  lt,
  lv,
  nb,
  nl,
  nlBE,
  pl,
  pt,
  ro,
  ru,
  sk,
  sl,
  sr,
  srLatn,
  sv,
  tr,
  vi,
  zhCN,
  zhTW,
} from 'date-fns/locale';

export const useDateFnsLocales = () => {
  const localeMapping: { [key: string]: Locale } = {
    "en-AU": enAU,
    "en-CA": enCA,
    "en-GB": enGB,
    "en-IE": enIE,
    "en-NZ": enNZ,
    "en-US": enUS,
    "bg-BG": bg,
    "de-DE": de,
    "es-ES": es,
    "fi-FI": fi,
    "fr-FR": fr,
    "hr-HR": hr,
    "hu-HU": hu,
    "it-IT": it,
    "lt-LT": lt,
    "lv-LV": lv,
    "nl-NL": nl,
    "pl-PL": pl,
    "pt-PT": pt,
    "ro-RO": ro,
    "ru-RU": ru,
    "sl-SI": sl,
    "sk-SK": sk,
    "sr-SR": sr,
    "tr-TR": tr,
    "de-AT": deAT,
    "nl-BE": nlBE,
    "zh-TW": zhTW,
    "zh-CN": zhCN,
    "ca-ES": ca,
    "cs-CZ": cs,
    "da-DK": da,
    "de-CH": de,
    "el-GR": el,
    "es-ES_tradnl": es,
    "es-AR": es,
    "et-EE": et,
    "eu-ES": eu,
    "gl-ES": gl,
    "ja-JP": ja,
    "nb-NO": nb,
    "sv-FI": sv,
    "sv-SE": sv,
    "vi-VN": vi,
    "sr-Latn-RS": srLatn,
  };

  const getLocaleFromCultureName = (cultureName: string): Locale => {
    if (!!cultureName) {
      const locale: Locale = localeMapping[cultureName];
      if (!!locale) {
        return locale;
      } else {
        console.error(`[LocaleHelper.getLocaleFromCultureName()] => Cannot find module for locale: ${cultureName}`);
        return null;
      }
    } else {
      return null;
    }
  };

  return { getLocaleFromCultureName };
};
