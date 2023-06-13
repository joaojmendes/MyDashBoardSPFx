/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as date_fns_tz from 'date-fns-tz';

import { find } from '@microsoft/sp-lodash-subset';

import { ITimeZoneMapping } from './ITimeZoneMapping';
import { useDateFnsLocales } from './useDateFnsLocales';

// Load static dependency containing JSON mapping of SharePoint time zone and IANA time zone
const SpToIanaTimeZoneMapping: ITimeZoneMapping[] =   require("./SpToIanaTimeZone.json");

export const useTimeZoneHelper = () =>  {
  const { getLocaleFromCultureName } = useDateFnsLocales();
  /**
   * Guess browser's time zone using the Internationalization API (Intl.DateTimeFormat().resolvedOptions().timeZone) in supported browsers
   * @warning It may not be work for legacy browsers.
   */
  const  guessBrowserTimeZone = (): string => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    }
    catch (error) {
      console.error(`[getBrowserTimeZone()] => Could not determine browser's time zone as the Internalization API is not supported by the browser.`);
      return null;
    }
  }

  /**
   * Get IANA time zone for the corresponding SharePoint time zone
   */
const getIANATimeZone = (spTimeZoneId: number): string => {
    const tzMapping = find(SpToIanaTimeZoneMapping, tz => tz.ID === spTimeZoneId);
    const ianaTimeZone = !!tzMapping ? tzMapping.IANATimeZone : null;
    return ianaTimeZone;
  }

  /**
   * Get a date/time representing local time in a given time zone from the UTC date
   */
 const utcToZonedTime = (
    date: Date | string | number, 
    spTimeZoneId: number
  ): Date => {
    const timeZone =  getIANATimeZone(spTimeZoneId);
    if (!timeZone) {
      throw Error(`[utcToZonedTime()] => Could not map specified SharePoint time zone with corresponding IANA time zone.`);
    }
    return date_fns_tz.utcToZonedTime(date, timeZone);
  }

  /**
   * Given a date and any time zone, returns a Date with the equivalent UTC time.
   */
 const zonedTimeToUtc = (
    date: Date | string | number,
    spTimeZoneId: number
  ): Date => {
    const timeZone =  getIANATimeZone(spTimeZoneId);
    if (!timeZone) {
      throw Error(`[zonedTimeToUtc()] => Could not map specified SharePoint time zone with corresponding IANA time zone.`);
    }
    return date_fns_tz.zonedTimeToUtc(date, timeZone);
  }

  /**
   * Formats a date to a string showing time for a specific time zone, which can be different from the system time zone.
   */
  const formatUtcToZonedTime = (
    isoDateString: string, 
    spTimeZoneId: number,
    format: string, 
    spCultureName?: string
  ): string => {
    const utcDate = new Date(isoDateString);
    const timeZone =  getIANATimeZone(spTimeZoneId);
    if (!timeZone) {
      throw Error(`[formatUtcToZonedTime()] => Could not map specified SharePoint time zone with corresponding IANA time zone.`);
    }
    const locale = !!spCultureName ?  getLocaleFromCultureName(spCultureName) : null;

    // To format a date to a string showing time for a specific time zone, which can be different from the system time zone, the format function can be combined with utcToZonedTime.
    const zonedTime = date_fns_tz.utcToZonedTime(utcDate, timeZone);

    // The format function will never change the underlying date, it must be changed to a zoned time before passing it to format.
    // Since a zoned time `Date` instance cannot convey the time zone information to the format function it is necessary to pass the same timeZone value as an option on the third argument of format.
    return date_fns_tz.format(zonedTime, format, { timeZone: timeZone, locale: locale });
  }

  return { guessBrowserTimeZone, utcToZonedTime, zonedTimeToUtc, formatUtcToZonedTime    }
}
