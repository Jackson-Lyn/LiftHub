<template>
  <div class="container">
    <h2>Instructions Page</h2>
    
    <h1>Leaderboards</h1>
    <div class="section">
      <h3>Join Group</h3>
      <div class="instruction-container">
        <!-- Add Join Group instruction text here -->
        <p> On the join group page, users will be able to enter a join code.
          Communicate with friends and/or teammates to decide on a join code and you will only be able to see
          and compete against users that enter the same code. 
          Enter join code 1 to see how your lifts compare to others within the The LiftHub community

        </p>
      </div>
    </div>
    <div class="section">
      <h3>Leaderboard</h3>
      <div class="instruction-container">
        <!-- Add Leaderboard instruction text here -->
        <p>Views the leaderboard for all users that have entered the same join code as you.
          To sort by specific lifts, simply click the name of the lift you wish to sort by at the top of the leaderboard.
        </p>
      </div>
    </div>
    <div class="section">
      <h3>P4P Leaderboard</h3>
      <div class="instruction-container">
        <!-- Add P4P Leaderboard instruction text here -->
        <p>This leaderboard is for those that believe mass moves mass and want to compare lifts relative to bodyweight.
        Same functionality as the regular leaderboard.
        </p>
      </div>
    </div>
    
    <h1>Individual</h1>
    <div class="section">
      <h3>Edit Profile</h3>
      <div class="instruction-container">
        
        <p>This is where you go to edit your user profile. 
        Make sure to keep this updated whenever you improve on one of your lifts as the values entered here will affect your leaderboard rankings.
       </p>
      </div>
    </div>
    <div class="section">
      <h3>Progression Tracker</h3>
      <div class="instruction-container">
        <!-- Add Progression Tracker instruction text here -->
        <p>This page is used to keep tabs on your progress. 
          Monthly updates are recommended but you can make an entry to progression at any interval you wish.
          Make sure to take advantage of the notes section, as you can document what workouts you were doing,
          what workout splits you were performing, lifestyle changes and any other information that you feel may have contributed to your progress or regression. 
        </p>
      </div>
    </div>
    <div class="section">
      <h3>One Rep Max Calculator</h3>
      <div class="instruction-container">
        <!-- Add One Rep Max Calculator instruction text here -->
        <p>This calculator uses epley's formula to caclulate your one rep max.
          This will just give a ball park answer to what your one rep max could be based on how many reps you get of lighter weights.
          Answers provided in this calculator tend to be slightly higher than what your one rep max might actually be.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Add your script logic here
}
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2em;
  margin-bottom: 30px;
}

h2 {
  margin-top: 30px;
  font-size: 1.5em;
}

.section {
  margin-top: 20px;
}

h3 {
  margin-bottom: 10px;
}

.instruction-container {
  padding: 20px;
  border-radius: 8px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.instruction-container p {
  margin: 0;
}
</style>
