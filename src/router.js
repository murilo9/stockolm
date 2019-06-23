import Vue from 'vue'
import Router from 'vue-router'
import Agenda from './views/Agenda.vue'
import Tarefas from './views/Tarefas.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/agenda',
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: Agenda
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: Tarefas
    }
  ],
  scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return { selector: to.hash }
		} else if (savedPosition) {
    		return savedPosition;
    	} else {
			return { x: 0, y: 0 }
		}
	}
})
