import * as PIXI from 'pixi.js'
import { PixiPlugin } from 'gsap/PixiPlugin'
import gsap from 'gsap'

import catPng from '@/assets/images/cat.png'


interface SceneProps {
  view: HTMLCanvasElement;
  width: number;
  height: number;
  backgroundColor: number;
  backgroundAlpha: number;
  resolution: number;
}

class Scene {
  private app: PIXI.Application
  private cat: PIXI.Sprite | null = null
  private tween: gsap.core.Timeline | null = null
  constructor(props: SceneProps, private use: string) {
    this.app = new PIXI.Application(props)
    // pixi 和 gsap 互相绑定插件
    gsap.registerPlugin(PixiPlugin)
    PixiPlugin.registerPIXI(PIXI)
    // 加载资源，生成场景
    this.load().then(() => this.init())
  }
  load(): Promise<void> {
    const loader = PIXI.Loader.shared
    // 如果尚未加载，则加载资源
    if (!loader.resources[catPng]) {
      loader.add(catPng, { 
        crossOrigin: 'anonymous',
      })
    }
    // 你可以在这里做 绘制进度条 等操作
    return new Promise(resolve => {
      loader.load(() => {
        resolve(void 0)
      })
    })
  }
  init(): void {
    // 创建一个只可爱的猫咪
    const TextureCache = PIXI.utils.TextureCache
    const texture = TextureCache[catPng]
    this.cat = new PIXI.Sprite(texture)
    this.app.stage.addChild(this.cat)
    // 让猫咪可以被点击
    this.cat.interactive = true
    this.cat.buttonMode = true
    // 监听猫咪的点击事件，展示功能 gsap.timeline()
    if (this.use === 'useGsapTo') {
      this.cat.on('click', this.useGsapTo.bind(this))
    } else if (this.use === 'useGsapTimeline') {
      this.cat.on('click', this.useGsapTimeline.bind(this))
    }
  }
  useGsapTo(): void {
    gsap.to(this.cat, {
      x: 200,
      y: 200,
      ease: 'linear',
      duration: 2,
      onStart: () => {
        // 每一段移动开始回调
        console.log(`Start with position: (${this.cat?.x}, ${this.cat?.x})`)
      },
      onUpdate: () => {
        // 每一段移动开始回调
        console.log(`Updating, cat's current position is (${this.cat?.x}, ${this.cat?.y})`)
      },
      onComplete: () => {
        // 每一段移动完成回调
        console.log(`End with position: {${this.cat?.x}, ${this.cat?.y}}`)
      }, 
    })
  }
  useGsapTimeline(): void {
    // 自定义一些路径点
    const wayPoints = [
      { x: 0, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 0 },
      { x: 0, y: 0 },
    ]
    // 创建一个 gsap 的 timeline
    const timeline = gsap.timeline({
      onComplete: () => { // timeline 总完成回调
        console.log('timeline complete')
      }
    })
    this.tween = timeline
    // 根据这些路径点，移动猫咪
    wayPoints.forEach(item => {
      timeline.to(this.cat, {
        x: item.x,
        y: item.y,
        ease: 'linear',
        duration: 1,
        onStart: () => {
          // 每一段移动开始回调
          console.log(`Start with position: (${item.x}, ${item.y})`)
        },
        onUpdate: () => {
          // 每一段移动开始回调
          console.log(`Updating, cat's current position is (${this.cat?.x}, ${this.cat?.y})`)
        },
        onComplete: () => {
          // 每一段移动完成回调
          console.log(`End with position: {${this.cat?.x}, ${this.cat?.y}}`)
        },
      })
    })
  }
  destroy(): void {
    this.tween?.kill()
    this.app.destroy()
  }
}

export default Scene