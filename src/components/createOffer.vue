<template>
    <v-container class="pt-4">
        <v-row class="justify-center">
            <!-- Card -->
            <v-card class="ma-0 pa-2" width="90%" max-width="600px" elevation="3">
                <v-row>
                    <v-col>
                        <v-btn outlined small color="green" @click="onPickFile">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"/>
                    </v-col>
                </v-row>
                <!-- Form -->
                <v-form class="px-3 pt-6">

                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    
}
</script>