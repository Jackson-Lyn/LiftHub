<template>
	<div class="container mx-auto p-4">
	  <h1 class="text-3xl font-semibold mb-6 text-gray-800">Edit Profile for {{ userEmail }}</h1>
  
	  <form>
		<div class="mb-4">
		  <label for="FirstName" class="block text-sm font-medium text-gray-700">First Name</label>
		  <input v-model="user.FirstName" type="text" id="FirstName" name="FirstName" class="mt-1 p-2 border rounded w-full">
		</div>
  
		<div class="mb-4">
		  <label for="LastName" class="block text-sm font-medium text-gray-700">Last Name</label>
		  <input v-model="user.LastName" type="text" id="LastName" name="LastName" class="mt-1 p-2 border rounded w-full">
		</div>
  
		<div class="mb-4">
		  <label for="height" class="block text-sm font-medium text-gray-700">Height (inches)</label>
		  <input v-model="user.height" type="number" id="height" name="height" class="mt-1 p-2 border rounded w-full">
		</div>
  
		<div class="mb-4">
		  <label for="Weight" class="block text-sm font-medium text-gray-700">Weight (lbs)</label>
		  <input v-model="user.Weight" type="number" id="Weight" name="Weight" class="mt-1 p-2 border rounded w-full">
		</div>
  
		<div class="mb-4">
		  <label for="Squat" class="block text-sm font-medium text-gray-700">Squat (lbs)</label>
		  <input v-model="user.Squat" type="number" id="Squat" name="Squat" class="mt-1 p-2 border rounded w-full">
		</div>
  
		<div class="mb-4">
		  <label for="Bench" class="block text-sm font-medium text-gray-700">Bench Press (lbs)</label>
		  <input v-model="user.Bench" type="number" id="Bench" name="Bench" class="mt-1 p-2 border rounded w-full">
		</div>
  
		<div class="mb-4">
		  <label for="Deadlift" class="block text-sm font-medium text-gray-700">Deadlift (lbs)</label>
		  <input v-model="user.Deadlift" type="number" id="Deadlift" name="Deadlift" class="mt-1 p-2 border rounded w-full">
		</div>
  
		<button @click.prevent="saveChanges" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow mt-4">
		  Save Changes
		</button>
	  </form>
  
	  <button @click="goBack" class="mb-6 bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
		← Back
	  </button>
	</div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { supabase } from "./../../lib/supabaseClient";
  import store from "./../../stores/index";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const userEmail = store.state.user.email;

      const user = ref({
        FirstName: "",
        LastName: "",
        height: 0,
        Weight: 0,
        Squat: 0,
        Bench: 0,
        Deadlift: 0,
      });

      const router = useRouter();

      onMounted(async () => {
        try {
          console.log("User Email", userEmail);

          // Fetch user data from the "users" table using userEmail as the identifier
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("Username", userEmail);

          if (error) {
            console.error("Error fetching user data:", error.message);
            throw new Error("Error fetching user data.");
          }

          if (data && data.length > 0) {
            user.value = { ...user.value, ...data[0] };
            console.log("User data from users table:", data[0]);
          } else {
            console.error("No user data found for the provided email.");
            // Handle the case where no user data is found
          }
        } catch (e) {
          console.error(e);
        }
      });

      const saveChanges = async () => {
        try {
          const { data, error } = await supabase
            .from("users")
            .upsert(
              {
                FirstName: user.value.FirstName,
                LastName: user.value.LastName,
                height: user.value.height,
                Weight: user.value.Weight,
                Squat: user.value.Squat,
                Bench: user.value.Bench,
                Deadlift: user.value.Deadlift,
                Username: userEmail, // Use email as the identifier
              },
              { onConflict: ["Username"] }
            );

          if (error) {
            console.error('Error updating/inserting user data in the "users" table: ' + error.message);
          } else {
            console.log('User data updated/inserted successfully!');
          }
        } catch (e) {
          console.error(e);
        }
      };

      const goBack = () => {
        router.go(-1);
      };

      return { user, saveChanges, goBack, userEmail };
    },
  };
</script>


  