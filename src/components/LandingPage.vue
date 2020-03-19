<template>
    <v-content class="pt-0"> 
    <section id="hero">
        <v-row no-gutters>
        <v-img :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
        src="https://images.unsplash.com/photo-1539756250244-b39c3a836b85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80">
            <v-theme-provider dark>
            <v-container fill-height>
                <v-row align="center" class="white--text mx-auto" justify="center">

                <v-col class="white--text text-center" cols="12" tag="h1">
                    <span class="font-weight-light" :class="[$vuetify.breakpoint.smAndDown ? 'display-0' : 'display-1']">
                    WILLKOMMEN BEI
                    </span>
                    <br>
                    <span  :class="[$vuetify.breakpoint.smAndDown ? 'display-2': 'display-3']" class="font-weight-black">
                    OBST VOM BAUM
                    </span>
                    <div class="py-4"></div>
                </v-col>
                <span ></span>
                <v-btn class="align-self-end pa-2" color="green">Obst anbieten</v-btn>
                <div class="pa-2"></div>
                <v-btn class="align-self-end pa-2" color="green" >Obst ernten</v-btn>
                <!-- <v-btn class="align-self-end" fab outlined @click="$vuetify.goTo('#about-me')">
                    <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn> -->

                </v-row>
            </v-container>
            </v-theme-provider>
        </v-img>
        </v-row>
    </section>

    <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">ABOUT ME</h2>

        <v-responsive class="mx-auto mb-8" width="56"><v-divider class="mb-1"></v-divider>
            <v-divider></v-divider>
        </v-responsive>

        <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720">
            Vuetify is the #1 component library for Vue.js and has been in active development since 2016. The goal of the project is to provide users with everything that is needed to build rich and engaging web applications using the Material Design specification. It accomplishes that with a consistent update cycle, Long-term Support (LTS) for previous versions, responsive community engagement, a vast ecosystem of resources and a dedication to quality components.
        </v-responsive>

        <v-avatar class="elevation-12 mb-12" size="128">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-avatar>

        <div></div>

        <v-btn color="green" href="https://vuetifyjs.com" outlined large>
            <span class="green--text text--darken-1 font-weight-bold">
            Vuetify Documentation
            </span>
        </v-btn>
        </v-container>

        <div class="py-12"></div>
    </section>

    <section id="features">
        <div class="py-12"></div>

        <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">VUETIFY FEATURES</h2>
        <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
        </v-responsive>

            <v-row>
                <v-col v-for="({ icon, title, text }, i) in features" :key="i" cols="12" md="3">

                <v-card class="pt-8 px-4" min-height="275" elevation="3">
                        <v-theme-provider dark>
                            <div>
                                <v-avatar color="green" size="68">
                                 <v-icon large v-text="icon"></v-icon>
                                </v-avatar>
                            </div>
                        </v-theme-provider>

                        <v-card-title class="justify-center font-weight-black text-uppercase" v-text="title" ></v-card-title>
                        <v-card-text class="subtitle-1 pa-2" v-text="text"></v-card-text>
                </v-card>

                </v-col>
            </v-row>
        </v-container>
    </section>
    
</v-content>

</template>

<script>
export default {  
    data () {
      return {
        articles: [
          {
            src: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Mobile first & Responsive',
            text: 'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.',
          },
          {
            src: 'https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Think outside the box',
            text: 'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.',
          },
          {
            src: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80',
            title: 'Small changes, big difference',
            text: 'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.',
          },
        ],
        features: [
          {
            icon: 'mdi-account-group-outline',
            title: '1. Schritt',
            text: 'Profil erstellen',
          },
          {
            icon: 'mdi-update',
            title: '2. Schritt',
            text: 'Baum registrieren oder Baum auswählen',
          },
          {
            icon: 'mdi-shield-outline',
            title: '3. Schritt',
            text: 'Früchte ernten und geniessen!',
          },
        {
            icon: 'mdi-shield-outline',
            title: '4. Schritt',
            text: 'Ernte abschliessen und etwas spenden',
          },
        ],
        stats: [
          ['24k', 'Github Stars'],
          ['330+', 'Releases'],
          ['1m', 'Downloads/mo'],
          ['5m', 'Total Downloads'],
        ],
      }
    }
}
</script>