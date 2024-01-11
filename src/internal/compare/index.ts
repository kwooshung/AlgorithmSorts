/**
 * 这个类真的很棒，在原来的基础上，稍作优化
 * 引用自：https://github.com/felipernb/algorithms.js/blob/master/src/util/comparator.js
 */
class compare {
  /**
   * 构造函数，可传入一个比较函数
   * @param {(a: any, b: any)} [compareFn] 比较函数，比较函数，只能返回 number
   */
  public constructor(compareFn?: (a: any, b: any) => number) {
    compareFn && (this.compare = compareFn);
  }

  /**
   * 默认比较函数
   * @param {T} a 第一个比较值
   * @param {T} b 第二个比较值
   * @return {number} 比较结果
   */
  public compare(a: any, b: any): number {
    if (a === b) {
      return 0;
    } else {
      if (typeof a === 'number' && typeof b === 'number') {
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      }

      return `${a}`.localeCompare(`${b}`);
    }
  }

  /**
   * 小于
   * @param {T} a 第一个比较值
   * @param {T} b 第二个比较值
   * @return {boolean} 比较结果
   */
  public lessThan<T>(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * 小于等于
   * @param {T} a 第一个比较值
   * @param {T} b 第二个比较值
   * @return {boolean} 比较结果
   */
  public lessThanOrEqual<T>(a: T, b: T): boolean {
    return this.compare(a, b) <= 0;
  }

  /**
   * 大于
   * @param {T} a 第一个比较值
   * @param {T} b 第二个比较值
   * @return {boolean} 比较结果
   */
  public greaterThan<T>(a: T, b: T): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * 大于等于
   * @param {T} a 第一个比较值
   * @param {T} b 第二个比较值
   * @return {boolean} 比较结果
   */
  public greaterThanOrEqual<T>(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * 等于
   * @param {T} a 第一个比较值
   * @param {T} b 第二个比较值
   * @return {boolean} 比较结果
   */
  public equal<T>(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   * 反转比较函数的逻辑
   * this.compare(a, b) => 1
   * this.reverse();
   * this.compare(a, b) => -1
   */
  public reverse() {
    const originalCompareFn = this.compare;
    this.compare = (a, b) => originalCompareFn(b, a);
  }
}

export default compare;
