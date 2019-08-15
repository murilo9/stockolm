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
      <router-view :tasks="tasks" @change-task-state="changeTaskState"/>
    </template>
    <template v-else>
      <LoginScreen @login="login"/>
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
import LoginScreen from './views/LoginScreen.vue'
import axios from 'axios'
import Cookies from 'js-cookie'

var components = {
  LoginScreen
}

var data = () => {
  return {
    user: {
      logged: false
    },
    tasks: []
  }
}

var methods = {
  login(session){
    Cookies.set('sessionHash', session.hash)
    Cookies.set('sessionUsername', session.username)
    Cookies.set('sessionExpire', session.expire)
    this.session = session
    this.user.logged = true
    this.loadTasks()
  },
  logout(){   //Request para deletar a session do servidor:
    axios.delete(`http://localhost:8888/login/${this.session.username}/${this.session.hash}`, {   
      session: this.session
    })
    .finally(() => {    //Independentemente do resultado, desloga:
      this.user.logged = false
      this.session = {}
      Cookies.remove('sessionHash')
      Cookies.remove('sessionUsername')
      Cookies.remove('sessionExpire')
    })
  },
  buildSession(){
    if(Cookies.get('sessionHash') && 
    Cookies.get('sessionUsername') && 
    Cookies.get('sessionExpire'))
      return {
        hash: Cookies.get('sessionHash'),
        username: Cookies.get('sessionUsername'),
        expire: Cookies.get('sessionExpire')
      }
    else
      return false
  },
  loadTasks(){    //Carrega todas as tarefas do servidor:
    axios.get(`http://localhost:8888/task/${this.session.username}`)
    .then((response) => {
      var resData = response.data;
      if(resData.taskList){
        //Inicializa os objetos Date:
        resData.taskList.forEach((task, i) => {
          task.startDate = task.startDate ? new Date(task.startDate) : null
          task.endDate = task.endDate ? new Date(task.endDate) : null
        })
        this.tasks = resData.taskList
      }
    })
    .catch((error) => {
      console.log(error);
    })
  },
  changeTaskState(taskId){
    this.tasks.forEach(function(task, t){
      if(task.id == taskId){
        task.state++;
        if(task.state >= 3)
          task.state = 0
      }
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
  },
  mounted: function(){
    var session = this.buildSession()
    if(session){
      this.session = session
      this.user.logged = true
      this.loadTasks()
    }
  }
}
</script>
