<template>
	<div class="min-h-screen flex flex-col">
	  <div class="flex justify-between p-4">
		<button @click="goBack" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Back</button>
	  </div>
	  <div class="flex justify-center flex-grow">
		<div class="bg-white shadow-md rounded-lg w-full max-w-4xl p-4">
		  <div class="flex justify-between mb-6">
			<h1 class="text-3xl font-semibold text-gray-800">{{ user.name }}</h1>
			<span class="text-sm text-gray-500">Joined on {{ user.joinDate }}</span>
		  </div>
		  <div class="flex space-x-6 mb-4">
			<div>
			  <p class="text-gray-700 font-semibold">Height</p>
			  <p>{{ user.height }} inches</p>
			</div>
			<div>
			  <p class="text-gray-700 font-semibold">Weight</p>
			  <p>{{ user.weight }} lbs</p>
			</div>
		  </div>
		  <table class="min-w-full">
			<thead class="bg-gray-100">
			  <tr>
				<th class="text-left px-4 py-2">Exercise</th>
				<th class="text-left px-4 py-2">Personal Best</th>
			  </tr>
			</thead>
			<tbody>
			  <tr v-for="(lift, index) in lifts" :key="index" class="border-t">
				<td class="px-4 py-2">{{ lift.exercise }}</td>
				<td class="px-4 py-2">{{ lift.personalBest }} lbs</td>
			  </tr>
			</tbody>
		  </table>
		  <div v-if="lifts.length === 0" class="text-center py-4">
			No lift history found.
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import { computed, ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
	setup() {
	  const user = computed(() => ({
		name: "John Doe",
		height: 72, // in inches
		weight: 180, // in lbs
		joinDate: "2023-01-01", // replace with the actual join date from your database
	  }));
  
	  const lifts = ref([
		{ exercise: 'Squat', personalBest: 300 },
		{ exercise: 'Bench Press', personalBest: 200 },
		{ exercise: 'Deadlift', personalBest: 350 },
		// Add more lifts as needed
	  ]);
  
	  const router = useRouter();
  
	  onMounted(() => {
		// Fetch user's lift history from the database (replace with actual fetching logic)
		// For demonstration, using mock data
		fetchLiftHistory();
	  });
  
	  const fetchLiftHistory = async () => {
		// Fetch lift history from the database (replace with actual fetching logic)
		// For demonstration, using mock data
		lifts.value = [
		  { exercise: 'Squat', personalBest: 300 },
		  { exercise: 'Bench Press', personalBest: 200 },
		  { exercise: 'Deadlift', personalBest: 350 },
		  // Add more lifts as needed
		];
	  };
  
	  const goBack = () => {
		router.go(-1);
	  };
  
	  return {
		user,
		lifts,
		goBack,
	  };
	},
  };
  </script>
  