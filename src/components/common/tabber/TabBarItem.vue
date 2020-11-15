<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>


<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // 用来判断自己是否处于活跃状态
      // 实现点到才变色
      // indexOf() !== -1 表示该路径存在  
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 动态绑定color
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  },
};
</script>


<style scoped>
  @import "../../../assets/css/TabBarItem.css";
</style>