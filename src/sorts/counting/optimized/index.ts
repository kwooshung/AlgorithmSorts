import { TCountingOptimizedData } from '@/interface';

/**
 * 计数排序（优化版本）/ Counting Sort (Optimized Version)
 * @description 这个 optimized 函数是一个优化版本的计数排序算法，专门用于对包含键值对的对象数组进行排序。该算法主要针对对象中的 key 属性进行排序，其中 key 需要是数字类型。/ This optimized function is an optimized version of the counting sort algorithm, specifically for sorting arrays of objects with key-value pairs. The algorithm primarily sorts based on the key attribute in the objects, where the key needs to be a numeric type.
 * @usageScenario 适用于需要根据对象的某个数字键值进行排序的场景，尤其是当这些键值分布在一定范围内时。可以选择是否修改原数组以及是否反转排序结果。/ Suitable for scenarios where sorting is required based on a numeric key value of objects, especially when these key values are within a certain range. You can choose whether to modify the original array and whether to reverse the sort result.
 * @timeComplexity 平均和最坏情况为 O(n + k)，其中 n 是数组长度，k 是键值的范围。/ Average and worst-case complexity is O(n + k), where n is the length of the array and k is the range of the key values.
 * @param {Array} array 要排序的数组 / Array to be sorted
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组 / Whether to modify the original array
 * @param {boolean} [reverse = false] 是否反转结果 / Whether to reverse the result
 * @returns {Array} 返回排序后的数组 / Returns the sorted array
 */
const optimized = (array: TCountingOptimizedData[], modifyOriginal: boolean = true, reverse: boolean = false): TCountingOptimizedData[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  const filteredArray = array.filter((obj) => typeof obj.key === 'number');
  const maxKey = filteredArray.reduce((max, obj) => Math.max(max, obj.key), 0);
  const minKey = filteredArray.reduce((min, obj) => Math.min(min, obj.key), maxKey);

  const count: any[] = [];
  filteredArray.forEach((obj: TCountingOptimizedData) => {
    count[obj.key] = count[obj.key] ? [...count[obj.key], obj] : [obj];
  });

  const result = [];
  for (let i = minKey; i <= maxKey; i++) {
    if (count[i]) {
      result.push(...count[i]);
    }
  }

  return reverse ? result.reverse() : result;
};

export default optimized;
