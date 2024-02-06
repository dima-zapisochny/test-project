<template>
  <div class="main-page">
    <Sidebar
        v-if="isSidebarOpen"
        :is-fixed-sidebar="isLowResolutionSettings"
        @toggleSidebar="toggleSidebar"
    />

    <Catalog
        :isLowResolutionSettings="isLowResolutionSettings"
        @toggleSidebar="toggleSidebar"
    />

    <div v-if="isShowOverlay" class="page-overlay" @click="toggleSidebar" ></div>
  </div>
</template>

<script>
import { Catalog, Sidebar } from './parts';

export default {
  name: 'MainPage',

  components: {
    Sidebar,
    Catalog
  },

  data: () => ({
    windowWidth: window.innerWidth,
    isShowSidebar: false
  }),

  beforeCreate() {
    window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
  },

  computed: {
    isLowResolutionSettings() {
      return this.windowWidth < 768;
    },

    isSidebarOpen() {
      return this.isShowSidebar || !this.isLowResolutionSettings;
    },

    isShowOverlay() {
      return this.isLowResolutionSettings && this.isSidebarOpen;
    }
  },

  methods: {
    toggleSidebar() {
      this.isShowSidebar = !this.isShowSidebar;
    }
  }
};
</script>

<style scoped>
.main-page {
  display: flex;
}

.page-overlay {
  z-index: 99;
  position: fixed;
  width: 100%;
  min-height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  opacity: .7;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>