import compare from '@/internal/compare';

/**
 * 鸡尾酒排序 / Cocktail Sort
 * @description 鸡尾酒排序是冒泡排序的变体，其中排序操作是双向的：先从左到右，然后从右到左。/ Cocktail sort is a variation of bubble sort where the sorting operation is bidirectional: first from left to right, then from right to left.
 * @usageScenario 适用于大部分已排序但部分元素处于错误位置的数组。/ Suitable for mostly sorted arrays with some elements out of place.
 * @timeComplexity 平均情况和最坏情况均为 O(n^2)，最好情况为 O(n) / Average and worst case O(n^2), best case O(n)
 * @param array {T[]} 要排序的数组 / Array to be sorted
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组 / Whether to modify the original array
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式 / Comparison function, defines the sorting order of elements
 * @returns {T[]} 返回排序后的数组 / Returns the sorted array
 */
const cocktail = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  const n = array.length;
  if (n <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  let swapped = true;
  let start = 0;
  let end = n;

  while (swapped) {
    swapped = false;

    // 从左到右的冒泡排序
    for (let i = start; i < end - 1; ++i) {
      if (comp.greaterThan(array[i], array[i + 1])) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }

    if (!swapped) break;

    swapped = false;
    end--;

    // 从右到左的冒泡排序
    for (let i = end - 1; i >= start; i--) {
      if (comp.greaterThan(array[i], array[i + 1])) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }

    start++;
  }

  return array;
};

export default cocktail;
