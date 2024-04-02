<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96">
      <h1 class="text-2xl font-bold mb-4 text-center">Join Group</h1>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div class="flex justify-center">
            <input v-model="joinCode" type="text" placeholder="Join Code" class="w-64 bg-gray-100 p-2 rounded" required>
          </div>
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
import store from "../../stores/index";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../lib/supabaseClient';

const joinCode = ref('');
const router = useRouter();

const submitForm = async () => {
  // Fetch user information from the store
  const userEmail = store.state.user.email;

  // Update user's Group_ID with joinCode
  const { error } = await supabase
    .from('users')
    .update({ Group_ID: joinCode.value })
    .eq('Username', userEmail);

  if (error) {
    console.error('Error updating Group_ID:', error.message);
    return;
  }

  // router.push({
  //   name: 'GroupDashboard',
  //   params: { joinCode: joinCode.value }
  // });
};
</script>

<style>
/* add any additional styles here */
</style>
