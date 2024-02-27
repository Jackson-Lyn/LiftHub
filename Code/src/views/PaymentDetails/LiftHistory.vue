<template>
	<div class="container mx-auto p-4">
	  <h1 class="text-3xl font-semibold mb-6 text-gray-800">Lift History</h1>
	  <button 
		@click="goBack"
		class="mb-6 bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
	  >
		← Back
	  </button>
	  <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
		<table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
		  <thead>
			<tr class="text-left">
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Exercise Name
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Date
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Sets
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Reps
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Weight (lbs)
			  </th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="lift in lifts" :key="lift.lift_id" class="hover:bg-gray-100">
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ lift.exercise_name }}</span>
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ lift.date }}</span>
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ lift.sets }}</span>
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ lift.reps }}</span>
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ lift.weight }}</span>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>
  </template>
  
  <script>
  import { supabase } from "./../../lib/supabaseClient"; // Use the correct path to your Supabase client
  import store from "./../../stores/index";
  export default {
	data() {
	  return {
		lifts: []
	  };
	},
	methods: {
	  async fetchUserLifts() {
		const userEmail = store.state.user.email;
		try {
		  const currentUser = await store.methods.setRealUser(userEmail);
		  if (!currentUser) {
			throw new Error('User object not found.');
		  }
		  const currentUserID = currentUser.UserID;
		  let { data, error } = await supabase
			.from('LiftHistory')
			.select(`
			  Lift:lift_id (
				exercise_name,
				date,
				sets,
				reps,
				weight
			  )
			`)
			.eq('UserID', currentUserID);
		  if (error) throw new Error('Error fetching lifts: ' + error.message);
  
		  this.lifts = data.map(lift => ({
			exercise_name: lift.Lift.exercise_name,
			date: lift.Lift.date,
			sets: lift.Lift.sets,
			reps: lift.Lift.reps,
			weight: lift.Lift.weight,
			lift_id: lift.Lift.lift_id // Include lift_id to satisfy key requirements for v-for
		  }));
		} catch (e) {
		  console.error(e);
		}
	  },
	  goBack() {
		this.$router.go(-1); // Use Vue Router's go method to navigate back
	  }
	},
	created() {
	  this.fetchUserLifts();
	}
  };
  </script>
  