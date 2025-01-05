<template>
    <div>
        <v-form>
            <v-container>
                <v-row>
                    <v-col>
                        <v-select
                            :items="users"
                            item-title="name"
                            item-value="id"
                            label="Username" 
                            v-model="selectedUser"
                            />
                        <div v-if="showModifyPicks">
                            <v-select
                                v-model="picksSlot1"
                                label="Slot 1"
                                item-title="team"
                                :items="slot1Picks"
                                required />
                            <v-select
                                v-model="picksSlot2"
                                label="Slot 2"
                                item-title="team"
                                :items="slot2Picks"
                                required />
                            <v-text-field
                                v-model="weekNo"
                                label="Week #"
                                required />
                            <v-btn @click="updatePicks(picksSlot1, picksSlot2, weekNo)">
                                Update Pick
                            </v-btn>
                        </div>
                    </v-col>
                    <template v-if="showModifyPicks">
                        <v-col>
                            <PicksTable :userid="currentUserId" :username="currentUsername" :key="currentUserId"/>
                        </v-col>
                    </template>
                </v-row>
                <v-row>
                    <v-col>

                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
<script>
import PicksTable from "../components/PicksTable.vue";

export default {
    name: "ModifyPick",
    data() {
        return {
            users: [],
            selectedUser: null,
            picksSlot1: null,
            picksSlot2: null,
            weekNo: null,
            currentUserPicks: [],
            showModifyPicks: false,
            currentUserId: null,
            currentUsername: null,
            slot1Picks: [],
            slot2Picks: []
        };
    },
    created() {
        this.secured.get('/api/v1/users')
            .then(response => {
                this.users = response.data;
        })
            .catch(error => this.setError(error, "Something went wrong!"));
    },
    watch: {
        selectedUser(newValue) {
            this.showModifyPicks = true;
            this.getPicks(newValue);
        }
    },
    methods: {
        getPicks(selectedUserId) {
            console.log("Selected user:" + selectedUserId)
            this.currentUserId = selectedUserId;
            this.secured.get('/api/v1/picks')
                .then(response => {
                    this.slot1Picks = response.data;
                    this.slot2Picks = response.data;
            });
        },

        updatePicks(slot1Pick, slot2Pick, weekNo) {
            console.log("Slot 1: " + slot1Pick + ", Slot 2: " + slot2Pick + ", Week No: " + weekNo);
            let memberId = this.currentUserId;
            this.currentUserId = 0;
            this.secured.put('/api/v1/picks', {
                slot1: this.picksSlot1,
                slot2: this.picksSlot2,
                weekNo: this.weekNo,
                userId: memberId
            })
            .then( response => {
                this.currentUserId = response.data[0].member_id;
            })
        }
    },
    components: { PicksTable }
};
</script>