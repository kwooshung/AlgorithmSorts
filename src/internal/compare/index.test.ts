import Comparator from '.';

describe('Comparator 类的测试', () => {
  let comparator: Comparator;

  beforeEach(() => {
    comparator = new Comparator();
  });

  it('默认比较函数应正确比较数字', () => {
    expect(comparator.compare(1, 2)).toBe(-1);
    expect(comparator.compare(2, 1)).toBe(1);
    expect(comparator.compare(1, 1)).toBe(0);
  });

  it('默认比较函数应正确比较字符串', () => {
    expect(comparator.compare('a', 'b')).toBe(-1);
    expect(comparator.compare('b', 'a')).toBe(1);
    expect(comparator.compare('a', 'a')).toBe(0);
  });

  it('lessThan 应正确工作', () => {
    expect(comparator.lessThan(1, 2)).toBeTruthy();
    expect(comparator.lessThan(2, 1)).toBeFalsy();
  });

  it('lessThanOrEqual 应正确工作', () => {
    expect(comparator.lessThanOrEqual(1, 2)).toBeTruthy();
    expect(comparator.lessThanOrEqual(2, 2)).toBeTruthy();
    expect(comparator.lessThanOrEqual(2, 1)).toBeFalsy();
  });

  it('greaterThan 应正确工作', () => {
    expect(comparator.greaterThan(2, 1)).toBeTruthy();
    expect(comparator.greaterThan(1, 2)).toBeFalsy();
  });

  it('greaterThanOrEqual 应正确工作', () => {
    expect(comparator.greaterThanOrEqual(2, 1)).toBeTruthy();
    expect(comparator.greaterThanOrEqual(1, 1)).toBeTruthy();
    expect(comparator.greaterThanOrEqual(1, 2)).toBeFalsy();
  });

  it('equal 应正确工作', () => {
    expect(comparator.equal(1, 1)).toBeTruthy();
    expect(comparator.equal(1, 2)).toBeFalsy();
    expect(comparator.equal('a', 'a')).toBeTruthy();
    expect(comparator.equal('a', 'b')).toBeFalsy();
  });

  it('reverse 应该反转比较逻辑', () => {
    comparator.reverse();
    expect(comparator.compare(1, 2)).toBe(1);
    expect(comparator.compare(2, 1)).toBe(-1);
    expect(comparator.compare(1, 1)).toBe(0);
  });

  it('使用自定义比较函数', () => {
    const customCompare = new Comparator((a, b) => a.length - b.length);
    expect(customCompare.compare('a', 'bb')).toBe(-1);
    expect(customCompare.compare('aaa', 'bb')).toBe(1);
    expect(customCompare.compare('abc', 'abc')).toBe(0);
  });
});
