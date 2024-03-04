// userStore.js
import { ref } from "vue";

export const userEmail = ref(null);

export function setUserEmail(userName) {
  userEmail.value = userName;
}

export function clearUserEmail() {
  userEmail.value = null;
}
