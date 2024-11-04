/*
* @name: datetime.ts
* @author: <ahmadasysyafiq@proton.me>
* @description: datetime manipulating system supported by skfw.net
* @timezone: Asia/Jakarta
* @locale: en-US, id-ID
* @license: Apache-2.0
* @date: 2024/11/02
*
* Quotes:
*       "Even though choosing between two options may seem simple,
*   the reality is that having many choices often requires
*   more consideration and careful decision-making."
*       - copilot.microsoft.com
*
* */

import {hasOwnPropertyName, modulo, moduloByIndex, moduloByPosition} from "@/utils.ts";
import type {ComparableImpl, EquatableImpl} from "@/ops.ts";
import {toNumber} from "@/nums.ts";

export const YEAR_IN_MONTHS = 12;
export const YEAR_IN_DAYS = 365;
export const LEAP_YEAR_IN_DAYS = 366;
export const WEEK_IN_DAYS = 7;

export const DAY_IN_HOURS = 24;

export const HOUR_IN_MINUTES = 60;
export const DAY_IN_MINUTES = 1440;

export const MINUTE_IN_SECONDS = 60;
export const HOUR_IN_SECONDS = 3600;
export const DAY_IN_SECONDS = 86400;

export const SECOND_IN_MILLISECONDS = 1000;
export const MINUTE_IN_MILLISECONDS = 60000;
export const HOUR_IN_MILLISECONDS = 3600000;
export const DAY_IN_MILLISECONDS = 86400000;

export const MILLISECOND_IN_MICROSECONDS = 1000;
export const SECOND_IN_MICROSECONDS = 1000000;
export const MINUTE_IN_MICROSECONDS = 60000000;
export const HOUR_IN_MICROSECONDS = 3600000000;
export const DAY_IN_MICROSECONDS = 86400000000;

export const MICROSECOND_IN_NANOSECONDS = 1000;
export const MILLISECOND_IN_NANOSECONDS = 1000000;
export const SECOND_IN_NANOSECONDS = 1000000000;
export const MINUTE_IN_NANOSECONDS = 60000000000;
export const HOUR_IN_NANOSECONDS = 3600000000000;
export const DAY_IN_NANOSECONDS = 86400000000000;

// Weekdays in ISO 8601
export enum Weekdays {
    Sunday = 0,
    Monday = 1, // starts on monday
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export interface WeekdaysImpl {
    Sunday: number;
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
    indexOf: (i: number) => Weekdays;
    positionOf: (position: number) => Weekdays;
    toString(w: Weekdays): string;
    parse(s: string): Weekdays;
}

export type WeekdayTyped = Weekdays | WeekdaysImpl;
export const weekdays: WeekdayTyped = Weekdays as unknown as WeekdaysImpl;

weekdays.indexOf = (i: number): Weekdays => {
    return moduloByIndex(i, WEEK_IN_DAYS).value;
};

weekdays.positionOf = (p: number): Weekdays => {
    return moduloByPosition(p, WEEK_IN_DAYS).value - 1;
};

weekdays.toString = (w: Weekdays): string => {
    switch (w) {
        case Weekdays.Sunday: return "sunday";
        case Weekdays.Monday: return "monday";
        case Weekdays.Tuesday: return "tuesday";
        case Weekdays.Wednesday: return "wednesday";
        case Weekdays.Thursday: return "thursday";
        case Weekdays.Friday: return "friday";
        case Weekdays.Saturday: return "saturday";
    }
};

weekdays.parse = (s: string): Weekdays => {
    switch (s.toLowerCase()) {
        case "sun":
        case "sunday": return Weekdays.Sunday;
        case "mon":
        case "monday": return Weekdays.Monday;
        case "tue":
        case "tuesday": return Weekdays.Tuesday;
        case "wed":
        case "wednesday": return Weekdays.Wednesday;
        case "thu":
        case "thursday": return Weekdays.Thursday;
        case "fri":
        case "friday": return Weekdays.Friday;
        case "sat":
        case "saturday": return Weekdays.Saturday;
        default:
            throw new Error(`Invalid weekday: ${s}`);
    }
};

export function isWeekdayTyped(value: any): value is WeekdayTyped {
    if (typeof value === "number") {
        const values = [
            Weekdays.Sunday,
            Weekdays.Monday,
            Weekdays.Tuesday,
            Weekdays.Wednesday,
            Weekdays.Thursday,
            Weekdays.Friday,
            Weekdays.Saturday,
        ] as number[];
        return values.includes(value);
    }
    const props: Record<keyof WeekdaysImpl, string> = {
        Sunday: "number",
        Monday: "number",
        Tuesday: "number",
        Wednesday: "number",
        Thursday: "number",
        Friday: "number",
        Saturday: "number",
        indexOf: "function",
        positionOf: "function",
        toString: "function",
        parse: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof WeekdaysImpl];
        switch (prop) {
            default:
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
                return false;
        }
    }
    return true;
}

export enum Months {
    January = 1,
    February = 2,
    March = 3,
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9,
    October = 10,
    November = 11,
    December = 12,
}

interface MonthsImpl {
    January: number;
    February: number;
    March: number;
    April: number;
    May: number;
    June: number;
    July: number;
    August: number;
    September: number;
    October: number;
    November: number;
    December: number;
    indexOf: (i: number) => Months;
    positionOf: (position: number) => Months;
    toString(m: Months): string;
    parse(s: string): Months;
}

export type MonthTyped = Months | MonthsImpl;
export const months: MonthTyped = Months as unknown as MonthsImpl;

months.indexOf = (i: number): Months => {
    return 1 + moduloByIndex(i, YEAR_IN_MONTHS).value;
};

months.positionOf = (p: number): Months => {
    return moduloByPosition(p, YEAR_IN_MONTHS).value;
};

months.toString = (m: Months): string => {
    switch (m) {
        case Months.January: return "january";
        case Months.February: return "february";
        case Months.March: return "march";
        case Months.April: return "april";
        case Months.May: return "may";
        case Months.June: return "june";
        case Months.July: return "july";
        case Months.August: return "august";
        case Months.September: return "september";
        case Months.October: return "october";
        case Months.November: return "november";
        case Months.December: return "december";
    }
};

months.parse = (s: string): Months => {
    switch (s.trim().toLowerCase()) {
        case "jan":
        case "january": return Months.January;
        case "feb":
        case "february": return Months.February;
        case "mar":
        case "march": return Months.March;
        case "apr":
        case "april": return Months.April;
        case "may": return Months.May;
        case "jun":
        case "june": return Months.June;
        case "jul":
        case "july": return Months.July;
        case "aug":
        case "august": return Months.August;
        case "sep":
        case "september": return Months.September;
        case "oct":
        case "october": return Months.October;
        case "nov":
        case "november": return Months.November;
        case "dec":
        case "december": return Months.December;
        default:
            throw new Error(`Invalid month: ${s}`);
    }
};

export function isMonthTyped(value: any): value is MonthTyped {
    if (typeof value === "number") {
        const values = [
            Months.January,
            Months.February,
            Months.March,
            Months.April,
            Months.May,
            Months.June,
            Months.July,
            Months.August,
            Months.September,
            Months.October,
            Months.December,
        ] as number[];
        return values.includes(value);
    }
    const props: Record<keyof MonthsImpl, string> = {
        January: "number",
        February: "number",
        March: "number",
        April: "number",
        May: "number",
        June: "number",
        July: "number",
        August: "number",
        September: "number",
        October: "number",
        November: "number",
        December: "number",
        indexOf: "function",
        positionOf: "function",
        toString: "function",
        parse: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof MonthsImpl];
        switch (prop) {
            default:
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
                return false;
        }
    }
    return true;
}

export enum TimeZones {
    UTC = "UTC",
    Local = "Asia/Jakarta",
}

export interface TimeZonesImpl {
    UTC: string;
    Local: string;
    toString(tz: TimeZones): string;
    parse(s: string): TimeZones;
}

export type TimeZoneTyped = TimeZones | TimeZonesImpl;
export const timeZones: TimeZoneTyped = TimeZones as unknown as TimeZonesImpl;

timeZones.toString = (tz: TimeZones): string => {
    return tz;
};

timeZones.parse = (s: string): TimeZones => {
    switch (s.trim().toLowerCase()) {
        case "utc":
        case "zulu":
        case "gmt":
        case "gmt+0": return TimeZones.UTC;
        case "local":
        case "gmt+7":
        case "jakarta":
        case "asia/jakarta": return TimeZones.Local;
        default:
            throw new Error(`Invalid timezone: ${s}`);
    }
};

