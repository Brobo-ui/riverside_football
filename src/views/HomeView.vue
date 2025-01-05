<template>
  <div align="center">
    <v-container fluid>
      <v-row>
        <v-col>
            <v-btn to="/">Home</v-btn>
            <v-btn to="/editpicks" v-if="this.signedIn" :userid="currentUserId">Edit Picks</v-btn>
            <v-btn to="/rules">Rules</v-btn>
            <v-btn to="/signup">Sign Up</v-btn>
            <v-btn to="/signin" v-if="!this.signedIn">Sign In</v-btn>
            <v-btn to="/admin">Admin</v-btn>
            <!-- <v-btn to="/" @click.prevent="signOut" v-if="this.signedIn">Sign Out</v-btn> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PicksTable :userid="currentUserId" :username="currentUser" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PicksTable v-for="pick in picksData" :key="pick.id" :userid="pick.id" :username="pick.name" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PicksTable from '@/components/PicksTable.vue';

 export default {
  name: 'HomeView',
  components: {
    PicksTable,
  },
  data() {
    return {
      currentUserId: Number(localStorage.userId),
      currentUser: '',
      signedIn: localStorage.signedIn,
      isAdmin: false,
      picksData: Array,
    }
  },
  created() {
    if(localStorage.signedIn) {
      this.secured.get('/api/v1/users/'+localStorage.userId).then(response => {
        //TODO: set the admin flag from this response to the current user
        this.currentUser = response.data.name;
        console.log(response);
      })
    }

    this.secured.get('/api/v1/users').then(response => {
      //TODO: remove the logged in user from the picksData array
      // so that their picks are not displayed twice
      this.picksData = response.data;
      console.log(response);
    })
    
  }
};
</script>
