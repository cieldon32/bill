## 项目背景

这是一个简单的记账页面，包括账单列表，收入支出的统计，通过月份，分类来过滤列表，以及记一笔帐。 ![](https://cdn-images-1.medium.com/max/1600/1*bBPG8hvyZZwpQY5QKJXM8Q.png)

## 技术方案

### 技术栈

- react16 + typescript
- tailwind css + postCss
  - 不用 ui 框架下最为省力的选择
  - 样式上没有写的很精细化，只是把布局位置完成
- eslint 规则基于 airbnb's，react-app，prettier
- "react-router-dom" for router
- 用 "@huameow/hook-subscription" 来创建 store-hook, 继而管理全局状态
  - 这个是我自己的包，主要是用于创建一个可以共享数据的 hook，且不需要 provider，核心是用 useReducer 实现的，性能上要比 useContext 好很多。action 是遵循 flex standard action
- 用函数工具库 ramda 来转换数据
- "@huameow/utils" 是自己整理的工具库
- jest for unit test （单元测试这次没写）

- 业务逻辑流程图 ![](https://cdn-images-1.medium.com/max/1600/1*pwQ3pPPUtfNUNd4RV8t8OQ.jpeg))

- 数据转换示意图 ![](https://cdn-images-1.medium.com/max/1600/1*MkA1-GXtOcTTI6qI64zR-Q.jpeg)
