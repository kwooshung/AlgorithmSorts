import build from '.';

describe('测试 build 函数', () => {
  it('使用默认参数', () => {
    const result = build();
    expect(result).toHaveLength(10000);
  });

  it('测试生成的数组元素长度是否符合要求', () => {
    const result = build(100, 2, 10, 0, 20);
    result.forEach((item) => {
      if (typeof item === 'string') {
        expect(item.length).toBeGreaterThanOrEqual(2);
        expect(item.length).toBeLessThanOrEqual(10);
      } else {
        expect(item).toBeGreaterThanOrEqual(0);
        expect(item).toBeLessThanOrEqual(20);
      }
    });
  });

  it('生成指定长度的数组', () => {
    const length = 500;
    const result = build(length);
    expect(result).toHaveLength(length);
  });

  it('数组中包含字符串和数字', () => {
    const result = build(100, 1, 1, 1, 1);
    const hasString = result.some((item) => typeof item === 'string');
    const hasNumber = result.some((item) => typeof item === 'number');
    expect(hasString).toBeTruthy();
    expect(hasNumber).toBeTruthy();
  });

  it('测试字符串长度的限制', () => {
    const minLength = 3;
    const maxLength = 8;
    const result = build(100, minLength, maxLength);
    result.forEach((item) => {
      if (typeof item === 'string') {
        expect(item.length).toBeGreaterThanOrEqual(minLength);
        expect(item.length).toBeLessThanOrEqual(maxLength);
      }
    });
  });

  it('测试数字范围的限制', () => {
    const minNumber = 10;
    const maxNumber = 500;
    const result = build(100, 4, 12, minNumber, maxNumber);
    result.forEach((item) => {
      if (typeof item === 'number') {
        expect(item).toBeGreaterThanOrEqual(minNumber);
        expect(item).toBeLessThanOrEqual(maxNumber);
      }
    });
  });

  it('测试 isKey 为 true 时的行为', () => {
    const result = build(100, 4, 12, 10, 500, true);
    result.forEach((item) => {
      expect(typeof item).toBe('object');
      expect(item).toHaveProperty('key');
    });
  });

  it('测试 isKey 为 false 时的行为', () => {
    const result = build(100, 4, 12, 10, 500, false);
    result.forEach((item) => {
      expect(['string', 'number']).toContain(typeof item);
    });
  });

  it('测试字符串是否包含预期的字符集', () => {
    const result = build(100, 10, 10);
    result.forEach((item) => {
      if (typeof item === 'string') {
        expect(item).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+[\]{}|;:,.<>?]+$/);
      }
    });
  });

  it('测试最小和最大长度相同时字符串的长度', () => {
    const fixedLength = 5;
    const result = build(100, fixedLength, fixedLength);
    result.forEach((item) => {
      if (typeof item === 'string') {
        expect(item.length).toBe(fixedLength);
      }
    });
  });

  it('测试最小和最大数字相同时数字的值', () => {
    const fixedNumber = 100;
    const result = build(100, 4, 12, fixedNumber, fixedNumber);
    result.forEach((item) => {
      if (typeof item === 'number') {
        expect(item).toBe(fixedNumber);
      }
    });
  });

  it('测试数组长度为 0 时的行为', () => {
    const result = build(0);
    expect(result).toHaveLength(0);
  });
});
