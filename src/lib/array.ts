interface Array<T> {
    first(): T | undefined;
}

Array.prototype.first = function() {
   return this.find(o => true)
}

export {}