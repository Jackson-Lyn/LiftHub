<template>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white rounded-lg shadow-lg p-8 w-96"> <!-- Adjust the width as per your requirement -->
        <h1 class="text-2xl font-bold mb-4 text-center">Solo Lifter</h1>
        <div class="space-y-4">
          <div class="flex justify-center"> <!-- Center the button -->
            <button @click="liftHistory" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
              Lift History
            </button>
          </div>
          <div class="flex justify-center"> <!-- Center the button -->
            <button @click="progressTracker" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
                Progression Tracker
            </button>
          </div>
          <div class="flex justify-center"> <!-- Center the button -->
            <button @click="oneRepMax" class="w-64 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-6 rounded"> <!-- Set a fixed width for all buttons -->
                1 Rep Max Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import store from "../../stores/index";
  import { computed } from "vue";
  import { supabase } from "../../lib/supabaseClient";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      // Get user from store
      const user = computed(() => store.state.user);
      console.log("User From Store : " + user.value)
  
  
      // Setup ref to router
      const router = useRouter();
      
      // Logout function
      const liftHistory = () => {
        router.push({ name: "liftHistory" });
      };
      const progressTracker = () => {
        router.push({ name: "progressTracker" });
      };
      const oneRepMax = () => {
        router.push({ name: "oneRepMax" });
      };
  
      return { liftHistory, progressTracker, oneRepMax, user };
    },
  };
  </script>
  
  <style>
  /* add any additional styles here */
  </style>
  