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

<script>
import Task from '../components/Task.vue';
import axios from 'axios';

var data = () => {
  return {
      
  }
}

var methods = {
  changeStatus (taskId){
    this.$data.tasks.forEach(function(task, t){
      if(task.id == taskId){
        task.status++;
        if(task.status == 3)
          task.status = 0
      }
    });
  }
}

var props = {
  session: Object,
  tasks: Array
}

var components = {
  Task
}


export default {
  data: data,
  methods: methods,
  components: components,
  props: props
}
</script>