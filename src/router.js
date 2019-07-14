import Vue from 'vue'
import Router from 'vue-router'
import Agenda from './views/Agenda.vue'
import Tarefas from './views/Tarefas.vue'
import Projetos from './views/Projetos.vue'

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
    },
    {
      path: '/projetos',
      name: 'projetos',
      component: Projetos
    },
    {
      path: '/projetos/:id',
      name: 'projetosId',
      component: Projetos
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
