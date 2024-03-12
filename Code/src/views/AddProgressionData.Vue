<template>
    <div class="add-progression-data">
      <h2>Add Progression Data</h2>
      <form @submit.prevent="submitProgressionData">
        <div class="form-group">
          <label for="squat">Squat (lbs):</label>
          <input type="number" id="squat" v-model="formData.squat" required>
        </div>
        <div class="form-group">
          <label for="bench">Bench Press (lbs):</label>
          <input type="number" id="bench" v-model="formData.bench" required>
        </div>
        <div class="form-group">
          <label for="deadlift">Deadlift (lbs):</label>
          <input type="number" id="deadlift" v-model="formData.deadlift" required>
        </div>
        <button type="submit">Submit</button>
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
  .add-progression-data {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  </style>
  