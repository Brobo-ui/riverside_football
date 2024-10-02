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
            <v-btn to="/admin" v-if="this.isAdmin">Admin</v-btn>
            <v-btn to="/" @click.prevent="signOut" v-if="this.signedIn">Sign Out</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PicksTable :userid="currentUserId" :username="currentUser" />
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
      currentUserId: 0,
      currentUsername: '',
      signedIn: false,
      isAdmin: false,
    }
  },
  created() {
    this.secured.get('/api/v1/picks/')
  }
};
</script>
