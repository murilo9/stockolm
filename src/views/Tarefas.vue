<template>
  <div class="tasks">
    <div class="task-list ui grid" v-if="tasks.length">
      <div class="task row header">
        <div class="one wide column"><i class="edit outline icon"></i></div>
        <div class="task-header nine wide column">Tarefa</div>
        <div class="one wide column">Prior.</div>
        <div class="two wide column">Início</div>
        <div class="two wide column">Fim</div>
        <div class="one wide column"><i class="trash alternate icon"></i></div>
      </div>
      <Task v-for="(task, t) in tasks" 
      :key="t" 
      :task="task" 
      @change-state="changeState"
      @change-priority="changePriority"
      @delete-task="deleteTask"/>
    </div>
    <div class="tasks-list-empty" v-else>
      <h3>Não há tarefas</h3>
    </div>
    <div class="create-task ui grid">
      <a href="" 
      onclick="event.preventDefault()" 
      @click="openCreateTaskModal"
      class="sixteen wide column">
        <i class="plus icon"></i>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tasks{
    color: white;
    padding: 10em 20%;
    .task-list{
      color: #444;
      text-align: left;
      width: 100%;
      margin: 0;
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
    .task-list-empty{
      margin: 2em 0;
    }
    .create-task{
      margin: 1em 0;
      a{
        border: 1px solid white;
        padding: 0.2em !important;
        text-decoration: none;
        padding: 0.3em;
        &:hover{
          background: white;
          i{
            color: #1ac4aa;
          }
        }
        i{
          color: white;
          font-size: 1.5em;
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
  changePriority(taskId){
    this.$emit('change-task-priority', taskId)
  },
  deleteTask(taskId){
    axios.delete(`http://localhost:8888/task/${this.session.username}/${this.session.hash}/${taskId}`)
    .then((response) => {
      this.$emit('reload-tasks')
    })
    .catch((error) => {
      alert(error)
    })
  },
  openCreateTaskModal(){
    this.$modal.show('create-task-modal')
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