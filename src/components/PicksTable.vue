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
    <h3>{{username}}</h3>
    <v-table
      dark
      dense
      class="pick-table"
    >
      <thead>
        <tr class="pick-row">
          <th>Week No</th>
          <th>Slot 1</th>
          <th>Slot 2</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pick in picks" :key="pick.id">
          <td>{{ pick.weekNo }}</td>
          <td>{{ pick.pick1 }}</td>
          <td>{{ pick.pick2 }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
// import { response } from 'express';

  export default {
    name: "PicksTable",
    props: {
      userid: Number,
      username: String
    },
    data() {
      return {
        userId: this.userid,
        picks: [],
        tableData: [],
        error: ''
      };
    },
    created() {
      let userId = this.userid;
      let picksURL = '/api/v1/picks/get_picks';
      this.secured.get(picksURL, {
        params: { id: userId }
      })
      .then(response => { 
        this.picks = response.data
      })
      .catch(error => this.setError(error, "Something went wrong!"))
    }
  };
</script>
