import compare from '@/internal/compare';

/**
 * 选择排序 / Selection Sort
 * @description 选择排序是一种简单直观的排序算法。它的工作原理是每次从未排序的部分选出最小（或最大）的元素，存放在序列的起始位置 / A simple and intuitive sorting algorithm. It works by selecting the smallest (or largest) element from the unsorted part and placing it at the beginning of the sequence.
 * @usageScenario 适用于小型数组 / Suitable for small arrays.
 * @timeComplexity 最好、最坏和平均情况均为 O(n^2) / Best, worst, and average cases are all O(n^2).
 * @param {T[]} array 要排序的数组 / Array to be sorted.
 * @param {boolean} [modifyOriginal=true] 是否修改原数组。/ Whether to modify the original array.
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式 / Comparison function, defines the sorting order of elements.
 * @param {boolean} [reverse = false] 是否反转结果 / Whether to reverse the result.
 * @returns {T[]} 返回排序后的数组 / Returns the sorted array.
 */
const selection = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (comp.greaterThan(array[min], array[j])) {
        min = j;
      }
    }
    if (min !== i) {
      const tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;
    }
  }
  return array;
};

export default selection;
