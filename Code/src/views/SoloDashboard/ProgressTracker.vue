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
import { ref, onMounted } from "vue";
import { supabase } from "../../lib/supabaseClient";
import store from "../../stores/index";

export default {
  setup() {
    const progressionData = ref([]);

    const fetchProgressionData = async (email) => {
      try {
        const { data, error } = await supabase
          .from("progressions")
          .select("*")
          .eq("username", email);

        if (error) {
          console.error("Error fetching progression data:", error.message);
        } else {
          progressionData.value = data.map(entry => ({
            month: entry.month,
            year: entry.year,
            squat: entry.squat || 0,
            bench: entry.bench || 0,
            deadlift: entry.deadlift || 0,
            total: entry.squat + entry.bench + entry.deadlift || 0,
            progress: {
              squat: null,
              bench: null,
              deadlift: null,
              total: null
            },
            note: entry.note || ""
          }));
          calculateProgress();
        }
      } catch (error) {
        console.error("Error fetching progression data:", error.message);
      }
    };

    const calculateProgress = () => {
      for (let i = 1; i < progressionData.value.length; i++) {
        const previousMonth = progressionData.value[i - 1];
        const monthData = progressionData.value[i];
        monthData.progress.squat = calculatePercentageProgress(previousMonth.squat, monthData.squat);
        monthData.progress.bench = calculatePercentageProgress(previousMonth.bench, monthData.bench);
        monthData.progress.deadlift = calculatePercentageProgress(previousMonth.deadlift, monthData.deadlift);
        monthData.progress.total = calculatePercentageProgress(previousMonth.total, monthData.total);
      }
    };

    const calculatePercentageProgress = (previousValue, currentValue) => {
      if (previousValue === null || currentValue === null) {
        return null;
      }
      return ((currentValue - previousValue) / previousValue) * 100;
    };

    onMounted(async () => {
      const userEmail = store.state.user ? store.state.user.email : null;
      if (userEmail) {
        await fetchProgressionData(userEmail);
      }
    });

    return { progressionData };
  },
};
</script>

<style>
/* Add your styles here */
</style>
