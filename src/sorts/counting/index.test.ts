import counting from '.';

describe('计数排序', () => {
  it('对 1个元素数组 进行排序', () => {
    const input = [3];
    const expected = [3];
    const result = counting(input);

    expect(result).to.deep.equal(expected);
  });

  // 测试基本的排序功能
  it('应该正确排序一个整数数组', () => {
    const result = counting([4, 2, 3, 1, 2], true);
    expect(result).toEqual([1, 2, 2, 3, 4]);
  });

  // 测试逆序排序功能
  it('应该能够逆序排序数组', () => {
    const result = counting([4, 2, 3, 1, 5], true);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  // 测试处理非数值元素
  it('字符应该在数字之后', () => {
    const result = counting([3, 4, 'a', 3, 2, 'b', 1], true);
    expect(result).toEqual([1, 2, 3, 3, 4, 'a', 'b']);
  });

  // 测试不修改原数组
  it('如果指定，应该不修改原数组', () => {
    const original = [3, 1, 4, 2];
    const result = counting(original, false);
    expect(result).not.toBe(original);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  // 测试空数组和单元素数组
  it('应该能正确处理空数组和单元素数组', () => {
    expect(counting([], true)).toEqual([]);
    expect(counting([1], true)).toEqual([1]);
  });

  // 测试最大值
  it('应该能正确处理最大值', () => {
    const result = counting([-Infinity, 4, 2, 3, 1, 5, Infinity], true);
    expect(result).toEqual([-Infinity, 1, 2, 3, 4, 5, Infinity]);
  });

  it('反转排序', () => {
    const input = [6, 5, 7, 'banana', 'apple', 3, 2];
    const expected = ['apple', 'banana', 7, 6, 5, 3, 2];
    const result = counting(input, true, true);
    expect(result).toEqual(expected);
  });
});
