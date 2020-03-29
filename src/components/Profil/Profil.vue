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
                    <div>
                        <v-text-field class="py-0" color="green" label="Benutzername" v-model="username"></v-text-field>
                        <v-text-field class="py-0" color="green" label="E-Mail" v-model="email"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Optionale E-Mail" v-model="emailOpt"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Vorname" v-model="firstname"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Nachname" v-model="lastname"></v-text-field>
                    </div>
                    <div class="pt-7">  
                        <v-text-field class="py-0" color="green" label="Strasse" v-model="street"></v-text-field>

                        <v-row>
                            <v-col class="py-0" cols="3">
                                <v-text-field class="py-0" color="green" label="PLZ" v-model="PLZ"></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="9">
                                <v-text-field class="py-0" color="green" label="Ort" v-model="city"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="pt-9">
                            <v-col class="pl-3 pr-1" cols="5">
                                <v-btn class="mx-auto" color="green darken-1 white--text" outlined @click="dialog = false" width="95%">BEARBEITEN</v-btn>
                            </v-col>
                            <v-col class="pr-1 pl-0" cols="7">
                                <v-btn class="mx-auto mb-1" color="green darken-1 white--text" raised @click="getUser" width="95%">SPEICHERN</v-btn>
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
            image: null,
            username: '',
            email: '',
            emailOpt: '',
            firstname: '',
            lastname: '',
            street: '',
            PLZ: '',
            city: '',
        }
    },
    methods: {
        submit() {
            alert("Gespeichert!  " + this.username + this.firstname + this.lastname + this.street + this.PLZ + this.city)
        },
        getUser(){
            const url = "https://cors-anywhere.herokuapp.com/http://env-9201482.jcloud.ik-server.com/person/5cb8d10725839944c26ff1f5";
            var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
            this.$http.get(url, config)
            .then((response) => {
                console.log(response)
                      })
            .catch((error) => {
                console.log(error.response)
            })
    },
  },


            // .then(response => response.text())
            // .then(contents => console.log(contents))
            // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
            // .then((response) => {
            // console.log(response)
            // this.obst = response.data;}



         

    
}
</script>