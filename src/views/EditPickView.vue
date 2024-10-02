<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-btn to="/">Home</v-btn>
            <!-- <v-btn to="/editpicks" v-if="this.signedIn" :userid="currentUserId">Edit Picks</v-btn> -->
            <v-btn to="/rules">Rules</v-btn>
            <v-btn to="/signup">Sign Up</v-btn>
            <!-- <v-btn to="/signin" v-if="!this.signedIn">Sign In</v-btn> -->
            <!-- <v-btn to="/admin" v-if="this.isAdmin">Admin</v-btn> -->
            <!-- <v-btn to="/" @click.prevent="signOut" v-if="this.signedIn">Sign Out</v-btn> -->
          </v-card>
        </v-col>
      </v-row>
      <v-container>
        <v-row justify="center">
          <div>
            <PicksTable :userid="userId" :username="currentUser"/>
          </div>
        </v-row>
      </v-container>
    </v-container>
    <v-form @submit.prevent="submitPicks">
        <v-container>
            <v-row>
                <v-col>
                  <v-select
                    v-model="weekNos"
                      :items="validWeekNos"
                      placeholder="Week Number"
                      label="Week Number"
                      required />
                </v-col>
                <v-col>
                  <v-select
                    v-model="picksSlot1"
                      label="Slot 1"
                      :items="slot1Picks"
                      required />
                </v-col>
                <v-col>
                  <v-select
                    v-model="picksSlot2"
                      label="Slot 2"
                      :items="slot2Picks"
                      required />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="primary" type="submit">Submit</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
  </div>
</template>
<script> 
  import PicksTable from "../components/PicksTable.vue";

  export default {
    name: "EditPick",
    components: {
      PicksTable
    },
    data() {
      return {
        userId: Number(localStorage.userId),
        currentUser: localStorage.username,
        weekNos: [],
        slot1Picks: [],
        slot2Picks: [],
        validWeekNos: [],
        picksSlot1: String,
        picksSlot2: String,
        error: '',
        editPickFlag: false
      };
    },
    created() {
      //Getting user information
      this.secured.get('/api/v1/users/'+this.userId)
        .then(response => {
          this.currentUser = response.data.name
      })
      .catch(error => this.setError(error, "Something went wrong!"))

      //Getting valid picks for slot 1
      let validPicksURL = '/api/v1/picks/valid_picks'
      let weekInfo = '/api/v1/weekinfo'
      this.secured.get(validPicksURL, {
        params: {
          member_id: localStorage.userId,
          slot: "1"
        }
      })
      .then(response => { 
        this.slot1Picks = response.data
      })
      .catch(error => this.setError(error, "Something went wrong!"))
      //Getting valid picks for slot 2
      this.secured.get(validPicksURL, {
        params: {
          member_id: localStorage.userId,
          slot: "2"
        }
      })
      .then(response => { 
        this.slot2Picks = response.data
      })
      .catch(error => this.setError(error, "Something went wrong!"))

      //Getting week number
      this.secured.get(weekInfo)
      .then(response => { 
        this.validWeekNos.push(String(response.data[0].current_week))
        console.log(response);
        // this.validWeekNos.push(4)
      })
      .catch(error => this.setError(error, "Something went wrong!"))
    },
    methods: {
      submitPicks() {
          let submitPicksURL  = '/api/v1/picks/'
          if(32 - this.slot1Picks.length === Number(this.weekNos)) {
            this.editPickFlag = true;
          }
          if(this.editPickFlag) {
            this.secured.put(submitPicksURL, {
                member_id: Number(localStorage.userId),
                pick1: this.picksSlot1,
                pick2: this.picksSlot2,
                weekNo:  Number(this.validWeekNos[0])
            }).then(response => {
              //TODO: Handle response
              console.log(response);
            })
          } else {
            this.secured.post(submitPicksURL, {
                member_id: Number(localStorage.userId),
                pick1: this.picksSlot1,
                pick2: this.picksSlot2,
                weekNo:  Number(this.validWeekNos[0])
            }).then(response => {
              //TODO: Handle response
              console.log(response);
            })
          }
      }
    }
  };
</script>