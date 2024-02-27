<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-6 text-gray-800">Progression Tracker</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        class="bg-white rounded-lg shadow p-4"
        v-for="(monthData, index) in progressionData"
        :key="monthData.month"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ monthData.month }}</h2>
          <p class="text-gray-700">{{ monthData.year }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-700 font-semibold">Squat</p>
            <p>{{ monthData.squat }} lbs</p>
          </div>
          <div>
            <p class="text-gray-700 font-semibold">Bench</p>
            <p>{{ monthData.bench }} lbs</p>
          </div>
          <div>
            <p class="text-gray-700 font-semibold">Deadlift</p>
            <p>{{ monthData.deadlift }} lbs</p>
          </div>
        </div>
        <div class="flex justify-between items-center mt-2">
          <div>
            <p class="text-gray-700 font-semibold">Total</p>
            <p>{{ monthData.total }} lbs</p>
          </div>
          <div>
            <p class="text-gray-700 font-semibold">Progression</p>
            <p :class="{'text-green-500': monthData.progress >= 0, 'text-red-500': monthData.progress < 0}">
              {{ monthData.progress.toFixed(2) }}%
            </p>
          </div>
        </div>
        <textarea
          v-model="monthData.note"
          placeholder="Add notes..."
          class="mt-4 p-2 border rounded w-full"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progressionData: [
        {
          month: "January",
          year: 2023,
          squat: 200,
          bench: 150,
          deadlift: 250,
          total: 600,
          progress: 10,
          note: "Great progress this month!",
        },
        {
          month: "February",
          year: 2023,
          squat: 210,
          bench: 155,
          deadlift: 260,
          total: 625,
          progress: -5,
          note: "Struggled a bit, need to adjust training.",
        },
        // Add more months as needed
      ],
    };
  },
};
</script>

<style>
/* Add your styles here */
</style>
