import ApiService from "../../../../services/ApiService";

export default {
  name: "Login",

  components: {},

  data: () => ({
    
    user: {
      password:"",
      email:"",
    },
    show: false,
    loading: false,
    error: false,
    valid: true,
    username: "",
    password: "",
    passwordRules: [(v) => !!v || "Senha requerida"],
    apiService: new ApiService(),
    socials: [
      {
        href: "#",
        icon: "mdi-facebook-box",
      },
      {
        href: "#",
        icon: "mdi-twitter",
      },
      {
        href: "#",
        icon: "mdi-github-box",
      },
    ],
  }),
  
  
  methods: {
    Login(){
      this.apiService.post("User/token", this.user).then((response)=>{
        console.log(response)
        const user = JSON.stringify(response.user)
        this.$store.commit("SET_LOGGED_USER",user)
        this.$store.commit("SET_CURRENT_TOKEN",response.token)
        this.$store.commit("SET_EXPIRES_TOKEN",response.validTo)
        if(response.user.userType == 0){
          this.$router.push("/registration");
        }
      })
    }
  }
};
