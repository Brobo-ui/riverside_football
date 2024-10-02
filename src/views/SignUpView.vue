<template>
  <div>
    <v-form v-model="valid" @submit="signup">
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        label="First name"
                        required>
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        label="Last name"
                        required>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required>
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="number"
                        :rules="phoneNumberRules"
                        label="Phone Number"
                        required>
                    </v-text-field>
                </v-col>
                <!-- <v-col>
                    <v-select
                        class="white"
                        v-model="favTeam"
                        :rules="favTeamRules"
                        label="Favorite team"
                        required>
                    </v-select>
                </v-col> -->
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        required>
                </v-text-field>
              </v-col>
              <v-col>
                <!-- <v-text-field
                        class="white"
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required>
                </v-text-field> -->
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
  export default {
    name: 'SigninView',
    data () {
      return {
        valid: false,
        email: '',
        password: '',
        error: '',
        firstname: '',
        lastname: '',
        favTeam: '',
        number: '',
        nameRules: [
            value => !!value || "Please enter a value."
        ],
        emailRules: [
            value => !!value || "Pleae enter an email."
        ],
        phoneNumberRules: [
            value => !!value || "Please enter a phone number."
        ],
        favTeamRules: [
            value => !!value || "Please select a favorite team."
        ],
        passwordRules: [
          value => !!value || "Please enter a password."
        ]
      }
    },
    created () {
      this.checkSignedIn()
    },
    updated () {
      this.checkSignedIn()
    },
    methods: {
      signup() {
        this.plain.post('/signup', { 
            email: this.email, 
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname})
          .then(response => this.signupSuccessful(response))
          .catch(error => this.signupFailed(error))
      },
      signupSuccessful (response) {
        if (!response.data.csrf) {
          this.signupFailed(response)
          return
        }
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        localStorage.username = response.data.username
        localStorage.userId = response.data.user_id
        this.error = ''
        this.$router.replace('/')
      },
      signupFailed (error) {
        this.error = (error.response && error.response.data && error.response.data.error) || ''
        delete localStorage.csrf
        delete localStorage.signedIn
        delete localStorage.username
        delete localStorage.userId
      },
      checkSignedIn () {
        if (localStorage.signedIn) {
          this.$router.replace('/')
        }
      }
    }
  }
  </script>