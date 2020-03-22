import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify, {
    iconfont: "md",
    theme: {
        primary: 'green',
        secondary: 'green',
        accent: 'green',
        error: 'red',
    }
});
    

export default new Vuetify({
});
