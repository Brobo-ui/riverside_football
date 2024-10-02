<style scoped>
  .pick-table {
    border-style: solid;
  }

  .pick-row {
    background: blue;
  }
</style>
  
<template>
  <div>
    <h3>Game Times for </h3>
    <v-simple-table
      dark
      dense
      class="pick-table"
    >
      <thead>
        <tr class="pick-row">
          <th>ID</th>
          <th>Week</th>
          <th>Team 1</th>
          <th>Team 2</th>
          <th>Game Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.id }}</td>
          <td>{{ game.weekNo }}</td>
          <td>{{ game.team_1 }}</td>
          <td>{{ game.team_2 }}</td>
          <td>{{ printDateString(game.game_time) }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>
<script>
import { getMonthString, getDayString, get24HourTime } from '@/services/Utilities';

  export default {
    name: "GameTimeTable",
    props: {
      currentWeekNo: Number
    },
    data() {
      return {
        games: [],
        weekNo: 0,
        error: ''
      };
    },
    created() {
      let matchupsURL = '/api/v1/matchups/get_matchups';
      this.secured.get(matchupsURL, {
        params: { currentWeekNo: this.currentWeekNo}
      })
      .then(response => { 
        this.games = response.data
      })
      .catch(error => this.setError(error, "Something went wrong!"))
    },
    methods: {
      printDateString(dateString) {
        let gameDate = "";
        let dateObj = new Date(dateString);

        //TODO: Change this implementation to use the following: https://vuetifyjs.com/en/features/dates/#format-options
        gameDate += getDayString(dateObj.getDay()) + " " + getMonthString(dateObj.getMonth())  + " " +
                      + dateObj.getDate() + ", "+ " " + get24HourTime(dateObj);

        return gameDate;
      }
    }
  };
</script>
