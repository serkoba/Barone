import { isNullOrUndefined } from 'util';
/**
 *@ignore
 *
 * @export
 * @class ValidationUtilities
 */
export class ValidationUtilities {
  public static isNullOrWhitespace(value: string): boolean {
    return isNullOrUndefined(value) || value.trim() === 'undefined' || value.trim() === 'null' || value === '' || value.trim() === '';
  }

  public static isNullWhitespaceOrZero(value: string): boolean {
    return this.isNullOrWhitespace(value) || value === '0';
  }



  public static getValuePresentValues(): string[] {
    return ['Yes', 'No', 'Unknown'];
  }
  public static getValueArtworksMountedValues(): string[] {
    return ['Yes', 'No'];
  }

  public static getDateValueValues(): string[] {
    return ['Approx', 'Between', 'Exactly', 'Unknown'];
  }

  public static getMeasureValues(): string[] {
    return ['Accurate', 'Approximate'];
  }

  public static getEmptyGuid(): string {
    return '00000000-0000-0000-0000-000000000000';
  }

  public static getGuid(): string {
    // https://stackoverflow.com/a/2117523
    return (1e7.toString() + -1e3 + -4e3 + -8e3 + -1e11)
      .replace(/[018]/g,
        (c: any) =>
          // tslint:disable-next-line:no-bitwise
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
  }

  public static isEqual(a, b): boolean {
    // Create arrays of property names
    if (!isNullOrUndefined(a) && !isNullOrUndefined(b)) {
      const aProps = Object.getOwnPropertyNames(a);
      const bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length !== bProps.length) {
        return false;
      }

      for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
          return false;
        }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true;
    } else { return false; }
  }
}
