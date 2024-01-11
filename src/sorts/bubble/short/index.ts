import compare from '@/internal/compare';

/**
 * 短冒泡排序
 * @description 短冒泡排序是冒泡排序的一种变体，当在整个排序过程中没有进行任何交换时，该算法会提前停止
 * @usageScenario 适用于检测几乎已经排序好的数组
 * @timeComplexity 最好情况 O(n)，平均和最坏情况 O(n^2)
 * @param {T[]} array 待排序数组
 * @param {boolean} [modifyOriginal=true] 是否修改原数组
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式
 * @param {boolean} [reverse=false] 是否反转结果
 */
const short = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  let i = 0;
  let swapped: boolean;

  do {
    swapped = false;
    for (i = 0; i < array.length - 1; i++) {
      if (comp.greaterThan(array[i], array[i + 1])) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return array;
};

export default short;
