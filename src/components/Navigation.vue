<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/imgs/products_shop.png"
          transition="scale-transition"
          width="80"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn @click="logout" text>
      <span class="mr-2">Logout</span>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navigation',

  data: () => ({}),

  methods: {
    logout() {
      this.$store.commit('auth/setToken', null);
      this.$router.push({name: 'login'})
    }
  }
}
</script>
