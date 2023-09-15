## transition（过度）
```css
transition: transition-property transition-duration transitino-timing-function transition-delay
```
包含四个属性
transition-property:执行变换的属性
transition-duration：变换延续的时间
transitino-timing-function：在延续的时间段变换的速率变化
transition-delay：变换延迟时间
### transitino-timing-function具体值
- linear
缺点：
- 不能重复
- height：auto不会产生动画效果
- 不支持所有的属性
### 支持的属性
- background-color
- background-position
- border-color
- border-width
- border-spacing
- bottom
- clip
- color
- font-size
- font-weight
- height
- left
- letter-spacing
- line-height
- margin
- max-height
- max-width
- min-height
- min-width


## animation
keyframes规则用于定义动画的每个阶段。通过keyframe规则，可以指定动画的每个关键帧。
```css
@keyframes example{
  0%   {left: 0; top:0px;}
  50%  {left:200px; top:200px;}
  100% {left: 0px; top:0px;}
}
div {
  animation-name: example;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction:alternate;
	animation-play-state:running;
}
```
### 详细属性
- animation-name:指定应用的动画名称
- animation-duration：指定动画的持续时间
- animation-timing-function：指定动画的速度曲线
- animation-delay: 指定动画开始之前的延长时间
- animation-interation-count: 指定动画应该重复的速度
- animation-direction: 指定动画的方向
- animation-fill-mode: 指定动画在执行之前和之后如何应用样式
- animation-play-state：指定动画运行或暂停
## transform(变换)
### 旋转

2D
transform:rotate(angle)顺时针
3D
![](https://pics5.baidu.com/feed/9c16fdfaaf51f3de264bf59066936413382979d7.jpeg@f_auto?token=cf90bea4f4adee9a9aee573d937c4270)
transform:
- rotate(x,y,z,angle)
x轴y轴z轴
angle:旋转角度
- rotateX(angle)
- rotateY(angle)
- rotateZ(angle)
### 缩放
2D
transform:scale(x,y)
3D
transform:scale3D(x,y,z)
scaleX()
scaleY()
scaleZ()
### 倾斜
stransform:skew(x)
stransform:skew(x,y)
### 移动
transform:translate(x)
transform:translate(x,y)
transform:translate(x,y,z)
transform:translateX()
transform:translateY()
transform:translateZ()
## 参考
- [CSS3 过渡和动画：transition 和 animation 使用解析](https://juejin.cn/post/7221711920511156279?searchId=202309091526353C4BFC49C0D34385A3C7)
- [快来看看：CSS3实现动画的三种方式](https://baijiahao.baidu.com/s?id=1773263178381107241&wfr=spider&for=pc)