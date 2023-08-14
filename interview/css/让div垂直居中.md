```html
<div class="father">
  <div class="son"></div>
</div>
```

1. 子绝父相

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -(父元素宽度-子元素宽度)/2 px;
  margin-top: -(父元素高度-子元素高度)/2 px;
}
```

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

2.flex

```css
.father {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

3.grid

```css
.father {
  display: grid;
}
.son {
  justify-self: center;
  align-self: center;
}
```

![](4.png)

## 参考内容

[grid 布局-阮一峰](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
