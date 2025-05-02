declare global {
  interface Array<T> {
    first(): T | undefined;
  }
}

Array.prototype.first = function <T>(): T | undefined {
  return this.length > 0 ? this[0] : undefined;
};

export {};
