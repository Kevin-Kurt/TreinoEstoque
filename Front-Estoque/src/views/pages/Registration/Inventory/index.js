import ApiService from "../../../../services/ApiService";

export default {
  name: "Inventory",

  components: {},

  data: () => ({
    products: [],
    apiService: new ApiService(),
  }),

  methods: {

    Inventary() {
      this.apiService.get("Products/list", this.products).then((response) => {    
        this.products = response
     
      })
    },

    remove(id) {
      this.apiService.delete(`Products/${id}`, this.products).then((response) => {
        console.log(response)
        this.Inventary()
        this.$toast.success("Item deletado com sucesso");
      })
    }, 
  },


  created() {
    this.Inventary()
  }


};