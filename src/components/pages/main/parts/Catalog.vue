<template>
  <div class="catalog-wrapper">
    <h1 class="catalog-title">Furniture Catalog</h1>

    <div class="catalog-header">
      <PrimaryButton
          caption="Open filters"
          class="filters-open-button"
          @click="toggleSidebar"
      />

      <ul class="category-list">
        <li class="category-item" :class="{ 'selected-category': selectedCategory === 'All' }" @click="sortByCategory('All')">All</li>
        <li
            v-for="category of this.$store.state.categories"
            class="category-item"
            :class="{ 'selected-category': selectedCategory === category }"
            @click="sortByCategory(category)"
        >
          {{ category }}
        </li>
      </ul>

      <div class="catalog-sort">
        <label class="catalog-sort-text">Sort by:</label>
        <select v-model="sortOrder" class="sort">
          <option value="">Default</option>
          <option value="asc">Low - High Price</option>
          <option value="desc">High - Low Price</option>
        </select>
      </div>
    </div>

    <ProductList
        v-if="sortedProducts.length"
        :products="sortedProducts"
    />

    <EmptyState v-else />
  </div>
</template>

<script>
import { PrimaryButton, EmptyState } from '../../../baseComponents/index.js';
import { ProductList } from '../products/index.js';

export default {
  name: 'Catalog',

  components: {
    PrimaryButton,
    ProductList,
    EmptyState
  },

  data: () => ({
    sortOrder: "",
    selectedCategory: 'All'
  }),

  computed: {
    sortedProducts() {
      const sortedProducts = this.$store.state.filteredProducts;

      if (this.sortOrder === "") return sortedProducts.sort(() => Math.random() - 0.5);

      return sortedProducts.sort((a, b) => {
        return this.sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    }
  },

  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },

    sortByCategory(category) {
      this.selectedCategory = category;

      this.$store.dispatch('filterProductsByCategory', { category });
    }
  }
}
</script>

<style scoped>
.catalog-wrapper {
  width: 100%;
}

.catalog-title {
  color: #474747;
  margin: 20px;
}

.catalog-header {
  height: 40px;
  display: flex;
  margin: 0 40px;
  justify-content: space-between;
  align-items: center;
}

.category-list {
  display: flex;
}

.category-item {
  font-size: 16px;
  margin-left: 20px;
  color: #474747;
  cursor: pointer;
}

.category-item:hover {
  color: darkred;
}

.selected-category {
  color: darkred;
}

.filters-open-button {
  display: none;
}

.catalog-sort {
  display: flex;
  margin-left: 20px;
}

.sort {
  width: 170px;
  height: fit-content;
  background-color: #ffffff;
  border: 1px solid #646464;
  border-radius: 10px;
  font-size: 14px;
  color: #646464;
  padding: 2px 10px;
  outline: none;
}

.catalog-sort-text {
  margin-right: 10px;
  font-size: 14px;
  color: #646464;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .filters-open-button {
    display: flex;
  }

  .catalog-header {
    justify-content: space-between;
  }
}
</style>