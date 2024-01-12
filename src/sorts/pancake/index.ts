import compare from '@/internal/compare';

/**
 * 翻转数组 / Reverse Array
 * @param {T[]} arr 要翻转的数组 / Array to be reversed
 * @param {number} i 翻转的边界 / Boundary for reversal
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
 * 查找数组中最大元素的索引 / Find the index of the largest element in an array
 * @param {T[]} arr 要查找的数组 / Array to search
 * @param {number} n 数组长度 / Length of the array
 * @param {compare} comp 比较函数 / Comparison function
 * @returns {number} 最大元素的索引 / Index of the largest element
 */
const findMaxIndex = <T>(arr: T[], n: number, comp: compare): number => {
  let maxIdx = 0;
  for (let i = 1; i < n; i++) {
    comp.greaterThan(arr[i], arr[maxIdx]) && (maxIdx = i);
  }
  return maxIdx;
};

/**
 * 煎饼排序 / Pancake Sorting
 * @description 煎饼排序是一种排序算法，通过一系列的煎饼翻转操作来排序数组。在煎饼排序中，允许的操作是反转数组的前 n 个元素。/ Pancake sorting is a sorting algorithm that sorts an array through a series of pancake flipping operations. In pancake sorting, the allowed operation is flipping the first n elements of the array.
 * @usageScenario 适用于当翻转操作成本高于比较操作时的排序场景。/ Suitable for sorting scenarios where the cost of flipping operations is higher than comparison operations.
 * @timeComplexity 平均情况和最坏情况均为 O(n^2)，最好情况为 O(n) / Average and worst case O(n^2), best case O(n)
 * @param array {T[]} 要排序的数组 / Array to be sorted
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组 / Whether to modify the original array
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式 / Comparison function, defines the sorting order of elements
 * @param {boolean} [reverse = false] 是否反转结果 / Whether to reverse the result
 * @returns {T[]} 返回排序后的数组 / Returns the sorted array
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
