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
    <a href="README.zh-CN.md">中文</a> | 
    <a href="README.md" style="font-weight:700;color:#165dff;text-decoration:underline;">English</a>
</p>
</div>

# Why was it developed?

- During development, I needed to use algorithms and found the [algorithms.js](https://github.com/felipernb/algorithms.js) library. Its implementation is excellent. This project is based on [algorithms.js](https://github.com/felipernb/algorithms.js), with slight modifications in the [compare](src/internal/compare/index.ts) section.
- [algorithms.js](https://github.com/felipernb/algorithms.js) is implemented using the `commonjs` standard, not `esm`. This means it can't utilize `tree shaking`. While there are indirect methods to achieve this, they are not as convenient as using the `esm` standard directly.
- [algorithms.js](https://github.com/felipernb/algorithms.js) hasn't been maintained for several years. Some algorithms and implementation logic would be better with a modern approach.

# Why Use It?

- Written in `Typescript` with unit testing, ensuring code quality with `100%` coverage.
- Supports both `esm` and `commonjs` standards. The `esm` standard enables direct use of `tree shaking` to reduce the bundle size.
- Clear documentation, including comments in both Chinese and English, making it easy to read and understand, as shown below.

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

- Compared to [algorithms.js](https://github.com/felipernb/algorithms.js), our sorting algorithms include several additional ones, with more to be added in the future.
- In most cases, the efficiency of our library's algorithms is superior to [algorithms.js](https://github.com/felipernb/algorithms.js). There are comparative charts below, and you can also `git clone` this project and run `npm compare` for testing.

# When Not to Use It?

As the project name suggests, our project's algorithms only support `sorting`. If you need other types of algorithms, you might want to use [algorithms.js](https://github.com/felipernb/algorithms.js).

# Efficiency Comparison

The comparison involves random data of 1000 items, with string lengths varying from 6 to 32 and numbers ranging from 0 to 1,000,000, as shown below:

| Algorithm               | algorithms.js | @kwooshung/algorithm-sorts |   Difference   |
| :---------------------- | :-----------: | :------------------------: | :------------: |
| Bubble Sort             |  65.0368 ms   |         65.0298 ms         |   -0.0070 ms   |
| Shout Bubble Sort       | 13251.3260 ms |        128.2500 ms         | -13123.0760 ms |
| Cocktail Sort           |       -       |         52.7166 ms         |       -        |
| Counting Sort           |       -       |         12.3503 ms         |       -        |
| Optimized Counting Sort |  33.2357 ms   |         32.6380 ms         |   -0.5977 ms   |
| Heap Sort               |   8.3025 ms   |         4.6525 ms          |   -3.6500 ms   |
| Insertion Sort          |  27.4480 ms   |         27.4331 ms         |   -0.0149 ms   |
| Merge Sort              |   2.9167 ms   |         2.5592 ms          |   -0.3575 ms   |
| Pancake Sort            |       -       |         57.7009 ms         |      0 ms      |
| Quick Sort              |   3.0599 ms   |         2.6374 ms          |   -0.4225 ms   |
| Radix Sort              |   0.2070 ms   |         0.1339 ms          |   -0.0731 ms   |
| Selection Sort          |  55.8389 ms   |         55.8000 ms         |   -0.0389 ms   |
| Shell Sort              |   3.1775 ms   |         3.1564 ms          |   -0.0211 ms   |
| Tim Sort                |       -       |         6.7950 ms          |       -        |

# Install

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

# Usage

## Importing

### esm

```ts
import { bubbleSort } from '@kwooshung/algorithm-sorts';
```

### commonjs

```ts
const { bubbleSort } = require('@kwooshung/algorithm-sorts');
```

## Supported Algorithms

> Currently, the following sorting algorithms are supported. For specific usage instructions, click on the sorting algorithm names below and refer to the comments and parameters:

- [&raquo; Bubble Sort](src/sorts/bubble/index.ts)
- [&raquo; Short Bubble Sort](src/sorts/bubble/short/index.ts)
- [&raquo; Cocktail Sort](src/sorts/cocktail/index.ts)
- [&raquo; Counting Sort](src/sorts/counting/index.ts)
- [&raquo; Counting Sort (Optimized Version)](src/sorts/counting/optimized/index.ts)
- [&raquo; Heap Sort](src/sorts/heap/index.ts)
- [&raquo; Insertion Sort](src/sorts/insertion/index.ts)
- [&raquo; Merge Sort](src/sorts/merge/index.ts)
- [&raquo; Pancake Sorting](src/sorts/pancake/index.ts)
- [&raquo; Quick Sort](src/sorts/quick/index.ts)
- [&raquo; Radix Sort](src/sorts/radix/index.ts)
- [&raquo; Selection Sort](src/sorts/selection/index.ts)
- [&raquo; Shell Sort](src/sorts/shell/index.ts)
- [&raquo; Tim Sort](src/sorts/tim/index.ts)
