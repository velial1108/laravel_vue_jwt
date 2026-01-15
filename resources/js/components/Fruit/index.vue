<script>
import config from "bootstrap/js/src/util/config.js";
import api from  "../../api"
export default {
    name: 'Index',
    data(){
        return{
            fruits:null,
            // api:null
        }
    },
    mounted() {
        // this.initApi()
        this.getFruits()
    },
    methods:{
        getFruits(){
            api.get('/api/auth/fruits')
                .then(res=>{
                    this.fruits = res.data.data
                    }
                )
        },
        // initApi(){
            //пример как в ручную сделать переход если нет токена для отдельного компонента
            // //start requst
            // const api = axios.create();
            // api.interceptors.request.use(
            //     config => {
            //         if(localStorage.getItem('access_token')){
            //         config.headers = {
            //             'authorization': `Bearer ${localStorage.getItem('access_token')}`
            //         }
            //         }
            //         return config
            //     },
            //     //ошибка возникает только при проблемах при получении запроса с фронтас клиентской частью
            //     error => {}
            // )
            //     //end request
            // api.interceptors.response.use(config => {
            //     if(localStorage.getItem('access_token')) {
            //         config.headers = {
            //             'authorization': `Bearer ${localStorage.getItem('access_token')}`
            //         }
            //     }
            //     return config
            // },error => {
            //     if(error.response.status === 401) {
            //         this.$router.push({name: 'user.login'})
            //     }
            // })
            // this.api = api
        // }
    }
}
</script>

<template>
<div>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="fruit in fruits">
            <th scope="row">{{ fruit.id }}</th>
            <td>{{ fruit.name }}</td>
            <td>{{ fruit.price }}</td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>

</style>
