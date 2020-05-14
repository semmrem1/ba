<template>
        <nav>
            <v-app-bar  app class="green" elevation="4" @click="scrollToTop()">
                <div v-if="currentUser">
                    <v-app-bar-nav-icon large @click="drawer = !drawer"></v-app-bar-nav-icon>
                </div>
                <div v-if="!currentUser">
                    <v-btn icon color="black" @click="scrollToTop()" to="/"><v-icon>mdi-home</v-icon></v-btn>
                </div>

                <v-spacer></v-spacer>
                <!-- user.auth: {{ this.$store.state.loggedIn.auth }} -->

                <!-- <v-btn class="title justify-center text-uppercase white--text pa-0 ma-0" to="/" @click="scrollToTop()" text> -->
                <div class="title justify-center text-uppercase white--text pa-0 ma-0">
                    <span  class="font-weight-bold">Obst</span>
                    <span class="font-weight-light">vom</span>
                    <span class="font-weight-bold">Baum</span>
                </div>
                <!-- </v-btn> -->

                <!-- <div v-if="currentUser">
                    token: {{ this.$store.state.user.token }}
                </div> -->
        
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
                        <v-list-item-avatar size="75" v-if="this.$store.state.user.image == null">
                            <v-img :src="defaultProfileImage"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-avatar size="75" v-if="this.$store.state.user.image != null">
                            <v-img :src="profileImage"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content router>
                            <v-list-item-title class="title">{{this.$store.state.user.first}} {{this.$store.state.user.last}}</v-list-item-title>
                            <v-list-item-subtitle>{{this.$store.state.user.personType}}</v-list-item-subtitle>
                            <!-- <v-list-item-subtitle>{{this.$store.state.user.uuid}}</v-list-item-subtitle> -->
                            
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
                        <v-btn block class="grey darken-3 white--text" @click="logOut()" to="/">Logout</v-btn>
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
            defaultProfileImage: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
            links: [
                { icon: "mdi-account", text: "Profil", route: "/profile"},
                { icon: "mdi-compass", text: "Suchen", route: "/offers"},
                { icon: "mdi-file-check", text: "Von mir bestellt", route: "/bookingHistory"},
                { icon: "mdi-file-move", text: "Bei mir bestellt", route: "/orderHistory"},
                { icon: "mdi-file-plus", text: "Obst inserieren", route: "/createOffer"},
                { icon: "mdi-file-cog", text: "Mein Obst", route: "/myOffers"},
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
            return this.$store.state.loggedIn.auth
        },
        profileImage(){
            return `data:image/png;base64, ${this.$store.state.user.image}`
        },
    },
    methods: {
        scrollToTop(){
            window.scrollTo(0,0);
        },
        logOut() {
            localStorage.removeItem('token');
            localStorage.removeItem('userUuid');
            this.$store.state.loggedIn.auth = false
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
    }
  }
};
</script>
