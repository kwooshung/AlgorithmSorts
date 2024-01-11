/**
 * 类型：计数排序的优化版数据参数
 */
type TCountingOptimizedData = {
  key: number;
};

/**
 * 类型：点数据
 */
type TPoint = { x: number; y: number };

/**
 * 类型：射线数据
 */
type TRay = {
  origin: TPoint;
  direction: TPoint;
};

/**
 * 类型：多边形数据
 */
type TPolygon = TPolygon;

/**
 * 类型：矩形数据
 */
type TRectangle = { topLeft: TPoint; bottomRight: TPoint };

export { TCountingOptimizedData, TPoint, TRay, TPolygon, TRectangle };
