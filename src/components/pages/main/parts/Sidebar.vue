<template>
  <div class="sidebar" :class="{ 'fixed-sidebar': isFixedSidebar }">
    <div class="filters">
      <h1 class="sidebar-title">Filters</h1>

      <FilterGroup
          group-name="Color"
          :variants="colors"
          :selectedVariants="selectedColors"
          v-model="selectedColors"
      />

      <FilterGroup
          group-name="Material"
          :variants="materials"
          :selected-variants="selectedMaterials"
          v-model="selectedMaterials"
      />

      <FilterGroup
          group-name="Room"
          :variants="rooms"
          :selected-variants="selectedRooms"
          v-model="selectedRooms"
      />
    </div>

    <PrimaryButton
        v-if="isFixedSidebar"
        caption="Close filters"
        class="filters-close-button"
        @click="toggleSidebar"
    />
  </div>
</template>

<script>
import { PrimaryButton, FilterGroup } from '../../../baseComponents';

export default {
  name: 'Sidebar',

  components: {
    PrimaryButton,
    FilterGroup
  },

  props: {
    isFixedSidebar: {
      type: Boolean,
      required: false
    }
  },

  data: () => ({
    selectedColors: [],
    selectedMaterials: [],
    selectedRooms: []
  }),

  mounted() {
    if (this.$route.query.colors || this.$route.query.materials || this.$route.query.rooms) {
      this.selectedColors = this.$route.query.colors ? this.$route.query.colors.split(',') : [];
      this.selectedMaterials = this.$route.query.materials ? this.$route.query.materials.split(',') : [];
      this.selectedRooms = this.$route.query.rooms ? this.$route.query.rooms.split(',') : [];

      this.updateUrl();
    }
  },

  computed: {
    colors() {
      return this.$store.state.colors;
    },

    materials() {
      return this.$store.state.materials;
    },

    rooms() {
      return this.$store.state.rooms;
    }
  },

  watch: {
    selectedColors() {
      this.$store.dispatch('setSelectedColors', {
        selectedColors: this.selectedColors
      });

      this.filterProducts();
    },

    selectedMaterials() {
      this.$store.dispatch('setSelectedMaterials', {
        selectedMaterials: this.selectedMaterials
      });

      this.filterProducts();
    },

    selectedRooms() {
      this.$store.dispatch('setSelectedRooms', {
        selectedRooms: this.selectedRooms
      });

      this.filterProducts();
    },
  },

  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },

    filterProducts() {
      this.updateUrl();

      this.$store.dispatch('filterProducts', {
        products: this.$store.state.filteredProductsByCategory
      });
    },

    updateUrl() {
      const colors = this.selectedColors.length ? `colors=${this.selectedColors.join(',')}&` : '';
      const materials = this.selectedMaterials.length ? `materials=${this.selectedMaterials.join(',')}&` : '';
      const rooms = this.selectedRooms.length ? `rooms=${this.selectedRooms.join(',')}` : '';

      const newUrl = `/?${colors + materials + rooms}`;

      this.$router.replace(newUrl);
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100%;
  background-color: white;
}

.fixed-sidebar {
  z-index: 100;
  position: fixed;
  box-shadow: 1px 0px 10px 0px rgba(0,0,0,0.2);
}

.filters {
  margin: 20px 50px;
}

.filters-close-button {
  width: 100px;
  margin: 20px 80px;
}

.sidebar-title {
  color: #474747;
  margin-bottom: 30px;
}
</style>