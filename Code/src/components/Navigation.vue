<template>
  <header class="bg-rose-600 text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <h1 class="text-white text-2xl font-bold">The LiftHub</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ name: 'Home' }">Home</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'homeDashboard' }">Dashboard</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }">Login</router-link>
        <li v-if="user" class="cursor-pointer">{{ user.email }}</li>
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "../stores/index";
import { computed, onMounted, ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = computed(() => store.state.user);
    const router = useRouter();
    const username = ref(null);

    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Home" });
    };

    const getUsernameFromDatabase = async () => {
      if (user.value && store.state.userEmail) {
        const { data, error } = await supabase
          .from("users")
          .select("username")
          .eq("email", store.state.userEmail)
          .single();

        if (error) {
          console.error("Error fetching username:", error.message);
        } else {
          // Update the user object with the fetched username
          store.methods.setUser({ user: { ...user.value, username: data.username } });
          console.log("Username from database:", data.username);
        }
      }
    };

    onMounted(getUsernameFromDatabase);

    return { logout, user, username };
  },
};
</script>


