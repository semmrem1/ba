import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify, {
    iconfont: "md",
    theme: {
        primary: 'green',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
    }
});
    

export default new Vuetify({
});
