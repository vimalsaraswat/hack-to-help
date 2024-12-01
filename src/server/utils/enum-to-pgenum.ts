export function enumToPgEnum<T extends Record<string, string>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  const values = Object.values(myEnum);

  return values as [T[keyof T], ...T[keyof T][]];
}
