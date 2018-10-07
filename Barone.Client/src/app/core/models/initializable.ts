export interface Initializable {
    initialize(data?: any): void;
  }
  
  export function StaticImplements<T>() {
    return (constructor: T) => { };
  }
  