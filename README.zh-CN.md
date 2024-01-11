<div align="center">

# @kwooshung/algorithms-sorts

![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/kwooshung/algorithms-sorts?labelColor=272e3b&color=00b42A&logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)
![GitHub top language](https://img.shields.io/github/languages/top/kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)
![GitHub pull requests](https://img.shields.io/github/issues-pr/kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)
![GitHub issues](https://img.shields.io/github/issues/kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)
[![NPM Version](https://img.shields.io/npm/v/@kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)](https://www.npmjs.com/package/@kwooshung/algorithms-sorts)
[![Npm.js Downloads/Week](https://img.shields.io/npm/dw/@kwooshung/algorithms-sorts?labelColor=272e3b&labelColor=272e3b&color=165dff&logo=npm)](https://www.npmjs.com/package/@kwooshung/algorithms-sorts)
[![Github CI/CD](https://github.com/kwooshung/algorithms-sorts/actions/workflows/ci.yml/badge.svg)](https://github.com/kwooshung/algorithms-sorts/actions/)
[![codecov](https://codecov.io/gh/kwooshung/algorithms-sorts/graph/badge.svg?token=VVZJE7H0KD)](https://codecov.io/gh/kwooshung/algorithms-sorts)
[![Maintainability](https://api.codeclimate.com/v1/badges/325d0881b1ca19165d35/maintainability)](https://codeclimate.com/github/kwooshung/algorithms-sorts/maintainability/)
[![GitHub License](https://img.shields.io/github/license/kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)](LICENSE)
[![Gitee Repo](https://img.shields.io/badge/gitee-cvlar-165dff?logo=gitee)](https://gitee.com/kwooshung/algorithms-sorts/)
![Github Stars](https://img.shields.io/github/stars/kwooshung/algorithms-sorts?labelColor=272e3b&color=165dff)

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
- 清晰的注释，包含中英文注释，方便阅读和理解；
- 排序算法相比 [algorithms.js](https://github.com/felipernb/algorithms.js) 多了几个，后续会继续添加；
- 大部分情况下，本库算法效率优于 [algorithms.js](https://github.com/felipernb/algorithms.js)，下方有对比图表，您也可以 git clone 本项目，运行 `npm compare` 进行测试；

# 什么时候不要使用它？

就如项目名称而言，你也应该知道，本项目的算法只支持 `排序`，如果你需要其他算法，可以使用 [algorithms.js](https://github.com/felipernb/algorithms.js)

# 安装

## npm

```bash
npm install @kwooshung/algorithms-sorts --save-dev
```

## yarn

```bash
yarn add @kwooshung/algorithms-sorts -D
```

## pnpm

```bash
pnpm add @kwooshung/algorithms-sorts -D
```

# 使用
