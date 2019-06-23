<template>
  <div class="tasks">
    <h1>Tarefas</h1>
    <table class="task-list">
      <tr>
        <th></th>
        <th class="task-header">Tarefa</th>
        <th>Prioridade</th>
        <th>Início</th>
        <th>Fim</th>
      </tr>
      <Task v-for="(task, t) in tasks" :key="t" :task="task" />
    </table>
  </div>
</template>

<script>
import Task from '../components/Task.vue';

var data = function(){
  return {
    tasks: [
      {
        title: 'Programar site do Stockolm',
        startDate: new Date('July 01, 2019'),
        endDate: undefined,
        priority: 1,
        status: 0
      },
      {
        title: 'Programar o sistema do Stockolm',
        startDate: undefined,
        endDate: undefined,
        priority: 1,
        status: 1
      },
      {
        title: 'Fazer coisa que começa e termina no mesmo dia',
        startDate: new Date('June 22, 2019'),
        endDate: new Date('June 22, 2019'),
        priority: 1,
        status: 1
      },
      {
        title: 'Fazer fucking tarefa de libras',
        startDate: new Date('June 28, 2019'),
        endDate: new Date('June 28, 2019'),
        priority: 3,
        status: 0
      },
      {
        title: 'Estudar libras',
        startDate: undefined,
        endDate: new Date('June 28, 2019'),
        priority: 2,
        status: 0
      },
      {
        title: 'Coisa ja feita',
        startDate: undefined,
        endDate: new Date('June 20, 2019'),
        priority: 2,
        status: 2
      }
    ]
  }
}

var methods = {

}

var components = {
  Task
}

export default {
  data: data,
  methods: methods,
  components: components
}
</script>

<style lang="scss" scoped>
  .tasks{
    margin: 0 20%;
    .task-list{
      text-align: left;
      width: 100%;
      tr{
        th{
          text-align: center;
          &.task-header{
            text-align: left;
          }
        }
      }
    }
  }
</style>
