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
              Height (inches)
            </th>
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold">
              Bodyweight (lbs)
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
          <tr v-for="user in sortedUsers" :key="user.id" class="hover:bg-gray-100">
            <td class="border-dashed border-t border-gray-200 px-6 py-3">
              <span class="text-gray-700 text-sm">{{ user.FirstName + ' ' + user.LastName }}</span>
            </td>
            <td class="border-dashed border-t border-gray-200 px-6 py-3">
              <span class="text-gray-700 text-sm">{{ user.height }} inches</span>
            </td>
            <td class="border-dashed border-t border-gray-200 px-6 py-3">
              <span class="text-gray-700 text-sm">{{ user.Weight }} lbs</span>
            </td>
            <td class="border-dashed border-t border-gray-200 px-6 py-3">
              <span class="text-gray-700 text-sm">
                {{ calculateP4P(user.Squat, user.Weight) }}
                ({{ user.Squat }} lbs)
              </span>
            </td>
            <td class="border-dashed border-t border-gray-200 px-6 py-3">
              <span class="text-gray-700 text-sm">
                {{ calculateP4P(user.Bench, user.Weight) }}
                ({{ user.Bench }} lbs)
              </span>
            </td>
            <td class="border-dashed border-t border-gray-200 px-6 py-3">
              <span class="text-gray-700 text-sm">
                {{ calculateP4P(user.Deadlift, user.Weight) }}
                ({{ user.Deadlift }} lbs)
              </span>
            </td>
            <td class="border-dashed border-t border-gray-200 px-6 py-3">
              <span class="text-gray-700 text-sm">
                {{ calculateP4P(calculateTotal(user), user.Weight) }}
                ({{ calculateTotal(user) }} lbs)
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../../lib/supabaseClient";

export default {
  setup() {
    const users = ref([]);

    const fetchUsersData = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");

        if (error) {
          console.error("Error fetching user data:", error.message);
        } else {
          users.value = data;
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    onMounted(async () => {
      await fetchUsersData();
    });

    const calculateP4P = (weight, bodyweight) => {
      return (weight / bodyweight).toFixed(2);
    };

    const calculateTotal = (user) => {
      return user.Squat + user.Bench + user.Deadlift;
    };

    const sortedUsers = computed(() => {
      return users.value.slice().sort((a, b) => {
        const aP4P = calculateP4P(calculateTotal(a), a.Weight);
        const bP4P = calculateP4P(calculateTotal(b), b.Weight);

        return bP4P - aP4P;
      });
    });

    return { sortedUsers, calculateP4P, calculateTotal };
  },
};
</script>
