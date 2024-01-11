import radix from '.';

describe('基数排序', () => {
  it('LSD：对 1个元素数组 进行排序', () => {
    const input = [3];
    const expected = [3];
    const result = radix('lsd', input);

    expect(result).to.deep.equal(expected);
  });

  it('LSD：对 数字数组 进行排序', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6];
    const expected = [1, 1, 2, 3, 4, 5, 6, 9];
    const result = radix('lsd', input);

    expect(result).to.deep.equal(expected);
  });

  it('LSD：不传递 modifyOriginal 参数，应该修改原数组', () => {
    const input = [3, 2, 1];
    const expected = [1, 2, 3];
    radix('lsd', input);
    expect(input).toEqual(expected);
  });

  it('LSD：传递 modifyOriginal 为 false，不应修改原数组', () => {
    const input = [3, 2, 1];
    const expected = [1, 2, 3];
    const result = radix('lsd', input, false);
    expect(input).toEqual(input);
    expect(result).toEqual(expected);
  });

  it('LSD：反转', () => {
    const input = [3, 2, 1];
    const expected = [3, 2, 1];
    const result = radix('lsd', input, false, true);
    expect(input).toEqual(input);
    expect(result).toEqual(expected);
  });

  it('MSD：对 1个元素数组 进行排序', () => {
    const input = [3];
    const expected = [3];
    const result = radix('msd', input);

    expect(result).to.deep.equal(expected);
  });

  it('MSD：对 数字数组 进行排序', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6];
    const expected = [1, 1, 2, 3, 4, 5, 6, 9];
    const result = radix('msd', input);

    expect(result).to.deep.equal(expected);
  });

  it('MSD：不传递 modifyOriginal 参数，应该修改原数组', () => {
    const input = [3, 2, 1];
    const expected = [1, 2, 3];
    radix('msd', input);
    expect(input).toEqual(expected);
  });

  it('MSD：传递 modifyOriginal 为 false，不应修改原数组', () => {
    const input = [3, 2, 1];
    const expected = [1, 2, 3];
    const result = radix('msd', input, false);
    expect(input).toEqual(input);
    expect(result).toEqual(expected);
  });

  it('MSD：反转', () => {
    const input = [3, 2, 1];
    const expected = [3, 2, 1];
    const result = radix('msd', input, false, true);
    expect(input).toEqual(input);
    expect(result).toEqual(expected);
  });
});
