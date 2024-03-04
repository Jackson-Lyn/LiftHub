<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96">
      <h1 class="text-2xl font-bold mb-4 text-center">Welcome to LiftHub</h1>
      <div class="space-y-4">
        <div class="flex justify-center">
          <button @click="groupDashboard" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
            Leaderboards
          </button>
        </div>
        <div class="flex justify-center">
          <button @click="soloDashboard" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
            Solo Lifter
          </button>
        </div>
        <div class="flex justify-center">
          <button @click="userProfile" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
            Profile
          </button>
        </div>
        <div class="flex justify-center">
          <button @click="dbTest" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded">
            Test
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../stores/index";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = computed(() => store.state.user);
    const router = useRouter();

    // Redirect host user type to HostDashboard
    if (user.value && user.value.type === 'Host') {
      router.push({ name: "HostDashboard" });
    }

    const groupDashboard = () => {
      router.push({ name: "groupDashboard" });
    };

    const soloDashboard = () => {
      router.push({ name: "soloDashboard" });
    };

    const userProfile = () => {
      router.push({ name: "userProfile" });
    };
    const dbTest = () => {
      router.push({ name: "dbTest" });
    };

    return { userProfile, groupDashboard, user, soloDashboard, dbTest };
  },
};
</script>

<style>
/* add any additional styles here */
</style>