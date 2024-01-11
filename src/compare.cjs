const chalk = require('chalk');
const { Chance } = require('chance');
const algorithmOld = require('algorithms');
const {
  sortQuick,
  sortMerge,
  sortHeap,
  sortInsertion,
  sortSelection,
  sortShell,
  sortCounting,
  sortOptimizedCounting,
  sortRadix,
  sortBubble,
  sortShortBubble,
  sortTim,
  sortPancake
} = require('../dist/algorithm.cjs');

const fns = {
  /**
   * 通过参数替换字符串中的占位符
   * @param {string} str 带有占位符的字符串
   * @param {string[]} params 替换占位符的参数
   * @returns {string} 替换后的字符串
   */
  replacePlaceholders(str, ...params) {
    return str.replace(/\{(\d+)\}/g, (_, index) => (params[index] || '').toString());
  },
  /**
   * 比较
   * @param {any} a 比较值 a
   * @param {any} b 比较值 b
   * @returns 比较结果
   */
  compare(a, b) {
    return `${a}`.localeCompare(`${b}`);
  },
  /**
   * 格式化
   */
  format: {
    /**
     * 数字格式化
     * @param {number} number 数字
     * @returns 格式化后的数字
     */
    number(number) {
      return Number(number).toLocaleString('en-US');
    },
    /**
     * 保留 n 位小数
     * @param {number} number 数字
     * @param {number} [digits = 2] 保留位数
     */
    decimal(number, digits = 4) {
      return Number(number).toFixed(digits);
    }
  },
  /**
   * 生成数据
   */
  generate: {
    /**
     * 生成随机字符串数组
     * @param {number} [arrayLength = 10000] 数组长度
     * @param {number} [minLength = 4] 最小长度
     * @param {number} [maxLength = 12] 最大长度
     * @param {number} [minNumber = 0] 最小数字
     * @param {number} [maxNumber = 99999] 最大数字
     * @param {boolean} [isKey = false] 是否生成键值对
     * @returns 随机字符串数组
     */
    array(arrayLength = 10000, minLength = 4, maxLength = 12, minNumber = 0, maxNumber = 99999, isKey = false) {
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
      });
    }
  },
  /**
   * 速度测试相关
   */
  speeds: {
    /**
     * 获取数据
     * @param {number} [arrayLength = 10000] 数组长度
     * @param {number} [minLength = 4] 最小长度
     * @param {number} [maxLength = 12] 最大长度
     * @param {number} [minNumber = 0] 最小数字
     * @param {number} [maxNumber = 99999] 最大数字
     * @param {boolean} [isKey = false] 是否生成键值对
     */
    datas(arrayLength = 10000, minLength = 4, maxLength = 12, minNumber = 0, maxNumber = 99999, isKey = false) {
      const formatSection = (text, formatFunc) => (formatFunc ? formatFunc(text) : text);
      const formatData = (value, formatFunc) => `${formatFunc(fns.format.number(value))}`;
      const contents = [
        formatSection('┌───────────────────────────────────────────────────────────────────────────', chalk.dim),
        formatSection('│                                                                           ', chalk.dim),
        `${formatSection('│', chalk.dim)}  ${formatSection('以下比较均采用相同的比较算法逻辑', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('此文件中的结果仅作参考', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('实际情况会因各种原因导致测试结果不同', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('此包中的算法考虑了一些边缘情况，', chalk.bold.magenta)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('个别场景中可能会略微牺牲一些性能', chalk.bold.magenta)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('可进行多次测试', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('The comparisons in this document utilize the same algorithm logic.', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('The results herein are for reference only.', chalk.bold.magenta)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('Actual outcomes may vary due to various factors.', chalk.bold.magenta)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('The algorithms in this package account for edge cases,', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('which may slightly compromise performance in specific scenarios.', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}  ${formatSection('Multiple tests are recommended.', chalk.bold.cyan)}`,
        `${formatSection('│', chalk.dim)}`,
        `${formatSection('│', chalk.dim)}`,
        `${formatSection('├─', chalk.dim)} ${formatSection('Randomly generated data', chalk.bold.yellow)} ${formatData(arrayLength, chalk.bold.greenBright)} ${formatSection(
          'items',
          chalk.bold.yellow
        )}`,
        `${formatSection('├──', chalk.dim)} ${chalk.dim('string length between')} ${formatData(minLength, chalk.bold.greenBright)} ${chalk.dim('and')} ${formatData(
          maxLength,
          chalk.bold.greenBright
        )}`,
        `${formatSection('├──', chalk.dim)} ${chalk.dim('numbers between')} ${formatData(minNumber, chalk.greenBright)} ${chalk.dim('and')} ${formatData(maxNumber, chalk.bold.greenBright)}`,
        formatSection('│                                                                           ', chalk.dim),
        formatSection('└───────────────────────────────────────────────────────────────────────────', chalk.dim)
      ];

      console.log(contents.join('\n'));

      return fns.generate.array(arrayLength, minLength, maxLength, minNumber, maxNumber, isKey);
    },
    /**
     * 提示
     * @param {string} tips 提示
     * @returns 提示
     */
    tips(tips) {
      const arr = [];
      if (tips.length) {
        for (let i = 0, j = tips.length; i < j; i++) {
          const list = [];

          for (let k = 0, l = tips[i].length; k < l; k++) {
            list.push(`${chalk.dim('│')}      ${chalk.dim(tips[i][k])}`);
          }

          arr.push(`\n${list.join('\n')}`);
        }
      }

      return arr;
    },
    /**
     * 测试速度
     * @param {string} name 测试名称
     * @param {string} key 测试函数的 key
     * @param {any[]} datas 测试数据
     * @param {string} [tips = []] 提示
     */
    test(name, key, datas, tips = []) {
      tips = fns.speeds.tips(tips);
      let data1 = [...datas];
      let data2 = [...datas];

      let oldStartTime = 0;
      let oldEndTime = 0;
      let oldExecutionTime = 0;
      let oldNoFunction = false;

      oldStartTime = performance.now();
      if (key === 'counting') {
        fns.algorithms.old['counting'](data1);
      } else if (key === 'optimizedCounting') {
        let inx = 0;
        let oldCountingEmpty;
        // 有的时候，老版本不能处理某些随机的数据，不知是什么原因导致最终结果为空数组，这里做一个循环，重新生成数据，直到结果不为空
        do {
          // 首先，排序一次
          oldCountingEmpty = fns.algorithms.old['counting'](data1).length === 0;

          // 如果结果为空
          if (oldCountingEmpty) {
            // 重新生成数据
            const result = fns.generate.array(1000, 6, 32, 0, 1000000, true);
            data1 = [...result];
            data2 = [...result];
            inx++;

            // 重置排序开始时间
            oldStartTime = performance.now();
          }
        } while (oldCountingEmpty);

        if (tips.length) {
          tips.length === 1 && (tips[0] = fns.replacePlaceholders(tips[0], inx));
          tips.length === 2 && (tips[1] = fns.replacePlaceholders(tips[1], inx));
        }
      } else {
        if (fns.algorithms.old[key]) {
          fns.algorithms.old[key](data1, fns.compare);
        } else {
          oldNoFunction = true;
        }
      }

      oldEndTime = performance.now();
      oldExecutionTime = oldEndTime - oldStartTime;

      const newStartTime = performance.now();
      if (key === 'counting' || key === 'optimizedCounting') {
        fns.algorithms.new[key](data2, true);
      } else if (key === 'radix') {
        fns.algorithms.new[key]('lsd', data2, true);
      } else {
        fns.algorithms.new[key](data2, true, fns.compare);
      }
      const newEndTime = performance.now();
      const newExecutionTime = newEndTime - newStartTime;

      const isNewFaster = oldExecutionTime >= newExecutionTime;
      const result = oldExecutionTime - newExecutionTime;

      console.log(`${chalk.dim('┌─')} ${chalk.bold.dim.cyan('【')} ${chalk.bold.cyan(`${name}`)} ${chalk.bold.dim.cyan('】')}`);

      if (oldNoFunction) {
        console.log(`${chalk.dim('├──')} ${chalk.magenta('algorithms.js')}                      ${chalk.redBright('不存在对应算法 / The corresponding algorithm does not exist.')}`);

        console.log(
          `${chalk.dim('├──')} ${chalk.green('@kwooshung/algorithms')}              ${chalk.greenBright(fns.format.decimal(newExecutionTime))} ${chalk.dim('ms')}   ${tips.length >= 2 ? tips[1] : ''}`
        );

        console.log(`${chalk.dim('└')}                                      ${chalk.bold.greenBright('0')} ${chalk.dim('ms')}\n`);
      } else {
        console.log(
          `${chalk.dim('├──')} ${chalk.magenta('algorithms.js')}                      ${chalk[isNewFaster ? 'redBright' : 'greenBright'](fns.format.decimal(oldExecutionTime))} ${chalk.dim('ms')}   ${
            tips.length ? tips[0] : ''
          }`
        );

        console.log(
          `${chalk.dim('├──')} ${chalk.green('@kwooshung/algorithms')}              ${chalk[isNewFaster ? 'greenBright' : 'redBright'](fns.format.decimal(newExecutionTime))} ${chalk.dim('ms')}   ${
            tips.length >= 2 ? tips[1] : ''
          }`
        );

        console.log(
          `${chalk.dim('└')}                                     ${chalk.bold[isNewFaster ? 'greenBright' : 'redBright'](
            `${isNewFaster ? '-' : '+'}${fns.format.decimal(result < 0 ? Math.abs(result) : result)}`
          )} ${chalk.dim('ms')}\n`
        );
      }
    }
  },
  /**
   * 算法
   */
  algorithms: {
    /**
     * 老算法
     */
    old: {
      quick: algorithmOld.Sorting.quicksort,
      merge: algorithmOld.Sorting.mergeSort,
      heap: algorithmOld.Sorting.heapSort,
      insertion: algorithmOld.Sorting.insertionSort,
      selection: algorithmOld.Sorting.selectionSort,
      shell: algorithmOld.Sorting.shellSort,
      counting: algorithmOld.Sorting.countingSort,
      radix: algorithmOld.Sorting.radixSort,
      bubble: algorithmOld.Sorting.bubbleSort,
      shortBubble: algorithmOld.Sorting.shortBubbleSort
    },
    /**
     * 新算法
     */
    new: {
      quick: sortQuick,
      merge: sortMerge,
      heap: sortHeap,
      insertion: sortInsertion,
      selection: sortSelection,
      shell: sortShell,
      counting: sortCounting,
      optimizedCounting: sortOptimizedCounting,
      radix: sortRadix,
      bubble: sortBubble,
      shortBubble: sortShortBubble,
      tim: sortTim,
      pancake: sortPancake
    }
  }
};

