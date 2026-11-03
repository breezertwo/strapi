/** Shared assertions for the strict-off program. */
export type Equal<T, U> =
  (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? true : false;
export type Expect<T extends true> = T;
/** Suggested names widen a type for completion without changing which values it accepts. */
export type SameValues<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;
