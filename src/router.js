import Vue from 'vue'
import Router from 'vue-router'
import Agenda from './views/Agenda.vue'
import Tarefas from './views/Tarefas.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'agenda',
      component: Agenda
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: Tarefas
    }
  ]
})
