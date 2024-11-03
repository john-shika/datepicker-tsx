/*
* @name: common.ts
* @author: <ahmadasysyafiq@proton.me/>
* @description: common system supported by skfw.net
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

export interface CloneableImpl<T> {
    clone(): T
}

export interface NumericImpl {
    toNumber(): number
}

export interface StringableImpl {
    toString(): string
}

export interface JsonableImpl {
    toJSON(): string
}
