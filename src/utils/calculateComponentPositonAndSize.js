import { getCenterPoint, calculateRotatedPoint } from "./translate";

const funcs = {
  lt: calculateLeftTop,
  t: calculateTop,
  rt: calculateRightTop,
  r: calculateRight,
  rb: calculateRightBottom,
  b: calculateBottom,
  lb: calculateLeftBottom,
  l: calculateLeft,
};

/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Object}  style  component样式
 * @param   {Object}  curPositon  鼠标移动后距离画布定点的距离
 * @param   {Number}  pointInfo 旋转的角度
 */
// center,             // 组件中心点
// curPoint,           // 当前点击圆点相对于画布的中心坐标
// symmetricPoint,     // 对称点的x,y坐标
function calculateLeftTop(style, curPositon, { symmetricPoint }) {
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint); // 获取拖拽后到对称点的中心坐标
  let newTopLeftPoint = calculateRotatedPoint(curPositon, newCenterPoint, -style.rotate); //  将点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newBottomRightPoint = calculateRotatedPoint(symmetricPoint, newCenterPoint, -style.rotate); // 将对称点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newTopLeftPoint.x);
    style.top = Math.round(newTopLeftPoint.y);
  }
}

function calculateTop(style, curPositon, { symmetricPoint, curPoint }) {
  // 由于用户拉伸时是以任意角度拉伸的，所以在求得旋转前的坐标时，只取 y 坐标（这里的 x 坐标可能是任意值），x 坐标用 curPoint 的。
  // 这个中心点（第二个参数）用 curPoint, center, symmetricPoint 都可以，只要他们在一条直线上就行
  const rotatedcurPositon = calculateRotatedPoint(curPositon, curPoint, -style.rotate);
  // 算出旋转前 y 坐标，再用 curPoint 的 x 坐标，重新计算它们旋转后对应的坐标
  const rotatedTopMiddlePoint = calculateRotatedPoint(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y,
    },
    curPoint,
    style.rotate,
  );

  // 用旋转后的坐标和对称点算出新的高度（勾股定理）
  const newHeight = Math.sqrt((rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2);
  const newCenter = {
    x: rotatedTopMiddlePoint.x - (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedTopMiddlePoint.y + (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2,
  };

  style.height = Math.round(newHeight);
  style.top = Math.round(newCenter.y - newHeight / 2);
  style.left = Math.round(newCenter.x - style.width / 2);
}

function calculateRight(style, curPositon, { symmetricPoint, curPoint }) {
  const rotatedcurPositon = calculateRotatedPoint(curPositon, curPoint, -style.rotate);
  // 算出旋转前 y 坐标，再用 curPoint 的 x 坐标，重新计算它们旋转后对应的坐标
  const rotatedTopMiddlePoint = calculateRotatedPoint(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y,
    },
    curPoint,
    style.rotate,
  );
  // 用旋转后的坐标和对称点算出新的高度（勾股定理）
  const newWidth = Math.sqrt((rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2);
  const newCenter = {
    x: rotatedTopMiddlePoint.x - (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedTopMiddlePoint.y + (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2,
  };
  style.width = Math.round(newWidth);
  style.top = Math.round(newCenter.y - style.height / 2);
  style.left = Math.round(newCenter.x - newWidth / 2);
}

function calculateRightTop(style, curPositon, { symmetricPoint }) {
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint); // 获取拖拽后到对称点的中心坐标
  let newTopRightPoint = calculateRotatedPoint(curPositon, newCenterPoint, -style.rotate); //  将点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newBottomLeftPoint = calculateRotatedPoint(symmetricPoint, newCenterPoint, -style.rotate); // 将对称点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
  let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;

  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newBottomLeftPoint.x);
    style.top = Math.round(newTopRightPoint.y);
  }
}

function calculateRightBottom(style, curPositon, { symmetricPoint }) {
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint); // 获取拖拽后到对称点的中心坐标
  let newBottomRightPoint = calculateRotatedPoint(curPositon, newCenterPoint, -style.rotate); //  将点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newTopLeftPoint = calculateRotatedPoint(symmetricPoint, newCenterPoint, -style.rotate); // 将对称点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newTopLeftPoint.x);
    style.top = Math.round(newTopLeftPoint.y);
  }
}

function calculateLeftBottom(style, curPositon, { symmetricPoint }) {
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint); // 获取拖拽后到对称点的中心坐标
  let newBottomLeftPoint = calculateRotatedPoint(curPositon, newCenterPoint, -style.rotate); //  将点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newTopRightPoint = calculateRotatedPoint(symmetricPoint, newCenterPoint, -style.rotate); // 将对称点的坐标从旋转后的坐标系转换到未旋转的坐标系
  let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
  let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth);
    style.height = Math.round(newHeight);
    style.left = Math.round(newBottomLeftPoint.x);
    style.top = Math.round(newTopRightPoint.y);
  }
}

function calculateBottom(style, curPositon, { symmetricPoint, curPoint }) {
  const rotatedcurPositon = calculateRotatedPoint(curPositon, curPoint, -style.rotate);
  const rotatedBottomMiddlePoint = calculateRotatedPoint(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y,
    },
    curPoint,
    style.rotate,
  );

  const newHeight = Math.sqrt((rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2);

  const newCenter = {
    x: rotatedBottomMiddlePoint.x - (rotatedBottomMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedBottomMiddlePoint.y + (symmetricPoint.y - rotatedBottomMiddlePoint.y) / 2,
  };

  style.height = Math.round(newHeight);
  style.top = Math.round(newCenter.y - newHeight / 2);
  style.left = Math.round(newCenter.x - style.width / 2);
}

function calculateLeft(style, curPositon, { symmetricPoint, curPoint }) {
  const rotatedcurPositon = calculateRotatedPoint(curPositon, curPoint, -style.rotate);
  const rotatedLeftMiddlePoint = calculateRotatedPoint(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y,
    },
    curPoint,
    style.rotate,
  );

  const newWidth = Math.sqrt((rotatedLeftMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedLeftMiddlePoint.y - symmetricPoint.y) ** 2);

  const newCenter = {
    x: rotatedLeftMiddlePoint.x - (rotatedLeftMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedLeftMiddlePoint.y + (symmetricPoint.y - rotatedLeftMiddlePoint.y) / 2,
  };

  style.width = Math.round(newWidth);
  style.top = Math.round(newCenter.y - style.height / 2);
  style.left = Math.round(newCenter.x - newWidth / 2);
}

export default function calculateComponentPositonAndSize(name, style, curPositon, pointInfo) {
  funcs[name](style, curPositon, pointInfo);
}
