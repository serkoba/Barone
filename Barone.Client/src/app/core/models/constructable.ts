export abstract class Constructable<T> {
    constructor(fields?: T) {
      Object.assign(this, fields);
    }
  }
  