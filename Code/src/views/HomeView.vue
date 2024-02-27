<template>
  <div class="flex justify-center items-center h-screen">
    <div class="center-card">
      <div class="bg-white rounded-lg shadow-lg p-8 border-2 border-red-500">
        <h1 class="text-2xl font-bold mb-4">About Us</h1>
        <p class="text-gray-700">
          Welcome to LiftHub, your ultimate destination for revolutionizing your fitness journey.
           At FitHub, we pride ourselves on being more than just a fitness tracking platform – we are your dedicated partner in achieving your personal best.
           Designed with precision and innovation, our platform caters to both individual gym enthusiasts and sports teams engaged in weightlifting-intensive training, such as football, hockey, and rugby teams. 
           FitHub stands out with meticulous lift tracking capabilities, empowering users to monitor their performance in key compound exercises over time. Our user-centric design allows for seamless data entry, generating insightful visualizations and historical records.
            But FitHub is more than just numbers; it's a community.
            Engage in fun competitions with friends through our leaderboards, where individual progression tracking becomes a motivational tool, and teams can foster healthy competition. 
        </p>
        <br>
        <p>
          <b>Join us on this transformative journey, where we blend technology, community, and motivation to propel you towards success. Welcome to FitHub – where every lift, every step, and every goal is celebrated!</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Placeholder isLoggedIn and logout method
let isLoggedIn = false; // Update this based on your actual authentication state

const logout = () => {
  // Implement your logout logic here
  console.log('Logout logic goes here');
};
</script>

<style scoped>
  /* Center content vertically and horizontally */
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Add equal padding to the card container */
  .center-card {
    padding: 50px; /* Adjust the padding value as needed */
  }
</style>
