<template>
	<div class="container mx-auto p-4">
	  <h1 class="text-3xl font-semibold mb-6 text-gray-800">Leaderboard</h1>
	  <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
		<table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
		  <thead>
			<tr class="text-left">
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Name')">
				Name
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Squat')">
				Squat
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Bench')">
				Bench
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Deadlift')">
				Deadlift
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Total')">
				Total
			  </th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="(user, index) in users" :key="user.Username" :class="getRowClass(index)">
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				{{ user.FirstName + ' ' + user.LastName }}
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ user.Squat }}</span>
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ user.Bench }}</span>
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ user.Deadlift }}</span>
			  </td>
			  <td class="border-dashed border-t border-gray-200 px-6 py-3">
				<span class="text-gray-700 text-sm">{{ calculateTotal(user) }}</span>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>
  </template>
  
  <script>
  import { supabase } from "../../lib/supabaseClient";
  import store from "../../stores/index";
  
  export default {
	data() {
	  return {
		users: [],
		sortDirection: {
		  Name: 'asc',
		  Squat: 'desc',
		  Bench: 'desc',
		  Deadlift: 'desc',
		  Total: 'desc'
		}
	  };
	},
	async created() {
	  // Fetch data from Supabase or another source
	  await this.fetchUserData();
	},
	methods: {
	  async fetchUserData() {
		try {
		  const currentUserEmail = store.state.user ? store.state.user.email : null;
		  if (!currentUserEmail) return;
  
		  // Fetch the Group_ID of the current user
		  const { data: currentUserData, error: currentUserError } = await supabase
			.from("users")
			.select("Group_ID")
			.eq("Username", currentUserEmail)
			.single();
  
		  if (currentUserError) {
			console.error("Error fetching current user's data:", currentUserError.message);
			return;
		  }
  
		  const currentUserGroupID = currentUserData ? currentUserData.Group_ID : null;
  
		  // Fetch users with the same Group_ID
		  const { data, error } = await supabase
			.from("users")
			.select("*")
			.eq("Group_ID", currentUserGroupID);
  
		  if (error) {
			console.error("Error fetching users:", error.message);
		  } else {
			// Sort the users array based on total in descending order initially
			this.users = data.sort((a, b) => this.calculateTotal(b) - this.calculateTotal(a));
		  }
		} catch (error) {
		  console.error("Error fetching user data:", error.message);
		}
	  },
	  calculateTotal(user) {
		return user.Squat + user.Bench + user.Deadlift;
	  },
	  sortBy(field) {
		if (field === 'Total') {
		  this.users.sort((a, b) => {
			if (this.sortDirection[field] === 'asc') {
			  return this.calculateTotal(a) - this.calculateTotal(b);
			} else {
			  return this.calculateTotal(b) - this.calculateTotal(a);
			}
		  });
		} else {
		  this.users.sort((a, b) => {
			if (this.sortDirection[field] === 'asc') {
			  return a[field] - b[field];
			} else {
			  return b[field] - a[field];
			}
		  });
		}
		// Toggle sort direction for the field
		this.sortDirection[field] = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
	  },
	  getRowClass(index) {
		// Add classes based on index to highlight top 3 users
		// if (index === 0) {
		//   return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white';
		// } else if (index === 1) {
		//   return 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-800';
		// } else if (index === 2) {
		//   return 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 text-white';
		// }
		return 'hover:bg-gray-100'; // Default background color
	  }
	}
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  