(() => {
  console.clear();

  const count = 1000;
  const datas = fns.speeds.datas(count, 6, 32, 0, 1000000);
  const keyDatas = fns.generate.array(count, 6, 32, 0, 1000000, true);

  fns.speeds.test('快速排序 / Quick Sort', 'quick', datas);
  fns.speeds.test('归并排序 / Merge Sort', 'merge', datas);
  fns.speeds.test('堆排序 / Heap Sort', 'heap', datas);
  fns.speeds.test('插入排序 / Insertion Sort', 'insertion', datas);
  fns.speeds.test('选择排序 / Selection Sort', 'selection', datas);
  fns.speeds.test('希尔排序 / Shell Sort', 'shell', datas);
  fns.speeds.test('计数排序 / Counting Sort', 'counting', datas, [
    [
      '计数排序的优化版本 (Optimized version of counting sort)',
      '1、适用于数组中的元素是对象，且每个对象有一个名为 key 的整数属性 (Suitable for arrays where elements are objects with an integer attribute named key)',
      '2、通过直接使用 key 值作为索引，避免了额外的映射步骤，提高了排序效率 (Uses key values as indices directly, avoiding extra mapping steps and improving efficiency)',
      '3、专门针对具有特定结构的数据进行优化 (Specifically optimized for data with certain structures)',
      ''
    ],
    [
      '与之相比 (In comparison)',
      '1、本函数为更通用的计数排序实现 (This function is a more general implementation of counting sort)',
      '2、由于需要将非数字元素映射为索引，因此效率略低，但它是标准的计数排序 (Efficiency is slightly lower due to the need to map non-numeric elements to indices, However, it is a standard counting sort.)',
      '3、适用于更广泛的数据类型，但牺牲了一些效率 (Applicable to a wider range of data types, but at the expense of some efficiency)',
      `4、${chalk.magenta('其实这个比较不太公平')}，建议参考下一个同类算法的计数排序 (${chalk.magenta(
        'Actually, this comparison is not quite fair'
      )}; refer to the counting sort of the next similar algorithm for a better comparison)`
    ]
  ]);
  fns.speeds.test('计数排序（优化版本） / Optimized Counting Sort', 'optimizedCounting', keyDatas, [
    [
      `有的时候，${chalk.magenta('algorithms.js')} 不能处理某些随机的数据 (Sometimes, ${chalk.magenta('algorithms.js')} can't process certain random data.)`,
      `不知是什么原因导致最终结果为${chalk.magenta('空数组')} (resulting in ${chalk.magenta('empty arrays')} for unknown reasons)`,
      `   这里做一个循环，重新生成数据，${chalk.magenta('直到结果不为空')} (Here, implement a loop to regenerate data ${chalk.magenta('until the result is not empty')})`,
      `   ${chalk.magenta('尝试次数 {0}')} (${chalk.magenta('having tried {0} times.')})`,
      ''
    ]
  ]);
  fns.speeds.test('基数排序 / Radix Sort', 'radix', datas);
  fns.speeds.test('冒泡排序 / Bubble Sort', 'bubble', datas);
  fns.speeds.test('短冒泡排序 / Shout Bubble Sort', 'shortBubble', datas);
  fns.speeds.test('定向排序 / Tim Sort', 'tim', datas);
  fns.speeds.test('煎饼排序 / Pancake Sort', 'pancake', datas);
})();
