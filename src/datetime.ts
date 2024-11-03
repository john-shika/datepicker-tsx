/*
* @name: datetime.ts
* @author: <ahmadasysyafiq@proton.me/>
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

import {hasOwnPropertyName} from "@/utils.ts";
import type {ComparableImpl, EquatableImpl} from "@/ops.ts";
import {toNumber} from "@/nums.ts";

export const MONTHS_IN_YEAR = 12;
export const DAYS_IN_YEAR = 365;
export const DAYS_IN_LEAP_YEAR = 366;
export const DAYS_IN_WEEK = 7;

export const HOURS_IN_DAY = 24;

export const MINUTES_IN_HOUR = 60;
export const MINUTES_IN_DAY = 1440;

export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_DAY = 86400;

export const MILLISECONDS_IN_SECOND = 1000;
export const MILLISECONDS_IN_MINUTE = 60000;
export const MILLISECONDS_IN_HOUR = 3600000;
export const MILLISECONDS_IN_DAY = 86400000;

export const MICROSECONDS_IN_MILLISECOND = 1000;
export const MICROSECONDS_IN_SECOND = 1000000;
export const MICROSECONDS_IN_MINUTE = 60000000;
export const MICROSECONDS_IN_HOUR = 3600000000;
export const MICROSECONDS_IN_DAY = 86400000000;

export const NANOSECONDS_IN_MICROSECOND = 1000;
export const NANOSECONDS_IN_MILLISECOND = 1000000;
export const NANOSECONDS_IN_SECOND = 1000000000;
export const NANOSECONDS_IN_MINUTE = 60000000000;
export const NANOSECONDS_IN_HOUR = 3600000000000;
export const NANOSECONDS_IN_DAY = 86400000000000;

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
    while (i < 0) i += 7;
    while (i >= 7) i -= 7;
    return i as Weekdays;
};

weekdays.positionOf = (p: number): Weekdays => {
    while (p <= 0) p += 7;
    while (p > 7) p -= 7;
    return p - 1 as Weekdays;
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
    while (i < 0) i += 12;
    while (i >= 12) i -= 12;
    // return months.positionOf(1 + (i % 12));
    return (i + 1) as Months;
};

months.positionOf = (p: number): Months => {
    while (p <= 0) p += 12;
    while (p > 12) p -= 12;
    return p as Months;
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
    return tz as string;
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
        while (this.ns >= NANOSECONDS_IN_MICROSECOND) {
            this.ns -= NANOSECONDS_IN_MICROSECOND;
            this.us += 1;
        }
        while (this.ns < 0) {
            this.ns += NANOSECONDS_IN_MICROSECOND;
            this.us -= 1;
        }
        while (this.us >= MICROSECONDS_IN_MILLISECOND) {
            this.us -= MICROSECONDS_IN_MILLISECOND;
            this.ms += 1;
        }
        while (this.us < 0) {
            this.us += MICROSECONDS_IN_MILLISECOND;
            this.ms -= 1;
        }
        while (this.ms >= MILLISECONDS_IN_SECOND) {
            this.ms -= MILLISECONDS_IN_SECOND;
            this.seconds += 1;
        }
        while (this.ms < 0) {
            this.ms += MILLISECONDS_IN_SECOND;
            this.seconds -= 1;
        }
        while (this.seconds >= SECONDS_IN_MINUTE) {
            this.seconds -= SECONDS_IN_MINUTE;
            this.minutes += 1;
        }
        while (this.seconds < 0) {
            this.seconds += SECONDS_IN_MINUTE;
            this.minutes -= 1;
        }
        while (this.minutes >= MINUTES_IN_HOUR) {
            this.minutes -= MINUTES_IN_HOUR;
            this.hours += 1;
        }
        while (this.minutes < 0) {
            this.minutes += MINUTES_IN_HOUR;
            this.hours -= 1;
        }
        while (this.hours >= HOURS_IN_DAY) {
            this.hours -= HOURS_IN_DAY;
            this.days += 1;
        }
        while (this.hours < 0) {
            this.hours += HOURS_IN_DAY;
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
    readonly timestamp: TimestampImpl;
}

export class DateTimeSnapShot implements DateTimeSnapShotImpl {
    public readonly dateTimeReadOnly: DateTimeReadOnlyImpl;

    // Represents the timestamp in milliseconds.
    // This property is used strictly for additional purposes,
    // providing millisecond precision for time-related calculations.
    public readonly timestamp: TimestampImpl;

    public constructor(dateTimeReadOnly: DateTimeReadOnlyImpl, timestamp: TimestampImpl) {
        // Ensure dateTimeReadOnly reflects the exact timestamp
        this.dateTimeReadOnly = dateTimeReadOnly;

        // Ensure timestamp matches the exact dateTimeReadOnly value
        this.timestamp = timestamp;
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
}

export function isDateTimeSnapShot(value: any): value is DateTimeSnapShotImpl {
    const props: Record<keyof DateTimeSnapShotImpl, string> = {
        dateTimeReadOnly: "object",
        timestamp: "object",
        compareTo: "function",
        equals: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof DateTimeSnapShotImpl];
        switch (prop) {
            case "dateTimeReadOnly":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isDateTimeReadOnly(value[prop])) continue;
                return false;
            case "timestamp":
                if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind && isTimestamp(value[prop])) continue;
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
    const timestamp = new Timestamp(ms, 0);
    return new DateTimeSnapShot(dateTimeReadOnly, timestamp);
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
    timestamp: TimestampImpl;

    // utilities
    assign(dateTimeSeed: DateTimeSeed): DateTimeSeed;
    copy(): DateTimeSeed;
}

function createDateTimeSeed(years: number, months: number, days: number, hours: number, minutes: number, seconds: number, ms: number, us: number, ns: number, weekday: WeekdayTyped, timestamp: TimestampImpl): DateTimeSeed {
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
        timestamp: timestamp,
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
            this.timestamp = dateTimeSeed.timestamp;
            return this;
        },
        copy(): DateTimeSeed {
            return createDateTimeSeed(this.years, this.months, this.days, this.hours, this.minutes, this.seconds, this.ms, this.us, this.ns, this.weekday, this.timestamp);
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
    const timestamp = dateTimeSnapShot.timestamp;

    return createDateTimeSeed(years, months, days, hours, minutes, seconds, ms, us, ns, weekday, timestamp);
}

function yearsNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (updateWeekday) {
        const days = getDaysInYear(dateTimeSeed.years + 1);
        dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + days) % 7;
    }
    dateTimeSeed.years += 1;
    return dateTimeSeed;
}

function yearsPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    // how to use defer in javascript
    // keep it simple, you can use wrapping all in function
    const dateTimeX = ((dateTimeX: DateTimeSeed) => {
        dateTimeX.years -= 1;
        return dateTimeX;
    })(dateTimeSeed);
    if (updateWeekday) {
        const days = getDaysInYear(dateTimeX.years);
        dateTimeX.weekday = (toNumber(dateTimeX.weekday) - days) % 7;
    }
    return dateTimeX;
}

function updateYears(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum years
    while (dateTimeSeed.timestamp.ms < timestamp.ms) {
        const days = getDaysInYear(dateTimeSeed.years);
        const ms = days * MILLISECONDS_IN_DAY;
        const k = dateTimeSeed.timestamp.ms + ms;
        if (k > timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        yearsNext(dateTimeSeed);
    }
    // subtract years
    while (dateTimeSeed.timestamp.ms > timestamp.ms) {
        const dateTimeX = yearsPrev(dateTimeSeed.copy());
        const days = getDaysInYear(dateTimeX.years);
        const ms = days * MILLISECONDS_IN_DAY;
        const k = dateTimeSeed.timestamp.ms - ms;
        if (k < timestamp.ms) break;
        dateTimeSeed.assign(dateTimeX);
        dateTimeSeed.timestamp.ms = k;
    }
}

function monthsNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (updateWeekday) {
        const days = getDaysInMonth(dateTimeSeed.years, dateTimeSeed.months);
        dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + days) % 7;
    }
    if (dateTimeSeed.months < 12) {
        dateTimeSeed.months += 1;
        return dateTimeSeed;
    }
    yearsNext(dateTimeSeed, false);
    dateTimeSeed.months = 1;
    return dateTimeSeed;
}

function monthsPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
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
    if (updateWeekday) {
        const days = getDaysInMonth(dateTimeX.years, dateTimeX.months);
        dateTimeX.weekday = (toNumber(dateTimeX.weekday) - days) % 7;
    }
    return dateTimeX;
}

function updateMonths(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum months
    while (dateTimeSeed.timestamp.ms < timestamp.ms) {
        const days = getDaysInMonth(dateTimeSeed.years, months);
        const ms = days * MILLISECONDS_IN_DAY;
        const k = dateTimeSeed.timestamp.ms + ms;
        if (k > timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        monthsNext(dateTimeSeed);
    }
    // subtract months
    while (dateTimeSeed.timestamp.ms > timestamp.ms) {
        const dateTimeX = monthsPrev(dateTimeSeed.copy());
        const days = getDaysInMonth(dateTimeX.years, dateTimeX.months);
        const ms = days * MILLISECONDS_IN_DAY;
        const k = dateTimeSeed.timestamp.ms - ms;
        if (k < timestamp.ms) break;
        dateTimeSeed.assign(dateTimeX);
        dateTimeSeed.timestamp.ms = k;
    }
}

function daysNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (updateWeekday) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + 1) % 7;
    const days = getDaysInMonth(dateTimeSeed.years, dateTimeSeed.months);
    if (dateTimeSeed.days < days) {
        dateTimeSeed.days += 1;
        return dateTimeSeed;
    }
    monthsNext(dateTimeSeed, false);
    dateTimeSeed.days = 1;
    return dateTimeSeed;
}

function daysPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    // how to use defer in javascript
    // keep it simple, you can use wrapping all in function
    // const dateTimeX = ((dateTimeX: DateTimeSeed) => {
    //     if (dateTimeX.days > 1) {
    //         dateTimeX.days -= 1;
    //         return dateTimeX;
    //     }
    //     monthsPrev(dateTimeX, false);
    //     dateTimeX.days = getDaysInMonth(dateTimeX.years, dateTimeX.months);
    //     return dateTimeX;
    // })(dateTimeSeed);
    // if (updateWeekday) dateTimeX.weekday = (toNumber(dateTimeX.weekday) - 1) % 7;
    // return dateTimeX;
    if (updateWeekday) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) - 1) % 7;
    if (dateTimeSeed.days > 1) {
        dateTimeSeed.days -= 1;
        return dateTimeSeed;
    }
    monthsPrev(dateTimeSeed, false);
    dateTimeSeed.days = getDaysInMonth(dateTimeSeed.years, dateTimeSeed.months);
    return dateTimeSeed;
}

function updateDays(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum days
    while (dateTimeSeed.timestamp.ms < timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms + MILLISECONDS_IN_DAY;
        if (k > timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        daysNext(dateTimeSeed);
    }
    // subtract days
    while (dateTimeSeed.timestamp.ms > timestamp.ms) {
        // const dateTimeX = daysPrev(dateTimeSeed.copy());
        const k = dateTimeSeed.timestamp.ms - MILLISECONDS_IN_DAY;
        if (k < timestamp.ms) break;
        // dateTimeSeed.assign(dateTimeX);
        dateTimeSeed.timestamp.ms = k;
        daysPrev(dateTimeSeed);
    }
}

function hoursNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.hours < 23) {
        dateTimeSeed.hours += 1;
        return dateTimeSeed;
    }
    if (updateWeekday) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + 1) % 7;
    daysNext(dateTimeSeed, false);
    // daysNext(dateTimeSeed);
    dateTimeSeed.hours = 0;
    return dateTimeSeed;
}

function hoursPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.hours > 0) {
        dateTimeSeed.hours -= 1;
        return dateTimeSeed;
    }
    if (updateWeekday) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) - 1) % 7;
    daysPrev(dateTimeSeed, false);
    // daysPrev(dateTimeSeed);
    dateTimeSeed.hours = 23;
    return dateTimeSeed;
}

function updateHours(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum hours
    while (dateTimeSeed.timestamp.ms < timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms + MILLISECONDS_IN_HOUR;
        if (k > timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        hoursNext(dateTimeSeed);
    }
    // subtract hours
    while (dateTimeSeed.timestamp.ms > timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms - MILLISECONDS_IN_HOUR;
        if (k < timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        hoursPrev(dateTimeSeed);
    }
}

function minutesNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.minutes < 59) {
        dateTimeSeed.minutes += 1;
        return dateTimeSeed;
    }
    // if (updateWeekday) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) + 1) % 7;
    // hoursNext(dateTimeSeed, false);
    hoursNext(dateTimeSeed, updateWeekday);
    dateTimeSeed.minutes = 0;
    return dateTimeSeed;
}

function minutesPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.minutes > 0) {
        dateTimeSeed.minutes -= 1;
        return dateTimeSeed;
    }
    // if (updateWeekday) dateTimeSeed.weekday = (toNumber(dateTimeSeed.weekday) - 1) % 7;
    // hoursPrev(dateTimeSeed, false);
    hoursPrev(dateTimeSeed, updateWeekday);
    dateTimeSeed.minutes = 59;
    return dateTimeSeed;
}

function updateMinutes(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum minutes
    while (dateTimeSeed.timestamp.ms < timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms + MILLISECONDS_IN_MINUTE;
        if (k > timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        minutesNext(dateTimeSeed);
    }
    // subtract minutes
    while (dateTimeSeed.timestamp.ms > timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms - MILLISECONDS_IN_MINUTE;
        if (k < timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        minutesPrev(dateTimeSeed);
    }
}

function secondsNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.seconds < 59) {
        dateTimeSeed.seconds += 1;
        return dateTimeSeed;
    }
    minutesNext(dateTimeSeed, updateWeekday);
    dateTimeSeed.seconds = 0;
    return dateTimeSeed;
}

function secondsPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.seconds > 0) {
        dateTimeSeed.seconds -= 1;
        return dateTimeSeed;
    }
    minutesPrev(dateTimeSeed, updateWeekday);
    dateTimeSeed.seconds = 59;
    return dateTimeSeed;
}

function updateSeconds(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum seconds
    while (dateTimeSeed.timestamp.ms < timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms + MILLISECONDS_IN_SECOND;
        if (k > timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        secondsNext(dateTimeSeed);
    }
    // subtract seconds
    while (dateTimeSeed.timestamp.ms > timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms - MILLISECONDS_IN_SECOND;
        if (k < timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        secondsPrev(dateTimeSeed);
    }
}

function msNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.ms < 999) {
        dateTimeSeed.ms += 1;
        return dateTimeSeed;
    }
    secondsNext(dateTimeSeed, updateWeekday);
    dateTimeSeed.ms = 0;
    return dateTimeSeed;
}

function msPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.ms > 0) {
        dateTimeSeed.ms -= 1;
        return dateTimeSeed;
    }
    secondsPrev(dateTimeSeed, updateWeekday);
    dateTimeSeed.ms = 999;
    return dateTimeSeed;
}

function updateMs(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum ms
    while (dateTimeSeed.timestamp.ms < timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms + 1;
        if (k > timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        msNext(dateTimeSeed);
    }
    // subtract ms
    while (dateTimeSeed.timestamp.ms > timestamp.ms) {
        const k = dateTimeSeed.timestamp.ms - 1;
        if (k < timestamp.ms) break;
        dateTimeSeed.timestamp.ms = k;
        msPrev(dateTimeSeed);
    }
}

function usNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.us < 999) {
        dateTimeSeed.us += 1;
        return dateTimeSeed;
    }
    msNext(dateTimeSeed, updateWeekday);
    dateTimeSeed.us = 0;
    return dateTimeSeed;
}

function usPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.us > 0) {
        dateTimeSeed.us -= 1;
        return dateTimeSeed;
    }
    msPrev(dateTimeSeed, updateWeekday);
    dateTimeSeed.us = 999;
    return dateTimeSeed;
}

function updateUs(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum us
    while (dateTimeSeed.timestamp.ns < timestamp.ns) {
        const k = dateTimeSeed.timestamp.ns + NANOSECONDS_IN_MICROSECOND;
        if (k > timestamp.ns) break;
        dateTimeSeed.timestamp.ns = k;
        usNext(dateTimeSeed);
    }
    // subtract us
    while (dateTimeSeed.timestamp.ns > timestamp.ns) {
        const k = dateTimeSeed.timestamp.ns - NANOSECONDS_IN_MICROSECOND;
        if (k < timestamp.ns) break;
        dateTimeSeed.timestamp.ns = k;
        usPrev(dateTimeSeed);
    }
}

function nsNext(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.ns < 999) {
        dateTimeSeed.ns += 1;
        return dateTimeSeed;
    }
    usNext(dateTimeSeed, updateWeekday);
    dateTimeSeed.ns = 0;
    return dateTimeSeed;
}

function nsPrev(dateTimeSeed: DateTimeSeed, updateWeekday: boolean = true): DateTimeSeed {
    if (dateTimeSeed.ns > 0) {
        dateTimeSeed.ns -= 1;
        return dateTimeSeed;
    }
    usPrev(dateTimeSeed, updateWeekday);
    dateTimeSeed.ns = 999;
    return dateTimeSeed;
}

function updateNs(dateTimeSeed: DateTimeSeed, timestamp: TimestampImpl) {
    // sum ns
    while (dateTimeSeed.timestamp.ns < timestamp.ns) {
        const k = dateTimeSeed.timestamp.ns + 1;
        if (k > timestamp.ns) break;
        dateTimeSeed.timestamp.ns = k;
        nsNext(dateTimeSeed);
    }
    // subtract ns
    while (dateTimeSeed.timestamp.ns > timestamp.ns) {
        const k = dateTimeSeed.timestamp.ns - 1;
        if (k < timestamp.ns) break;
        dateTimeSeed.timestamp.ns = k;
        nsPrev(dateTimeSeed);
    }
}

export function getDateTimeReadOnlyByTimestamp(timestamp: TimestampImpl): DateTimeReadOnlyImpl {
    if (dateTimeSnapShots.length === 0) throw new Error("getNearestDateTimeSnapShot() requires at least one DateTimeSnapShot.");

    // find multiple nearest datetime snapshots
    let arr: number[] = [];
    for (let i = 0; i < dateTimeSnapShots.length; i++) {
        const dateTimeSnapShot = dateTimeSnapShots[i];
        const ms = timestamp.ms - dateTimeSnapShot.timestamp.ms;
        arr.push(ms);

        // break if found
        if (i === 0 && timestamp.ms >= dateTimeSnapShot.timestamp.ms) break;
        if (i < dateTimeSnapShots.length - 1) {
            const dateTimeSnapShotNext = dateTimeSnapShots[i+1];
            let k = (dateTimeSnapShot.timestamp.ms - dateTimeSnapShotNext.timestamp.ms) >> 1;
            k += dateTimeSnapShotNext.timestamp.ms;
            if (Math.abs(timestamp.ms) <= k) break;
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
    if (index === -1) throw new Error("getNearestDateTimeSnapShot() failed.");
    const dateTimeSnapShot = dateTimeSnapShots[index];
    const timeZone = dateTimeSnapShot.dateTimeReadOnly.timeZone;

    const dateTimeSeed = createDateTimeSnapShotSeed(dateTimeSnapShot);

    updateYears(dateTimeSeed, timestamp);
    updateMonths(dateTimeSeed, timestamp);
    updateDays(dateTimeSeed, timestamp);
    updateHours(dateTimeSeed, timestamp);
    updateMinutes(dateTimeSeed, timestamp);
    updateSeconds(dateTimeSeed, timestamp);
    updateMs(dateTimeSeed, timestamp);
    updateUs(dateTimeSeed, timestamp);
    updateNs(dateTimeSeed, timestamp);

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

export function getNearestDateTimeSnapShot(dateTime: DateTimeReadOnlyImpl): NearestDateTimeSnapShotImpl {
    if (dateTimeSnapShots.length === 0) throw new Error("getNearestDateTimeSnapShot() requires at least one DateTimeSnapShot.");

    // find multiple nearest datetime snapshots
    let arr: number[] = [];
    for (let i = 0; i < dateTimeSnapShots.length; i++) {
        const dateTimeSnapShot = dateTimeSnapShots[i];
        const years = dateTime.years - dateTimeSnapShot.dateTimeReadOnly.years;
        arr.push(years);

        // break if found
        if (i === 0 && dateTime.years >= dateTimeSnapShot.dateTimeReadOnly.years) break;
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
    const dateTimeSnapShot = dateTimeSnapShots[index];

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
            const days = getDaysInYear(years); // current days in year
            timeSpan.days += days;
            years += 1;
        }
    } else {
        for (let j = val; j < 0; j++) {
            const yearsX = years - 1;
            const days = getDaysInYear(yearsX); // previous days in year
            timeSpan.days -= days;
            years = yearsX;
        }
    }

    while (months < dateTime.months) {
        const days = getDaysInMonth(years, months);
        timeSpan.days += days;
        if (months < 12) {
            months += 1;
        } else {
            years += 1;
            months = 1;
        }
    }

    if (days < dateTime.days) timeSpan.days += dateTime.days - days;
    if (hours < dateTime.hours) timeSpan.hours = dateTime.hours - hours;
    if (minutes < dateTime.minutes) timeSpan.minutes = dateTime.minutes - minutes;
    if (seconds < dateTime.seconds) timeSpan.seconds = dateTime.seconds - seconds;
    if (ms < dateTime.ms) timeSpan.ms = dateTime.ms - ms;
    if (us < dateTime.us) timeSpan.us = dateTime.us - us;
    if (ns < dateTime.ns) timeSpan.ns = dateTime.ns - ns;

    return new NearestDateTimeSnapShot(dateTimeSnapShot, timeSpan);
}

export function isLeapYear(years: number): boolean {
    if (years % 4 !== 0) return false;
    return years % 100 !== 0 || years % 400 === 0;
}

export function getDaysInYear(years: number): number {
    if (isLeapYear(years)) return DAYS_IN_LEAP_YEAR;
    return DAYS_IN_YEAR;
}

export function getDaysInMonth(years: number, months: MonthTyped): number {
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

export interface TimestampImpl extends ComparableImpl<TimestampImpl>, EquatableImpl<TimestampImpl> {
    // Represents the milliseconds part of the timestamp,
    // Useful for low-resolution time measurements.
    ms: number;

    // Represents the nanoseconds part of the timestamp,
    // providing additional precision beyond milliseconds.
    // Useful for high-resolution time measurements.
    ns: number;
}

export class Timestamp implements TimestampImpl {
    // Represents the milliseconds part of the timestamp,
    // Useful for low-resolution time measurements.
    public ms: number;

    // Represents the nanoseconds part of the timestamp,
    // providing additional precision beyond milliseconds.
    // Useful for high-resolution time measurements.
    public ns: number;

    public constructor(ms: number, ns: number) {
        this.ms = ms;
        this.ns = ns;
    }

    public compareTo(other: TimestampImpl): number {
        if (!isTimestamp(other)) throw new Error("Value is not a Timestamp");
        if (this.ms > other.ms) return 1;
        if (this.ms < other.ms) return -1;
        if (this.ns > other.ns) return 1;
        if (this.ns < other.ns) return -1;
        return 0;
    }

    public equals(other: TimestampImpl): boolean {
        if (!isTimestamp(other)) throw new Error("Value is not a Timestamp");
        if (this.ms !== other.ms) return false;
        if (this.ns !== other.ns) return false;
        // some issues like infinite numbers
        return true;
    }
}

export function isTimestamp(value: any): value is TimestampImpl {
    if (typeof value === "number") return true;
    const props: Record<keyof TimestampImpl, string> = {
        ms: "number",
        ns: "number",
        compareTo: "function",
        equals: "function",
    };
    for (const [prop, kind] of Object.entries(props)) {
        // const kind = props[prop as keyof TimestampImpl];
        if (hasOwnPropertyName(value, prop) && typeof value[prop] === kind) continue;
        return false;
    }
    return true;
}

export function getTimestamp(dateTime: DateTimeReadOnlyImpl): TimestampImpl {
    if (dateTimeSnapShots.length === 0) throw new Error("getTimestamp() requires at least one DateTimeSnapShot.");

    const nearest = getNearestDateTimeSnapShot(dateTime);
    const timeSpan = nearest.timeSpan;

    let ms = nearest.dateTimeSnapShot.timestamp.ms;
    ms += timeSpan.days * MILLISECONDS_IN_DAY;
    ms += timeSpan.hours * MILLISECONDS_IN_HOUR;
    ms += timeSpan.minutes * MILLISECONDS_IN_MINUTE;
    ms += timeSpan.seconds * MILLISECONDS_IN_SECOND;
    ms += timeSpan.ms;

    let ns = nearest.dateTimeSnapShot.timestamp.ns;
    ns += timeSpan.us * NANOSECONDS_IN_MICROSECOND;
    ns += timeSpan.ns;

    return new Timestamp(ms, ns);
}

function main() {
    const dateTime = new DateTimeReadOnly(2019, 12, 31, 15, 20, 52, 658, 789, 337, 2, TimeZones.UTC);
    const timestamp = getTimestamp(dateTime);
    console.log(timestamp);
    const date = new Date('2019-12-31T15:20:52.658Z');
    console.log(date.getTime())
    const dateTimeReadOnly = getDateTimeReadOnlyByTimestamp(timestamp);
    console.log(dateTimeReadOnly);
}

main();

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
