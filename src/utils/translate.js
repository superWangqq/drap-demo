// 角度转弧度
// Math.PI = 180 度
function angleToRadian(angle) {
  return (angle * Math.PI) / 180;
}

// 求两点之间的中点坐标
export function getCenterPoint(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}

export function calculateRotatedPoint(point, center, angle) {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // 平移变为直角坐标 x,y
  const dx = point.x - center.x;
  const dy = point.y - center.y;

  // 旋转
  const rotatedX = dx * cos - dy * sin;
  const rotatedY = dx * sin + dy * cos;

  // 反向平移
  return {
    // 变为世界坐标
    x: Math.floor(rotatedX + center.x),
    y: Math.floor(rotatedY + center.y),
  };
}

export function sin(rotate) {
  return Math.abs(Math.sin(angleToRadian(rotate)));
}

export function cos(rotate) {
  return Math.abs(Math.cos(angleToRadian(rotate)));
}
