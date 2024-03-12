<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-6 text-gray-800">Progress Tracker</h1>
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
            <p>
              {{ monthData.squat }} lbs
              <span
                v-if="monthData.progress.squat !== null"
                :class="{'text-green-500': monthData.progress.squat >= 0, 'text-red-500': monthData.progress.squat < 0}"
              >
                ({{ monthData.progress.squat.toFixed(2) }}%)
              </span>
            </p>
          </div>
          <div>
            <p class="text-gray-700 font-semibold">Bench</p>
            <p>
              {{ monthData.bench }} lbs
              <span
                v-if="monthData.progress.bench !== null"
                :class="{'text-green-500': monthData.progress.bench >= 0, 'text-red-500': monthData.progress.bench < 0}"
              >
                ({{ monthData.progress.bench.toFixed(2) }}%)
              </span>
            </p>
          </div>
          <div>
            <p class="text-gray-700 font-semibold">Deadlift</p>
            <p>
              {{ monthData.deadlift }} lbs
              <span
                v-if="monthData.progress.deadlift !== null"
                :class="{'text-green-500': monthData.progress.deadlift >= 0, 'text-red-500': monthData.progress.deadlift < 0}"
              >
                ({{ monthData.progress.deadlift.toFixed(2) }}%)
              </span>
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center mt-2">
          <div>
            <p class="text-gray-700 font-semibold">Total</p>
            <p>
              {{ monthData.total }} lbs
              <span
                v-if="monthData.progress.total !== null"
                :class="{'text-green-500': monthData.progress.total >= 0, 'text-red-500': monthData.progress.total < 0}"
              >
                ({{ monthData.progress.total.toFixed(2) }}%)
              </span>
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
          progress: {
            squat: null,
            bench: null,
            deadlift: null,
            total: null
          },
          note: "First month, no progress yet",
        },
        {
          month: "February",
          year: 2023,
          squat: 210,
          bench: 155,
          deadlift: 260,
          total: 625,
          progress: {
            squat: null,
            bench: null,
            deadlift: null,
            total: null
          },
          note: "Progress from January to February",
        },
        {
          month: "March",
          year: 2023,
          squat: 220,
          bench: 160,
          deadlift: 270,
          total: 650,
          progress: {
            squat: null,
            bench: null,
            deadlift: null,
            total: null
          },
          note: "Progress from February to March",
        },
        // Add more months as needed
      ],
    };
  },
  methods: {
    calculateProgress() {
      for (let i = 1; i < this.progressionData.length; i++) {
        const previousMonth = this.progressionData[i - 1];
        const monthData = this.progressionData[i];
        monthData.progress.squat = this.calculatePercentageProgress(previousMonth.squat, monthData.squat);
        monthData.progress.bench = this.calculatePercentageProgress(previousMonth.bench, monthData.bench);
        monthData.progress.deadlift = this.calculatePercentageProgress(previousMonth.deadlift, monthData.deadlift);
        monthData.progress.total = this.calculatePercentageProgress(previousMonth.total, monthData.total);
      }
    },
    calculatePercentageProgress(previousValue, currentValue) {
      if (previousValue === null || currentValue === null) {
        return null;
      }
      return ((currentValue - previousValue) / previousValue) * 100;
    },
  },
  created() {
    this.calculateProgress();
  },
};
</script>

<style>
/* Add your styles here */
</style>
