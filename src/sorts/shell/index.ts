import compare from '@/internal/compare';

/**
 * 希尔排序
 * @description 希尔排序是插入排序的一种更高效的改进版本。它通过将原始列表分割成多个子列表，分别进行插入排序
 * @usageScenario 适用于中等大小的数组
 * @timeComplexity 时间复杂度取决于间隔序列，最坏情况可达 O(n^2)，但对于某些间隔序列可低至 O(n log n)
 * @param array {T[]} 要排序的数组。
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {T[]} 返回排序后的数组
 */
const shell = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  let gap = Math.floor(array.length / 2);

  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      const temp = array[i];
      let j = i - gap;
      while (j >= 0 && comp.greaterThan(array[j], temp)) {
        array[j + gap] = array[j];
        j -= gap;
      }
      array[j + gap] = temp;
    }
    // 减小间隔
    gap = Math.floor(gap / 2);
  }

  return array;
};

export default shell;
