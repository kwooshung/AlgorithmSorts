import compare from '@/internal/compare';

/**
 * 调整堆（非递归方式）
 * @param arr {T[]} 原数组
 * @param size {number} 堆的大小
 * @param i {number} 当前节点
 * @param {comp} comp 比较类实例
 */
const heapify = <T>(arr: T[], size: number, i: number, comp: compare) => {
  let largest = i;
  while (i < size) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let newLargest = largest;

    if (left < size && comp.greaterThan(arr[left], arr[newLargest])) {
      newLargest = left;
    }

    if (right < size && comp.greaterThan(arr[right], arr[newLargest])) {
      newLargest = right;
    }

    if (newLargest !== largest) {
      [arr[largest], arr[newLargest]] = [arr[newLargest], arr[largest]];
      largest = newLargest;
      i = largest; // 更新当前节点，继续调整
    } else {
      break; // 如果未发生交换，则结束循环
    }
  }
};

/**
 * 堆排序
 * @description 堆排序利用堆这种数据结构所设计的排序算法，通过构造最大堆或最小堆来排序
 * @usageScenario 适用于无需全部存储在内存的大数据集
 * @timeComplexity 最好、最坏和平均情况均为 O(n log n)
 * @param array {T[]} 要排序的数组
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {T[]} 返回排序后的数组
 */
const heap = <T>(array: T[], modifyOriginal: boolean = true, compareFunction?: (a: T, b: T) => number, reverse: boolean = false): T[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const comp = new compare(compareFunction);
  reverse && comp.reverse();

  const n = array.length;

  // 建立最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, comp);
  }

  // 一个个从堆顶取出元素
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]]; // 交换
    heapify(array, i, 0, comp);
  }

  return array;
};

export default heap;
