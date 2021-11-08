# Gsap

2021/11/8



## 说明

本教程将 gsap 结合 Pixi。只讲解并演示 2 个主要方法：`gsap.to()`和`gsap.timeline()`。
官网：https://greensock.com/#



## 安装

安装 gsap 的 npm 包

```bash
npm install gsap --save
```

如果你不记得 Pixi 的 npm 包，如下：

```bash
npm install pixi.js --save
```



## 和 Pixi 结合

Gsap 如果需要和 Pixi 结合，需要互相绑定插件，如下：

```typescript
import { PixiPlugin } from 'gsap/PixiPlugin'
import gsap from 'gsap'

...

// 绑定插件
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
```





## gsap.to()

`gsap.to()`方法的定义：

```
function gsap.to(targets: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween
```

`gsap.to()`接收2个参数：

- 要执行动画的对象（主要是 Pixi.Sprite 实例）
- 动画的参数，列出几个常用的：
  - `x`：动画终点的x坐标（相对于父容器）。
  - `y`：动画终点的y坐标（相对于父容器）。
  - `ease`：过渡效果，如`'linear'`。
  - `duration`：动画持续时间，单位（秒）。
  - `onStart`：动画开始时的回调函数。
  - `onUpdate`：动画进行时的回调函数。
  - `onComplete`：动画完成时的回调函数。

`gsap.to()`的示例：

```typescript
gsap.to(".class", {x: 100});
```



## gsap.timeline()

`gsap.timeline()`方法的定义：

```typescript
function gsap.timeline(vars?: gsap.TimelineVars | undefined): gsap.core.Timeline
```

`gsap.timeline()`可以接收1个参数：

- 针对 timeline 对象的参数，如 `onComplete`指定 timeline 对象执行完一系列动画后，最终完成的回调函数。

`gsap.timeline()`的示例：

```typescript
const timeline = gsap.timeline({
  onComplete: () => { // timeline 总完成回调
  	console.log('timeline complete')
  }
})
```



`timeline.to()`方法的定义：

```typescript
(method) gsap.core.Timeline.to(targets: gsap.TweenTarget, vars: gsap.TweenVars, position?: gsap.Position | undefined): gsap.core.Timeline
```

`timeline.to()`主要接收2个参数：

- 执行该段动画的对象
- 该段动画的参数

`timeline.to()`的示例：

```typescript
// tl 是通过调用 gsap.timeline() 生成的 gsap.core.Timeline 类实例
tl.to(".class", {x: 100}, 1); 
```

和`gsap.to()`很像。唯一的区别在于，它是 gsap.core.Timeline 实例调用的方法。

**你可以多次调用该方法，Timeline 实例将 多段动画 按其调用的顺序 执行**。



## demo

https://github.com/wdh2019/LearningGsap
