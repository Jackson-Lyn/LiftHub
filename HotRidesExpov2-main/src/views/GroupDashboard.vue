<template>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white rounded-lg shadow-lg p-8 w-96"> <!-- Adjust the width as per your requirement -->
        <h1 class="text-2xl font-bold mb-4 text-center">View or Join</h1>
        <div class="space-y-4">
          <div class="flex justify-center"> <!-- Center the button -->
            <button @click="joinGroup" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
              Join
            </button>
          </div>
          <div class="flex justify-center"> <!-- Center the button -->
            <button @click="groupLeaderboard" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
                View Current Group
            </button>
          </div>
          <div class="flex justify-center"> <!-- Center the button -->
            <button @click="p4pLeaderboard" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
                View P4P Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import store from "../stores/index";
  import { computed } from "vue";
  import { supabase } from "../lib/supabaseClient";
  import { useRouter } from "vue-router";
import P4PLeaderboard from "./P4PLeaderboard.vue";
  export default {
    setup() {
      // Get user from store
      const user = computed(() => store.state.user);
      console.log("User From Store : " + user.value)
  
  
      // Setup ref to router
      const router = useRouter();
      
      // Logout function
      const joinGroup = () => {
        router.push({ name: "joinGroup" });
      };
      const p4pLeaderboard = () => {
        router.push({ name: "p4pLeaderboard" });
      };
      // groupLeaderboard
      const groupLeaderboard = () => {
        router.push({ name: "groupLeaderboard" });
      };
      return { p4pLeaderboard,joinGroup,groupLeaderboard, user };
    },
  };
  </script>
  
  <style>
  /* add any additional styles here */
  </style>
  