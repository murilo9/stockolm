<template>
  <div id="app">
    <template v-if="user.logged">
      <div id="nav">
        <p class="date-label">
          <a href='' onclick="event.preventDefault()">{{getDateLabel}}</a>
        </p>
          <router-link :to="{path: '/agenda#month', params: {session: session ? session : ''}}">
            <p><i class="calendar alternate outline icon"></i></p>
            <p>Agenda</p>
          </router-link>
          <router-link :to="{path: '/tarefas', params: {session: session ? session : ''}}">
            <p><i class="edit outline outline icon"></i></p>
            <p>Tarefas</p>
          </router-link>
          <router-link :to="{path: '/projetos', params: {session: session ? session : ''}}">
            <p><i class="lemon outline icon"></i></p>
            <p>Projetos</p>
          </router-link>
          <a href='#' onclick="event.preventDefault()" @click="logout">
            <p><i class="sign-out icon"></i></p>
            <p>Logout</p>
          </a>
      </div>
      <router-view ref="view"
      :tasks="tasks" 
      :session="session ? session : null"
      @change-task-state="changeTaskState" 
      @change-task-priority="changeTaskPriority"
      @reload-tasks="loadTasks"/>
    </template>
    <template v-else>
      <LoginScreen @login="login"/>
    </template>
    <CreateTaskModal :session="session" @reload-tasks="loadTasks"/>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  position: fixed;
  background: #1ac4aa;
  padding-bottom: 1.5em;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: white;
    }
    margin: 0 1em;
    i{
      font-size: 2em;
    }
  }
  .date-label{
    width: 100%;
    margin-top: 0.5em;
    margin-bottom: 1.5em;
    a{
      width: 50%;
      font-size: 1.2em;
      padding: 0.3em;
      color: white;
    }
  }
}
</style>

<script>
import LoginScreen from './views/LoginScreen.vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import CreateTaskModal from './components/modals/CreateTaskModal.vue'
import { setInterval } from 'timers';

var components = {
  LoginScreen,
  CreateTaskModal
}

var data = () => {
  return {
    user: {
      logged: false
    },
    tasks: [],
    session: {},
    now: new Date(),
    nowInterval: ''
  }
}

var computed = {
  getDateLabel: function(){
    const months = ['Jan(01)', 'Fev(02)', 'Mar(03)', 'Abr(04)', 'Maio(05)', 'Jun(06)',
                    'Jul(07)', 'Ago(08)', 'Set(09)', 'Out(10)', 'Nov(11)', 'Dez(12)']
    var day = this.now.getDate();
    var month = this.now.getMonth()+1;
    var year = this.now.getFullYear();
    var hour = this.now.getHours();
    var min = this.now.getMinutes();
    return day+' '+months[month]+' de '+year+' - '+(hour > 9 ? hour : '0'+hour)+':'+(min > 9 ? min : '0'+min)
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
        expire: new Date(Cookies.get('sessionExpire'))
      }
    else
      return false
  },
  loadTasks(){    //Carrega todas as tarefas do servidor:
    axios.get(`http://localhost:8888/task/${this.session.username}`)
    .then((response) => {
      var resData = response.data;
      this.tasks.splice(0, this.tasks.length);
      if(resData.taskList){
        //Inicializa os objetos Date:
        resData.taskList.forEach((task, i) => {
          task.startDate = task.startDate ? new Date(task.startDate) : null
          task.endDate = task.endDate ? new Date(task.endDate) : null
          this.tasks.push(task);
        })
        if(this.$refs.view)
          this.$refs.view.generateCalendar();
      }
    })
    .catch((error) => {
      console.log(error);
    })
  },
  changeTaskPriority(taskId){
    this.tasks.forEach((task, t) => {
      if(task.id == taskId){
        task.priority++
        if(task.priority >= 3)
          task.priority = 0
        axios.put(`http://localhost:8888/task/${this.session.username}/${taskId}`, {
          session: this.session,
          task: {
            priority: task.priority
          }
        }).then((response) => {
          //Do nothing
        }).catch((error) => {
          alert('Houve um erro ao tentar atualizar a tarefa.')
        })
      }
    })
  },
  changeTaskState(taskId){
    this.tasks.forEach((task, t) => {
      if(task.id == taskId){
        task.state++
        if(task.state >= 3)
          task.state = 0
        axios.put(`http://localhost:8888/task/${this.session.username}/${taskId}`, {
          session: this.session,
          task: {
            state: task.state
          }
        }).then((response) => {
          //Do nothing
        }).catch((error) => {
          alert('Houve um erro ao tentar atualizar a tarefa.')
        })
      }
    })
  },
  refreshDateNow(){
    this.now = new Date()
  }
}

export default {
  components: components,
  computed: computed,
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
      var now = new Date()
      if(now.getTime() < session.expire.getTime()){
        this.session = session
        this.user.logged = true
        this.loadTasks()
      }
    }
    this.nowInterval = setInterval(this.refreshDateNow, 60000)
  }
}
</script>
