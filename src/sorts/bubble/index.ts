import compare from '@/internal/compare';

/**
 * 冒泡排序
 * @description 冒泡排序是一种简单的排序算法。通过重复遍历要排序的数列，比较两个元素，如果他们的顺序错误就把他们交换过来
 * @usageScenario 适用于小型数组或教学目的
 * @timeComplexity 最好情况 O(n)，平均和最坏情况 O(n^2)
 * @param {T[]} array 待排序数组
 * @param {boolean} [modifyOriginal=true] 是否修改原数组
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式
 * @param {boolean} [reverse=false] 是否反转结果
 */
const bubble = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  let n = array.length;
  let swapped: boolean;

  do {
    swapped = false;
    let newBound = 0;
    for (let i = 1; i < n; i++) {
      if (comp.greaterThan(array[i - 1], array[i])) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        newBound = i;
        swapped = true;
      }
    }
    n = newBound;
  } while (swapped);

  return array;
};

export default bubble;
