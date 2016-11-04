export function $uniqueId(name: string) {
  return name + new Date().getTime().toString() + Math.random().toString().substr(1, 3);
}
