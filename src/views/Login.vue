<template>
  <v-container fluid>
    <v-layout row wrap align-center class="login-container">
      <v-flex>
        <v-card
            class="mx-auto my-8"
            max-width="500">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="form-login">
            <v-card-text class="px-10 d-flex justify-center login-box">
              <v-btn
                  @click="attempt"
                  :disabled="!valid"
                  outlined
                  class="purple white--text"
                  width="320"
                  height="80"
                  elevation="5">
                Login
              </v-btn>
            </v-card-text>

            <v-card-text class="px-10 pt-16">
              <v-text-field
                  v-model="form.email"
                  @input="clearFieldValidation('email')"
                  :rules="rules.email"
                  prepend-icon="mdi-email"
                  label="E-mail"
                  :error-messages="errorMessages.email"
              />

              <v-text-field
                  v-model="form.password"
                  @input="clearFieldValidation('password')"
                  :rules="rules.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  prepend-icon="mdi-lock-outline"
                  label="Password"
                  :error-messages="errorMessages.password"
              />
            </v-card-text>

            <v-card-actions class="flex-column pb-10">
              <v-btn
                  :disabled="!valid"
                  rounded
                  @click="attempt"
                  text
                  color="pink">
                Lets go
              </v-btn>

              <v-divider/>

              <span>Don't have an account? <router-link to="/register">Register</router-link></span>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Login',

  data: () => ({
    valid: true,
    form: {
      email: '',
      password: '',
    },
    rules: {
      email: [v => !!v || 'E-mail is required.'],
      password: [v => !!v || 'Password is required.']
    },
    errorMessages: {},
    showPassword: false,
  }),

  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    clearFieldValidation(field) {
      if (this.errorMessages[field]) this.errorMessages[field] = null
    },
    attempt() {
      if (!this.$refs.form.validate()) return;

      this.login(this.form)
          .then(() => {
            this.$router.push({name: 'products'})
          })
          .catch((err) => {
            if (err.status === 422) {
              this.errorMessages = err.data
            }
          })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  background-image: url("~@/assets/imgs/bg_1.jpeg");
  background-size: cover;
  min-height: 100vh;

  .form-login {
    position: relative;

    .theme--light.v-btn.v-btn--disabled {
      color: #ff1d44 !important;
    }

    .login-box {
      position: absolute;
      top: -16%;

      .v-btn--outlined {
        background: linear-gradient(45deg, rgb(101 90 193 / 72%), transparent);
        color: #fff;
      }
    }
  }
}
</style>
