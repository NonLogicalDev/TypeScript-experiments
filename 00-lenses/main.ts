interface MyRecord {
    fieldA: string
    fieldB: {
        fieldB1: string
    }
}

interface MyRecordAlt { }

let rec    : MyRecord    = {fieldA: "a", fieldB: { fieldB1: "b" }}
let recAlt : MyRecordAlt = {}

type SingleKeyValue<S, K extends keyof S> =
    S extends Omit<S, K> & { [KK in K]: infer V }
        ? V
        : never

// -----------------------------------------------------------------------------

const getPropUntyped                                      =
    <K extends keyof any>  (key: K)                       =>
    <T extends Pick<T, K>> (o:   T): SingleKeyValue<T, K> =>
                           o[key]

const getPropTyped    =
   <T> (key: keyof T) =>
       getPropUntyped(key)

const getPropTypedHack          =
   <T>                 ()       =>
   <K extends keyof T> (key: K) =>
                       getPropUntyped(key)

const getPropTypedHackier       =
   <T>                 (tpl: T) =>
   <K extends keyof T> (key: K) =>
                       getPropUntyped(key)

// -----------------------------------------------------------------------------

const _fieldB_U = getPropUntyped("fieldB")(rec);
// TYPE:
// const _fieldB_U: {
//     fieldB1: string;
// }

const _fieldB_T = getPropTyped<MyRecord>("fieldB")(rec);
// TYPE:
// const _fieldB_T: string | {
//     fieldB1: string;
// }

const _fieldB_H = getPropTypedHack<MyRecord>()("fieldB")(rec);
// TYPE:
// const _fieldB_H: {
//     fieldB1: string;
// }

const _fieldB_HI = getPropTypedHackier({} as MyRecord)("fieldB")(rec);
// TYPE:
// const _fieldB_HI: {
//     fieldB1: string;
// }

let a = {} as MyRecord

console.log("output_U:", _fieldB_U);
console.log("output_T:", _fieldB_T);
console.log("output_H:", _fieldB_H);

// type A = SingleKeyValue<MyRecord, "fieldB">

// type SingleKeyOf<S, K extends keyof S> = SingleKeyOf_<S, K, K, S[K]>

// Given K of type any

// O, K, V
// such that:
// - O is any type that has keys
// - K is a subset of (keysof O)
// - V is of type O[K]

// export const lensProp = <T>(key: keyof T) => lensPropInt<T, keyof T>(key)


// export interface Lens<S, A> {
//     readonly get: (s: S) => A
//     readonly set: (a: A) => (s: S) => S
// }
// type LensModifier<V> = (v: V) => V
// type Prop<S, K extends keyof S, T> =
// export interface HKT {
//     0: unknown
//     1: unknown
//     2: unknown
// }
// interface SingleKeyOf_<S, K extends keyof S, KK, V> extends HKT {
//     0: Omit<S, K> & { [KK in K]: V },
//     1: KK,
//     2: V,
// }

// export function lensPropInt<T, P extends >(key: P): Lens<T, SingleKeyOf<T, P>[2]> {
//     return {
//         get: (s) => s[key],
//         set: (a) => (s) => ({...s, [key]: a}),
//     }
// }

// function composeLens<T, M, V>(la: Lens<T, M>, lb: Lens<M, V>): Lens<T, V> {
//     return {
//         get: (s) => lb.get(la.get(s)),
//         set: (a) => (s) => {
//             let bVal = lb.set(a)(la.get(s))
//             return la.set(bVal)(s)
//         }
//     }
// }

// const fieldA = lensProp<MyRecord>("fieldA")

// const fieldB = lensProp<MyRecord>("fieldB")
// const fieldB1 = lensProp<MyRecord["fieldB"]>("fieldB1")

// composeLens(fieldB, fieldB1)


// console.log("output:", fieldA.get(a));