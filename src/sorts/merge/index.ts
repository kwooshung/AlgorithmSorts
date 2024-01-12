import compare from '@/internal/compare';

/**
 * 归并两个子数组为一个排序数组。/ Merge two subarrays into one sorted array.
 * @param {T[]} array 原数组 / Original array
 * @param {number} start 起始索引 / Starting index
 * @param {number} mid 中间索引 / Middle index
 * @param {number} end 结束索引 / Ending index
 * @param {T[]} tempArray 临时数组 / Temporary array
 * @param {comp} comp 比较类实例 / Comparison class instance
 */
const toMerge = <T>(array: T[], start: number, mid: number, end: number, tempArray: T[], comp: compare): void => {
  let i = start,
    j = mid + 1,
    k = 0;

  // 归并到临时数组
  while (i <= mid && j <= end) {
    tempArray[k++] = comp.lessThanOrEqual(array[i], array[j]) ? array[i++] : array[j++];
  }

  // 复制剩余的左侧元素
  while (i <= mid) {
    tempArray[k++] = array[i++];
  }

  // 复制剩余的右侧元素
  while (j <= end) {
    tempArray[k++] = array[j++];
  }

  // 将排序后的临时数组复制回原数组
  for (i = start, k = 0; i <= end; i++, k++) {
    array[i] = tempArray[k];
  }
};

/**
 * 归并排序 / Merge Sort
 * @description 归并排序是一种稳定的排序算法，通过递归方式将数据分为更小的子集合，然后合并有序的子集合 / Merge sort is a stable sorting algorithm that divides data into smaller subsets through recursion, then merges the ordered subsets
 * @usageScenario 适用于大型数据集，特别是链表类型的数据结构 / Suitable for large datasets, especially for linked-list type data structures
 * @timeComplexity 平均、最坏和最好情况均为 O(n log n) / Average, worst, and best cases all O(n log n)
 * @param array {T[]} 要排序的数组 / Array to be sorted
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组 / Whether to modify the original array
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式 / Comparison function, defines the sorting order of elements
 * @param {boolean} [reverse = false] 是否反转结果 / Whether to reverse the result
 * @returns {T[]} 返回排序后的数组 / Returns the sorted array
 */
const merge = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  const n = array.length;
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  const tempArray: T[] = new Array(Math.ceil(n / 2));

  for (let size = 1; size < n; size *= 2) {
    for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * size) {
      const mid = Math.min(leftStart + size - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

      toMerge(array, leftStart, mid, rightEnd, tempArray, comp);
    }
  }

  return array;
};

export default merge;
