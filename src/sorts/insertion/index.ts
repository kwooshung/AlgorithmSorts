import compare from '@/internal/compare';

/**
 * 插入排序
 * @param array {T[]} 要排序的数组
 * @description 插入排序是一种简单直观的排序算法，通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
 * @usageScenario 适合少量数据或基本有序的数据
 * @timeComplexity 平均和最坏情况 O(n^2)，最好情况 O(n)
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {T[]} 返回排序后的数组
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
