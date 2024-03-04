<template>
	<div class="container mx-auto p-4">
	  <div class="flex justify-center flex-grow">
		<div class="bg-white shadow-md rounded-lg w-full max-w-4xl p-4 relative">
		  <div class="flex justify-between mb-6">
			<h1 class="text-3xl font-semibold text-gray-800">{{ user.FirstName + ' ' + user.LastName }}</h1>
			<div class="text-2xl font-semibold text-gray-800 absolute top-2 right-2">Total: {{ calculateTotal() }} lbs</div>
		  </div>
  
		  <div class="mb-4">
			<div class="flex justify-between">
			  <div>
				<p class="text-gray-700 font-semibold">Physical Information</p>
				<div class="flex space-x-6">
				  <div>
					<p class="text-gray-700">Height:</p>
					<p>{{ user.height }} inches</p>
				  </div>
				  <div>
					<p class="text-gray-700">Weight:</p>
					<p>{{ user.Weight }} lbs</p>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
  
		  <div class="mb-4">
			<table class="min-w-full">
			  <thead class="bg-gray-100">
				<tr>
				  <th class="text-left px-4 py-2">Exercise</th>
				  <th class="text-left px-4 py-2">Personal Best</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
				  <td class="px-4 py-2">Squat</td>
				  <td class="px-4 py-2">{{ user.Squat }} lbs</td>
				</tr>
				<tr>
				  <td class="px-4 py-2">Bench Press</td>
				  <td class="px-4 py-2">{{ user.Bench }} lbs</td>
				</tr>
				<tr>
				  <td class="px-4 py-2">Deadlift</td>
				  <td class="px-4 py-2">{{ user.Deadlift }} lbs</td>
				</tr>
			  </tbody>
			</table>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import store from "../stores/index";

export default {
  setup() {
    const user = ref({
      FirstName: "",
      LastName: "",
      height: 0,
      Weight: 0,
      Squat: 0,
      Bench: 0,
      Deadlift: 0,
    });

    const fetchUserData = async (email) => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("Username", email);

        if (error) {
          console.error("Error fetching user data:", error.message);
        } else {
          if (data.length > 0) {
            user.value = { ...user.value, ...data[0] };
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    onMounted(async () => {
      const userEmail = store.state.user ? store.state.user.email : null;
      if (userEmail) {
        await fetchUserData(userEmail);
      }
    });

    const calculateTotal = () => {
      return user.value.Squat + user.value.Bench + user.value.Deadlift;
    };

    return { user, calculateTotal };
  },
};
</script>
