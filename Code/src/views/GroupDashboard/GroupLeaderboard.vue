<template>
	<div class="container mx-auto p-4">
	  <h1 class="text-3xl font-semibold mb-6 text-gray-800">Leaderboard</h1>
	  <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
		<table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
		  <thead>
			<tr class="text-left">
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Name
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Squat
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Bench
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Deadlift
			  </th>
			  <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
				Total
			  </th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="user in users" :key="user.id" class="hover:bg-gray-100">
      <td class="border-dashed border-t border-gray-200 px-6 py-3">
        <!-- Use router-link to navigate to the userProfile page -->
        <router-link :to="{ name: 'userProfile'}" class="text-blue-500 hover:underline">
          {{ user.name }}
        </router-link>
      </td>
      <td class="border-dashed border-t border-gray-200 px-6 py-3">
        <span class="text-gray-700 text-sm">{{ user.squat }}</span>
      </td>
      <td class="border-dashed border-t border-gray-200 px-6 py-3">
        <span class="text-gray-700 text-sm">{{ user.bench }}</span>
      </td>
      <td class="border-dashed border-t border-gray-200 px-6 py-3">
        <span class="text-gray-700 text-sm">{{ user.deadlift }}</span>
      </td>
      <td class="border-dashed border-t border-gray-200 px-6 py-3">
        <span class="text-gray-700 text-sm">{{ user.total }}</span>
      </td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		users: [
		  { id: 1, name: 'John Doe', squat: 250, bench: 200, deadlift: 300, total: 750 },
		  { id: 2, name: 'Jane Doe', squat: 220, bench: 180, deadlift: 280, total: 680 },
		  { id: 3, name: 'Bob Smith', squat: 200, bench: 160, deadlift: 260, total: 620 }
		  // Add more users as needed
		]
	  };
	}
  };
  </script>
  