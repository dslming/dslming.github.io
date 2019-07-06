/**
/// <reference path="dimensioning.ts" />
 * 
 */
/** Dimensioning in Inch. */
export const dimInch: string = "inch";

/** Dimensioning in Meter. */
export const dimMeter: string = "m";

/** Dimensioning in Centi Meter. */
export const dimCentiMeter: string = "cm";

/** Dimensioning in Milli Meter. */
export const dimMilliMeter: string = "mm";

/** Dimensioning functions. */
export class Dimensioning {
  /** Converts cm to dimensioning string.
   * @param cm Centi meter value to be converted.
   * @returns String representation.
   */
  public static cmToMeasure(cm: number): string {
    switch (Configuration.getStringValue(configDimUnit)) {
      case dimInch:
        var realFeet = ((cm * 0.393700) / 12);
        var feet = Math.floor(realFeet);
        var inches = Math.round((realFeet - feet) * 12);
        return feet + "'" + inches + '"';
      case dimMilliMeter:
        return "" + Math.round(10 * cm) + " mm";
      case dimCentiMeter:
        return "" + Math.round(10 * cm) / 10 + " cm";
      case dimMeter:
      default:
        return "" + Math.round(10 * cm) / 1000 + " m";
    }
  }
}

// GENERAL:

/** The dimensioning unit for 2D floorplan measurements. */
export const configDimUnit = "dimUnit";

// WALL:

/** The initial wall height in cm. */
export const configWallHeight = "wallHeight";

/** The initial wall thickness in cm. */
export const configWallThickness = "wallThickness";

/** Global configuration to customize the whole system.  */
export class Configuration {
  /** Configuration data loaded from/stored to extern. */
  private static data: {[key: string]: any} = {
    dimUnit: dimInch,

    wallHeight: 250,
    wallThickness: 10
  };

  /** Set a configuration parameter. */
  public static setValue(key: string, value: string | number) {
    this.data[key] = value;
  }

  /** Get a string configuration parameter. */
  public static getStringValue(key: string): string {
    switch (key) {
      case configDimUnit:
        return <string>this.data[key];
      default:
        throw new Error("Invalid string configuration parameter: " + key);
    }
  }

  /** Get a numeric configuration parameter. */
  public static getNumericValue(key: string): number {
    switch (key) {
      case configWallHeight:
      case configWallThickness:
        return <number>this.data[key];
      default:
        throw new Error("Invalid numeric configuration parameter: " + key);
    }
  }
}