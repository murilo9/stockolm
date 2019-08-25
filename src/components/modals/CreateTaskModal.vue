<template>
    <modal 
    name="create-task-modal" 
    width="700px" 
    height="500px" 
    @before-open="beforeOpen">
        <div class="ui grid">
            <div class="row task-form-header">
                <div class="five wide column"> </div>
                <div class="ten wide column"> </div>
                <a href='' onclick='event.preventDefault()' 
                class="one wide clomun close-button"
                @click="closeModal">
                    <i class="x icon"></i>
                </a>
            </div>
        </div>
        <div class="task-form">
            <div class="task-form-field">
                <p>Tarefa</p>
                <input type="text" v-model="taskForm.name">
            </div>
            <div class="task-form-field">
                <p>Descrição</p>
                <textarea rows="6" v-model="taskForm.description"></textarea>
            </div>
            <div class="task-form-field">
                <div class="field-half">
                    <p>
                        <a href='' onclick='event.preventDefault()'
                        @click="taskForm.startDate.enabled = !taskForm.startDate.enabled">
                            <i :class="taskForm.startDate.enabled ? 'check circle outline icon' : 'circle outline icon'"></i>
                        </a>
                        <span>Data de Início</span>
                    </p>
                    <input type="number" class="input-day" 
                    v-model="taskForm.startDate.day"
                    :disabled="!taskForm.startDate.enabled"
                    :class="!taskForm.startDate.enabled ? 'disabled' : ''">
                    <select class="select-month" 
                    v-model="taskForm.startDate.month"
                    :disabled="!taskForm.startDate.enabled"
                    :class="!taskForm.startDate.enabled ? 'disabled' : ''">
                        <option v-for="(month, m) in months" :value="m" :key="m">
                            {{month}}
                        </option>
                    </select>
                    <select class="select-year" 
                    v-model="taskForm.startDate.year"
                    :disabled="!taskForm.startDate.enabled"
                    :class="!taskForm.startDate.enabled ? 'disabled' : ''">
                        <option v-for="year in years" :value="year" :key="year">
                            {{year}}
                        </option>
                    </select>
                    <input type="text" class="input-time"
                    placeholder="Hora"
                    v-model="taskForm.startDate.timeString"
                    :disabled="!taskForm.startDate.enabled"
                    :class="!taskForm.startDate.enabled ? 'disabled' : ''">
                </div>
                <div class="field-half">
                    <p>
                        <a href='' onclick='event.preventDefault()' 
                        @click="taskForm.endDate.enabled = !taskForm.endDate.enabled">
                            <i :class="taskForm.endDate.enabled ? 'check circle outline icon' : 'circle outline icon'"></i>
                        </a>
                        <span>Data de Fim</span>
                    </p>
                    <input type="number" class="input-day" 
                    v-model="taskForm.endDate.day"
                    :disabled="!taskForm.endDate.enabled"
                    :class="!taskForm.endDate.enabled ? 'disabled' : ''">
                    <select class="select-month" 
                    v-model="taskForm.endDate.month"
                    :disabled="!taskForm.endDate.enabled"
                    :class="!taskForm.endDate.enabled ? 'disabled' : ''">
                        <option v-for="(month, m) in months" :value="m" :key="m">
                            {{month}}
                        </option>
                    </select>
                    <select class="select-year" 
                    v-model="taskForm.endDate.year"
                    :disabled="!taskForm.endDate.enabled"
                    :class="!taskForm.endDate.enabled ? 'disabled' : ''">
                        <option v-for="year in years" :value="year" :key="year">
                            {{year}}
                        </option>
                    </select>
                    <input type="text" class="input-time"
                    placeholder="Hora"
                    v-model="taskForm.endDate.timeString"
                    :disabled="!taskForm.endDate.enabled"
                    :class="!taskForm.endDate.enabled ? 'disabled' : ''">
                </div>
            </div>
            <div class="task-form-field">
                <p>Prioridade</p>
                <p>
                    <input type="radio" v-model="taskForm.priority" :value="0" selected>
                    <span class="priority-label">Baixa</span>
                    <input type="radio" v-model="taskForm.priority" :value="1">
                    <span class="priority-label">Média</span>
                    <input type="radio" v-model="taskForm.priority" :value="2">
                    <span class="priority-label">Alta</span>
                </p>
            </div>
            <div class="task-form-field buttons">
                <a href='' onclick="event.preventDefault()" @click="createTask">Inserir</a>
            </div>
        </div>
    </modal>
</template>

<script>
import axios from 'axios'

