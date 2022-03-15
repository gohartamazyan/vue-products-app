<template>
  <v-app>
    <Navigation v-if="isLoggedIn"/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation';
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/loggedIn'
    })
  }
};
</script>

<style lang="scss">
</style>
