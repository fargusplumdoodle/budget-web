const atomicStore = new Uint8Array([0]);

export function getUniqueNumber(): number {
  return Atomics.add(atomicStore, 0, 1);
}

export function bulkGenerator(generatorFunction: Function, count: number) {
  return [...Array(count)].map(() => generatorFunction());
}