export function isTimeZoneTyped(value: any): value is TimeZoneTyped {
    if (typeof value === "string") {
        const values = [
            TimeZones.UTC,
            TimeZones.Local,
        ] as string[];
        return values.includes(value);
    }
    const props: Record<keyof TimeZonesImpl, string> = {
        UTC: "string",
        Local: "string",
        toString: "function",
        parse: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof TimeZonesImpl];
        switch (prop) {
            default:
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
                return false;
        }
    }
    return true;
}

export interface TimeSpanImpl extends ComparableImpl<TimeSpanImpl>, EquatableImpl<TimeSpanImpl> {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    ms: number;
    us: number;
    ns: number;
    add(timeSpan: TimeSpanImpl): TimeSpanImpl;
    subtract(timeSpan: TimeSpanImpl): TimeSpanImpl;
}

export class TimeSpan implements TimeSpanImpl {
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    public ms: number;
    public us: number;
    public ns: number;

    public constructor(days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0, microseconds: number = 0, nanoseconds: number = 0) {
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.ms = milliseconds;
        this.us = microseconds;
        this.ns = nanoseconds;
    }

    private update(): void {
        while (this.ns >= MICROSECOND_IN_NANOSECONDS) {
            this.ns -= MICROSECOND_IN_NANOSECONDS;
            this.us += 1;
        }
        while (this.ns < 0) {
            this.ns += MICROSECOND_IN_NANOSECONDS;
            this.us -= 1;
        }
        while (this.us >= MILLISECOND_IN_MICROSECONDS) {
            this.us -= MILLISECOND_IN_MICROSECONDS;
            this.ms += 1;
        }
        while (this.us < 0) {
            this.us += MILLISECOND_IN_MICROSECONDS;
            this.ms -= 1;
        }
        while (this.ms >= SECOND_IN_MILLISECONDS) {
            this.ms -= SECOND_IN_MILLISECONDS;
            this.seconds += 1;
        }
        while (this.ms < 0) {
            this.ms += SECOND_IN_MILLISECONDS;
            this.seconds -= 1;
        }
        while (this.seconds >= MINUTE_IN_SECONDS) {
            this.seconds -= MINUTE_IN_SECONDS;
            this.minutes += 1;
        }
        while (this.seconds < 0) {
            this.seconds += MINUTE_IN_SECONDS;
            this.minutes -= 1;
        }
        while (this.minutes >= HOUR_IN_MINUTES) {
            this.minutes -= HOUR_IN_MINUTES;
            this.hours += 1;
        }
        while (this.minutes < 0) {
            this.minutes += HOUR_IN_MINUTES;
            this.hours -= 1;
        }
        while (this.hours >= DAY_IN_HOURS) {
            this.hours -= DAY_IN_HOURS;
            this.days += 1;
        }
        while (this.hours < 0) {
            this.hours += DAY_IN_HOURS;
            this.days -= 1;
        }
    }

    public add(timeSpan: TimeSpanImpl): TimeSpanImpl {
        if (timeSpan instanceof TimeSpan) {
            this.days += timeSpan.days;
            this.hours += timeSpan.hours;
            this.minutes += timeSpan.minutes;
            this.seconds += timeSpan.seconds;
            this.ms += timeSpan.ms;
            this.us += timeSpan.us;
            this.ns += timeSpan.ns;
            this.update();
            return this;
        }
        throw new Error("Value is not a TimeSpan");
    }

    public subtract(timeSpan: TimeSpanImpl): TimeSpanImpl {
        if (timeSpan instanceof TimeSpan) {
            this.days -= timeSpan.days;
            this.hours -= timeSpan.hours;
            this.minutes -= timeSpan.minutes;
            this.seconds -= timeSpan.seconds;
            this.ms -= timeSpan.ms;
            this.us -= timeSpan.us;
            this.ns -= timeSpan.ns;
            this.update();
            return this;
        }
        throw new Error("Value is not a TimeSpan");
    }

    public compareTo(other: TimeSpanImpl): number {
        if (!isTimeSpan(other)) throw new Error("Value is not a TimeSpan");
        if (this.days > other.days) return 1;
        if (this.days < other.days) return -1;
        if (this.hours > other.hours) return 1;
        if (this.hours < other.hours) return -1;
        if (this.minutes > other.minutes) return 1;
        if (this.minutes < other.minutes) return -1;
        if (this.seconds > other.seconds) return 1;
        if (this.seconds < other.seconds) return -1;
        if (this.ms > other.ms) return 1;
        if (this.ms < other.ms) return -1;
        if (this.us > other.us) return 1;
        if (this.us < other.us) return -1;
        if (this.ns > other.ns) return 1;
        if (this.ns < other.ns) return -1;
        return 0;
    }

    public equals(other: TimeSpanImpl): boolean {
        if (!isTimeSpan(other)) throw new Error("Value is not a TimeSpan");
        if (this.days !== other.days) return false;
        if (this.hours !== other.hours) return false;
        if (this.minutes !== other.minutes) return false;
        if (this.seconds !== other.seconds) return false;
        if (this.ms !== other.ms) return false;
        if (this.us !== other.us) return false;
        if (this.ns !== other.ns) return false;
        return true;
    }
}

export function isTimeSpan(value: any): value is TimeSpanImpl {
    const props: Record<keyof TimeSpanImpl, string> = {
        days: "number",
        hours: "number",
        minutes: "number",
        seconds: "number",
        ms: "number",
        us: "number",
        ns: "number",
        add: "function",
        subtract: "function",
        compareTo: "function",
        equals: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof TimeSpanImpl];
        switch (prop) {
            default:
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
                return false;
        }
    }
    return true;
}

export interface DateTimeReadOnlyImpl extends ComparableImpl<DateTimeReadOnlyImpl>, EquatableImpl<DateTimeReadOnlyImpl> {
    readonly years: number;
    readonly months: number;
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly ms: number;
    readonly us: number;
    readonly ns: number;
    readonly weekday: WeekdayTyped;
    readonly timeZone: TimeZoneTyped;
    timestampExtended: TimestampExtended;
    dateTimeSeed: DateTimeSeed;
}

export class DateTimeReadOnly implements DateTimeReadOnlyImpl {
    public readonly years: number;
    public readonly months: number;
    public readonly days: number;
    public readonly hours: number;
    public readonly minutes: number;
    public readonly seconds: number;
    public readonly ms: number;
    public readonly us: number;
    public readonly ns: number;
    public readonly weekday: WeekdayTyped;
    public readonly timeZone: TimeZoneTyped;

    private _timestampExtended?: TimestampExtended;
    private _dateTimeSeed?: DateTimeSeed;

    public constructor(years: number, months: number, days: number, hours: number, minutes: number, seconds: number, ms: number, us: number, ns: number, weekday: WeekdayTyped, timeZone: TimeZoneTyped) {
        this.years = years;
        this.months = months;
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.ms = ms;
        this.us = us;
        this.ns = ns;
        this.weekday = weekday;
        this.timeZone = timeZone;
    }

    public compareTo(other: DateTimeReadOnlyImpl): number {
        if (!isDateTimeReadOnly(other)) throw new Error("Value is not a DateTimeReadOnly");

        // TODO: compare timezones

        if (this.years > other.years) return 1;
        if (this.years < other.years) return -1;
        if (this.months > other.months) return 1;
        if (this.months < other.months) return -1;

        return TimeSpan.prototype.compareTo.apply(this, [other as unknown as TimeSpanImpl]);
    }

    public equals(other: DateTimeReadOnlyImpl): boolean {
        if (!isDateTimeReadOnly(other)) throw new Error("Value is not a DateTimeReadOnly");

        // TODO: compare timezones

        if (this.years !== other.years) return false;
        if (this.months !== other.months) return false;

        return TimeSpan.prototype.equals.apply(this, [other as unknown as TimeSpanImpl]);
    }

    public get timestampExtended(): TimestampExtended {
        if (this._timestampExtended) return this._timestampExtended.copy();
        if (dateTimeSnapShots.length === 0) throw new Error("timestampExtended requires at least one DateTimeSnapShot.");

        const nearest = getNearestDateTimeSnapShot(this);
        const timeSpan = nearest.timeSpan;

        let ms = nearest.dateTimeSnapShot.timestampExtended.ms;
        ms += timeSpan.days * DAY_IN_MILLISECONDS;
        ms += timeSpan.hours * HOUR_IN_MILLISECONDS;
        ms += timeSpan.minutes * MINUTE_IN_MILLISECONDS;
        ms += timeSpan.seconds * SECOND_IN_MILLISECONDS;
        ms += timeSpan.ms;

        let ns = nearest.dateTimeSnapShot.timestampExtended.ns;
        ns += timeSpan.us * MICROSECOND_IN_NANOSECONDS;
        ns += timeSpan.ns;

        const timestampExtended = createTimestampExtended(ms, ns);
        this._timestampExtended = timestampExtended;
        return timestampExtended.copy();
    }

