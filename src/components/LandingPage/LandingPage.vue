<template>
    <v-content class="pt-0"> 
    <section id="hero" elevation-3>
        <v-row justify="center" no-gutters>
        <v-img class="elevation-3" justify-center max-height="600px" :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
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
                    <span  class="font-weight-bold">OBST </span>
                    <span class="font-weight-light">VOM</span>
                    <p class="font-weight-bold">BAUM</p>
                      </span>
                      <div class="py-1"></div>
                  </v-col>
                  <span ></span>
                    <v-btn class="align-self-end pa-2" color="green" to="/registerPriv">Registrieren</v-btn>
                    <!-- <div class="pa-2"></div> -->
                    <!-- <v-btn class="align-self-end pa-2" color="green" to="/registerPriv">Obst ernten</v-btn> -->
                  </v-row>
              </v-container>
            </v-theme-provider>
        </v-img>
        </v-row>
    </section>
      <div class="py-12"></div>
      
      <!-- SO FUNKTIONIERTS -->
      <v-container fluid class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">SO FUNKTIONIERTS</h2>
        <!-- <p>In 4 Schritten zum geernteten Obst</p> -->
          <v-responsive class="mx-auto mb-12" width="75">
              <v-divider class="mb-1"></v-divider>
              <v-divider></v-divider>  
          </v-responsive>
            <v-row class="justify-center">
                <v-col v-for="({ icon, title, text }, i) in features" :key="i" cols="12" md="3">
                  <v-card class="pt-8 px-4" min-height="250" elevation="3">
                    <v-theme-provider dark>
                        <div>
                            <v-avatar color="green" size="68">
                            <v-icon large v-text="icon"></v-icon>
                            </v-avatar>
                        </div>
                    </v-theme-provider>

                    <v-card-title class="justify-center font-weight-black text-uppercase" v-text="title" ></v-card-title>
                    <v-card-text class="subtitle-1" v-text="text"></v-card-text>
                  </v-card>
                </v-col>
            </v-row>
        </v-container>
        
        <div class="py-8"></div>

    <!-- WHY WHAT HOW -->
    <section id="what-how-why">
        <div class="py-12"></div>
        <v-container fluid class="text-center px-0">
          <!-- HEADER -->
          <h2 class="display-2 font-weight-bold mb-3">NACHHALTIGES OBSTSHARING</h2>
            <v-responsive class="mx-auto mb-8" width="75">
              <v-divider class="mb-1"></v-divider>
                <v-divider></v-divider>
            </v-responsive>
            <v-responsive class="mx-auto title font-weight-light mb-8" >
              <v-row class="justify-center">
                <v-col v-for="({ icon, title, text }, i) in progress" :key="i" cols="12" md="3">
                  <v-card class="pt-4 px-2" min-height="250" elevation="0">
                    <div>
                        <v-avatar color="white" size="50">
                        <v-icon large color="black" v-text="icon"></v-icon>
                        </v-avatar>
                    </div>
                    <v-card-title class="justify-center px-1 font-weight-black text-uppercase" color="green" v-text="title"></v-card-title>
                    <v-card-text class="subtitle-1 px-1 text-left" v-text="text"></v-card-text>
                  </v-card>
                  </v-col>
                </v-row>
                  <div class="py-8"></div>
                <v-btn class="align-self-end pa-2 font--white" outlined to="/contact">Kontakt</v-btn>
            </v-responsive>
        </v-container>



      <div class="py-8"></div>
      <!-- PRALLAX -->
        <v-parallax height="700" class="elevation3" src="https://images.unsplash.com/photo-1572578061791-a609757bf4ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80">
        <v-container justify-center fill-height>
            <v-row class="justify-center">
              <v-col v-for="[value, title] of stats" :key="title" cols="12" md="3">
                <div class="text-center">
                  <div class="display-3 font-weight-black mb-4" v-text="value"></div>
                  <div class="title font-weight-bold text-uppercase" v-text="title" ></div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
        <div class="py-8"></div>
    </section>


        <!-- REZEPTE -->
        <section id="Rezepte">
        <div class="py-12"></div>
        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Rezepte</h2>
          <v-responsive class="mx-auto mb-12" width="75">
            <v-divider class="mb-1"></v-divider>
            <v-divider></v-divider>
          </v-responsive>
          <v-row>
            <v-col v-for="({ src, text, title }, i) in articles" :key="i" cols="12" md="4">
              <v-img :src="src" class="mb-4" height="275" max-width="100%"></v-img>
              <h3 class="font-weight-black mb-4 text-uppercase" v-text="title"></h3>
              <div class="title font-weight-light mb-5" v-text="text"></div>
              <v-btn class="ml-n4 font-weight-black" text>mehr</v-btn>
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
            icon: 'mdi-food-apple',
            title: '3. Schritt',
            text: 'Früchte ernten und geniessen!',
          },
        {
            icon: 'mdi-cash',
            title: '4. Schritt',
            text: 'Ernte abschliessen und etwas spenden',
          },
        ],
        progress: [
          {
            icon: 'mdi-vector-polyline',
            title: 'Vermittlung',
            text: 'Obst vom Baum ermöglicht das Inserieren von Obst, welches geerntet oder abgeholt werden kann. Auf diese Weise kann überschüssiges Obst an Konsumenten weitegegeben werden.',
          },
          {
            icon: 'mdi-trackpad',
            title: 'Plattform',
            text: 'Das Projekt «Obst vom Baum» ist eine Plattform, über welche überschüssiges Obst zwischen Privatpersonen und Obstbauern angeboten und nachgefragt werden kann. Das anbieten von Bäumen ist kostenlos. Die Erträge werden an eine gemeinnützige Organisation nach Wahl des Anbieters gespendet.',
          },
          {
            icon: 'mdi-food',
            title: 'Foodwaste',
            text: 'Privates Obst findet oftmals nicht den Weg zum Konsumenten. Aufgrund mangelnder Qualität für den Detailhandel, zu kleinen Mengen oder nicht vorhandener Ressourcen zur Ernte kann Obst oftmals nicht vollständig verwertet werden.',
          },
        ],
        articles: [
          {
            src: 'https://images.unsplash.com/photo-1584541305671-af4f46b4be2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1474&q=80',
            title: 'Vegane Apfelwähe',
            text: 'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.',
          },
          {
            src: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            title: 'Apfelkuchen: Der Klassiker',
            text: 'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.',
          },
          {
            src: 'https://images.unsplash.com/photo-1570299792061-8b78ae15915f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            title: 'Bündner Apfel-Nuss Torte',
            text: 'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.',
          },
        ],
        stats: [
          ['18', 'erfasste Obstbäume'],
          ['98', 'verfügbare Ernten'],
          ['330kg', 'geerntetes Obst'],
        ],
      }
    }
}





</script>