<template>
    <v-content class="pt-0"> 
    <section id="hero" elevation-3>
        <v-row justify="center">
        <v-img class="elevation-3" justify-center max-height="100%" :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
        src="https://images.unsplash.com/photo-1539756250244-b39c3a836b85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80">
            <v-theme-provider dark>
            <v-container fluid fill-height>
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
                    <v-btn class="align-self-end pa-2" color="green" to="/registerCom">Obst anbieten</v-btn>
                    <div class="pa-2"></div>
                    <v-btn class="align-self-end pa-2" color="green" to="/registerPriv">Obst ernten</v-btn>
                  </v-row>
              </v-container>
            </v-theme-provider>
        </v-img>
        </v-row>
    </section>


    <section id="what-how-why">
        <div class="py-12"></div>

        <v-container fluid class="text-center px-0">
        <h2 class="display-2 font-weight-bold mb-3">WHAT - HOW - WHY</h2>

        <v-responsive class="mx-auto mb-8" width="56"><v-divider class="mb-1"></v-divider>
            <v-divider></v-divider>
        </v-responsive>

        <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720">
          <p><span class="font-weight-bold">WHAT </span>do we do</p>
          <p><span class="font-weight-bold">HOW </span>do we do, what we do</p>
          <p><span class="font-weight-bold">WHY </span>do we do, what we do</p>
          <v-img  class="elevation-3" justify-center src="src/assets/saisontabelle.PNG"></v-img>
        </v-responsive>
        <div class="py-8"></div>
  
        <v-parallax height="900" class="elevation3" src="https://images.unsplash.com/photo-1572578061791-a609757bf4ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"></v-parallax>

        </v-container>

        <div class="py-8"></div>
    </section>

    <section id="features">
        <div class="py-12"></div>

        <v-container fluid class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">SO FUNKTIONIERTS</h2>
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
        <div class="py-12"></div>
    </section>
    <div class="py-8"></div>
</v-content>

</template>

<script>
export default {  
    data () {
      return {
        features: [
          {
            icon: 'mdi-account-plus',
            title: '1. Schritt',
            text: 'Profil erstellen',
          },
          {
            icon: 'mdi-tree',
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
      }
    }
}
</script>