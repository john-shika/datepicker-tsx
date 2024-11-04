/*
* @name: utils.ts
* @author: <ahmadasysyafiq@proton.me>
* @description: utilities system supported by skfw.net
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

export function getOwnPropertyNames(obj: any): Array<string> {
    const proto = Object.getPrototypeOf(obj);
    const sources = Object.getOwnPropertyNames(proto.constructor);
    const instances = Object.getOwnPropertyNames(obj);
    const props: string[] = [];
    for (const prop of [...sources, ...instances]) {
        if (!props.includes(prop)) {
            props.push(prop);
        }
    }
    return props;
}

export function hasOwnPropertyName(obj: any, prop: string): boolean {
    if (Object.hasOwn(obj, prop)) return true;
    const props = getOwnPropertyNames(obj);
    return props.includes(prop);
}

export function toString(obj: any): string {
    if (typeof obj === "string") return obj;
    return obj.toString();
}

export interface ModuloTyped {
    value: number;
    n: number;
    valueOf(): number;
}

export function moduloByIndex(value: number, mod: number): ModuloTyped {
    let n = 0;
    while (value < 0) {
        value += mod;
        n--;
    }
    while (value >= mod) {
        value -= mod;
        n++;
    }
    return {
        value,
        n,
        valueOf(): number {
            return this.value;
        }
    };
}

export function moduloByPosition(value: number, mod: number): ModuloTyped {
    let n = 0;
    while (value <= 0) {
        value += mod;
        n--;
    }
    while (value > mod) {
        value -= mod;
        n++;
    }
    return {
        value,
        n,
        valueOf(): number {
            return this.value;
        }
    };
}

export function modulo(value: number, mod: number): ModuloTyped {
    return moduloByIndex(value, mod);
}
