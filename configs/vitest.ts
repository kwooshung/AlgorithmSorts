/**
 * 测试配置
 */
const configTest = {
  globals: true,
  include: ['src/sorts/**/*.test.ts', 'src/internal/**/*.test.ts'],
  exclude: ['**/node_modules/**', '**/dist/**'],
  coverage: {
    include: ['src/sorts/**/*.ts', 'src/internal/**/*.ts'],
    exclude: ['src/internal/generate/index.ts']
  }
};

export default configTest;
