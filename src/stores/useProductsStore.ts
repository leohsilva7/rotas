import {ref} from "vue";

const products = ref<Array<any>>([]);

export function useProductsStore() {
    const saveProduct = (newProduct: object): void => {
        products.value.push(newProduct);
    }
    return {products, saveProduct}
}