
interface MyRecord {
    fieldA: string
    fieldB: {
        fieldB1: string
    }
}

 let rec : MyRecord = {fieldA: "a", fieldB: { fieldB1: "b" }}

interface KeyValue<K, V> {
    Key: K,
    Value: V,
}

type SingleKeyValue<S, K extends keyof any, KK> =
    S extends Omit<S, K> & { KK: infer V }
        ? KeyValue<KK, V>
        : never


// function getKeyInt<S, K extends keyof S, KK extends keyof any>(o :S, key: SingleKeyKey<S, KK>): SingleKeyValue<S, K> {
//     return o[key]
// }

// type TT = typeof getKey



type A = SingleKeyValue<MyRecord, keyof MyRecord, "fieldB">

// type SingleKeyOf<S, K extends keyof S> = SingleKeyOf_<S, K, K, S[K]>

// T, P, V
// such that:
// - T is any type that has keys of type P
// - V is of type T[P]

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