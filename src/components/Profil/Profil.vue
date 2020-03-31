<template>
    <v-container class="pt-4">
        <v-row class="justify-center">
            <!-- Card -->
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">
                <v-row>
                    <!-- Avatar -->
                    <v-col class="pl-6 pr-0">
                        <v-avatar size="150">
                            <v-img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="d-flex align-center pl-0 px-3">
                        <v-btn outlined small color="green" class="d-flex align-center">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*"/>
                    </v-col>
                </v-row>
                <!-- Form -->
                <v-form class="px-3 pt-6">
                    <p>{{this.info}}</p>
                    <div>
                        <v-text-field class="py-0" color="green" label="Vorname" :disabled="isReadonly" v-model="this.user.first"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Nachname" :disabled="isReadonly" v-model="this.user.last"></v-text-field>
                        <v-text-field class="py-0" color="green" label="E-Mail" :disabled="isReadonly" v-model="this.user.email"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Optionale E-Mail" :disabled="isReadonly" v-model="this.user.email"></v-text-field>

                    </div>
                    <div class="pt-7">
                        <v-row>
                            <v-col cols="9">
                                <v-text-field class="py-0" color="green" label="Strasse" :disabled="isReadonly" v-model="this.user.location.street"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="py-0" color="green" label="Nummer" :disabled="isReadonly" v-model="this.user.location.streetnumber"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="py-0" cols="3">
                                <v-text-field class="py-0" color="green" label="PLZ" :disabled="isReadonly" v-model="this.user.location.postcode"></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="9">
                                <v-text-field class="py-0" color="green" label="Ort" :disabled="isReadonly" v-model="this.user.location.city"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="pt-9">
                            <v-col class="pl-3 pr-1" cols="5">
                                <v-btn class="mx-auto" color="green darken-1 white--text" outlined  @click="makeReadable" width="95%"><v-icon left>mdi-pencil</v-icon>BEARBEITEN</v-btn>
                            </v-col>
                            <v-col class="pr-1 pl-0" cols="7">
                                <v-btn class="mx-auto mb-1" color="green darken-1 white--text" :disabled="makeSaveable" raised @click="updatePerson" width="95%">SPEICHERN</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            isReadonly: true,
            info: null,
            user: [
                
            ],
            image: null,
            username: '',
            email: '',
            emailOpt: '',
            firstname: '',
            lastname: '',
            street: '',
            streetnumber: '',
            PLZ: '',
            city: '',
        }
    },
    mounted(){
        // this.$validator.validate();

        const url = "/person/5cb8d10725839944c26ff1f5";
        var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
        this.$http.get(url, config)
        .then((response) => {
            this.user = response.data;
                })
        .catch((error) => {
            console.log(error.response)
        })
    },

    computed: {
        makeSaveable(){
            return this.isReadonly
        },
    },

    methods: {
        makeReadable(){
            this.isReadonly = false
        },
        updatePerson(){
            const url = "/person/5cb8d10725839944c26ff1f5";
            var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
            this.$http.put(url, config)
            .then((response) => {
                alert(response);
            })
        },

        // editPerson: function(person) {
        //     this._originalPerson = Object.assign({}, person);
        //     person.edit = true;
        // },
        // getUser(){
        //     const url = "/person/5cb8d10725839944c26ff1f5";
        //     var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
        //     this.$http.get(url, config)
        //     .then((response) => {
        //         console.log(response)
        //         console.log(response.data)
        //         this.user = response.data;
        //               })
        //     .catch((error) => {
        //         console.log(error.response)
        //     })
        // },
        printUsername(){
            this.$http.get('https://api.coindesk.com/v1/bpi/currentprice.json').then((response) => (this.info = response.data.bpi))
        },
 

  },
    
}
</script>