import Vue from 'vue'
import VueRouter from 'vue-router'
import { MainPage, ProductPage } from '../components/pages'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
        props: route => ({
            colors: route.query.colors ? route.query.colors.split(',') : [],
            materials: route.query.materials ? route.query.materials.split(',') : [],
            rooms: route.query.rooms ? route.query.rooms.split(',') : []
        })
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ProductPage
    }
]

export const router = new VueRouter({
    mode: 'history',
    routes
})