<div align="center">

# @kwooshung/algorithm-sorts

![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/kwooshung/algorithm-sorts?labelColor=272e3b&color=00b42A&logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)
![GitHub top language](https://img.shields.io/github/languages/top/kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)
![GitHub pull requests](https://img.shields.io/github/issues-pr/kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)
![GitHub issues](https://img.shields.io/github/issues/kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)
[![NPM Version](https://img.shields.io/npm/v/@kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)](https://www.npmjs.com/package/@kwooshung/algorithm-sorts)
[![Npm.js Downloads/Week](https://img.shields.io/npm/dw/@kwooshung/algorithm-sorts?labelColor=272e3b&labelColor=272e3b&color=165dff&logo=npm)](https://www.npmjs.com/package/@kwooshung/algorithm-sorts)
[![Github CI/CD](https://github.com/kwooshung/algorithm-sorts/actions/workflows/ci.yml/badge.svg)](https://github.com/kwooshung/algorithm-sorts/actions/)
[![codecov](https://codecov.io/gh/kwooshung/algorithm-sorts/graph/badge.svg?token=VVZJE7H0KD)](https://codecov.io/gh/kwooshung/algorithm-sorts)
[![Maintainability](https://api.codeclimate.com/v1/badges/325d0881b1ca19165d35/maintainability)](https://codeclimate.com/github/kwooshung/algorithm-sorts/maintainability/)
[![GitHub License](https://img.shields.io/github/license/kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)](LICENSE)
[![Gitee Repo](https://img.shields.io/badge/gitee-cvlar-165dff?logo=gitee)](https://gitee.com/kwooshung/algorithm-sorts/)
![Github Stars](https://img.shields.io/github/stars/kwooshung/algorithm-sorts?labelColor=272e3b&color=165dff)

<p align="center">
    <a href="README.md">English</a> | 
    <a href="README.zh-CN.md" style="font-weight:700;color:#165dff;text-decoration:underline;">中文</a>
</p>
</div>

# 为什么开发它？

- 开发时，我需要用到算法，我找到了 [algorithms.js](https://github.com/felipernb/algorithms.js) 这个库，它的实现方式非常好，本项目就在 [compare](src/internal/compare/index.ts) [algorithms.js](https://github.com/felipernb/algorithms.js) 的基础略作修改。
- [algorithms.js](https://github.com/felipernb/algorithms.js) 不是通过 `esm` 的规范实现的，而是通过 `commonjs` 的规范实现的，这样就不能使用 `树摇（tree-shaking）` 了，虽然有一些间接的方式实现，但不如直接使用 `esm`规范来的方便。
- [algorithms.js](https://github.com/felipernb/algorithms.js) 已有多年没有维护了，一些算法和实现逻辑使用现代的方式实现会更好。

# 为什么使用它？

- `Typescript` 编写，并进行了单元测试，保证了代码质量，代码覆盖率达到 `100%`；
- 支持 `esm` 和 `commonjs` 规范，`esm` 规范可以直接使用 `树摇（tree-shaking）`，减少打包体积；
- 清晰的注释，包含中英文注释，方便阅读和理解，如下所示；

```ts
/**
 * 短冒泡排序 / Short Bubble Sort
 * @description 短冒泡排序是冒泡排序的一种变体，当在整个排序过程中没有进行任何交换时，该算法会提前停止 / Short bubble sort is a variation of bubble sort that stops early if no swaps are made during the entire sorting process
 * @usageScenario 适用于检测几乎已经排序好的数组 / Suitable for detecting nearly sorted arrays
 * @timeComplexity 最好情况 O(n)，平均和最坏情况 O(n^2) / Best case O(n), average and worst case O(n^2)
 * @param {T[]} array 待排序数组 / Array to be sorted
 * @param {boolean} [modifyOriginal=true] 是否修改原数组 / Whether to modify the original array
 * @param {(a: T, b: T) => number} [compareFunction] 比较函数，定义元素的排序方式 / Comparison function, defines the sorting order of elements
 * @param {boolean} [reverse=false] 是否反转结果 / Whether to reverse the result
 */
```

- 排序算法相比 [algorithms.js](https://github.com/felipernb/algorithms.js) 多了几个，后续会继续添加；
- 大部分情况下，本库算法效率优于 [algorithms.js](https://github.com/felipernb/algorithms.js)，下方有对比图表，您也可以 git clone 本项目，运行 `npm compare` 进行测试；

# 什么时候不要使用它？

就如项目名称而言，你也应该知道，本项目的算法只支持 `排序`，如果你需要其他算法，可以使用 [algorithms.js](https://github.com/felipernb/algorithms.js)

# 效率对比

随机 1000 条数据，字符串长度在 6 到 32 之间，数字在 0 到 1,000,000 之间，对比如下：

| 算法                 | algorithms.js | @kwooshung/algorithm-sorts |      差异      |
| :------------------- | :-----------: | :------------------------: | :------------: |
| 冒泡排序             |  65.0368 ms   |         65.0298 ms         |   -0.0070 ms   |
| 短冒泡排序           | 13251.3260 ms |        128.2500 ms         | -13123.0760 ms |
| 鸡尾酒排序           |       -       |         52.7166 ms         |       -        |
| 计数排序             |       -       |         12.3503 ms         |       -        |
| 计数排序（优化版本） |  33.2357 ms   |         32.6380 ms         |   -0.5977 ms   |
| 堆排序               |   8.3025 ms   |         4.6525 ms          |   -3.6500 ms   |
| 插入排序             |  27.4480 ms   |         27.4331 ms         |   -0.0149 ms   |
| 归并排序             |   2.9167 ms   |         2.5592 ms          |   -0.3575 ms   |
| 煎饼排序             |       -       |         57.7009 ms         |      0 ms      |
| 快速排序             |   3.0599 ms   |         2.6374 ms          |   -0.4225 ms   |
| 基数排序             |   0.2070 ms   |         0.1339 ms          |   -0.0731 ms   |
| 选择排序             |  55.8389 ms   |         55.8000 ms         |   -0.0389 ms   |
| 希尔排序             |   3.1775 ms   |         3.1564 ms          |   -0.0211 ms   |
| 定向排序             |       -       |         6.7950 ms          |       -        |

# 安装

## npm

```bash
npm install @kwooshung/algorithm-sorts
```

## yarn

```bash
yarn add @kwooshung/algorithm-sorts
```

## pnpm

```bash
pnpm add @kwooshung/algorithm-sorts
```

# 使用方法

## 引入

### esm

```ts
import { bubbleSort } from '@kwooshung/algorithm-sorts';
```

### commonjs

```ts
const { bubbleSort } = require('@kwooshung/algorithm-sorts');
```

## 已支持的算法

> 目前已支持如下排序算法，具体使用方法，点击下方排序名称，参考注释和参数即可：

- [&raquo; 冒泡排序](src/sorts/bubble/index.ts)
- [&raquo; 短冒泡排序](src/sorts/bubble/short/index.ts)
- [&raquo; 鸡尾酒排序](src/sorts/cocktail/index.ts)
- [&raquo; 计数排序](src/sorts/counting/index.ts)
- [&raquo; 计数排序（优化版本）](src/sorts/counting/optimized/index.ts)
- [&raquo; 堆排序](src/sorts/heap/index.ts)
- [&raquo; 插入排序](src/sorts/insertion/index.ts)
- [&raquo; 归并排序](src/sorts/merge/index.ts)
- [&raquo; 煎饼排序 ](src/sorts/pancake/index.ts)
- [&raquo; 快速排序](src/sorts/quick/index.ts)
- [&raquo; 基数排序](src/sorts/radix/index.ts)
- [&raquo; 选择排序](src/sorts/selection/index.ts)
- [&raquo; 希尔排序](src/sorts/shell/index.ts)
- [&raquo; 定序排序](src/sorts/tim/index.ts)
