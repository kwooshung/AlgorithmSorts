/**
 * 基数排序（LSD）
 * @param {number[]} array 要排序的数组。
 * @returns {number[]} 返回排序后的数组
 */
const lsd = (array: number[]): number[] => {
  // 计算最大数的位数
  const maxNum = Math.max(...array);
  let maxDigit = 0;
  while (maxNum / Math.pow(10, maxDigit) >= 1) {
    maxDigit++;
  }

  for (let digit = 0; digit < maxDigit; digit++) {
    // 按当前位数排序
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    for (const num of array) {
      const bucketIndex = Math.floor((num / Math.pow(10, digit)) % 10);
      buckets[bucketIndex].push(num);
    }
    // 合并桶中的元素
    //array = [].concat(...(buckets as never[]));
    array.splice(0, array.length, ...[].concat(...(buckets as never[])));
  }

  return array;
};

/**
 * 基数排序（MSD）
 * @param {number[]} array 要排序的数组
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @returns {number[]} 返回排序后的数组
 */
const msd = (array: number[], modifyOriginal: boolean = true): number[] => {
  const getMaxDigits = (arr: number[]): number => {
    const maxNum = Math.max(...arr);
    return Math.floor(Math.log10(maxNum) + 1);
  };

  const msdSortHelper = (arr: number[], digit: number): number[] => {
    if (digit === 0 || arr.length <= 1) {
      return arr;
    }

    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    const radix = Math.pow(10, digit - 1);

    for (let i = 0; i < arr.length; i++) {
      const bucketIndex = Math.floor(arr[i] / radix) % 10;
      buckets[bucketIndex].push(arr[i]);
    }

    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = msdSortHelper(buckets[i], digit - 1);
    }

    const flattened = [].concat(...(buckets as never[]));
    if (modifyOriginal) {
      arr.splice(0, arr.length, ...flattened);
      return arr;
    } else {
      return flattened;
    }
  };

  return msdSortHelper(array, getMaxDigits(array));
};

/**
 * 基数排序
 * @description 基数排序是一种非比较型整数排序算法，通过分配和收集过程来排序
 * @usageScenario 适用于大范围整数或字符串排序
 * @timeComplexity O(nk)，其中n是排序元素的个数，k是数字的最大位数
 * @param {'lsd' | 'msd'} type 排序类型，lsd 表示最低位优先（适用于小数据集），msd 表示最高位优先（适用于大数据集）
 * @param {number[]} array 要排序的数组。
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {boolean} [reverse = false] 是否反转结果
 * @returns {number[]} 返回排序后的数组
 */
const radix = (type: 'lsd' | 'msd', array: number[], modifyOriginal: boolean = true, reverse: boolean = false): number[] => {
  !modifyOriginal && (array = [...array]);
  if (array.length <= 1) {
    return array;
  }

  array = type === 'lsd' ? lsd(array) : msd(array, modifyOriginal);

  return reverse ? array.reverse() : array;
};

export default radix;
