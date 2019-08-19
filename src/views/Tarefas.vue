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
      @change-state="changeState"
      @delete-task="deleteTask"/>
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
  changeState (taskId){
    this.$emit('change-task-state', taskId)
  },
  deleteTask(taskId){
    axios.delete(`http://localhost:8888/task/${this.session.username}/${this.session.hash}/${taskId}`)
    .then((response) => {
      this.$emit('reload-tasks')
    })
    .catch((error) => {
      alert(error)
    })
  }
}

var props = {
  session: Object,
  tasks: Array,
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