    public get dateTimeSeed(): DateTimeSeed {
        if (this._dateTimeSeed) return this._dateTimeSeed.copy();
        const dateTimeSeed = createDateTimeSeed(this.years, this.months, this.days, this.hours, this.minutes, this.seconds, this.ms, this.us, this.ns, this.weekday, this.timestampExtended);
        this._dateTimeSeed = dateTimeSeed;
        return dateTimeSeed.copy();
    }
}

export function isDateTimeReadOnly(value: any): value is DateTimeReadOnlyImpl {
    const props: Record<keyof DateTimeReadOnlyImpl, string> = {
        years: "number",
        months: "number",
        days: "number",
        hours: "number",
        minutes: "number",
        seconds: "number",
        ms: "number",
        us: "number",
        ns: "number",
        weekday: "number",
        timeZone: "string",
        compareTo: "function",
        equals: "function",
        timestampExtended: "object",
        dateTimeSeed: "object",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof DateTimeReadOnlyImpl];
        switch (prop) {
            case "weekday":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isWeekdayTyped(value[prop])) continue;
                return false;
            case "timeZone":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isTimeZoneTyped(value[prop])) continue;
                return false;
            default:
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
                return false;
        }
    }
    return true;
}

export type DateTimeSnapShotOrReadOnlyImpl = DateTimeReadOnlyImpl | DateTimeSnapShotImpl;

export interface DateTimeSnapShotImpl extends ComparableImpl<DateTimeSnapShotOrReadOnlyImpl>, EquatableImpl<DateTimeSnapShotOrReadOnlyImpl> {
    readonly dateTimeReadOnly: DateTimeReadOnlyImpl;
    readonly timestampExtended: TimestampExtended;
    compareTo(other: DateTimeSnapShotOrReadOnlyImpl): number;
    equals(other: DateTimeSnapShotOrReadOnlyImpl): boolean;
    copy(): DateTimeSnapShotImpl;
}

export class DateTimeSnapShot implements DateTimeSnapShotImpl {
    public readonly dateTimeReadOnly: DateTimeReadOnlyImpl;

    // Represents the timestamp in milliseconds.
    // This property is used strictly for additional purposes,
    // providing millisecond precision for time-related calculations.
    public readonly timestampExtended: TimestampExtended;

    public constructor(dateTimeReadOnly: DateTimeReadOnlyImpl, timestampExtended: TimestampExtended) {
        // Ensure dateTimeReadOnly reflects the exact timestamp
        this.dateTimeReadOnly = dateTimeReadOnly;

        // Ensure timestamp matches the exact dateTimeReadOnly value
        this.timestampExtended = timestampExtended;
    }

    public compareTo(other: DateTimeSnapShotOrReadOnlyImpl): number {
        // Compare dateTimeReadOnly properties if the other instance is a DateTimeSnapShot
        if (isDateTimeSnapShot(other)) return this.dateTimeReadOnly.compareTo(other.dateTimeReadOnly);

        // Exact timestamp comparison is skipped since dateTimeReadOnly and timestamp are synchronized
        if (isDateTimeReadOnly(other)) return this.dateTimeReadOnly.compareTo(other);

        // Throw an error if the value is neither DateTimeReadOnly nor DateTimeSnapShot
        throw new Error("Value is not a DateTimeReadOnly or DateTimeSnapShot");
    }

    public equals(other: DateTimeSnapShotOrReadOnlyImpl): boolean {
        // Check equality of dateTimeReadOnly properties if the other instance is a DateTimeSnapShot
        if (isDateTimeSnapShot(other)) return this.dateTimeReadOnly.equals(other.dateTimeReadOnly);


        // Exact timestamp equality check is skipped since dateTimeReadOnly and timestamp are synchronized
        if (isDateTimeReadOnly(other)) return this.dateTimeReadOnly.equals(other);

        // Throw an error if the value is neither DateTimeReadOnly nor DateTimeSnapShot
        throw new Error("Value is not a DateTimeSnapShot or DateTimeReadOnly");
    }

    public copy(): DateTimeSnapShotImpl {
        return new DateTimeSnapShot(this.dateTimeReadOnly, this.timestampExtended.copy());
    }
}

export function isDateTimeSnapShot(value: any): value is DateTimeSnapShotImpl {
    const props: Record<keyof DateTimeSnapShotImpl, string> = {
        dateTimeReadOnly: "object",
        timestampExtended: "object",
        compareTo: "function",
        equals: "function",
        copy: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof DateTimeSnapShotImpl];
        switch (prop) {
            case "dateTimeReadOnly":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isDateTimeReadOnly(value[prop])) continue;
                return false;
            case "timestampExtended":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isTimestampExtended(value[prop])) continue;
                return false;
            default:
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
                return false;
        }
    }
    return true;
}

export function createDateTimeSnapShotStarter(years: number, weekday: Weekdays, ms: number): DateTimeSnapShotImpl {
    const dateTimeReadOnly = new DateTimeReadOnly(years, 1, 1, 0, 0, 0, 0, 0, 0, weekday, TimeZones.UTC);
    const timestampExtended = createTimestampExtended(ms, 0);
    return new DateTimeSnapShot(dateTimeReadOnly, timestampExtended);
}

export const dateTimeSnapShots: DateTimeSnapShotImpl[] = [
    createDateTimeSnapShotStarter(2020, 3, 1577836800000),
    createDateTimeSnapShotStarter(2010, 5, 1262304000000),
    createDateTimeSnapShotStarter(2000, 6, 946684800000),
    createDateTimeSnapShotStarter(1990, 1, 631152000000),
    createDateTimeSnapShotStarter(1980, 2, 315532800000),
    createDateTimeSnapShotStarter(1970, 4, 0),
    createDateTimeSnapShotStarter(1960, 5, -315619200000),
    createDateTimeSnapShotStarter(1950, 0, -631152000000),
    createDateTimeSnapShotStarter(1940, 1, -946771200000),
    createDateTimeSnapShotStarter(1930, 3, -1262304000000),
    createDateTimeSnapShotStarter(1920, 4, -1577923200000),
];

export interface NearestDateTimeSnapShotImpl extends ComparableImpl<TimeSpanImpl>, EquatableImpl<TimeSpanImpl> {
    readonly dateTimeSnapShot: DateTimeSnapShotImpl;
    readonly timeSpan: TimeSpanImpl;
}

export class NearestDateTimeSnapShot implements NearestDateTimeSnapShotImpl {
    public readonly dateTimeSnapShot: DateTimeSnapShotImpl;

    // The TimeSpan of the nearest DateTimeSnapShot
    // but only considers days within a year for fast checking.
    // other properties like hours, minutes, seconds, ... are ignored.
    // The range of years will be stored in this TimeSpan,
    // defined by the days in the year.
    readonly timeSpan: TimeSpanImpl;

    public constructor(dateTimeSnapShot: DateTimeSnapShotImpl, timeSpan: TimeSpanImpl) {
        this.dateTimeSnapShot = dateTimeSnapShot;
        this.timeSpan = timeSpan;
    }

    public compareTo(other: TimeSpanImpl): number {
        return this.timeSpan.compareTo(other);
    }

    public equals(other: TimeSpanImpl): boolean {
        return this.timeSpan.equals(other);
    }
}

export function isNearestDateTimeSnapShot(value: any): value is NearestDateTimeSnapShotImpl {
    const props: Record<keyof NearestDateTimeSnapShotImpl, string> = {
        dateTimeSnapShot: "object",
        timeSpan: "object",
        compareTo: "function",
        equals: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof NearestDateTimeSnapShotImpl];
        switch (prop) {
            case "dateTimeSnapShot":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isDateTimeSnapShot(value[prop])) continue;
                return false;
            case "timeSpan":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isTimeSpan(value[prop])) continue;
                return false;
            default:
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
                return false;
        }
    }
    return true;
}

// only use for calculation datetime
export interface DateTimeSeed {

    // produces
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    ms: number;
    us: number;
    ns: number;
    weekday: WeekdayTyped;

    // consumes
    timestampExtended: TimestampExtended;

    // utilities
    assign(dateTimeSeed: DateTimeSeed): DateTimeSeed;
    copy(): DateTimeSeed;
}

