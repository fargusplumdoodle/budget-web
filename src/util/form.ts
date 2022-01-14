export interface Option {
  label: String;
  value: number;
}
interface hasNameAndId {
  name: String;
  id: number;
}
export const getOption = (obj: hasNameAndId): Option => {
  return { label: obj.name, value: obj.id };
};
