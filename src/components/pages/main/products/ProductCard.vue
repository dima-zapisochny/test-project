<template>
  <div class="product-wrapper">
    <div class="product" @click="showProduct(product)">
      <div class="product-photo">
        <img :src="product.img" :alt="product.name">
      </div>
      <p class="product-title">{{ product.name }}</p>
      <p class="product-price">{{ product.price }} $</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    showProduct(product) {
      this.$router.push({ name: 'product', params: { id: product.id } });
    }
  }
}
</script>

<style scoped>
.product-wrapper {
  display: block;
  width: 100%;
  float: left;
  transition: width .2s;
  cursor: pointer;
}

.product {
  display: block;
  position: relative;
  background: #fff;
  margin: 0 20px 20px 0;
  text-decoration: none;
  color: #474747;
  z-index: 0;
  height: 350px;
}

.product-photo {
  position: relative;
  padding-bottom: 70%;
  overflow: hidden;
}

.product-photo img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  transition: transform .4s ease-out;
}

.product:hover .product-photo img {
  transform: scale(1.05);
}

.product p {
  margin: 0 15% 10px 15%;
  text-align: center;
  position: relative;
  line-height: 1.4em;
}

.product-title {
  font-size: 16px;
  font-weight: 700;
}

.product-price {
  font-size: 14px;
  font-weight: 700;
  color: darkred;
}

@media only screen and (min-width: 450px) {
  .product-wrapper {
    width: 50%;
  }
}

@media only screen and (min-width: 768px) {
  .product-wrapper {
    width: 33.333%;
  }
}

@media only screen and (min-width: 1000px) {
  .product-wrapper {
    width: 25%;
  }
}
</style>