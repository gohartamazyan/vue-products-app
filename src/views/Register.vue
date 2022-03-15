<template>
  <v-container fluid>
    <v-layout row wrap align-center class="register-container">
      <v-overlay absolute color="primary" z-index="0" opacity="0.4"/>

      <v-flex>
        <v-card class="mx-auto my-8" max-width="600">
          <v-card-title class="justify-center pb-2 pt-14">
            <h2 class="head-title">Register</h2>
          </v-card-title>

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-card-text class="px-10">
              <v-text-field
                  v-model="name"
                  @input="clearFieldValidation('name')"
                  :rules="rules.name"
                  prepend-icon="mdi-face-man"
                  label="Name"
                  :error-messages="errorMessages.name"
              />

              <v-text-field
                  v-model="email"
                  @input="clearFieldValidation('email')"
                  :rules="rules.email"
                  prepend-icon="mdi-email"
                  label="E-mail"
                  :error-messages="errorMessages.email"
              />

              <v-menu
                  v-model="startMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="education_start_date"
                      label="Education Start Date"
                      prepend-icon="mdi-calendar-blank"
                      :rules="rules.education_start_date"
                      :error-messages="errorMessages.education_start_date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  />
                </template>
                <v-date-picker
                    v-model="education_start_date"
                    @input="startMenu = false"
                />
              </v-menu>

              <v-menu
                  v-model="endMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="education_end_date"
                      label="Education End Date"
                      prepend-icon="mdi-calendar-blank"
                      :rules="rules.education_end_date"
                      :error-messages="errorMessages.education_end_date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  />
                </template>

                <v-date-picker
                    v-model="education_end_date"
                    @input="endMenu = false"
                />
              </v-menu>

              <v-text-field
                  v-model="password"
                  @input="clearFieldValidation('password')"
                  :rules="rules.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  prepend-icon="mdi-lock-outline"
                  label="Password"
                  :error-messages="errorMessages.password"
              />

              <v-text-field
                  v-model="password_confirmation"
                  @input="clearFieldValidation('password_confirmation')"
                  :rules="[
                    ...rules.password_confirmation,
                    password_confirmation === password ||
                      'The password and password confirmation you entered don\'t match.'
                  ]"
                  :append-icon="showPasswordConf ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPasswordConf ? 'text' : 'password'"
                  @click:append="showPasswordConf = !showPasswordConf"
                  prepend-icon="mdi-lock-outline"
                  label="Confirm Password"
                  :error-messages="errorMessages.password_confirmation"
              />

              <v-checkbox
                  v-model="terms"
                  @change="clearFieldValidation('terms')"
                  :rules="rules.terms"
                  class="mt-0"
                  :error-messages="errorMessages.terms"
              >
                <template v-slot:label>
                  <span
                  >I agree to the
                    <a @click.stop="$router.push('/terms')"
                    >terms and conditions</a
                    >.</span
                  >
                </template>
              </v-checkbox>
            </v-card-text>

            <v-card-actions class="flex-column pb-10">
              <v-btn
                  :disabled="!valid"
                  color="primary"
                  rounded
                  @click="attempt"
                  class="white--text py-6 px-10 mb-3"
              >
                Get Started
              </v-btn>

              <v-divider/>
              <span
              >Already have an account?
                <router-link to="/login">Login</router-link></span
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Register",

  data: () => ({
    valid: true,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
    education_start_date: null,
    education_end_date: null,

    rules: {
      name: [
        v => !!v || "Name is required.",
        v => (v && v.length >= 2) || "Name must contain minimum 2 characters."
      ],
      email: [
        v => !!v || "E-mail is required.",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid."
      ],
      password: [
        v => !!v || "Password is required.",
        v => v.length >= 6 || "Password should contain min 6 characters.",
        v => /[0-9]/.test(v) || "Password should contain at least one number.",
        v =>
            /[a-z]/.test(v) ||
            "Password should contain at least one lower case character.",
        v =>
            /[A-Z]/.test(v) ||
            "Password should contain at least one upper case character."
      ],
      password_confirmation: [v => !!v || "E-mail is required."],
      education_start_date: [v => !!v || "Education start date is required."],
      education_end_date: [v => !!v || "Education end date is required."],
      terms: [v => !!v || "You must agree to continue!"]
    },

    showPassword: false,
    showPasswordConf: false,

    startMenu: false,
    endMenu: false,
    errorMessages: {},
  }),

  watch: {
    education_start_date () {
      this.validateDate('start');
      this.clearFieldValidation('education_start_date')
    },
    education_end_date () {
      this.validateDate('end');
      this.clearFieldValidation('education_end_date')
    }
  },

  computed: {
    isStartGreater () {
      return Date.parse(this.education_start_date) >= Date.parse(this.education_end_date)
    },
  },

  methods: {
    ...mapActions({
      register: "auth/register"
    }),
    validateDate (field) {
      if (this.education_start_date && this.education_end_date) {
        if (field === 'start') {
          this.rules.education_start_date = [!this.isStartGreater || 'Start date must be less than end date.']
          this.rules.education_end_date = []
        }
        if (field === 'end') {
          this.rules.education_end_date = [!this.isStartGreater || 'End date must be greater than start date.']
          this.rules.education_start_date = []
        }
      }
    },
    clearFieldValidation(field) {
      if (this.errorMessages[field]) this.errorMessages[field] = null;
    },
    async attempt() {
      if (!this.$refs.form.validate()) return;

      this.register({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        education_start_date: this.education_start_date,
        education_end_date: this.education_end_date,
        terms: this.terms,
      })
          .then(() => {
            this.$toast.success("Account has been created successfully.");
            this.$router.push({name: "products"});
          })
          .catch(err => {
            if (err.status === 422) {
              this.errorMessages = err.data;
            }
          });
    }
  }
};
</script>

<style lang="scss">
.register-container {
  background-image: url("~@/assets/imgs/bg_1.jpeg");
  background-size: cover;
  min-height: 100vh;

  .head-title {
    font-family: serif;
  }

  .v-input {
    margin-top: 10px;
  }
}
</style>
