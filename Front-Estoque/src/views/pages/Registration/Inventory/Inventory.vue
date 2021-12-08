<template>
  <v-container> 
        <table class="table table-striped table-dark">
            <thead>
                <tr>                  
                    <th scope="col">Produto</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Código</th>
                    <th scope="col">Deletar</th>
                </tr>
            </thead>

             <tbody>
                <tr v-for="(product,index) in products" v-bind:key="index"  scope="row">                                                    
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.code}}</td>
                   <td><button @click="remove(product.id)">Deletar</button></td>             
                </tr>
            </tbody>            
        </table>       
  </v-container>
</template>

<style scoped>
  table{
    width: 100%;
    height: 100%;
  }
  td,th{
    text-align: center;
  }
  
</style>

<script src="./index.js"></script>