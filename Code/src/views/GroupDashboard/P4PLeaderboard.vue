<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-6 text-gray-800">P4P Leaderboard</h1>
    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
      <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
        <thead>
          <tr class="text-left">
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Name')">
              Name
            </th>
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Height')">
              Height (inches)
            </th>
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Weight')">
              Bodyweight (lbs)
            </th>
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Squat')">
              Squat (p4p)
            </th>
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Bench')">
              Bench (p4p)
            </th>
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Deadlift')">
              Deadlift (p4p)
            </th>
            <th class="bg-gray-800 text-white border-b border-gray-200 px-6 py-4 text-sm uppercase font-bold" @click="sortBy('Total')">
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
                {{ calculateP4PTotal(user) }}
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
import store from "../../stores/index";

export default {
  setup() {
    const users = ref([]);
    const currentUserGroupID = ref(null);
    const sortByField = ref(null);

    const fetchUsersData = async () => {
      try {
        const currentUserEmail = store.state.user ? store.state.user.email : null;
        if (currentUserEmail) {
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

          currentUserGroupID.value = currentUserData ? currentUserData.Group_ID : null;

          if (currentUserGroupID.value) {
            // Fetch users with the same Group_ID
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("Group_ID", currentUserGroupID.value);

            if (error) {
              console.error("Error fetching users:", error.message);
            } else {
              users.value = data;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
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

    const calculateP4PTotal = (user) => {
      return calculateP4P(calculateTotal(user), user.Weight);
    };

    const sortedUsers = computed(() => {
      if (!sortByField.value) return users.value;

      return users.value.slice().sort((a, b) => {
        if (sortByField.value === "Name") {
          return a.FirstName.localeCompare(b.FirstName);
        } else if (sortByField.value === "Height") {
          return a.height - b.height;
        } else if (sortByField.value === "Weight") {
          return a.Weight - b.Weight;
        } else if (sortByField.value === "Squat") {
          return calculateP4P(b.Squat, b.Weight) - calculateP4P(a.Squat, a.Weight);
        } else if (sortByField.value === "Bench") {
          return calculateP4P(b.Bench, b.Weight) - calculateP4P(a.Bench, a.Weight);
        } else if (sortByField.value === "Deadlift") {
          return calculateP4P(b.Deadlift, b.Weight) - calculateP4P(a.Deadlift, a.Weight);
        } else if (sortByField.value === "Total") {
          return calculateP4PTotal(b) - calculateP4PTotal(a);
        }
      });
    });

    const sortBy = (field) => {
      sortByField.value = field;
    };

    return { sortedUsers, calculateP4P, calculateTotal, calculateP4PTotal, sortBy };
  },
};
</script>
