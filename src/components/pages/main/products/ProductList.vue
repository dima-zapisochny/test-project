<template>
  <div class="product-list">
    <ProductCard
        v-for="product of products"
        :key="product.id"
        :product="product"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',

  components: {
    ProductCard
  },

  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.product-list {
  width: 100%;
  list-style: none;
  margin: 0 -20px 0 0;
  padding: 0;
}
</style>