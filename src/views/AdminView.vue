<template>
    <div align="center">
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-btn to="/">Home</v-btn>
                    <!-- <v-btn to="/editpicks" v-if="this.signedIn" :userid="currentUserId">Edit Picks</v-btn> -->
                    <v-btn to="/rules">Rules</v-btn>
                    <v-btn to="/signup">Sign Up</v-btn>
                    <!-- <v-btn to="/signin" v-if="!this.signedIn">Sign In</v-btn> -->
                    <!-- <v-btn to="/admin" v-if="this.isAdmin">Admin</v-btn> -->
                    <!-- <v-btn to="/" @click.prevent="signOut" v-if="this.signedIn">Sign Out</v-btn> -->
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="blue" @click=showModifyPickComponent>Modify Pick</v-btn>
                    <v-btn color="blue" @click=showResetPasswordComponent>Reset A Password</v-btn>
                    <v-btn color="blue" @click=showGameTimeComponent>Change Game Time</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div v-if="showModifyPick">
                        <ModifyPick />
                    </div>
                    <div v-if="showGameTime">
                        <ChangeGameTime />
                    </div>
                </v-col>
            </v-row>
        </v-container>
        
    </div>
</template>
<script> 
import ModifyPick from '../components/ModifyPick.vue'
import ChangeGameTime from '../components/ChangeGameTime.vue'

export default {
    name: "AdminView",
    components: {
        ModifyPick,
        ChangeGameTime
    },
    data() {
        return {
            showModifyPick: false,
            showResetPassword: false,
            showGameTime: false
        };
    },
    created() {
        
    },
    methods: {
        showModifyPickComponent() {
            this.showModifyPick = true;
            this.showResetPassword = false;
            this.showGameTime = false;
        },
        showResetPasswordComponent() {
            this.showModifyPick = false;
            this.showResetPassword = true;
            this.showGameTime = false;
        },
        showGameTimeComponent() {
            this.showModifyPick = false;
            this.showResetPassword = false;
            this.showGameTime = true;
        }
    }
};
</script>