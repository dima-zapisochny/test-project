<template>
  <div class="product-page">
    <a class="back-arrow" @click="toMainPage">← Back</a>
    <div class="product-details" v-if="product">
      <img :src="product.img" :alt="product.name" class="product-image">
      <div class="product-info">
        <h2 class="product-info-title">{{ product.name }}</h2>
        <p class="product-info-text">{{ product.description }}</p>
        <p class="product-info-text"><strong>Color:</strong> {{ product.color }}</p>
        <p class="product-info-text"><strong>Material:</strong> {{ product.material }}</p>
        <p class="product-info-text">{{ product.price }} $</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',

  data: () => ({
    product: {}
  }),

  async beforeCreate() {
    await this.$store.dispatch('getProducts');

    this.product = this.$store.state.products.filter((product) => product.id === +this.$route.params.id)[0];
  },

  methods: {
    toMainPage() {
      this.$router.push({ name: 'main' });
    }
  }
};
</script>

<style scoped>
.product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.back-arrow {
  text-decoration: none;
  cursor: pointer;
  color: darkred;
  font-size: 18px;
  margin-bottom: 20px;
  display: inline-block;
}

.product-details {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.product-info {
  text-align: center;
}

.product-info-title {
  margin-bottom: 20px;
}

.product-info-text {
  margin-bottom: 10px;
}

.product-info-text:last-of-type {
  font-weight: 700;
  color: darkred;
}
</style>
