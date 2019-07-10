/** 当前的模式 */
enum FloorPlannerMode {
  /** 平移 */
  MOVE = 0,
  /** 绘画 */
  DRAW = 1,
  /** 删除 */
  DELETE = 2
};

/**
 * floorplanner 的所有数据集合
 */
let model = {
  namespace: 'floorpanner',
  mode: FloorPlannerMode.DRAW
}
export default model
