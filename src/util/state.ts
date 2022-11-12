interface hasID {
  id: number | null;
}

export function updateValuesList<T extends hasID>(
  updatedValue: T,
  valuesList: T[],
  setter: (values: T[]) => void
): void {
  const index = valuesList.findIndex(
    (value: T) => value.id === updatedValue.id
  );
  setter([
    ...valuesList.slice(0, index),
    updatedValue,
    ...valuesList.slice(index + 1),
  ]);
}

export function removeFromValuesList<T extends hasID>(
  valueToRemove: T,
  valuesList: T[],
  setter: (values: T[]) => void
): void {
  const index = valuesList.findIndex(
    (value: T) => value.id === valueToRemove.id
  );
  setter([...valuesList.slice(0, index), ...valuesList.slice(index + 1)]);
}
