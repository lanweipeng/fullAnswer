
## 属性选择器
[attribute]
> 选择所有带 `foo` 属性的元素
```css
[attribute=value]
> 选择 attribute=value 的所有元素。
[foo]{
    background-color:red;
}
```
[attribute~=value]
> 选择 attribute 属性包含单词 value 的所有元素。

```css
[foo~=abc]{
    background-color:red;
}
```
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/4/171ddc840dac5aac~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

[attribute^=value]
> 选择其 attribute 属性值以 value 开头的所有元素。类似正则的 ^,以什么开始
```css
[foo^=abc]{
    background-color:red;
}
```
[attribute$=value]
> 选择其 attribute 属性值以 `value` 结束的所有元素。类似正则的 `$`,以什么结束
```css
[foo$=abc]{
    background-color:red;
}
```
[attribute*=value]
> 选择其 `attribute` 属性中包含 `value` 子串的每个元素。
```css
[foo*=abc]{
    background-color:red;
}
```
[attribute|=value]
> 选择 `attribute` 属性值以 `value` 开头的所有元素。
![截屏2023-11-03 上午11.18.57.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9acab3208a594d01a60016e08eb2d7b3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2380&h=834&s=236257&e=png&b=fdfdfd)
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/4/171dde31d2bcbf12~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)
## 文档结构选择器
### 后代选择器 element element
### 子选择器 element>element
### 相邻兄弟选择器 element+element
```css
h1+p{
    color:red;
}
```
https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/4/171de1c81da895d1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp
### 一般兄弟选择器 element1~element2
> 选择前面有 element1 元素的每个 elem 元素。

![截屏2023-11-03 下午12.12.39.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf926b33898a46029d1aa06c4e5944eb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2394&h=954&s=148764&e=png&b=fdfdfd)



## 通配符
```css
*{

}
```
## 优先级
!important>行内样式>ID选择器>类、伪类、属性>标签、伪元素>通配符

优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

如果存在内联样式，那么 A = 1, 否则 A = 0;
B 的值等于 ID选择器 出现的次数;
C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数;
D 的值等于 标签选择器 和 伪元素 出现的总次数 。
```
li                                  /* (0, 0, 0, 1) */
ul li                               /* (0, 0, 0, 2) */
ul ol+li                            /* (0, 0, 0, 3) */
ul ol+li                            /* (0, 0, 0, 3) */
h1 + *[REL=up]                      /* (0, 0, 1, 1) */
ul ol li.red                        /* (0, 0, 1, 3) */
li.red.level                        /* (0, 0, 2, 1) */
a1.a2.a3.a4.a5.a6.a7.a8.a9.a10.a11  /* (0, 0, 11,0) */
#x34y                               /* (0, 1, 0, 0) */
li:first-child h2 .title            /* (0, 0, 2, 2) */
#nav .selected > a:hover            /* (0, 1, 2, 1) */
html body #nav .selected > a:hover  /* (0, 1, 2, 3) */
```

比较规则是: 从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的

## 参考
- [深入理解CSS选择器优先级](https://juejin.cn/post/6844903709772611592?searchId=202310311440411DD2E20A813CE99ABE54)
- [前端布局必须了解的css选择器](https://juejin.cn/post/6844904147414712334?searchId=20231031140345A122B331298198A7F663)