<template>
  <div id="app">
    <template v-if="user.logged">
      <div id="nav">
          <router-link :to="{path: '/agenda#month', params: {session: session}}">
            Agenda
          </router-link> |
          <router-link :to="{path: '/tarefas', params: {session: session}}">
            Tarefas
          </router-link> |
          <router-link :to="{path: '/projetos', params: {session: session}}">
            Projetos
          </router-link> |
          <a href='#' onclick="event.preventDefault()" @click="logout">
            Logout
          </a>
      </div>
      <router-view :tasks="tasks"/>
    </template>
    <template v-else>
      <Login @login="login"/>
    </template>
  </div>
</template>

<style lang="scss">
body{
  background: #1ac4aa;
}
#app {
  font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>

<script>
import Login from './views/Login.vue'
import axios from 'axios'

var components = {
  Login
}

var data = () => {
  return {
    user: {
      logged: false
    },
    session: {
      username: '',
      hash: ''
    },
    tasks: []
  }
}

var methods = {
  login(session){
    this.$data.session = session
    this.$data.user.logged = true
    this.loadTasks()
  },
  logout(){   //Request para deletar a session do servidor:
    axios.delete(`http://localhost:8888/login/${this.$data.session.username}/${this.$data.session.hash}`, {   
      session: this.$data.session
    })
    .finally(() => {    //Independentemente do resultado, desloga:
      this.$data.user.logged = false
      this.$data.session = {}
    })
  },
  loadTasks(){    //Carrega todas as tarefas do servidor:
    axios.get(`http://localhost:8888/task/${this.$data.session.username}`)
    .then((response) => {
      var resData = response.data;
      if(resData.taskList){
        //Inicializa os objetos Date:
        resData.taskList.forEach((task, i) => {
          task.startDate = task.startDate ? new Date(task.startDate) : null
          task.endDate = task.endDate ? new Date(task.endDate) : null
        })
        this.$data.tasks = resData.taskList
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export default {
  components: components,
  data: data,
  methods: methods,
  watch: {
    $route (to, from) {
      this.loadTasks()
    }
  }
}
</script>
