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
                    <input type="text" placeholder="Senha" v-model="password">
                </div>
                <div class="field">
                    <button class="login-button" type="button">Entrar</button>
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
var data = () => {
    return {
        username: '',
        password: ''
    }
}
export default {
    
}
</script>
