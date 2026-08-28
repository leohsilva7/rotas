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
        }
    ],
});
router.beforeEach((from, to) => {
    const {token} = useToken();
    if (token.value === '' && to.meta.requiresAuth) {
        return {name: 'root'};
    }
});
router.afterEach((to) => {
    return (document.title = <string>to.meta.title);
});
export default router
