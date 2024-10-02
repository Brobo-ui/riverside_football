<template>
    <div>
        <v-form>
            <v-container>
                <v-row>
                    <v-col>
                        <v-select 
                            v-model="selectedWeek"
                            :items="validWeeks"
                            label="Week #"/>
                        <v-text-field
                            v-model="selectedId"
                            label="ID"
                            />
                        <v-date-picker
                            v-model="date"></v-date-picker>
                    </v-col>
                    <v-col>
                        <GameTimeTable :currentWeekNo="selectedWeek" :key="selectedWeek" />
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
<script>
import GameTimeTable from "../components/GameTimeTable.vue";

export default {
    name: "ChangeGameTime",
    data() {
        return {
            validWeeks: [],
            selectedWeek: 0,
            selectedId: 0,
            date: null,
        };
    },
    created() {
        let weekInfoURL = '/api/v1/weekinfo'
        this.secured.get(weekInfoURL)
        .then(response => {
            let weekCounter = response.data[0].current_week
            this.selectedWeek = weekCounter;
            while(weekCounter != 0) {
                this.validWeeks.push(weekCounter);
                weekCounter--;
            }
        })
    },
    methods: {
    },
    components: { GameTimeTable }
};
</script>