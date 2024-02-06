<template>
  <div class="filter-group">
    <h3 class="filter-group-title"> {{ groupName }} </h3>

    <label v-for="variant in variants" :key="variant" class="filter-checkbox-label">
      <input class="filter-checkbox-input" type="checkbox" :checked="selectedVariants.includes(variant)" :value="variant" @change="updateVariants">
      <span class="filter-checkbox-inner"></span>
      {{ variant }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'FilterGroup',

  props: {
    groupName: {
      type: String,
      required: true
    },

    variants: {
      type: Array,
      required: true
    },

    selectedVariants: {
      type: Array,
      required: true
    }
  },

  methods: {
    updateVariants(event) {
      const variants = this.selectedVariants.includes(event.target.value) ?
          this.selectedVariants.filter((variant) => variant !== event.target.value) :
          [...this.selectedVariants, event.target.value];

      this.$emit('input', variants);
    }
  }
}
</script>

<style scoped>
.filter-group {
  margin-bottom: 20px;
}

.filter-group-title {
  color: #474747;
  margin-bottom: 15px;
}

.filter-checkbox-label {
  display: block;
  margin-bottom: 10px;
}

.filter-checkbox-input {
  position: absolute;
  top: -100px;
  left: -100px;
}

.filter-checkbox-inner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #474747;
  background: transparent no-repeat center;
  cursor: pointer;
}

.filter-checkbox-input:checked + .filter-checkbox-inner {
  border-color: darkred;
  background-color: darkred;
  background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" width="6" height="6"><circle cx="3" cy="3" r="3" fill="%23ffffff"/></svg>');
  background-size: 14px 7px;
}
</style>