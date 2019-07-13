<template>
  <div class="tasks">
    <h1>Tarefas</h1>
    <div class="task-list ui grid">
      <div class="task row header">
        <div class="one wide column"></div>
        <div class="task-header ten wide column">Tarefa</div>
        <div class="one wide column">Prior.</div>
        <div class="two wide column">Início</div>
        <div class="two wide column">Fim</div>
      </div>
      <Task v-for="(task, t) in tasks" 
      :key="t" 
      :task="task" 
      @change-status="changeStatus"/>
    </div>
  </div>
</template>

<script>
import Task from '../components/Task.vue';

var data = function(){
  return {
    tasks: [
      {
        id: 0,
        title: 'Programar site do Stockolm',
        details: 'Detalhes...',
        startDate: new Date('July 01, 2019'),
        endDate: undefined,
        priority: 1,
        status: 0
      },
      {
        id: 1,
        title: 'Programar o sistema do Stockolm',
        details: 'Detalhes...',
        startDate: undefined,
        endDate: undefined,
        priority: 1,
        status: 1
      },
      {
        id: 2,
        title: 'Fazer coisa que começa e termina no mesmo dia',
        details: 'Detalhes...',
        startDate: new Date('June 22, 2019'),
        endDate: new Date('June 22, 2019'),
        priority: 1,
        status: 1
      },
      {
        id: 3,
        title: 'Fazer fucking tarefa de libras',
        details: 'Detalhes...',
        startDate: new Date('June 28, 2019'),
        endDate: new Date('June 28, 2019'),
        priority: 3,
        status: 0
      },
      {
        id: 4,
        title: 'Estudar libras',
        details: 'Detalhes...',
        startDate: undefined,
        endDate: new Date('June 28, 2019'),
        priority: 2,
        status: 0
      },
      {
        id: 5,
        title: 'Coisa ja feita',
        details: 'Detalhes...',
        startDate: undefined,
        endDate: new Date('June 20, 2019'),
        priority: 2,
        status: 2
      }
    ]
  }
}

var methods = {
  changeStatus: function(taskId){
    console.log(taskId)
    this.$data.tasks.forEach(function(task, t){
      if(task.id == taskId){
        task.status++;
        if(task.status == 3)
          task.status = 0;
      }
    });
  }
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
    color: white;
    margin: 0 20%;
    .task-list{
      color: #444;
      text-align: left;
      width: 100%;
      .row{
        &.header{
          font-weight: bold;
          color: white;
        }
        .column{
          text-align: center;
          padding: 0;
        }
        .task-header{
          text-align: left;
        }
      }
    }
  }
</style>
