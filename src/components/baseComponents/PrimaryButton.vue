<template>
  <button class="primary-button" @click="$emit('click')">{{ caption }}</button>
</template>

<script>
export default {
  name: 'PrimaryButton',

  props: {
    caption: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.primary-button {
  width: max-content;
  border-radius: 8px;
  border: 1px solid #474747;
  padding: 6px 12px;
  font-size: 10px;
  font-weight: 500;
  font-family: inherit;
  color: #474747;
  background-color: transparent;
  cursor: pointer;
  transition: border-color 0.25s;
}

.primary-button:hover {
  border-color: darkred;
}
</style>