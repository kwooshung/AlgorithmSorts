import compare from '@/internal/compare';

/**
 * 插入排序 / Insertion Sort
 * @param array {T[]} 要排序的数组 / Array to be sorted
 * @description 插入排序是一种简单直观的排序算法，通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入 / Insertion sort is a simple and intuitive sorting algorithm, building an ordered sequence by scanning backwards through the sorted sequence to find the appropriate position and insert the unsorted data
 * @usageScenario 适合少量数据或基本有序的数据 / Suitable for small amounts of data or data that is mostly ordered
 * @timeComplexity 平均和最坏情况 O(n^2)，最好情况 O(n) / Average and worst case O(n^2), best case O(n)
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组 / Whether to modify the original array
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式 / Comparison function, defines the sorting order of elements
 * @param {boolean} [reverse = false] 是否反转结果 / Whether to reverse the result
 * @returns {T[]} 返回排序后的数组 / Returns the sorted array
 */
const insertion = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  for (let i = 1, j = array.length; i < j; i++) {
    const current = array[i];
    let j = i;

    while (j > 0 && comp.lessThan(current, array[j - 1])) {
      array[j] = array[j - 1];
      j--;
    }

    array[j] = current;
  }

  return array;
};

export default insertion;
