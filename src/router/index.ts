import {createRouter, createWebHistory} from 'vue-router'
import {useToken} from "@/stores/useToken.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: {
                title: 'Login',
                requiresAuth: false
            }
        },
        {
            path: '/produtos',
            name: 'products',
            component: () => import('../views/ProductsView.vue'),
            meta: {
                title: 'Listagem de Produtos',
                requiresAuth: true,
            }
        }
    ],
});
router.beforeEach((to, from) => {
    const {token} = useToken();
    if (!token.value && to.meta.requiresAuth) {
        return {name: 'login'};
    }
});
router.afterEach((to) => {
    return (document.title = <string>to.meta.title);
});
export default router
