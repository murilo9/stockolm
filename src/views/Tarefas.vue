<template>
  <div class="tasks">
    <div class="task-list ui grid" v-if="tasks.length">
      <div class="task row header">
        <div class="one wide column"><i class="edit outline icon"></i></div>
        <div class="task-header nine wide column">Tarefa</div>
        <div class="one wide column">Prior.</div>
        <div class="two wide column">Início</div>
        <div class="two wide column">Fim</div>
        <div class="one wide column">Ações</div>
      </div>
      <Task v-for="task in tasks" 
      :key="task.id" 
      :taskData="task" 
      @change-state="changeState"
      @change-priority="changePriority"
      @delete-task="deleteTask"
      @update-task="updateTask"/>
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
  #draggable{
    display: contents;
  }
  .tasks{
    color: white;
    padding: 1em 15%;
    height: 80%;
    overflow-y: scroll;
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
import Task from '../components/Task.vue'
import axios from 'axios'
import draggable from 'vuedraggable'

var data = () => {
  return {
      
  }
}

var methods = {
  updateTask (taskForm){
    axios.put(`http://localhost:8888/task/${this.session.username}/${taskForm.id}`,{
      session: this.session,
      task: taskForm
    })
    .then((response) => {
      this.$emit('reload-tasks')
    })
    .catch((error) => {
      alert(error)
    })
  },
  changeState (taskId){
    this.$emit('change-task-state', taskId)
  },
  changePriority(taskId){
    this.$emit('change-task-priority', taskId)
  },
  deleteTask(taskId){
    this.$emit('delete-task', taskId)
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
  Task,
  draggable
}


export default {
  data: data,
  methods: methods,
  components: components,
  props: props
}
</script>