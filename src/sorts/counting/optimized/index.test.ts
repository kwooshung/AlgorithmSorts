import { TCountingOptimizedData } from '@/interface';
import optimized from '.';

describe('优化版计数排序测试', () => {
  it('对 1个元素数组 进行排序', () => {
    const input: TCountingOptimizedData[] = [{ key: 3 }];
    const expected = [{ key: 3 }];
    const result = optimized(input);

    expect(result).to.deep.equal(expected);
  });

  it('应正确排序包含数字key的对象数组', () => {
    const input: TCountingOptimizedData[] = [{ key: 3 }, { key: 1 }, { key: 2 }, { key: 5 }, { key: 4 }];
    const expected = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }];
    expect(optimized(input)).toEqual(expected);
  });

  it('应处理空数组', () => {
    const input: TCountingOptimizedData[] = [];
    const expected: TCountingOptimizedData[] = [];
    expect(optimized(input)).toEqual(expected);
  });

  it('应处理仅有一个元素的数组', () => {
    const input: TCountingOptimizedData[] = [{ key: 1 }];
    const expected = [{ key: 1 }];
    expect(optimized(input)).toEqual(expected);
  });

  it('字符串数字，应该滤掉', () => {
    const input: any[] = [{ key: '1' }, { key: 2 }, { key: '3' }, { key: 4 }];
    const expected = [{ key: 2 }, { key: 4 }];
    expect(optimized(input)).toEqual(expected);
  });

  it('应正确处理具有混合类型key的数组', () => {
    const input: any[] = [{ key: 'a' }, { key: 2 }, { key: 'b' }, { key: 1 }];
    const expected = [{ key: 1 }, { key: 2 }];
    expect(optimized(input)).toEqual(expected);
  });

  it('应当在reverse参数为true时返回反向排序结果', () => {
    const input: TCountingOptimizedData[] = [{ key: 3 }, { key: 1 }, { key: 2 }];
    const expected = [{ key: 3 }, { key: 2 }, { key: 1 }];
    expect(optimized(input, true, true)).toEqual(expected);
  });

  it('在不修改原数组的情况下进行排序', () => {
    const input: TCountingOptimizedData[] = [{ key: 3 }, { key: 1 }, { key: 2 }];
    const expected = [{ key: 1 }, { key: 2 }, { key: 3 }];
    const original = [...input];
    const sorted = optimized(input, false);
    expect(sorted).toEqual(expected);
    expect(input).toEqual(original);
  });

  it('处理所有key值相同的数组', () => {
    const input = Array.from({ length: 5 }, () => ({ key: 2 }));
    const expected = input.slice();
    expect(optimized(input)).toEqual(expected);
  });

  it('过滤掉非数字key的对象', () => {
    const input: any = [{ key: 'a' }, { key: 2 }, { key: 'b' }, { key: 1 }, { key: true }];
    const expected = [{ key: 1 }, { key: 2 }];
    expect(optimized(input)).toEqual(expected);
  });

  it('反向排序且不修改原数组', () => {
    const input = [{ key: 3 }, { key: 1 }, { key: 2 }];
    const expected = [{ key: 3 }, { key: 2 }, { key: 1 }];
    const original = [...input];
    expect(optimized(input, false, true)).toEqual(expected);
    expect(input).toEqual(original);
  });

  it('处理具有非常大的key值的对象', () => {
    const input = [{ key: 10000 }, { key: 9999 }, { key: 10001 }];
    const expected = [{ key: 9999 }, { key: 10000 }, { key: 10001 }];
    expect(optimized(input)).toEqual(expected);
  });

  it('处理非常长的数组', () => {
    const longArray = Array.from({ length: 10000 }, (_, i) => ({ key: i % 100 }));
    const result = optimized(longArray);
    expect(result.length).toBe(10000);
    expect(result[0]).toHaveProperty('key');
    expect(result[result.length - 1]).toHaveProperty('key');
  });
});
