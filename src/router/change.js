import { ref } from 'vue';

const isChange = ref(false);

export function useChange() {
    const login = () => {
        isChange.value = true;
    };

    const logout = () => {
        isChange.value = false;
    };

    return { isChange, login, logout };
}