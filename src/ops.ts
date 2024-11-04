/*
* @name: ops.ts
* @author: <ahmadasysyafiq@proton.me>
* @description: operations system supported by skfw.net
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

export interface ComparableImpl<T> {
    compareTo(other: T): number
}

export interface EquatableImpl<T> {
    equals(other: T): boolean
}
