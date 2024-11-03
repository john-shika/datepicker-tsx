/*
* @name: nums.ts
* @author: <ahmadasysyafiq@proton.me/>
* @description: numeric system supported by skfw.net
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

import type { ComparableImpl, EquatableImpl } from "@/ops.ts";

export function toNumber(value: any): number {
    if (typeof value === "number") return value;
    if (typeof value === "string") return Number(value.trim());
    return Number(value);
}

export interface IntegerImpl extends ComparableImpl<int>, EquatableImpl<int> {
    min(...values: int[]): int;
    max(...values: int[]): int;
    abs(): int;
    toNumber(): number;
}

export type int = IntegerImpl | Number | number;

export class Integer extends Number implements IntegerImpl {
    public constructor(value: int | boolean | string) {
        super(toNumber(value).toFixed(0));
    }

    public static min(...values: int[]): int {
        return getMinNumber(...values);
    }

    public min(...values: int[]): int {
        return Integer.min(this, ...values);
    }

    public static max(...values: int[]): int {
        return getMaxNumber(...values);
    }

    public max(...values: int[]): int {
        return Integer.max(this, ...values);
    }

    public static abs(value: int): int {
        return getAbsNumber(value);
    }

    public abs(): int {
        return Integer.abs(this);
    }

    public compareTo(other: int): number {
        const value = toNumber(this);
        const otherValue = toNumber(other);
        if (value < otherValue) return -1;
        if (value > otherValue) return 1;
        return 0;
    }

    public equals(other: int): boolean {
        return this.compareTo(other) === 0;
    }

    public toNumber(): number {
        return toNumber(this);
    }
}

export interface FloatingImpl extends ComparableImpl<float>, EquatableImpl<float> {
    min(...values: float[]): float;
    max(...values: float[]): float;
    abs(): float;
    toNumber(): number;
}

export type float = FloatingImpl | Number | number;

export class Floating extends Number implements FloatingImpl {
    public constructor(value: float | boolean | string) {
        super(value);
    }

    public static min(...values: float[]): float {
        return getMinNumber(...values);
    }

    public min(...values: float[]): float {
        return Floating.min(this, ...values);
    }

    public static max(...values: float[]): float {
        return getMaxNumber(...values);
    }

    public max(...values: float[]): float {
        return Floating.max(this, ...values);
    }

    public static abs(value: float): float {
        return getAbsNumber(value);
    }

    public abs(): float {
        return Floating.abs(this);
    }

    public compareTo(other: float): number {
        const value = toNumber(this);
        const otherValue = toNumber(other);
        if (value < otherValue) return -1;
        if (value > otherValue) return 1;
        return 0;
    }

    public equals(other: float): boolean {
        return this.compareTo(other) === 0;
    }

    public toNumber(): number {
        return toNumber(this);
    }
}

export function getMinNumber(...values: (int | float)[]): number {
    if (values.length === 0) throw new Error("min() requires at least one argument.");
    let temp = toNumber(values[0]);
    for (let i = 1; i < values.length; i++) {
        const value = toNumber(values[i]);
        if (value < temp) temp = value;
    }
    return temp;
}

export function getMaxNumber(...values: (int | float)[]): number {
    if (values.length === 0) throw new Error("max() requires at least one argument.");
    let temp = toNumber(values[0]);
    for (let i = 1; i < values.length; i++) {
        const value = toNumber(values[i]);
        if (value > temp) temp = value;
    }
    return temp;
}

export function getAbsNumber(value: int | float): number {
    const temp = toNumber(value);
    if (temp >= 0) return temp;
    return -temp;
}

export function toBigInt(value: any): bigint {
    if (value instanceof BigInt) return value.valueOf();
    return BigInt(value);
}

export type bigInt = BigIntegerImpl | BigInt | Number | bigint | number;

export interface BigIntegerImpl extends ComparableImpl<bigInt>, EquatableImpl<bigInt> {
    min(...values: bigInt[]): bigInt;
    max(...values: bigInt[]): bigInt;
    abs(): bigInt;
    toBigInt(): bigint;
    toNumber(): number;
    valueOf(): bigint;
}

export class BigInteger implements BigIntegerImpl {
    private readonly value: bigint = 0n;

    public constructor(value: bigInt | boolean | string) {
        this.value = toBigInt(value);
    }

    public static min(...values: bigInt[]): bigInt {
        return getMinBigInt(...values);
    }

    public min(...values: bigInt[]): bigInt {
        return BigInteger.min(this.value, ...values);
    }

    public static max(...values: bigInt[]): bigInt {
        return getMaxBigInt(...values);
    }

    public max(...values: bigInt[]): bigInt {
        return BigInteger.max(this.value, ...values);
    }

    public static abs(value: bigInt): bigInt {
        return getAbsBigInt(value);
    }

    public abs(): bigInt {
        return BigInteger.abs(this.value);
    }

    public compareTo(other: bigInt): number {
        const value = this.value;
        const otherValue = toBigInt(other);
        if (value < otherValue) return -1;
        if (value > otherValue) return 1;
        return 0;
    }

    public equals(other: bigInt): boolean {
        return this.compareTo(other) === 0;
    }

    public toBigInt(): bigint {
        return this.value;
    }

    public toNumber(): number {
        return Number(this.value);
    }

    public valueOf(): bigint {
        return this.value;
    }
}

export function getMinBigInt(...values: bigInt[]): bigint {
    if (values.length === 0) throw new Error("min() requires at least one argument.");
    let temp = toBigInt(values[0]);
    for (let i = 1; i < values.length; i++) {
        const value = toBigInt(values[i]);
        if (value < temp) temp = value;
    }
    return temp;
}

export function getMaxBigInt(...values: bigInt[]): bigint {
    if (values.length === 0) throw new Error("max() requires at least one argument.");
    let temp = toBigInt(values[0]);
    for (let i = 1; i < values.length; i++) {
        const value = toBigInt(values[i]);
        if (value > temp) temp = value;
    }
    return temp;
}

export function getAbsBigInt(value: bigInt): bigint {
    const temp = toBigInt(value);
    if (temp >= 0n) return temp;
    return -temp;
}
