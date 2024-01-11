import { TCountingOptimizedData } from '@/interface';

/**
 * 计数排序（优化版本）
 * @description 这个 optimized 函数是一个优化版本的计数排序算法，专门用于对包含键值对的对象数组进行排序。该算法主要针对对象中的 key 属性进行排序，其中 key 需要是数字类型。
 * @usageScenario 适用于需要根据对象的某个数字键值进行排序的场景，尤其是当这些键值分布在一定范围内时。可以选择是否修改原数组以及是否反转排序结果。
 * @timeComplexity 平均和最坏情况为 O(n + k)，其中 n 是数组长度，k 是键值的范围。
 * @param {Array} array 要排序的数组
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {Array} 返回排序后的数组
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
