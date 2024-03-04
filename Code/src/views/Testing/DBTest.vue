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
          <tr v-for="user in users" :key="user.Username" class="hover:bg-gray-100">
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

export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    // Fetch data from Supabase or another source
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*');

        if (error) {
          console.error('Error fetching user data:', error.message);
        } else {
          this.users = data;
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    },
    calculateTotal(user) {
      return user.Squat + user.Bench + user.Deadlift;
    }
  }
};
</script>
