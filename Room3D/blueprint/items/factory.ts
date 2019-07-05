/**
 * /// <reference path="floor_item.ts" />
/// <reference path="in_wall_floor_item.ts" />
/// <reference path="in_wall_item.ts" />
/// <reference path="on_floor_item.ts" />
/// <reference path="wall_floor_item.ts" />
/// <reference path="wall_item.ts" />
 */
import FloorItem from './floor_item'

  /** Enumeration of item types. */
  const item_types = {
    1: FloorItem,
    // 2: WallItem,
    // 3: InWallItem,
    // 7: InWallFloorItem,
    // 8: OnFloorItem,
    // 9: WallFloorItem
  };

  /** Factory class to create items. */
  export default class Factory {
    /** Gets the class for the specified item. */
    public static getClass(itemType: any) { 
      return item_types[itemType]
    }
  }