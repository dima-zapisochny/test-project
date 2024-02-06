import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        products: [],
        categories: [],
        filteredProducts: [],
        filteredProductsByCategory: [],
        colors: [],
        materials: [],
        rooms: [],
        selectedColors: [],
        selectedMaterials: [],
        selectedRooms: []
    },

    getters: {
        getProductById: state => id => state.products.filter((product) => product.id === id),
    },

    mutations: {
        setProducts: (state, payload) => {
            state.products = payload.products;
        },

        setCategories: (state, payload) => {
            state.categories = payload.categories;
        },

        setFilteredProducts: (state, payload) => {
            state.filteredProducts = payload.products;
        },

        setFilteredProductsByCategory: (state, payload) => {
            state.filteredProductsByCategory = payload.products;
        },

        setColors: (state, payload) => {
            state.colors = payload;
        },

        setMaterials: (state, payload) => {
            state.materials = payload;
        },

        setRooms: (state, payload) => {
            state.rooms = payload;
        },

        setSelectedColors: (state, payload) => {
            state.selectedColors = payload.selectedColors;
        },

        setSelectedMaterials: (state, payload) => {
            state.selectedMaterials = payload.selectedMaterials;
        },

        setSelectedRooms: (state, payload) => {
            state.selectedRooms = payload.selectedRooms;
        }
    },

    actions: {
        getProducts: async ({ commit, dispatch }, payload) => {
            const response = await fetch('../db/products.json');
            const data = await response.json();

            commit('setProducts', data);
            commit('setFilteredProducts', data);
            commit('setFilteredProductsByCategory', data);
            dispatch('getProductsVariants');
        },

        getCategories: async ({ commit }, payload) => {
            const response = await fetch('../db/categories.json');
            const data = await response.json();
            commit('setCategories', data);
        },

        getProductsVariants: ({ commit, state }, payload) => {
            const uniqueColors = [...new Set(state.products.map(product => product.color))];
            const uniqueMaterials = [...new Set(state.products.map(product => product.material))];
            const uniqueRooms = [...new Set(state.products.map(product => product.room))];

            commit('setColors', uniqueColors);
            commit('setMaterials', uniqueMaterials);
            commit('setRooms', uniqueRooms);

        },

        setProducts: ({ commit }, payload) => {
            commit('setProducts', payload);
        },

        setSelectedColors: ({ commit }, payload) => {
            commit('setSelectedColors', payload);
        },

        setSelectedMaterials: ({ commit }, payload) => {
            commit('setSelectedMaterials', payload);
        },

        setSelectedRooms: ({ commit }, payload) => {
            commit('setSelectedRooms', payload);
        },

        filterProductsByCategory: ({ dispatch, commit, state }, payload) => {
            let products = state.products.filter((product) => product.category === payload.category);

            products = products.length ? products : state.products;

            commit('setFilteredProductsByCategory', { products })
            dispatch('filterProducts', { products });
        },

        filterProducts: ({ commit, state }, payload) => {
            if (state.selectedColors.length === 0 && state.selectedMaterials.length === 0 && state.selectedRooms.length === 0) {
                commit('setFilteredProducts', { products: state.filteredProductsByCategory });

                return;
            }

            const products = payload.products.filter(product => {
                return (state.selectedColors.length === 0 || state.selectedColors.includes(product.color)) &&
                    (state.selectedMaterials.length === 0 || state.selectedMaterials.includes(product.material)) &&
                    (state.selectedRooms.length === 0 || state.selectedRooms.includes(product.room));
            });

            commit('setFilteredProducts', { products });
        }
    },
});
