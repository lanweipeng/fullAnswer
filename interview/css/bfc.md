## 定义

块级格式上下文(block format context),相当于一个独立容器，让里面的元素和外部的元素互不影响

## 创建 bfc

- html 根元素
- float 浮动
- 绝对定位
- overflow 不为 visible
- display 为表格布局或者弹性布局

## bfc 的作用

1. 清除浮动
2. 防止同一 bfc 容器中的相邻元素间的外边距重叠问题
