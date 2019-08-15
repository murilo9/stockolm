<template>
    <div class="login">
        <div class="login-title">
            <h1>
                <i class="lemon icon"></i>
                Stockolm
            </h1>
            <p>Se a vida lhe der limões, faça uma limonada ;)</p>
        </div>
        <div class="login-form">
            <form class="ui form">
                <div class="field">
                    <input type="text" placeholder="Usuário" v-model="username">
                </div>
                <div class="field">
                    <input type="password" placeholder="Senha" v-model="password">
                </div>
                <div class="field">
                    <button class="login-button" type="submit" @click="login">Entrar</button>
                </div>
                <div class="field">
                    <p>{{error}}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .login{
        color: white;
        .login-title{
            margin: 3em 0;
            h1{
                font-size: 6em;
            }
            p{
                font-size: 1.2em;
            }
        }
        .login-form{
            margin: 0 40%;
            .login-button{
                padding: 0.5em 1.2em;
                color: white;
                border: 2px solid white;
                background: #1ac4aa;
                font-weight: bold;
            }
        }
    }
</style>

<script>
import axios from 'axios'

var data = () => {
    return {
        username: '',
        password: '',
        error: ''
    }
}

var methods = {
    login(){
        var self = this;
        axios.post('http://localhost:8888/login', {
            username: this.$data.username,
            password: this.$data.password
        })
        .then((response) => {
            var resData = response.data;
            if(resData.session){
                self.$emit('login', resData.session)
            }
        })
        .catch((error) => {
            this.$data.error = error;
        })
    }    
}

var watch = {
}

export default {
    data: data,
    methods: methods,
    watch: watch
}
</script>
