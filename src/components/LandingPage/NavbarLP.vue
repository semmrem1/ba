<template>
        <nav>
            <v-app-bar  app class="green" elevation="4">
                <!-- <div v-if="currentUser"> -->
                    <v-app-bar-nav-icon size="xs" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <!-- </div> -->

                <v-spacer></v-spacer>

                <v-toolbar-title class="justify-center text-uppercase white--text" color="white" to="/">
                    <span color="white--text">Obst</span>
                    <span class="font-weight-light" >vom</span>
                    <span>Baum</span>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- if already logged in -->
                <div v-if="currentUser">
                    <v-btn icon color="black" to="/profile"><v-icon>mdi-account</v-icon></v-btn>
                </div>

                <!-- if not logged in -->
                <div v-if="!currentUser">
                    <v-btn text depressed to="/login">Login</v-btn>
                </div>

            </v-app-bar>
            
            <v-navigation-drawer color="green lighten-5" temporary width="320" v-model="drawer" app class="green" fluid>
                <v-list>
                    <v-list-item to="/profile">
                        <v-list-item-avatar size="75">
                            <v-img :src="profileImage"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content router>
                            <v-list-item-title class="title">{{this.$store.state.user.first}} {{this.$store.state.user.last}}</v-list-item-title>
                            <v-list-item-subtitle>{{this.$store.state.user.personType}}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{this.$store.state.user.uuid}}</v-list-item-subtitle>
                            
                            <!-- <v-list-item-subtitle>Level 3: Pflücker</v-list-item-subtitle> -->
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider dark></v-divider>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-action :elevation="10">
                            <v-icon class="black--text" :elevation="10">{{ link.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="black--text subtitle-1">{{ link.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <template v-slot:append>
                    <div class="pa-4">
                        <v-btn block class="grey darken-3 white--text" to="/">Logout</v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
        </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            links: [
                { icon: "mdi-account", text: "Profil", route: "/profile"},
                { icon: "mdi-compass", text: "Angebote", route: "/offers"},
                { icon: "mdi-file-check", text: "gebuchte Ernten", route: "/cropHistory"},
                { icon: "mdi-file-plus", text: "Angebot erfassen", route: "/createOffer"},
                { icon: "mdi-file-multiple", text: "meine Angebote", route: "/myOffers"},
            ],
            person: {
                title: "",
                first: "",
                last: "",
                cell: "",
                email: {
                    email: ""
                },
                location: {
                    street: "",
                    streetnumber: "",
                    city: "",
                    postcode: "",
                },
                
                password: ""
                },
            image: null,

        }

},
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        profileImage(){
            return `data:image/png;base64, ${this.$store.state.user.image}`
        },
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
    }
  }
};
</script>
