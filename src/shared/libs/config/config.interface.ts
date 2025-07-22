export interface Config<T = Record<string, unknown>> {
  get<K extends keyof T>(key: K): T[K];
}