var data = () => {
    return{
        months: ['Jan', 'Fev', 'Abr', 'Maio', 'Jun', 'Jul', 
                    'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        years: [2019, 2020, 2021, 2022],
        taskForm: {
            name: '',
            description: '',
            startDate: {
                enabled: false,
                date: {},
                day: 15,
                month: 0,
                year: 2019,
                timeString: '',
                hasTime: false
            },
            endDate: {
                enabled: false,
                date: {},
                day: 15,
                month: 0,
                year: 2019,
                hour: 12,
                timeString: '',
                hasTime: false
            },
            priority: 0
        }
    }
}

var methods = {
    createTask(){
        //Build date objects:
        if(this.taskForm.startDate.enabled){        //Build start date
            this.taskForm.startDate.date = new Date()
            this.taskForm.startDate.date.setDate(this.taskForm.startDate.day)
            this.taskForm.startDate.date.setMonth(this.taskForm.startDate.month)
            this.taskForm.startDate.date.setYear(this.taskForm.startDate.year)
            var time = this.taskForm.startDate.timeString
            if(time){
                this.taskForm.startDate.date.setHours(
                    time.charAt(1) == ':' ? time.substring(0,1) : time.substring(0,2)
                )
                this.taskForm.startDate.date.setMinutes(
                    time.charAt(1) == ':' ? time.substring(2,4) : time.substring(3,5)
                )
                this.taskForm.startDate.hasTime = true
            }
            this.taskForm.startDate.date = this.taskForm.startDate.date.getTime()
        }
        if(this.taskForm.endDate.enabled){      //Build end date
            this.taskForm.endDate.date = new Date()
            this.taskForm.endDate.date.setDate(this.taskForm.endDate.day)
            this.taskForm.endDate.date.setMonth(this.taskForm.endDate.month)
            this.taskForm.endDate.date.setYear(this.taskForm.endDate.year)
            var time = this.taskForm.endDate.timeString
            if(time){
                this.taskForm.endDate.date.setHours(
                    time.charAt(1) == ':' ? time.substring(0,1) : time.substring(0,2)
                )
                this.taskForm.endDate.date.setMinutes(
                    time.charAt(1) == ':' ? time.substring(2,4) : time.substring(3,5)
                )
                this.taskForm.endDate.hasTime = true
            }
            this.taskForm.endDate.date = this.taskForm.endDate.date.getTime()
        }
        //Make post request to server:
        axios.post(`http://localhost:8888/task/${this.session.username}`, {
            task: this.taskForm,
            session: this.session
        })
        .then((response) => {
            this.$emit('reload-tasks')
        })
        .catch((error) => {
            alert(error)
        })
    },
    beforeOpen(){
        for(var i = 0; i < 11; i++){

        }
    },
    closeModal(){
        this.$modal.hide('create-task-modal')
    }
}

var props = {
    session: Object
}

export default {
    data: data,
    methods: methods,
    props: props
}
</script>

<style lang="scss">
.v--modal{
    color: #1ac4aa !important;
    color: white;
    font-weight: bold;
}
.ui.grid{
    margin: 0;
}
.task-form-header{
    padding: 0 !important;
    background: #1ac4aa;
    a.close-button{
        padding: 0.5em;
        color: white;
        i{
            font-size: 1.5em;
            margin: 0;
        }
}
}
.task-form{
    padding: 0 2em;
    margin-top: 2.5em;
    textarea:focus, input:focus{
        outline: none;
    }
    .task-form-field{
        a{
            color: #1ac4aa;
        }
        margin-bottom: 1em;
        p{
            margin-bottom: 0.5em;
        }
        input, textarea{
            background: none;
            color: #1ac4aa;
            border: 1px solid #1ac4aa;
            padding: 0.4em;
            width: 100%;
        }
        .field-half{
            display: inline-block;
            width: 45%;
            box-sizing: border-box;
            margin-right: 5%;
            input{
                width: 20%;
                &::placeholder{
                    color: #1ac4aa;
                }
                &.disabled{
                    border-color: #777;
                    color: #777;
                    &::placeholder{
                    color: #777;
                }
                }
            }
            select{
                width: 25%;
                background: none;
                padding: 0.33em;
                border: 1px solid #1ac4aa;
                color: #1ac4aa;
                &.disabled{
                    border-color: #777;
                    color: #777
                }
            }
        }
        input[type='radio']{
            width: auto;
            margin-right: 0.5em;
        }
        .priority-label{
            display: inline-block;
            margin-right: 2em;
        }
        &.buttons{
            margin-top: 2em;
            a{
                padding: 0.5em;
                color: white;
                background: #1ac4aa;
            }
        }
    }
}
</style>