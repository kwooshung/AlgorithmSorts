import { TCountingOptimizedData } from '@/interface';
import { Chance } from 'chance';

/**
 * 生成随机字符串数组
 * @param {number} [arrayLength = 10000] 数组长度
 * @param {number} [minLength = 4] 最小长度
 * @param {number} [maxLength = 12] 最大长度
 * @param {number} [minNumber = 0] 最小数字
 * @param {number} [maxNumber = 99999] 最大数字
 * @param {boolean} [isKey = false] 是否生成键值对
 * @returns {(string | TCountingOptimizedData)[]} 返回随机字符串数组
 */
const build = (
  arrayLength: number = 10000,
  minLength: number = 4,
  maxLength: number = 12,
  minNumber: number = 0,
  maxNumber: number = 99999,
  isKey: boolean = false
): (string | TCountingOptimizedData)[] => {
  const chance = new Chance();

  return Array.from({ length: arrayLength }, () => {
    if (chance.bool()) {
      const randomLength = chance.integer({ min: minLength, max: maxLength });
      const randomString = chance.string({
        length: randomLength,
        pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?'
      });
      return isKey ? { key: randomString } : randomString;
    } else {
      const randomNumber = chance.integer({ min: minNumber, max: maxNumber });
      return isKey ? { key: randomNumber } : randomNumber;
    }
  }) as (string | TCountingOptimizedData)[];
};

export default build;
