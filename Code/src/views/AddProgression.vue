<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-6 text-gray-800">Add Progression Data</h1>
  
      <form @submit.prevent="saveProgressionData" class="max-w-md">
        <div class="mb-4">
          <label for="squat" class="block text-gray-700 font-semibold">Squat (lbs):</label>
          <input type="number" id="squat" v-model="progressionData.squat" required
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="bench" class="block text-gray-700 font-semibold">Bench Press (lbs):</label>
          <input type="number" id="bench" v-model="progressionData.bench" required
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="deadlift" class="block text-gray-700 font-semibold">Deadlift (lbs):</label>
          <input type="number" id="deadlift" v-model="progressionData.deadlift" required
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="month" class="block text-gray-700 font-semibold">Month:</label>
          <input type="text" id="month" v-model="progressionData.month" required
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="notes" class="block text-gray-700 font-semibold">Notes:</label>
          <textarea id="notes" v-model="progressionData.note"
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { supabase } from "./../lib/supabaseClient";
  import store from "./../stores/index";
  
  export default {
    setup() {
      const userEmail = store.state.user.email;
  
      const progressionData = ref({
        squat: null,
        bench: null,
        deadlift: null,
        month: null,
        note: null
      });
  
      const saveProgressionData = async () => {
        try {
          const { data, error } = await supabase
            .from("progressions")
            .insert([
              {
                squat: progressionData.value.squat,
                bench: progressionData.value.bench,
                deadlift: progressionData.value.deadlift,
                month: progressionData.value.month,
                year: new Date().getFullYear(), // Assuming current year for simplicity
                note: progressionData.value.note,
                username: userEmail
              }
            ]);
  
          if (error) {
            console.error('Error inserting progression data:', error.message);
            throw new Error("Error inserting progression data.");
          } else {
            console.log('Progression data inserted successfully!');
            // Reset the form after successful submission
            progressionData.value = {
              squat: null,
              bench: null,
              deadlift: null,
              month: null,
              note: null
            };
          }
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };
  
      return { progressionData, saveProgressionData };
    },
  };
  </script>
  