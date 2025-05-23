export function deepCopy(target) {
  if (typeof target === "object") {
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] === "object") {
        result[key] = deepCopy(target[key]);
      } else {
        result[key] = target[key];
      }
    }

    return result;
  }

  return target;
}

export function findIndex(target, arr) {
  let index = arr.findIndex((item) => {
    return item.id === target;
  });
  return index;
}