function createDateTimeSeed(years: number, months: number, days: number, hours: number, minutes: number, seconds: number, ms: number, us: number, ns: number, weekday: WeekdayTyped, timestamp: TimestampExtended): DateTimeSeed {
    return {
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        ms: ms,
        us: us,
        ns: ns,
        weekday: weekday,
        timestampExtended: timestamp,
        assign(dateTimeSeed: DateTimeSeed) {
            this.years = dateTimeSeed.years;
            this.months = dateTimeSeed.months;
            this.days = dateTimeSeed.days;
            this.hours = dateTimeSeed.hours;
            this.minutes = dateTimeSeed.minutes;
            this.seconds = dateTimeSeed.seconds;
            this.ms = dateTimeSeed.ms;
            this.us = dateTimeSeed.us;
            this.ns = dateTimeSeed.ns;
            this.weekday = dateTimeSeed.weekday;
            this.timestampExtended.assign(dateTimeSeed.timestampExtended);
            return this;
        },
        copy(): DateTimeSeed {
            return createDateTimeSeed(this.years, this.months, this.days, this.hours, this.minutes, this.seconds, this.ms, this.us, this.ns, this.weekday, this.timestampExtended.copy());
        }
    };
}

function createDateTimeSnapShotSeed(dateTimeSnapShot: DateTimeSnapShotImpl): DateTimeSeed {
    const years = dateTimeSnapShot.dateTimeReadOnly.years;
    const months = dateTimeSnapShot.dateTimeReadOnly.months;
    const days = dateTimeSnapShot.dateTimeReadOnly.days;
    const hours = dateTimeSnapShot.dateTimeReadOnly.hours;
    const minutes = dateTimeSnapShot.dateTimeReadOnly.minutes;
    const seconds = dateTimeSnapShot.dateTimeReadOnly.seconds;
    const ms = dateTimeSnapShot.dateTimeReadOnly.ms;
    const us = dateTimeSnapShot.dateTimeReadOnly.us;
    const ns = dateTimeSnapShot.dateTimeReadOnly.ns;
    const weekday = dateTimeSnapShot.dateTimeReadOnly.weekday;
    const timestampExtended = dateTimeSnapShot.timestampExtended.copy();

    return createDateTimeSeed(years, months, days, hours, minutes, seconds, ms, us, ns, weekday, timestampExtended);
}

const yearDaysToWeekdayMap: Record<number, number> = {365: 1, 366: 2};

function yearsNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) {
        const days = getYearDays(dateTimeSeed.years);
        dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + yearDaysToWeekdayMap[days]) % WEEK_IN_DAYS;
        dateTimeSeed.timestampExtended.ms += days * DAY_IN_MILLISECONDS;
    }
    dateTimeSeed.years += 1;
    return dateTimeSeed;
}

function yearsPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    // how to use defer in javascript
    // keep it simple, you can use wrapping all in function
    const dateTimeX = ((dateTimeX: DateTimeSeed) => {
        dateTimeX.years -= 1;
        return dateTimeX;
    })(dateTimeSeed);
    if (updateWeekdayAndTimestamp) {
        const days = getYearDays(dateTimeX.years);
        dateTimeX.weekday = (toNumber(dateTimeX.weekday) - yearDaysToWeekdayMap[days]) % WEEK_IN_DAYS;
        dateTimeX.timestampExtended.ms -= days * DAY_IN_MILLISECONDS;
    }
    return dateTimeX;
}

function yearsNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum years
    while (dateTimeSeed.timestampExtended.ms < timestampExtended.ms) {
        const dateTimeX = yearsNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms > timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    // subtract years
    while (dateTimeSeed.timestampExtended.ms > timestampExtended.ms) {
        const dateTimeX = yearsPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms < timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addYears(dateTimeSeed: DateTimeSeed, years: number): DateTimeSeed {
    while (years > 0) {
        yearsNext(dateTimeSeed);
        years -= 1;
    }
    while (years < 0) {
        yearsPrev(dateTimeSeed);
        years += 1;
    }
    return dateTimeSeed;
}

const monthDaysToWeekdayMap: Record<number, number> = {28: 0, 29: 1, 30: 2, 31: 3};

function monthsNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) {
        const days = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
        dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + monthDaysToWeekdayMap[days]) % WEEK_IN_DAYS;
        dateTimeSeed.timestampExtended.ms += days * DAY_IN_MILLISECONDS;
    }
    if (dateTimeSeed.months < 12) {
        dateTimeSeed.months += 1;
        return dateTimeSeed;
    }
    yearsNext(dateTimeSeed, false);
    dateTimeSeed.months = 1;
    return dateTimeSeed;
}

function monthsPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    // how to use defer in javascript
    // keep it simple, you can use wrapping all in function
    const dateTimeX = ((dateTimeX: DateTimeSeed) => {
        if (dateTimeX.months > 1) {
            dateTimeX.months -= 1;
            return dateTimeX;
        }
        yearsPrev(dateTimeX, false);
        dateTimeX.months = 12;
        return dateTimeX;
    })(dateTimeSeed);
    if (updateWeekdayAndTimestamp) {
        const days = getMonthDays(dateTimeX.years, dateTimeX.months);
        dateTimeX.weekday = (toNumber(dateTimeX.weekday) - monthDaysToWeekdayMap[days]) % WEEK_IN_DAYS;
        dateTimeX.timestampExtended.ms -= days * DAY_IN_MILLISECONDS;
    }
    return dateTimeX;
}

function monthsNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum months
    while (dateTimeSeed.timestampExtended.ms < timestampExtended.ms) {
        const dateTimeX = monthsNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms > timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    // subtract months
    while (dateTimeSeed.timestampExtended.ms > timestampExtended.ms) {
        const dateTimeX = monthsPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms < timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addMonths(dateTimeSeed: DateTimeSeed, months: number): DateTimeSeed {
    // if (months > 0) {
    //     const {value, n} = modulo(months, YEAR_IN_MONTHS);
    //     for (let i = 0; i < n; i++) {
    //         yearsNext(dateTimeSeed);
    //     }
    //     let k = value;
    //     while (k > 0) {
    //         monthsNext(dateTimeSeed);
    //         k -= 1;
    //     }
    // }
    while (months > 0) {
        const yearMonths = YEAR_IN_MONTHS;
        if (months < yearMonths) break;
        yearsNext(dateTimeSeed);
        months -= yearMonths;
    }
    while (months > 0) {
        monthsNext(dateTimeSeed);
        months -= 1;
    }
    // if (months < 0) {
    //     const {value, n} = modulo(months, YEAR_IN_MONTHS);
    //     for (let j = n; j < 0; j++) {
    //         yearsPrev(dateTimeSeed);
    //     }
    //     let k = value > 0 ? value - YEAR_IN_MONTHS : 0;
    //     while (k < 0) {
    //         monthsPrev(dateTimeSeed);
    //         k += 1;
    //     }
    // }
    while (months < 0) {
        const yearMonths = YEAR_IN_MONTHS;
        if (months > -yearMonths) break;
        yearsNext(dateTimeSeed);
        months += yearMonths;
    }
    while (months < 0) {
        monthsNext(dateTimeSeed);
        months += 1;
    }
    return dateTimeSeed;
}

function daysNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms += DAY_IN_MILLISECONDS;
    const days = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
    if (dateTimeSeed.days < days) {
        dateTimeSeed.days += 1;
        return dateTimeSeed;
    }
    if (updateWeekdayAndTimestamp) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + 1) % WEEK_IN_DAYS;
    monthsNext(dateTimeSeed, false);
    dateTimeSeed.days = 1;
    return dateTimeSeed;
}

function daysPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms -= DAY_IN_MILLISECONDS;
    if (dateTimeSeed.days > 1) {
        dateTimeSeed.days -= 1;
        return dateTimeSeed;
    }
    if (updateWeekdayAndTimestamp) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) - 1) % WEEK_IN_DAYS;
    monthsPrev(dateTimeSeed, false); // call it first before replace current days with days at end of month
    dateTimeSeed.days = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
    return dateTimeSeed;
}

function daysNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum days
    while (dateTimeSeed.timestampExtended.ms < timestampExtended.ms) {
        const dateTimeX = daysNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms > timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    // subtract days
    while (dateTimeSeed.timestampExtended.ms > timestampExtended.ms) {
        const dateTimeX = daysPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms < timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addDays(dateTimeSeed: DateTimeSeed, days: number): DateTimeSeed {
    // increase days
    while (days > 0) {
        const yearDays = getYearDays(dateTimeSeed.years);
        if (days < yearDays) break;
        yearsNext(dateTimeSeed);
        days -= yearDays;
    }
    while (days > 0) {
        const monthDays = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
        if (days < monthDays) break;
        monthsNext(dateTimeSeed);
        days -= monthDays;
    }
    while (days > 0) {
        daysNext(dateTimeSeed);
        days -= 1;
    }
    // decrease days
    while (days < 0) {
        const dateTimeX = yearsPrev(dateTimeSeed.copy());
        const yearDays = getYearDays(dateTimeX.years);
        // if (Math.abs(days) < yearDays) break;
        if (days > -yearDays) break; // fast
        dateTimeSeed.assign(dateTimeX);
        days += yearDays;
    }
    while (days < 0) {
        const dateTimeX = monthsPrev(dateTimeSeed.copy());
        const monthDays = getMonthDays(dateTimeX.years, dateTimeX.months);
        // if (Math.abs(days) < monthDays) break;
        if (days > -monthDays) break; // fast
        dateTimeSeed.assign(dateTimeX);
        days += monthDays;
    }
    while (days < 0) {
        daysPrev(dateTimeSeed);
        days += 1;
    }
    return dateTimeSeed;
}

function hoursNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms += HOUR_IN_MILLISECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.hours < 23) {
        dateTimeSeed.hours += 1;
        return dateTimeSeed;
    }
    daysNext(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.hours = 0;
    return dateTimeSeed;
}

function hoursPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms -= HOUR_IN_MILLISECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.hours > 0) {
        dateTimeSeed.hours -= 1;
        return dateTimeSeed;
    }
    daysPrev(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.hours = 23;
    return dateTimeSeed;
}

function hoursNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum hours
    while (dateTimeSeed.timestampExtended.ms < timestampExtended.ms) {
        const dataTimeX = hoursNext(dateTimeSeed.copy());
        if (dataTimeX.timestampExtended.ms > timestampExtended.ms) break;
        dateTimeSeed.assign(dataTimeX);
    }
    // subtract hours
    while (dateTimeSeed.timestampExtended.ms > timestampExtended.ms) {
        const dateTimeX = hoursPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms < timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addHours(dateTimeSeed: DateTimeSeed, hours: number): DateTimeSeed {
    // if (hours > 0) {
    //     const {value, n} = modulo(hours, DAY_IN_HOURS);
    //     for (let i = 0; i < n; i++) {
    //         daysNext(dateTimeSeed);
    //     }
    //     let k = value;
    //     while (k > 0) {
    //         hoursNext(dateTimeSeed);
    //         k -= 1;
    //     }
    // }
    while (hours > 0) {
        const monthDays = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
        const monthHours = monthDays * DAY_IN_HOURS;
        if (hours < monthHours) break;
        monthsNext(dateTimeSeed);
        hours -= monthHours;
    }
    while (hours > 0) {
        const dayHours = DAY_IN_HOURS;
        if (hours < dayHours) break;
        daysNext(dateTimeSeed);
        hours -= dayHours;
    }
    while (hours > 0) {
        hoursNext(dateTimeSeed);
        hours -= 1;
    }
    // if (hours < 0) {
    //     const {value, n} = modulo(hours, DAY_IN_HOURS);
    //     for (let j = n; j < 0; j++) {
    //         daysPrev(dateTimeSeed);
    //     }
    //     let k = value > 0 ? value - DAY_IN_HOURS : 0;
    //     while (k < 0) {
    //         hoursPrev(dateTimeSeed);
    //         k += 1;
    //     }
    // }
    while (hours < 0) {
        const dateTimeX = monthsPrev(dateTimeSeed.copy());
        const monthDays = getMonthDays(dateTimeX.years, dateTimeX.months);
        const monthHours = monthDays * DAY_IN_HOURS;
        if (hours > -monthHours) break;
        dateTimeSeed.assign(dateTimeX);
        hours += monthHours;
    }
    while (hours < 0) {
        const dateTimeX = daysPrev(dateTimeSeed.copy());
        const dayHours = DAY_IN_HOURS;
        if (hours > -dayHours) break;
        dateTimeSeed.assign(dateTimeX);
        hours += dayHours;
    }
    while (hours < 0) {
        hoursPrev(dateTimeSeed);
        hours += 1;
    }
    return dateTimeSeed;
}

function minutesNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms += MINUTE_IN_MILLISECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.minutes < 59) {
        dateTimeSeed.minutes += 1;
        return dateTimeSeed;
    }
    hoursNext(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.minutes = 0;
    return dateTimeSeed;
}

function minutesPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms -= MINUTE_IN_MILLISECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.minutes > 0) {
        dateTimeSeed.minutes -= 1;
        return dateTimeSeed;
    }
    hoursPrev(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.minutes = 59;
    return dateTimeSeed;
}

function minutesNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum minutes
    while (dateTimeSeed.timestampExtended.ms < timestampExtended.ms) {
        const dateTimeX = minutesNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms > timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    // subtract minutes
    while (dateTimeSeed.timestampExtended.ms > timestampExtended.ms) {
        const dateTimeX = minutesPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms < timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addMinutes(dateTimeSeed: DateTimeSeed, minutes: number): DateTimeSeed {
    // if (minutes > 0) {
    //     const {value, n} = modulo(minutes, HOUR_IN_MINUTES);
    //     for (let i = 0; i < n; i++) {
    //         hoursNext(dateTimeSeed);
    //     }
    //     let k = value;
    //     while (k > 0) {
    //         minutesNext(dateTimeSeed);
    //         k -= 1;
    //     }
    // }
    while (minutes > 0) {
        const yearDays = getYearDays(dateTimeSeed.years);
        const yearMinutes = yearDays * DAY_IN_MINUTES;
        if (minutes < yearMinutes) break;
        yearsNext(dateTimeSeed);
        minutes -= yearMinutes;
    }
    while (minutes > 0) {
        const monthDays = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
        const monthMinutes = monthDays * DAY_IN_MINUTES;
        if (minutes < monthMinutes) break;
        monthsNext(dateTimeSeed);
        minutes -= monthMinutes;
    }
    while (minutes > 0) {
        const dayMinutes = DAY_IN_MINUTES;
        if (minutes < dayMinutes) break;
        daysNext(dateTimeSeed);
        minutes -= dayMinutes;
    }
    while (minutes > 0) {
        const hourMinutes = HOUR_IN_MINUTES;
        if (minutes < hourMinutes) break;
        hoursNext(dateTimeSeed);
        minutes -= hourMinutes;
    }
    while (minutes > 0) {
        minutesNext(dateTimeSeed);
        minutes -= 1;
    }
    // if (minutes < 0) {
    //     const {value, n} = modulo(minutes, HOUR_IN_MINUTES);
    //     for (let j = n; j < 0; j++) {
    //         hoursPrev(dateTimeSeed);
    //     }
    //     let k = value > 0 ? value - HOUR_IN_MINUTES : 0;
    //     while (k < 0) {
    //         minutesPrev(dateTimeSeed);
    //         k += 1;
    //     }
    // }
    while (minutes < 0) {
        const dateTimeX = yearsPrev(dateTimeSeed.copy());
        const yearDays = getYearDays(dateTimeX.years);
        const yearMinutes = yearDays * DAY_IN_MINUTES;
        if (minutes > -yearMinutes) break;
        dateTimeSeed.assign(dateTimeX);
        minutes += yearMinutes;
    }
    while (minutes < 0) {
        const dateTimeX = monthsPrev(dateTimeSeed.copy());
        const monthDays = getMonthDays(dateTimeX.years, dateTimeX.months);
        const monthMinutes = monthDays * DAY_IN_MINUTES;
        if (minutes > -monthMinutes) break;
        dateTimeSeed.assign(dateTimeX);
        minutes += monthMinutes;
    }
    while (minutes < 0) {
        const dayMinutes = DAY_IN_MINUTES;
        if (minutes > -dayMinutes) break;
        daysPrev(dateTimeSeed);
        minutes += dayMinutes;
    }
    while (minutes < 0) {
        const hourMinutes = HOUR_IN_MINUTES;
        if (minutes > -hourMinutes) break;
        hoursPrev(dateTimeSeed);
        minutes += hourMinutes;
    }
    while (minutes < 0) {
        minutesPrev(dateTimeSeed);
        minutes += 1;
    }
    return dateTimeSeed;
}

function secondsNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms += SECOND_IN_MILLISECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.seconds < 59) {
        dateTimeSeed.seconds += 1;
        return dateTimeSeed;
    }
    minutesNext(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended);
    dateTimeSeed.seconds = 0;
    return dateTimeSeed;
}

function secondsPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms -= SECOND_IN_MILLISECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.seconds > 0) {
        dateTimeSeed.seconds -= 1;
        return dateTimeSeed;
    }
    minutesPrev(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended);
    dateTimeSeed.seconds = 59;
    return dateTimeSeed;
}

function secondsNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum seconds
    while (dateTimeSeed.timestampExtended.ms < timestampExtended.ms) {
        const dateTimeX = secondsNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms > timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    // subtract seconds
    while (dateTimeSeed.timestampExtended.ms > timestampExtended.ms) {
        const dateTimeX = secondsPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms < timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addSeconds(dateTimeSeed: DateTimeSeed, seconds: number): DateTimeSeed {
    // if (seconds > 0) {
    //     const {value, n} = modulo(seconds, MINUTE_IN_SECONDS);
    //     for (let i = 0; i < n; i++) {
    //         minutesNext(dateTimeSeed);
    //     }
    //     let k = value;
    //     while (k > 0) {
    //         secondsNext(dateTimeSeed);
    //         k -= 1;
    //     }
    // }
    while (seconds > 0) {
        const yearDays = getYearDays(dateTimeSeed.years);
        const yearSeconds = yearDays * DAY_IN_SECONDS;
        if (seconds < yearSeconds) break;
        yearsNext(dateTimeSeed);
        seconds -= yearSeconds;
    }
    while (seconds > 0) {
        const monthDays = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
        const monthSeconds = monthDays * DAY_IN_SECONDS;
        if (seconds < monthSeconds) break;
        monthsNext(dateTimeSeed);
        seconds -= monthSeconds;
    }
    while (seconds > 0) {
        const daySeconds = DAY_IN_SECONDS;
        if (seconds < daySeconds) break;
        daysNext(dateTimeSeed);
        seconds -= daySeconds;
    }
    while (seconds > 0) {
        const hourSeconds = HOUR_IN_SECONDS;
        if (seconds < hourSeconds) break;
        hoursNext(dateTimeSeed);
        seconds -= hourSeconds;
    }
    while (seconds > 0) {
        const minuteSeconds = MINUTE_IN_SECONDS;
        if (seconds < minuteSeconds) break;
        minutesNext(dateTimeSeed);
        seconds -= minuteSeconds;
    }
    while (seconds > 0) {
        secondsNext(dateTimeSeed);
        seconds -= 1;
    }
    // if (seconds < 0) {
    //     const {value, n} = modulo(seconds, MINUTE_IN_SECONDS);
    //     for (let j = n; j < 0; j++) {
    //         minutesPrev(dateTimeSeed);
    //     }
    //     let k = value > 0 ? value - MINUTE_IN_SECONDS : 0;
    //     while (k < 0) {
    //         secondsPrev(dateTimeSeed);
    //         k += 1;
    //     }
    // }
    while (seconds < 0) {
        const dateTimeX = yearsPrev(dateTimeSeed.copy());
        const yearDays = getYearDays(dateTimeX.years);
        const yearSeconds = yearDays * DAY_IN_SECONDS;
        if (seconds > -yearSeconds) break;
        dateTimeSeed.assign(dateTimeX);
        seconds += yearSeconds;
    }
    while (seconds < 0) {
        const dateTimeX = monthsPrev(dateTimeSeed.copy());
        const monthDays = getMonthDays(dateTimeX.years, dateTimeX.months);
        const monthSeconds = monthDays * DAY_IN_SECONDS;
        if (seconds > -monthSeconds) break;
        dateTimeSeed.assign(dateTimeX);
        seconds += monthSeconds;
    }
    while (seconds < 0) {
        const daySeconds = DAY_IN_SECONDS;
        if (seconds > -daySeconds) break;
        daysPrev(dateTimeSeed);
        seconds += daySeconds;
    }
    while (seconds < 0) {
        const hourSeconds = HOUR_IN_SECONDS;
        if (seconds > -hourSeconds) break;
        hoursPrev(dateTimeSeed);
        seconds += hourSeconds;
    }
    while (seconds < 0) {
        const minuteSeconds = MINUTE_IN_SECONDS;
        if (seconds > -minuteSeconds) break;
        minutesPrev(dateTimeSeed);
        seconds += minuteSeconds;
    }
    while (seconds < 0) {
        secondsPrev(dateTimeSeed);
        seconds += 1;
    }
    return dateTimeSeed;
}

function msNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms += 1;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.ms < 999) {
        dateTimeSeed.ms += 1;
        return dateTimeSeed;
    }
    secondsNext(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.ms = 0;
    return dateTimeSeed;
}

function msPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ms -= 1;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.ms > 0) {
        dateTimeSeed.ms -= 1;
        return dateTimeSeed;
    }
    secondsPrev(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.ms = 999;
    return dateTimeSeed;
}

function msNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum ms
    while (dateTimeSeed.timestampExtended.ms < timestampExtended.ms) {
        const dateTimeX = msNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms > timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    // subtract ms
    while (dateTimeSeed.timestampExtended.ms > timestampExtended.ms) {
        const dateTimeX = msPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ms < timestampExtended.ms) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addMs(dateTimeSeed: DateTimeSeed, ms: number): DateTimeSeed {
    // if (ms > 0) {
    //     const {value, n} = modulo(ms, SECOND_IN_MILLISECONDS);
    //     for (let i = 0; i < n; i++) {
    //         secondsNext(dateTimeSeed);
    //     }
    //     let k = value;
    //     while (k > 0) {
    //         msNext(dateTimeSeed);
    //         k -= 1;
    //     }
    // }
    while (ms > 0) {
        const yearDays = getYearDays(dateTimeSeed.years);
        const yearMs = yearDays * DAY_IN_MILLISECONDS;
        if (ms < yearMs) break;
        yearsNext(dateTimeSeed);
        ms -= yearMs;
    }
    while (ms > 0) {
        const monthDays = getMonthDays(dateTimeSeed.years, dateTimeSeed.months);
        const monthMs = monthDays * DAY_IN_MILLISECONDS;
        if (ms < monthMs) break;
        monthsNext(dateTimeSeed);
        ms -= monthMs;
    }
    while (ms > 0) {
        const dayMs = DAY_IN_MILLISECONDS;
        if (ms < dayMs) break;
        daysNext(dateTimeSeed);
        ms -= dayMs;
    }
    while (ms > 0) {
        const hourMs = HOUR_IN_MILLISECONDS;
        if (ms < hourMs) break;
        hoursNext(dateTimeSeed);
        ms -= hourMs;
    }
    while (ms > 0) {
        const minuteMs = MINUTE_IN_MILLISECONDS;
        if (ms < minuteMs) break;
        minutesNext(dateTimeSeed);
        ms -= minuteMs;
    }
    while (ms > 0) {
        const secondMs = SECOND_IN_MILLISECONDS;
        if (ms < secondMs) break;
        secondsNext(dateTimeSeed);
        ms -= secondMs;
    }
    while (ms > 0) {
        msNext(dateTimeSeed);
        ms -= 1;
    }
    // if (ms < 0) {
    //     const {value, n} = modulo(ms, SECOND_IN_MILLISECONDS);
    //     for (let j = n; j < 0; j++) {
    //         secondsPrev(dateTimeSeed);
    //     }
    //     let k = value > 0 ? value - SECOND_IN_MILLISECONDS : 0;
    //     while (k < 0) {
    //         msPrev(dateTimeSeed);
    //         k += 1;
    //     }
    // }
    while (ms < 0) {
        const dateTimeX = yearsPrev(dateTimeSeed.copy());
        const yearDays = getYearDays(dateTimeX.years);
        const yearMs = yearDays * DAY_IN_MILLISECONDS;
        if (ms > -yearMs) break;
        dateTimeSeed.assign(dateTimeX);
        ms += yearMs;
    }
    while (ms < 0) {
        const dateTimeX = monthsPrev(dateTimeSeed.copy());
        const monthDays = getMonthDays(dateTimeX.years, dateTimeX.months);
        const monthMs = monthDays * DAY_IN_MILLISECONDS;
        if (ms > -monthMs) break;
        dateTimeSeed.assign(dateTimeX);
        ms += monthMs;
    }
    while (ms < 0) {
        const dayMs = DAY_IN_MILLISECONDS;
        if (ms > -dayMs) break;
        daysPrev(dateTimeSeed);
        ms += dayMs;
    }
    while (ms < 0) {
        const hourMs = HOUR_IN_MILLISECONDS;
        if (ms > -hourMs) break;
        hoursPrev(dateTimeSeed);
        ms += hourMs;
    }
    while (ms < 0) {
        const minuteMs = MINUTE_IN_MILLISECONDS;
        if (ms > -minuteMs) break;
        minutesPrev(dateTimeSeed);
        ms += minuteMs;
    }
    while (ms < 0) {
        const secondMs = SECOND_IN_MILLISECONDS;
        if (ms > -secondMs) break;
        secondsPrev(dateTimeSeed);
        ms += secondMs;
    }
    while (ms < 0) {
        msPrev(dateTimeSeed);
        ms += 1;
    }
    return dateTimeSeed;
}

function usNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ns += MICROSECOND_IN_NANOSECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.us < 999) {
        dateTimeSeed.us += 1;
        return dateTimeSeed;
    }
    msNext(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.us = 0;
    return dateTimeSeed;
}

function usPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ns -= MICROSECOND_IN_NANOSECONDS;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.us > 0) {
        dateTimeSeed.us -= 1;
        return dateTimeSeed;
    }
    msPrev(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.us = 999;
    return dateTimeSeed;
}

function usNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum us
    while (dateTimeSeed.timestampExtended.ns < timestampExtended.ns) {
        const dateTimeX = usNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ns > timestampExtended.ns) break;
        dateTimeSeed.assign(dateTimeX);
    }
    // subtract us
    while (dateTimeSeed.timestampExtended.ns > timestampExtended.ns) {
        const dateTimeX = usPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ns < timestampExtended.ns) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addUs(dateTimeSeed: DateTimeSeed, us: number): DateTimeSeed {
    if (us > 0) {
        const {value, n} = modulo(us, MILLISECOND_IN_MICROSECONDS);
        for (let i = 0; i < n; i++) {
            msNext(dateTimeSeed);
        }
        let k = value;
        while (k > 0) {
            usNext(dateTimeSeed);
            k -= 1;
        }
    }
    if (us < 0) {
        const {value, n} = modulo(us, MILLISECOND_IN_MICROSECONDS);
        for (let j = n; j < 0; j++) {
            msPrev(dateTimeSeed);
        }
        let k = value > 0 ? value - MILLISECOND_IN_MICROSECONDS : 0;
        while (k < 0) {
            usPrev(dateTimeSeed);
            k += 1;
        }
    }
    return dateTimeSeed;
}

function nsNext(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ns += 1;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.ns < 999) {
        dateTimeSeed.ns += 1;
        return dateTimeSeed;
    }
    usNext(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.ns = 0;
    return dateTimeSeed;
}

function nsPrev(dateTimeSeed: DateTimeSeed, updateWeekdayAndTimestamp: boolean = true): DateTimeSeed {
    if (updateWeekdayAndTimestamp) dateTimeSeed.timestampExtended.ns -= 1;
    const timestampExtended = dateTimeSeed.timestampExtended.copy();
    if (dateTimeSeed.ns > 0) {
        dateTimeSeed.ns -= 1;
        return dateTimeSeed;
    }
    usPrev(dateTimeSeed); // update weekday
    dateTimeSeed.timestampExtended.assign(timestampExtended); // revert timestamp
    dateTimeSeed.ns = 999;
    return dateTimeSeed;
}

function nsNear(dateTimeSeed: DateTimeSeed, timestampExtended: TimestampExtended): DateTimeSeed {
    // sum ns
    while (dateTimeSeed.timestampExtended.ns < timestampExtended.ns) {
        const dateTimeX = nsNext(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ns > timestampExtended.ns) break;
        dateTimeSeed.assign(dateTimeX);
    }
    while (dateTimeSeed.timestampExtended.ns > timestampExtended.ns) {
        const dateTimeX = nsPrev(dateTimeSeed.copy());
        if (dateTimeX.timestampExtended.ns < timestampExtended.ns) break;
        dateTimeSeed.assign(dateTimeX);
    }
    return dateTimeSeed;
}

function addNs(dateTimeSeed: DateTimeSeed, ns: number): DateTimeSeed {
    if (ns > 0) {
        const {value, n} = modulo(ns, MICROSECOND_IN_NANOSECONDS);
        for (let i = 0; i < n; i++) {
            usNext(dateTimeSeed);
        }
        let k = value;
        while (k > 0) {
            nsNext(dateTimeSeed);
            k -= 1;
        }
    }
    if (ns < 0) {
        const {value, n} = modulo(ns, MICROSECOND_IN_NANOSECONDS);
        for (let j = n; j < 0; j++) {
            usPrev(dateTimeSeed);
        }
        let k = value > 0 ? value - MICROSECOND_IN_NANOSECONDS : 0;
        while (k < 0) {
            nsPrev(dateTimeSeed);
            k += 1;
        }
    }
    return dateTimeSeed;
}

export function getDateTimeReadOnlyByTimestampExtended(timestampExtended: TimestampExtended): DateTimeReadOnlyImpl {
    if (dateTimeSnapShots.length === 0) throw new Error("getDateTimeReadOnlyByTimestamp() requires at least one DateTimeSnapShot.");

    // find multiple nearest datetime snapshots
    let arr: number[] = [];
    for (let i = 0; i < dateTimeSnapShots.length; i++) {
        const dateTimeSnapShot = dateTimeSnapShots[i];
        const ms = timestampExtended.ms - dateTimeSnapShot.timestampExtended.ms;
        arr.push(ms);

        // break if found
        if (i === 0 && timestampExtended.ms >= dateTimeSnapShot.timestampExtended.ms) break;
        if (i < dateTimeSnapShots.length - 1) {
            const dateTimeSnapShotNext = dateTimeSnapShots[i+1];
            let k = (dateTimeSnapShot.timestampExtended.ms - dateTimeSnapShotNext.timestampExtended.ms) >> 1;
            k += dateTimeSnapShotNext.timestampExtended.ms;
            if (Math.abs(timestampExtended.ms) <= k) break;
        }
    }

    // find nearest datetime snapshot
    let val = arr[0];
    let temp = Math.abs(val);
    for (let i = 1; i < arr.length; i++) {
        const ms = arr[i];
        const value = Math.abs(ms);
        if (value < temp) {
            temp = value;
            val = ms;
        }
    }

    // get nearest dateTimeSnapShot as possible
    const index = arr.indexOf(val);
    if (index === -1) throw new Error("getDateTimeReadOnlyByTimestamp() failed.");
    const dateTimeSnapShot = dateTimeSnapShots[index].copy();
    const timeZone = dateTimeSnapShot.dateTimeReadOnly.timeZone;

    const dateTimeSeed = createDateTimeSnapShotSeed(dateTimeSnapShot);

    yearsNear(dateTimeSeed, timestampExtended);
    monthsNear(dateTimeSeed, timestampExtended);
    daysNear(dateTimeSeed, timestampExtended);
    hoursNear(dateTimeSeed, timestampExtended);
    minutesNear(dateTimeSeed, timestampExtended);
    secondsNear(dateTimeSeed, timestampExtended);
    msNear(dateTimeSeed, timestampExtended);
    usNear(dateTimeSeed, timestampExtended);
    nsNear(dateTimeSeed, timestampExtended);

    const years = dateTimeSeed.years;
    const months = dateTimeSeed.months;
    const days = dateTimeSeed.days;
    const hours = dateTimeSeed.hours;
    const minutes = dateTimeSeed.minutes;
    const seconds = dateTimeSeed.seconds;
    const ms = dateTimeSeed.ms;
    const us = dateTimeSeed.us;
    const ns = dateTimeSeed.ns;
    const weekday = dateTimeSeed.weekday;

    return new DateTimeReadOnly(years, months, days, hours, minutes, seconds, ms, us, ns, weekday, timeZone);
}

export function getNearestDateTimeSnapShot(dateTimeReadOnly: DateTimeReadOnlyImpl): NearestDateTimeSnapShotImpl {
    if (dateTimeSnapShots.length === 0) throw new Error("getNearestDateTimeSnapShot() requires at least one DateTimeSnapShot.");

    // find multiple nearest datetime snapshots
    let arr: number[] = [];
    for (let i = 0; i < dateTimeSnapShots.length; i++) {
        const dateTimeSnapShot = dateTimeSnapShots[i];
        const years = dateTimeReadOnly.years - dateTimeSnapShot.dateTimeReadOnly.years;
        arr.push(years);

        // break if found
        if (i === 0 && dateTimeReadOnly.years >= dateTimeSnapShot.dateTimeReadOnly.years) break;
        if (Math.abs(years) <= 5) break;
    }

    // find nearest datetime snapshot
    let val = arr[0];
    let temp = Math.abs(val);
    for (let i = 1; i < arr.length; i++) {
        const years = arr[i];
        const value = Math.abs(years);
        if (value < temp) {
            temp = value;
            val = years;
        }
    }

    // get nearest dateTimeSnapShot as possible
    const index = arr.indexOf(val);
    if (index === -1) throw new Error("getNearestDateTimeSnapShot() failed.");
    const dateTimeSnapShot = dateTimeSnapShots[index].copy();

    let years = dateTimeSnapShot.dateTimeReadOnly.years;
    let months = dateTimeSnapShot.dateTimeReadOnly.months;
    let days = dateTimeSnapShot.dateTimeReadOnly.days;
    let hours = dateTimeSnapShot.dateTimeReadOnly.hours;
    let minutes = dateTimeSnapShot.dateTimeReadOnly.minutes;
    let seconds = dateTimeSnapShot.dateTimeReadOnly.seconds;
    let ms = dateTimeSnapShot.dateTimeReadOnly.ms;
    let us = dateTimeSnapShot.dateTimeReadOnly.us;
    let ns = dateTimeSnapShot.dateTimeReadOnly.ns;

    const timeSpan = new TimeSpan(0, 0, 0, 0, 0, 0, 0);

    // val is ranges of years
    if (val >= 0) {
        for (let i = 0; i < val; i++) {
            const days = getYearDays(years); // current days in year
            timeSpan.days += days;
            years += 1;
        }
    } else {
        for (let j = val; j < 0; j++) {
            const yearsX = years - 1;
            const days = getYearDays(yearsX); // previous days in year
            timeSpan.days -= days;
            years = yearsX;
        }
    }

    while (months < dateTimeReadOnly.months) {
        const days = getMonthDays(years, months);
        timeSpan.days += days;
        if (months < 12) {
            months += 1;
        } else {
            years += 1;
            months = 1;
        }
    }

    if (days < dateTimeReadOnly.days) timeSpan.days += dateTimeReadOnly.days - days;
    if (hours < dateTimeReadOnly.hours) timeSpan.hours = dateTimeReadOnly.hours - hours;
    if (minutes < dateTimeReadOnly.minutes) timeSpan.minutes = dateTimeReadOnly.minutes - minutes;
    if (seconds < dateTimeReadOnly.seconds) timeSpan.seconds = dateTimeReadOnly.seconds - seconds;
    if (ms < dateTimeReadOnly.ms) timeSpan.ms = dateTimeReadOnly.ms - ms;
    if (us < dateTimeReadOnly.us) timeSpan.us = dateTimeReadOnly.us - us;
    if (ns < dateTimeReadOnly.ns) timeSpan.ns = dateTimeReadOnly.ns - ns;

    return new NearestDateTimeSnapShot(dateTimeSnapShot, timeSpan);
}

