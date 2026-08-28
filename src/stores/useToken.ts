import {ref} from "vue";

const token = ref<string>(localStorage.getItem('token') || '');

export function useToken() {
    const saveToken = (tokenString: string): void => {
        token.value = tokenString;
        localStorage.setItem('token', token.value);
    }
    const clearToken = (): void => {
        token.value = '';
        localStorage.removeItem('token');
    }
    return {token, saveToken, clearToken};
}