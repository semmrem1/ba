<template>
        <nav>
            <v-app-bar fixed app class="green" elevation="4">
                <v-app-bar-nav-icon size="xs" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <v-toolbar-title class="text-uppercase" color="black" to="/offers">
                    <!-- <span class="font-weight-light">Obst</span>
                    <span>vom</span>
                    <span class="font-weight-light">Baum</span> -->
                    <span>Obst</span>
                    <span class="font-weight-light" >vom</span>
                    <span>Baum</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon color="black" to="/profile">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </v-app-bar>
            <v-navigation-drawer color="green lighten-5" temporary width="320" v-model="drawer" app class="green">
                <v-list>
                    <v-list-item to="/profile">
                        <v-list-item-avatar size="75">
                            <v-img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content router>
                            <v-list-item-title class="title">Gabriel Gala</v-list-item-title>
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
                        <v-btn block class="grey darken-3 white--text">Logout</v-btn>
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
                { icon: "mdi-food-apple", text: "Meine Ernten", route: "/myCrops"},
                { icon: "mdi-office-building", text: "Organisationen", route: "/organisations"},
                { icon: "mdi-food-variant", text: "Rezepte", route: "/recipes"},
                { icon: "mdi-message", text: "Kontakt", route: "/contact"},
            ]
    }

}
}
</script>

<style scoped>
/* .bg{
    background-image: url('../assets/Login.jpeg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
} */
</style>