export function isLeapYear(years: number): boolean {
    if (years % 4 !== 0) return false;
    return years % 100 !== 0 || years % 400 === 0;
}

export function getYearDays(years: number): number {
    if (isLeapYear(years)) return LEAP_YEAR_IN_DAYS;
    return YEAR_IN_DAYS;
}

export function getMonthDays(years: number, months: MonthTyped): number {
    switch (months) {
        case Months.January:
        case Months.March:
        case Months.May:
        case Months.July:
        case Months.August:
        case Months.October:
        case Months.December:
            return 31;
        case Months.February:
            return isLeapYear(years) ? 29 : 28;
        // case MonthsEnum.April:
        // case MonthsEnum.June:
        // case MonthsEnum.September:
        // case MonthsEnum.November:
        default:
            return 30;
    }
}

export interface TimestampExtended extends ComparableImpl<TimestampExtended>, EquatableImpl<TimestampExtended> {
    // Represents the milliseconds part of the timestamp,
    // Useful for low-resolution time measurements.
    ms: number;

    // Represents the nanoseconds part of the timestamp,
    // providing additional precision beyond milliseconds.
    // Useful for high-resolution time measurements.
    ns: number;

    assign(other: TimestampExtended): TimestampExtended;
    copy(): TimestampExtended;
    valueOf(): number;
}

export function createTimestampExtended(ms: number, ns: number): TimestampExtended {
    return {
        ms,
        ns,
        compareTo(other: TimestampExtended): number {
            if (!isTimestampExtended(other)) throw new Error("Value is not a Timestamp");
            if (this.ms > other.ms) return 1;
            if (this.ms < other.ms) return -1;
            if (this.ns > other.ns) return 1;
            if (this.ns < other.ns) return -1;
            return 0;
        },
        equals(other: TimestampExtended): boolean {
            if (!isTimestampExtended(other)) throw new Error("Value is not a Timestamp");
            if (this.ms !== other.ms) return false;
            if (this.ns !== other.ns) return false;
            // some issues like infinite numbers
            return true;
        },
        assign(other: TimestampExtended): TimestampExtended {
            this.ms = other.ms;
            this.ns = other.ns;
            return this;
        },
        copy(): TimestampExtended {
            return createTimestampExtended(this.ms, this.ns);
        },
        valueOf(): number {
            return this.ms;
        },
    };
}

export function isTimestampExtended(value: any): value is TimestampExtended {
    if (typeof value === "number") return true;
    const props: Record<keyof TimestampExtended, string> = {
        ms: "number",
        ns: "number",
        compareTo: "function",
        equals: "function",
        assign: "function",
        copy: "function",
        valueOf: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof TimestampImpl];
        if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
        return false;
    }
    return true;
}

export interface DateTimeImpl extends ComparableImpl<DateTimeImpl>, EquatableImpl<DateTimeImpl> {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    ms: number;
    us: number;
    ns: number;
    weekday: WeekdayTyped;
    timeZone: TimeZoneTyped;
    toString(): string;
    toUTC(): DateTimeImpl;
    add(d: TimeSpanImpl): DateTimeImpl;
    subtract(d: TimeSpanImpl): DateTimeImpl;
    after(d: DateTimeImpl): boolean;
    before(d: DateTimeImpl): boolean;
    parse(s: string): DateTimeImpl;
}

export class DateTime implements DateTimeImpl {
    public years: number;
    public months: number;
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    public ms: number;
    public us: number;
    public ns: number;
    public weekday: WeekdayTyped;
    public timeZone: TimeZoneTyped;

    public constructor(value?: number | string | Date | DateTimeImpl) {
        this.years = 0;
        this.months = 0;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.ms = 0;
        this.us = 0;
        this.ns = 0;
        this.weekday = Weekdays.Sunday;
        this.timeZone = TimeZones.Local;

        if (value === undefined) return;

        switch (typeof value) {
            case "number":
            case "string":
                const date = new Date(value);
                this.years = date.getUTCFullYear();
                this.months = date.getUTCMonth() + 1;
                this.days = date.getUTCDate();
                this.hours = date.getUTCHours();
                this.minutes = date.getUTCMinutes();
                this.seconds = date.getUTCSeconds();
                this.ms = date.getUTCMilliseconds();
                this.us = 0;
                this.ns = 0;
                this.weekday = date.getUTCDay();
                this.timeZone = TimeZones.UTC;
                break;
            case "object":
                if (value instanceof DateTime) {
                    this.years = value.years;
                    this.months = value.months;
                    this.days = value.days;
                    this.hours = value.hours;
                    this.minutes = value.minutes;
                    this.seconds = value.seconds;
                    this.ms = value.ms;
                    this.us = value.us;
                    this.ns = value.ns;
                    this.weekday = value.weekday;
                    this.timeZone = value.timeZone;
                } else if (value instanceof Date) {
                    this.years = value.getUTCFullYear();
                    this.months = value.getUTCMonth() + 1;
                    this.days = value.getUTCDate();
                    this.hours = value.getUTCHours();
                    this.minutes = value.getUTCMinutes();
                    this.seconds = value.getUTCSeconds();
                    this.ms = value.getUTCMilliseconds();
                    this.us = 0;
                    this.ns = 0;
                    this.weekday = value.getUTCDay();
                    this.timeZone = TimeZones.UTC;
                } else {
                    throw new Error(`Invalid value: ${value}`);
                }
                break;
        }
    }

    add(d: TimeSpanImpl): DateTimeImpl {
        throw new Error("Method not implemented.");
    }

    after(d: DateTimeImpl): boolean {
        throw new Error("Method not implemented.");
    }

    before(d: DateTimeImpl): boolean {
        throw new Error("Method not implemented.");
    }

    compareTo(other: DateTimeImpl): number {
        throw new Error("Method not implemented.");
    }

    equals(d: DateTimeImpl): boolean {
        throw new Error("Method not implemented.");
    }

    parse(s: string): DateTimeImpl {
        throw new Error("Method not implemented.");
    }

    subtract(d: TimeSpanImpl): DateTimeImpl {
        throw new Error("Method not implemented.");
    }

    toUTC(): DateTimeImpl {
        throw new Error("Method not implemented.");
    }
}

function main() {
    const dateTime = new DateTimeReadOnly(2019, 12, 31, 15, 20, 52, 658, 789, 337, 2, TimeZones.UTC);
    const timestampExtended = dateTime.timestampExtended;
    console.log(timestampExtended);
    const date = new Date('2019-12-31T15:20:52.658Z');
    console.log(date.getTime())

    const dateTimeReadOnly = getDateTimeReadOnlyByTimestampExtended(timestampExtended);
    console.log(dateTimeReadOnly);

    const dateTimeSeed = dateTimeReadOnly.dateTimeSeed;
    addHours(dateTimeSeed, 120);
    // addHours(dateTimeSeed, -120);
    // addMonths(dateTimeSeed, 12);
    console.log(dateTimeSeed);
}

main();
