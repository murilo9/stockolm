<template>
    <div class="task row">
        <a href='' onclick="event.preventDefault()"
        @click="changeState"
        class="state one wide column">
            <template v-if="task.state == 0">
                <i class="circle outline icon"></i>
            </template>
            <template v-else-if="task.state == 2">
                <i class="check icon"></i>
            </template>
            <template v-else-if="task.state == 1">
                <i class="ellipsis horizontal icon"></i>
            </template>
        </a>
        <div class="title editing nine wide column" v-if="editing">
            <input type="text" v-model="taskForm.name" class="title">
            <textarea v-model="taskForm.description" class="description" rows="6"></textarea>
        </div>
        <a href='' onclick="event.preventDefault()"
        class="title nine wide column"
        @click="active = !active"
        v-else>
            <p>{{task.name}}</p>
            <p v-if="active && task.description" class="description">{{task.description}}</p>
        </a>
        <a href='' onclick="event.preventDefault()"
        @click="changePriority"
        class="priority one wide column">
            <i class="circle icon" :class="'_'+task.priority"></i>
        </a>
        <div class="editing date start-date two wide column" v-if="editing">
            <form>
                <p class="field">
                    <input type="checkbox" v-model="taskForm.startDate.enabled">
                    <span>Data de Início</span>
                </p>
                <p class="field">
                    <span>Dia</span>
                    <input type="number" v-model="taskForm.startDate.day" 
                    :disabled="!taskForm.startDate.enabled">
                </p>
                <p class="field">
                    <span>Mês</span> 
                    <select v-model="taskForm.startDate.month" 
                    :disabled="!taskForm.startDate.enabled">
                        <option :value="month-1" 
                        v-for="month in 12"
                        :key="month">{{getMonthLabel(month-1)}}</option>
                    </select>
                </p>
                <p class="field">
                    <span>Ano</span>
                    <input type="number" v-model="taskForm.startDate.year"
                    :disabled="!taskForm.startDate.enabled">
                </p>
                <p class="field">
                    <input type="checkbox" v-model="taskForm.startDate.hasTime">
                    <span>Hora</span>
                    <input type="text" v-model="taskForm.startDate.time"
                    :disabled="!taskForm.startDate.enabled">
                </p>
            </form>
        </div>
        <a href='' onclick="event.preventDefault()"
        class="date start-date two wide column"
        @click="editTask"
        v-else>
            <span>
                {{task.startDate ? getStartDate : '-'}}
                {{task.hasStartTime ? getStartHour : ''}}
            </span>
        </a>
        <div class="editing date end-date two wide column" v-if="editing">
            <form>
                <p class="field">
                    <input type="checkbox" v-model="taskForm.endDate.enabled">
                    <span>Data de Fim</span>
                </p>
                <p class="field">
                    <span>Dia</span>
                    <input type="number" v-model="taskForm.endDate.day" 
                    :disabled="!taskForm.endDate.enabled">
                </p>
                <p class="field">
                    <span>Mês</span> 
                    <select v-model="taskForm.endDate.month" :disabled="!taskForm.endDate.enabled">
                        <option :value="month-1" 
                        v-for="month in 12"
                        :key="month">{{getMonthLabel(month-1)}}</option>
                    </select>
                </p>
                <p class="field">
                    <span>Ano</span>
                    <input type="number" v-model="taskForm.endDate.year"
                    :disabled="!taskForm.endDate.enabled">
                </p>
                <p class="field">
                    <input type="checkbox" v-model="taskForm.endDate.hasTime">
                    <span>Hora</span>
                    <input type="text" v-model="taskForm.endDate.time"
                    :disabled="!taskForm.endDate.enabled">
                </p>
            </form>
        </div>
        <a href='' onclick="event.preventDefault()"
        class="date end-date two wide column"
        @click="editTask"
        v-else>
            <span>
                {{task.endDate ? getEndDate : '-'}}
                {{task.hasEndTime ? getEndHour : ''}}
            </span>
        </a>
        <div class="buttons one wide column">
            <template v-if="editing">
                <a href='' onclick="event.preventDefault()"
                class="save"
                @click="saveTask">
                    <i class="save icon"></i>
                </a>
                <a href='' onclick="event.preventDefault()"
                class="cancel"
                @click="cancelChanges">
                    <i class="x icon"></i>
                </a>
            </template>
            <template v-else>
                <a href='' onclick="event.preventDefault()"
                class="edit"
                @click="editTask">
                    <i class="pencil icon"></i>
                </a>
                <a href='' onclick="event.preventDefault()"
                class="delete"
                @click="deleteTask">
                    <i class="trash alternate icon"></i>
                </a>
            </template>
        </div>
    </div>
</template>

<script>
var data = function(){
    return {
        task: {},
        taskForm: {
            id: '',
            name: '',
            description: '',
            startDate: {
                enabled: false,
                day: '',
                month: '',
                year: '',
                time: '',
                hasTime: false
            },
            endDate: {
                enabled: false,
                day: '',
                month: '',
                year: '',
                time: '',
                hasTime: false
            },
        },
        active: false,      //If true, shows task description
        editing: false      //If true, allows editing os task's atributes
    }
}

