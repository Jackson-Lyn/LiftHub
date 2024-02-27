<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96">
      <!-- <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" /> -->
      <h1 class="text-2xl font-bold mb-4 text-center">Join Group</h1>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div class="flex justify-center">
            <input v-model="joinCode" type="text" placeholder="Join Code" class="w-64 bg-gray-100 p-2 rounded" required>
          </div>
          <div class="flex justify-center">
            <input v-model="username" type="text" placeholder="Username" class="w-64 bg-gray-100 p-2 rounded" required>
          </div>
          <div class="flex justify-center">
            <label for="squat">Squat (lbs):</label>
          </div>
          <div class="flex justify-center">
            <input v-model="squat" type="number" class="w-64 bg-gray-100 p-2 rounded" required>
          </div>
          <div class="flex justify-center">
            <label for="bench">Bench (lbs):</label>
          </div>
          <div class="flex justify-center">
            <input v-model="bench" type="number" class="w-64 bg-gray-100 p-2 rounded" required>
          </div>
          <div class="flex justify-center">
            <label for="deadlift">Deadlift (lbs):</label>
          </div>
          <div class="flex justify-center">
            <input v-model="deadlift" type="number" class="w-64 bg-gray-100 p-2 rounded" required>
          </div>
          <div class="flex justify-center">
            <label for="total">Total (lbs):</label>
          </div>
          <div class="flex justify-center">
            <input v-model="total" type="number" class="w-64 bg-gray-100 p-2 rounded" required>
          </div>
          <!-- Other form fields go here -->
          <div class="flex justify-center">
            <button type="submit" class="w-64 bg-red-500 hover-bg-red-800 text-white font-bold py-4 px-6 rounded">
              Join Group
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import store from "../stores/index";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const joinCode = ref('');
const username = ref('');
const squat = ref(0);
const bench = ref(0);
const deadlift = ref(0);
const total = ref(0);

const router = useRouter();

const submitForm = () => {
  const params = {
    joinCode: joinCode.value,
    username: username.value,
    lifts: {
      squat: squat.value,
      bench: bench.value,
      deadlift: deadlift.value,
      total: total.value,
    }
    // Add other form data as needed
  };
  store.methods.joinGroup(params);
  router.push({
    name: 'GroupDashboard',
    params: params
  });
};
</script>

<style>
/* add any additional styles here */
</style>
