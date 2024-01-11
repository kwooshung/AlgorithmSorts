import compare from '@/internal/compare';

/**
 * 交换数组中的两个元素
 * @param {Array} arr 要交换元素的数组
 * @param {number} x 要交换元素的索引
 * @param {number} y 要交换元素的索引
 * @returns {void} 无返回值
 */
const swap = <T>(arr: T[], x: number, y: number): void => {
  const tmp: T = arr[y];
  arr[y] = arr[x];
  arr[x] = tmp;
};

/**
 * 分区，将数组分为两部分，左边的元素都小于枢纽元素，右边的元素都大于枢纽元素
 * @param {Array} array 要分区的数组
 * @param {number} lo 要分区的数组的起始索引
 * @param {number} hi 要分区的数组的结束索引
 * @param {comp} comp 比较类实例
 * @returns {number} 返回枢纽元素的索引。
 */
const partition = <T>(array: T[], lo: number, hi: number, comp: compare): number => {
  // 随机选择枢纽元素
  const pivotIndex: number = Math.floor(Math.random() * (hi - lo + 1)) + lo;
  const pivot: T = array[pivotIndex];

  swap(array, pivotIndex, hi);

  let dividerPosition: number = lo;

  for (let i: number = lo; i < hi; i++) {
    if (comp.lessThan(array[i], pivot)) {
      swap(array, i, dividerPosition);
      dividerPosition++;
    }
  }

  swap(array, dividerPosition, hi);

  return dividerPosition;
};

/**
 * 快速排序
 * @description 快速排序是一种基于分治法的高效排序算法。通过选取一个枢轴元素来划分数组，使得一部分元素小于枢轴，另一部分元素大于枢轴
 * @usageScenario 适用于大数据集，不适用于几乎已排序的数据
 * @timeComplexity 平均情况 O(n log n)，最坏情况 O(n^2)
 * @param {Array} array 要排序的数组
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {(a:T, b:T) => number} [compareFunction] 比较函数，定义元素的排序方式
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {Array} 返回排序后的数组
 */
const quick = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  const stack: number[] = [];
  stack.push(0);
  stack.push(array.length - 1);

  while (stack.length > 0) {
    const hi: number = stack.pop()!;
    const lo: number = stack.pop()!;

    const p: number = partition(array, lo, hi, comp);

    if (p - 1 > lo) {
      stack.push(lo);
      stack.push(p - 1);
    }

    if (p + 1 < hi) {
      stack.push(p + 1);
      stack.push(hi);
    }
  }

  return array;
};

export default quick;
