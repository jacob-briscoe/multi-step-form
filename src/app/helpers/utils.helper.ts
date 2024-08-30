export function defaultTo<D>(defaultValue: D) {
  return <T>(value?: T): T | D => {
    return value == null ? defaultValue : value;
  };
}

export function defaultToEmptyString<T>(value?: T) {
  return defaultTo("")(value);
}

export function defaultToNull<T>(value?: T) {
  return defaultTo(null)(value);
}
