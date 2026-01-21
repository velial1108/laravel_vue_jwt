<script>
import login from "@/components/User/Login.vue";

export default {
    name: 'Registration',
    data () {
        return{
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            access_token:null,
            errors:null,
        }
    },
    mounted(){
        // console.log(this.access_token = localStorage.getItem('access_token'));
    },
    methods:{
        store(){
            axios.post('/api/users',
                {
                    name:this.name,
                    email:this.email,
                    password:this.password,
                    password_confirmation:this.password_confirmation
                }).then(res => {
                    localStorage.setItem('access_token', res.data.access_token)
                    this.$router.push({name: 'user.personal'})
                     })
                .catch(error => {

                    this.errors = error.response.data.errors
                })
        }
    }
}
</script>

<template>
    <div class="w-25">
        <input v-model="name" type="text" class="form-control mt-3 mb-3" placeholder="name">
        <div v-if="errors?.name" class="text-danger">{{ errors.name[0] }}</div>

        <input v-model="email" type="email" class="form-control mb-3" placeholder="email">
        <div v-if="errors?.email" class="text-danger">{{ errors.email[0] }}</div>

        <input v-model="password" type="password" class="form-control mb-3" placeholder="password">
        <div v-if="errors?.password" class="text-danger">{{ errors.password[0] }}</div>

        <input v-model="password_confirmation" type="password" class="form-control mb-3" placeholder="confirm password">

        <input type="submit" @click.prevent="store" class="btn btn-primary">
    </div>
</template>

<style scoped>

</style>
