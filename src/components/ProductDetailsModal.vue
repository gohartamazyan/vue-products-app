<template>
  <v-dialog
      v-model="state"
      content-class="product-details"
      @click:outside="close"
  >
    <v-card>
      <v-card-title>
        <v-icon @click="close">mdi-close-thick</v-icon>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-img :src="product.picture"/>
          </v-col>
          <v-col cols="7">
            <h1>{{ product.name }}</h1>
            <div class="text--secondary mt-3">${{ product.price }}</div>

            <div class="description">Description</div>
            <v-divider class="my-3"/>

            <div class="subtitle-1">{{ product.description }}</div>

            <v-btn color="pink px-6"
                   class="white--text rounded-pill mt-10 mb-14"
                   small>
              Add to cart
              <v-icon @click="close"
                      small
                      class="ml-2">mdi-cart
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ProductDetailsModal',

  props: {
    state: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    close() {
      this.$emit('update:state', false)
    }
  }
}
</script>

<style lang="scss">
.product-details {
  max-width: 80%;
  width: 80%;

  .v-card {
    border: 8px solid #000;

    .v-card__title {
      justify-content: flex-end;

      .mdi-close-thick {
        color: #000;
      }
    }

    .v-card__text {
      .description {
        color: #E91E65;
        margin-top: 30px;
      }
    }
  }
}
</style>
