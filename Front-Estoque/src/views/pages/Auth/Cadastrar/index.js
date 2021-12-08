import ApiService from "../../../../services/ApiService";

export default {
  name: "Cadastrar",

  components: {},

  data: () => ({
    user: {
      password:"",
      name:"",
      email:"",
    },
    step: 1,
    loading: false,
    error: false,
    valid: false,
    pin: "",      
    emailRules: [
      (v) => !!v || "E-mail requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    passwordRules: [(v) => !!v || "Senha requerida"],
    apiService: new ApiService(),
  }),
  
  methods: {
    
    CreateUser(){

      this.apiService.post("User/register", this.user).then((response)=>{
        console.log(response)
        this.$toast.success("Usuário cadastrado com sucesso");
        this.$router.push("/");       
      })

    },
  },
};
