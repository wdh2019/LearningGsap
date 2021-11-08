<template>
  <div class="container">
    <span>点击猫咪开始演示：猫咪将从相对于父容器的(0,0)移动到(200,200)</span>
    <canvas id="app-canvas"></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Scene from '../Scene'

@Component({
  name: 'GsapTo',
  components: {},
})
export default class Display extends Vue {
  private scene: Scene | null = null
  mounted(): void {
    // 构造 Scene 类（万能的 Scene 类，它实现了本项目中所有关于 PIXI 和 gsap 的逻辑！）
    this.scene = new Scene({
      view: document.getElementById('app-canvas') as HTMLCanvasElement,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      backgroundAlpha: 1,
      resolution: 1,
    },
      'useGsapTo',
    )
  }
  beforeDestroy(): void {
    if (this.scene) {
      this.scene.destroy()
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
#app-canvas {
  width: 100%;
  height: 100%;
}
</style>