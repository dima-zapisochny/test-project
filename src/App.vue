<template>
  <router-view v-if="isProductsLoaded" />
</template>

<script>
export default {
  name: 'App',

  async beforeCreate() {
    await this.$store.dispatch('getProducts');
    await this.$store.dispatch('getCategories');
  },

  computed: {
    isProductsLoaded() {
      return this.$store.state.products.length;
    }
  }
}
</script>