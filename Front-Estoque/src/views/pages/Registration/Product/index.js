import ApiService from "../../../../services/ApiService";

export default {
  name: "Registration",

  components: {},
  
  data: () => ({
    apiService: new ApiService(),
    product: {

      name:"",
      price:"",
      code:"",
    },
  }),
  
  methods: {
    CreateProduct(){
      if(this.$refs.Form.validate()){
        this.apiService.post("Products/register", this.product).then((response)=>{
          console.log(response)
          this.$refs.name.reset();
          this.$refs.price.reset();
          this.$refs.code.reset();
          this.$toast.success("Produto cadastrado com sucesso");
        })
      }
      else{
        this.$toast.error("Erro ao cadastrar");
      }
      
    }
    
  }
}
