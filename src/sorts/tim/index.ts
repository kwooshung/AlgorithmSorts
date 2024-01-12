import insertion from '@/sorts/insertion';
import merge from '@/sorts/merge';

/**
 * 定序排序 / Tim Sort
 * @description 定序排序是一种混合排序算法，结合了插入排序和归并排序的优点，对部分有序的数据集表现出色 / A hybrid sorting algorithm combining the best of insertion and merge sort, excellent for partially ordered datasets
 * @usageScenario 适用于各种大小的数据集，特别是部分有序数据 / Suitable for datasets of various sizes, especially for partially ordered data
 * @timeComplexity 平均情况 O(n log n)，最坏情况 O(n log n)，最好情况 O(n) / Average case O(n log n), worst case O(n log n), best case O(n)
 * @param array {T[]} 要排序的数组 / Array to be sorted
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组 / Whether to modify the original array
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式 / Comparison function, defines the sorting order of elements
 * @param {boolean} [reverse = false] 是否反转结果 / Whether to reverse the result
 * @param {number} [runSize = 32] 分块大小，用于决定何时使用插入排序 / Run size, used to determine when to use insertion sort
 * @returns {T[]} 返回排序后的数组 / Returns the sorted array
 */
const tim = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false, runSize: number = 32): T[] => {
  !modifyOriginal && (array = [...array]);
  const n = array.length;
  if (n <= 1) {
    return array;
  }

  // 对数组进行分块，并对每个块应用插入排序
  for (let i = 0; i < n; i += runSize) {
    const end = Math.min(i + runSize, n);
    // 先复制需要排序的子数组
    const tempArray = array.slice(i, end);
    // 对子数组进行排序
    insertion(tempArray, true, compareFunction, reverse);
    // 将排序后的子数组复制回 array
    for (let j = i; j < end; j++) {
      array[j] = tempArray[j - i];
    }
  }

  // 归并已排序的块
  for (let size = runSize; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      // const mid = Math.min(left + size, n);
      const right = Math.min(left + 2 * size, n);

      // 先复制需要归并的子数组
      const tempArray = array.slice(left, right);
      // 对子数组进行归并排序
      merge(tempArray, true, compareFunction, reverse);
      // 将排序后的子数组复制回 array
      for (let j = left; j < right; j++) {
        array[j] = tempArray[j - left];
      }
    }
  }

  return array;
};

export default tim;
