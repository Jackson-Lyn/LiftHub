<template>
    <div class="container">
      <h1 class="text-3xl font-semibold mb-6 text-center text-gray-800">1 Rep Max Calculator</h1>
      <div class="mb-4">
        <label for="weight" class="block text-sm font-medium text-gray-600">Weight Lifted (in pounds):</label>
        <input v-model="weight" type="number" id="weight" class="mt-1 p-2 border rounded w-full">
      </div>
      <div class="mb-4">
        <label for="reps" class="block text-sm font-medium text-gray-600">Number of Repetitions:</label>
        <input v-model="reps" type="number" id="reps" class="mt-1 p-2 border rounded w-full">
      </div>
      <button @click="calculateOneRepMax" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Calculate
      </button>
      <div v-if="oneRepMax" class="mt-4">
        <p class="text-center">Your estimated one-rep max is: <strong>{{ oneRepMax }} lbs</strong></p>
        <p class="text-center text-gray-600 mt-2">
            This calculator estimates your one-rep max using Epley's formula. 
            Keep in mind that individual variations may contribute to discrepancies
            between your calculated 1RM and actual 1RM.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        weight: null,
        reps: null,
        oneRepMax: null,
      };
    },
    methods: {
      calculateOneRepMax() {
        if (this.weight && this.reps) {
          // Epley formula: 1RM = weight * (1 + reps / 30)
          const epleyFactor = 1 + this.reps / 30;
          this.oneRepMax = Math.round(this.weight * epleyFactor);
        } else {
          this.oneRepMax = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
  
  /* You can customize the button styles further */
  button {
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #4c51bf; /* Adjust the color as needed */
  }
  </style>
  