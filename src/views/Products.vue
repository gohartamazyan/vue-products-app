<template>
  <v-container class="products-container" fluid>
    <div class="text-center"
         v-if="loading">
      <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>

    <template v-else>
      <v-row class="mt-16">
        <v-col v-for="(product, index) in products"
               :key="product.id"
               :class="{
                        'mt-8 mt-lg-0 mt-md-0': index !== 0
                    }">
          <v-card
              class="mx-auto product-card"
              max-width="400"
              min-width="400">
            <v-img
                :src="product.picture"
                class="white--text justify-center mx-4 "
                height="350px"
                size="81">
            </v-img>

            <v-card-text class="black--text justify-center d-flex pt-0">
              <h3 class="font-weight-bold"
                  slot="16"
              >{{ product.name }}</h3>
            </v-card-text>

            <v-card-actions class="justify-space-between d-flex">
              <span class="text--secondary">$ {{ product.price }}</span>

              <v-btn @click="details(product)"
                     color="pink px-6"
                     class="white--text rounded-pill"
                     small>
                Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-pagination
              v-if="products.length"
              v-model="currentPage"
              @input="loadProducts"
              :total-visible="5"
              :length="last_page"
          />
        </v-col>
      </v-row>
    </template>

    <product-details-modal
        :state.sync="modal"
        :product="product"
    />
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProductDetailsModal from '../components/ProductDetailsModal';

export default {
  name: 'Products',

  components: {
    ProductDetailsModal,
  },

  data: () => ({
    product: {},
    currentPage: 1,
    per_page: 2,
    last_page: 1,
    modal: false,
    loading: false,
  }),

  computed: {
    ...mapGetters({
      products: "products/products",
    }),
  },

  mounted() {
    this.loadProducts()
  },

  methods: {
    ...mapActions(({
      getProducts: "products/getProducts"
    })),
    details(product) {
      this.product = product;
      this.modal = true
    },
    loadProducts() {
      this.loading = true;

      this.getProducts({
        page: this.currentPage,
        per_page: this.per_page,
      })
          .then(data => {
            this.per_page = data.per_page
            this.last_page = data.last_page
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss">
.products-container {
  min-height: 100%;
  background: #EEEEEE;
  margin: 0;

  .product-card {
    position: relative;
    background-color: white;

    .v-image {
      border-radius: 10px !important;
      top: -29px;
      box-shadow: 0 8.8px 5.5px -1px rgb(0 0 0 / 25%), 0 20.3px 18.3px -1px rgb(0 0 0 / 22%), 0 10px 15px -1px rgb(0 0 0 / 3%);
      //box-shadow: 0 3px 3px -1px rgb(0 0 0 / 25%), 0 3px 3px -1px rgb(0 0 0 / 22%), 0 3px 3px -1px rgb(0 0 0 / 10%);
    }

    .v-card__actions {
      padding: 20px 16px 20px 30px;
    }
  }
}
</style>
