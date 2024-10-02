<template>
    <div>
        <v-form v-model="valid" @submit.prevent="signin">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="username"
                            :rules="usernameRules"
                            label="Username"
                            required>
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text': 'password'"
                            label="Password"
                            required
                            @click:append="showPass = !showPass">
                        </v-text-field>
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
      showPass: false,
      username: '',
      password: '',
      error: '',
      usernameRules: [
        value => !!value || "Please enter a username."
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
    signin() {
      this.plain.post('/signin', { 
          username: this.username, 
          password: this.password
        })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      localStorage.username = response.data.username
      localStorage.userId = response.data.user_id
      this.error = ''
      this.$router.replace('/')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/')
      }
    }
  }
}
</script>