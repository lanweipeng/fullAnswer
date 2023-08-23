## 定义

块级格式上下文(block format context)是页面一块独立的渲染区域，具有一套独立的渲染规则

- 内部的盒子会在垂直的方向上一个接一个地放置
- 同一个bfc内部相邻的盒子margin会发生重叠，与方向无关
- 每个元素的左外边距和包含块的左边界相接触（从左到右），即使浮动元素也是如此（bfc的子元素不会超出包含块，但绝对定位可以）
- 清除浮动只能清除同一BFC在它前面的元素的浮动
- BFC就是页面上的一个隔离的独立容器，里面的元素和外部的元素互不影响
- 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算；
- bfc的区域不会与float的元素区域重叠
目的是为了形成一个相对于外界完全独立的空间，让里面的元素和外部的元素互不影响
## 如何创建 bfc

- html 根元素
- 浮动 float不为none
- 绝对定位 position为absolute/fixed
- 行内块元素 display为inline-block
- overflow 不为 visible或者clip(auto/hidden)
- diplay为flow-root
- 弹性元素 display为flex或flex-inline
- 表格单元格 display为table-cell
- 表格标题 display为table-caption
- 匿名表格单元格元素 display为table、table-row、table-row-gr藕片、table-header-group、table-footer-group、inline-table
- contain的值为layout、content、paint
- 网格元素 display为grid或grid-inline
- 多列容器column-count或column-width值不为auto，且含有column-count：1的元素
- column-span值为all的元素会创建一个新的格式化上下文，即使该元素没有包裹在一个多列容器中

## bfc 的作用

1. 清除内部或者外部的浮动
2. 防止同一 bfc 容器中的相邻元素间的外边距重叠问题
## 使用场景
1. 高度坍塌（内部浮动导致的问题）
```html
<style>
    .father{
      background-color:red;
      /* 解决 */
      /* display:flow-root */
      /* overflow:auto */
    }
    .son1{
      background-color: blue;
      width: 100px;
      height: 200px;
      float: left;

    }
    .son2{
      background-color: green;
      width: 200px;
      height: 100px;
    }
  </style>
</head>
<body>
  <div class="father">
    <div class="son1"></div>
    <div class="son2"></div>
  </div>
</body>
```

![截屏2023-08-19 下午11.06.19.png](https://upload-images.jianshu.io/upload_images/11739051-888f144c6da8f610.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 外边距折叠
3. 外边距合并
4. 三栏布局
```html
<html>
	<style type="text/css">
  .left{
    float: left;
    width: 200px;
    height: 100px;
    background-color: green;
  }  
 .right{
    float: right;
    width: 200px;
    height: 100px;
    background-color: pink;
  }
  .center{
    overflow: hidden;
    /* 如果不写，center的width和wrapper的width一样 */
    height: 100px;
    background-color: yellow;
  }
  </style>
	</head>
	<body>
       <div class="wrapper">
            <div class="left"></div>
            <div class="right"></div>
            <div class="center"></div>
    </div>
	</body>
</html>

```
![截屏2023-08-20 上午3.00.23.png](https://upload-images.jianshu.io/upload_images/11739051-dd6ef9863d7b155c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 参考链接
[b站：面试官：你知道BFC吗？](https://www.bilibili.com/video/BV1Bd4y1e7od/?spm_id_from=333.337.search-card.all.click&vd_source=1717bca8aebff18ca2591bd114c54e3f)视频制作非常棒
[MDN bfc](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)