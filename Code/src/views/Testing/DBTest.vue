<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-6 text-gray-800">Add Progression Data</h1>
    <form @submit.prevent="submitProgressionData" class="max-w-md">
      <div class="mb-4">
        <label for="squat" class="block text-gray-700 font-semibold">Squat (lbs):</label>
        <input type="number" id="squat" v-model="formData.squat" required
               class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
      </div>
      <div class="mb-4">
        <label for="bench" class="block text-gray-700 font-semibold">Bench Press (lbs):</label>
        <input type="number" id="bench" v-model="formData.bench" required
               class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
      </div>
      <div class="mb-4">
        <label for="deadlift" class="block text-gray-700 font-semibold">Deadlift (lbs):</label>
        <input type="number" id="deadlift" v-model="formData.deadlift" required
               class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        squat: null,
        bench: null,
        deadlift: null
      }
    };
  },
  methods: {
    submitProgressionData() {
      // Perform any data validation here
      // Prepare the progression data object
      const progressionData = {
        squat: parseInt(this.formData.squat),
        bench: parseInt(this.formData.bench),
        deadlift: parseInt(this.formData.deadlift),
        // You may include additional fields like username or timestamp if needed
      };

      // Emit an event to the parent component with the progression data
      this.$emit('submit', progressionData);

      // Reset the form after submission
      this.formData = {
        squat: null,
        bench: null,
        deadlift: null
      };
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
