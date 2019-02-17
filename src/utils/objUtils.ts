export const clone = (obj: Record<string, any>) =>
  JSON.parse(JSON.stringify(obj))

export const isEqual = (obj1: Record<string, any>, obj2: Record<string, any>): boolean =>
  JSON.stringify(obj1) === JSON.stringify(obj2)
