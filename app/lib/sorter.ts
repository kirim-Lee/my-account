// type FnType<Key, KeyId> = (v: KeyId) => Key extends infer S ? S : KeyId | Key;

type Fn<Key, T extends {}, K extends keyof T> = (v: T[K]) => Key;
type GroupByKeyFn<T, R> = (item: T) => R;

// 오버로드 1: getKey 없이 호출될 경우
export function groupBy<T extends {}, K extends keyof T>(
  arr: T[],
  key: K
): Map<T[K], T[]>;

// 오버로드 2: getKey 가 제공될 경우
export function groupBy<T extends {}, K extends keyof T, R>(
  arr: T[],
  key: K,
  getKey: GroupByKeyFn<T[K], R>
): Map<R, T[]>;

export function groupBy<T extends {}, K extends keyof T, R>(
  arr: T[],
  key: K,
  getKey?: GroupByKeyFn<T[K], R>
): Map<any, T[]> {
  return arr.reduce((map, cur) => {
    const keyId = getKey?.(cur[key]) ?? cur[key];
    const value = map.get(keyId);
    map.set(keyId, value ? [...value, cur] : [cur]);

    return map;
  }, new Map<any, T[]>());
}
