/**
 * 计数排序
 * @description 计数排序是一种非比较型排序算法。适用于一定范围内的整数排序，在额外空间的帮助下，对元素计数然后输出排序后的数组
 * 计数排序的优化版本，即（https://github.com/felipernb/algorithms.js/blob/master/src/algorithms/sorting/counting_sort.js），有以下特点：
 *   1、适用于数组中的元素是对象，且每个对象有一个名为 'key' 的整数属性
 *   2、通过直接使用 'key' 值作为索引，避免了额外的映射步骤，提高了排序效率
 *   3、专门针对具有特定结构的数据进行优化
 *
 * 与之相比，本函数为更通用的计数排序实现：
 *   1、能够处理数字、字符串和其他非数字类型的元素
 *   2、由于需要将非数字元素映射为索引，因此效率略低
 *   3、适用于更广泛的数据类型，但牺牲了一些效率
 * @usageScenario 适用于小范围整数排序，特别是当O(n)的时间复杂度是必要的
 * @timeComplexity O(n + k)，其中k是整数的范围
 * @param {any[]} array 待排序数组
 * @param {boolean} [modifyOriginal = true] 是否修改原数组
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {any[]} 返回排序后的数组
 */
const countingSort = (array: any[], modifyOriginal: boolean = true, reverse: boolean = false): any[] => {
  !modifyOriginal && (array = [...array]);

  if (array.length <= 1) {
    return array;
  }

  // 分离数字和非数字元素
  const numericElements = array.filter((item) => typeof item === 'number' && item !== Infinity && item !== -Infinity);
  const nonNumericElements = array.filter((item) => typeof item !== 'number');

  // 对数字元素进行计数排序
  const maxVal = Math.max(...numericElements);
  const minVal = Math.min(...numericElements);
  const counts = new Array(maxVal - minVal + 1).fill(0);

  numericElements.forEach((element) => {
    counts[element - minVal]++;
  });

  // 重建排序后的数组
  const sortedArray: any[] = [];
  counts.forEach((count, index) => {
    for (let i = 0; i < count; i++) {
      sortedArray.push(index + minVal);
    }
  });

  // 将非数字元素追加到排序数组的尾部
  sortedArray.push(...nonNumericElements);

  // 处理 Infinity 和 -Infinity
  const negInfinity = array.filter((element) => element === -Infinity);
  const posInfinity = array.filter((element) => element === Infinity);

  const result = [...negInfinity, ...sortedArray, ...posInfinity];

  return reverse ? result.reverse() : result;
};

export default countingSort;