var computed = {
    getStartDate(){
        var m = this.getMonthLabel('start')
        var d = this.task.startDate.getDate()
        return d+' '+m
    },
    getEndDate(){
        var m = this.getMonthLabel('end')
        var d = this.task.endDate.getDate()
        return d+' '+m
    },
    getStartHour(){
        if(this.task.startDate){
            var h = this.task.startDate.getHours()
            var m = this.task.startDate.getMinutes()
            return (h > 9 ? h : '0'+h) +':'+ (m > 9 ? m : '0'+m)
        }
        else
            return ''
    },
    getEndHour(){
        if(this.task.endDate){
            var h = this.task.endDate.getHours()
            var m = this.task.endDate.getMinutes()
            return (h > 9 ? h : '0'+h) +':'+ (m > 9 ? m : '0'+m)
        }
        else
            return ''
    }
}

var methods = {
    getTimeString(date){
        var h = date.getHours()+''
        var m = date.getMinutes()+''
        return (h < 10 ? '0'+h : h)+':'+(m < 10 ? '0'+m : m)
    },
    getMonthLabel: function(what){
        if(what === 'start')
            var base = this.task.startDate.getMonth()
        else if (what === 'end')
            var base = this.task.endDate.getMonth()
        else
            var base = what
        var m = '';
        switch(base){
            case 0: m = "jan"; break;
            case 1: m = "fev"; break;
            case 2: m = "mar"; break;
            case 3: m = "abr"; break;
            case 4: m = "maio"; break;
            case 5: m = "jun"; break;
            case 6: m = "jul"; break;
            case 7: m = "ago"; break;
            case 8: m = "set"; break;
            case 9: m = "out"; break;
            case 10: m = "nov"; break;
            case 11: m = "dez"; break;
        }
        return m;
    },
    changePriority(){
        this.$emit('change-priority', this.task.id)
    },
    changeState(){
        this.$emit('change-state', this.task.id)
    },
    deleteTask(){
        this.$emit('delete-task', this.task.id)
    },
    editTask(){
        this.taskBeforeChange = this.task
        this.editing = true
    },
    saveTask(){
        this.$emit('update-task', this.taskForm)
        this.editing = false
    },
    cancelChanges(){
        this.task = this.taskBeforeChange
        this.resetForm()
        this.editing = false
    },
    resetForm(){
        this.taskForm.name = this.task.name
        this.taskForm.description = this.task.description
        if(this.task.startDate)
            this.taskForm.startDate = {
                enabled: this.task.startDate ? true : false,
                day: this.task.startDate.getDate(),
                month: this.task.startDate.getMonth(),
                year: this.task.startDate.getFullYear(),
                time: (this.task.hasStartTime ? this.getTimeString(this.task.startDate) : null),
                hasTime: this.task.hasStartTime
        }
        if(this.task.endDate)
            this.taskForm.endDate = {
                enabled: this.task.endDate ? true : false,
                day: this.task.endDate.getDate(),
                month: this.task.endDate.getMonth(),
                year: this.task.endDate.getFullYear(),
                time: (this.task.hasEndTime ? this.getTimeString(this.task.endDate) : null),
                hasTime: this.task.hasEndTime
        }
    }
}

var props = [
    'taskData'
]
export default {
    data: data,
    methods: methods,
    computed: computed,
    props: props,
    mounted(){
        this.task = this.taskData
        this.taskForm.id = this.task.id
        this.resetForm()
    }
}
</script>

<style lang="scss" scoped>
    .task{
        background: white;
        margin-bottom: 0.5em;
        padding: 0 !important;
        display: flex;
        justify-content: center;
        a{
            color: inherit;
            width: 100%;
            padding: 0.5em;
            display: flex !important;
            flex-direction: column;
        }
        .title{
            color: #0c8674;
            justify-content: center;
            padding-left: 0 !important;
            p{
                margin-bottom: 0;
            }
            &.editing{
                display: flex;
                flex-direction: column;
                padding: 0.5em;
                input[type=text]{
                    border: none;
                    padding: 0.5em !important;
                    outline: none;
                }
                textarea{
                    outline: none;
                    margin-left: 0.5em;
                    resize: none;
                }
            }
            .description{
                color: #444;
                margin-top: 0.5em;
            }
        }
        .state{
            text-align: center;
            font-size: 1.3em;
        }
        .priority{
            text-align: center;
            font-size: 1.3em;
            ._0{
                color: hsl(140, 60%, 50%);
            }
            ._1{
                color: hsl(50, 90%, 50%);
            }
            ._2{
                color: hsl(0, 60%, 60%);
            }
        }
        .date{
            padding-left: 0 !important;
            padding-right: 0 !important;
            text-align: center;
            &.editing{
                padding-top: 0.5em;
                form{
                    .field{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        font-size: 10pt;
                        margin-bottom: 0.5em;
                        color: #0c8674;
                        input, select{
                            color: #0c8674;
                            width: 4em;
                            margin-left: 0.5em;
                            border: 1px solid #1ac4aa;
                            background: white;
                            &[type=checkbox]{
                                width: 1em;
                                margin: 0;
                            }
                            &:disabled{
                                border: 1px solid #999;
                                color: #999;
                            }
                        }
                    }
                }
            }
        }
        .buttons{
            padding: 0 !important;
            display: flex !important;
            flex-direction: row;
            align-items: center;
            a{
                padding: 0;
                color: #0c8674;
            }
            .delete{
                color: #444;
            }
            .cancel{
                color: crimson;
            }
        }
    }
</style>
