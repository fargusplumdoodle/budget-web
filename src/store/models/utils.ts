import { Model } from "./types";

export const modelById = <T extends Model>(models: T[]) =>
  Object.fromEntries(models.map((model) => [model.id, model]));

export const modelByName = <T extends { name: string }>(models: T[]) =>
  Object.fromEntries(models.map((model) => [model.name, model]));

export const addModelsToList = <T extends Model>(
  stateList: T[],
  models: T[]
) => [...stateList.filter(allObjectsExceptInList(models)), ...models];

export const addModelToList = <T extends Model>(stateList: T[], model: T) => [
  ...stateList.filter(allObjectsExcept(model.id!)),
  model,
];

export const allObjectsExcept = (id: number) => (t: Model) => t.id !== id;
export const allObjectsExceptInList = (models: Model[]) => {
  const ids: number[] = models.map((m) => m.id!);
  return (t: Model) => !ids.includes(t.id!);
};
