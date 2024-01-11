import compare from '@/internal/compare';

/**
 * 翻转数组
 * @param {T[]} arr 要翻转的数组
 * @param {number} i 翻转的边界
 */
const flip = <T>(arr: T[], i: number) => {
  let start = 0;
  while (start < i) {
    [arr[start], arr[i]] = [arr[i], arr[start]];
    start++;
    i--;
  }
};

/**
 * 查找数组中最大元素的索引
 * @param {T[]} arr 要查找的数组
 * @param {number} n 数组长度
 * @param {compare} comp 比较函数
 * @returns {number} 最大元素的索引
 */
const findMaxIndex = <T>(arr: T[], n: number, comp: compare) => {
  let maxIdx = 0;
  for (let i = 1; i < n; i++) {
    comp.greaterThan(arr[i], arr[maxIdx]) && (maxIdx = i);
  }
  return maxIdx;
};

/**
 * 煎饼排序（Pancake Sorting）
 * @description 煎饼排序是一种排序算法，通过一系列的煎饼翻转操作来排序数组。在煎饼排序中，允许的操作是反转数组的前 n 个元素。
 * @usageScenario 适用于当翻转操作成本高于比较操作时的排序场景。
 * @timeComplexity 平均情况和最坏情况均为 O(n^2)，最好情况为 O(n)
 * @param array {T[]} 要排序的数组
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {T[]} 返回排序后的数组
 */
const pancake = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  const n = array.length;
  if (n <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  for (let currSize = array.length; currSize > 1; --currSize) {
    const maxIdx = findMaxIndex(array, currSize, comp);

    if (maxIdx !== currSize - 1) {
      flip(array, maxIdx);
      flip(array, currSize - 1);
    }
  }

  return array;
};

export default pancake;
