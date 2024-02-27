<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-6 text-gray-800">P4P Leaderboard</h1>
      <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
                Name
              </th>
              <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
                Height
              </th>
              <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
                Bodyweight
              </th>
              <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
                Squat (p4p)
              </th>
              <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
                Bench (p4p)
              </th>
              <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
                Deadlift (p4p)
              </th>
              <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
                Total (p4p)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100">
              <td class="border-dashed border-t border-gray-200 px-6 py-3">
                <span class="text-gray-700 text-sm">{{ user.name }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200 px-6 py-3">
                <span class="text-gray-700 text-sm">{{ user.height }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200 px-6 py-3">
                <span class="text-gray-700 text-sm">{{ user.bodyweight }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200 px-6 py-3">
                <span class="text-gray-700 text-sm">{{ calculateP4P(user.squat, user.bodyweight) }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200 px-6 py-3">
                <span class="text-gray-700 text-sm">{{ calculateP4P(user.bench, user.bodyweight) }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200 px-6 py-3">
                <span class="text-gray-700 text-sm">{{ calculateP4P(user.deadlift, user.bodyweight) }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200 px-6 py-3">
                <span class="text-gray-700 text-sm">{{ calculateP4P(user.total, user.bodyweight) }}</span>
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
          { id: 1, name: 'John Doe', height: '6\'0"', bodyweight: 180, squat: 250, bench: 200, deadlift: 300, total: 750 },
          { id: 2, name: 'Jane Doe', height: '5\'8"', bodyweight: 150, squat: 220, bench: 180, deadlift: 280, total: 680 },
          { id: 3, name: 'Bob Smith', height: '5\'11"', bodyweight: 200, squat: 200, bench: 160, deadlift: 260, total: 620 }
          // Add more users as needed
        ]
      };
    },
    methods: {
      calculateP4P(weight, bodyweight) {
        // Calculate pound-for-pound (p4p) score
        return (weight / bodyweight).toFixed(2);
      }
    }
  };
  </script>
  