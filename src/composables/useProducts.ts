import {useProductsStore} from "@/stores/useProductsStore.ts";
import {onUnmounted, ref} from "vue";

const {products, saveProduct} = useProductsStore()

export function useProducts() {
    const loading = ref<boolean>(false);
    const message = ref<string>('');
    let isActive = <boolean>true;
    const baseUrl = <string>'https://fakestoreapi.com/products';
    const getProducts = async (): Promise<void> => {
        try {
            loading.value = true;
            const res = await fetch(baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (res.status !== 200) {
                message.value = 'Erro ao buscar dados na API';
                return;
            }
            products.value = await res.json();
        } finally {
            loading.value = false;
        }
    }
    onUnmounted(() => {
        isActive = false;
    });
    return {getProducts, loading, message};
}