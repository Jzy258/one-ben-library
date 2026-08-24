---
title: '01 environments'
---

# 01 environments

`<environments>`：
* 用于定义不同的数据库环境（不同 DBMS、数据库、用户等）
* 包含若个 `<environment>`，每个 `<environment>` 对应一个 `id`
* `default` 属性指定默认使用的环境
* `SqlSessionFactoryBuilder#build` 可以传入字符串参数指定使用何种环境创建 `SqlSessionFactory`

