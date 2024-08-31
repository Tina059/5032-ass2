import { ref } from 'vue';

const isChange = ref(false);
const userRole = ref('');

export function useChange() {
  const login = (role) => {
    isChange.value = true;
    userRole.value = role;
  };

  const logout = () => {
    isChange.value = false;
    userRole.value = '';
  };

  return { isChange, userRole, login, logout };
}