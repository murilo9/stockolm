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
            <input type="text" v-model="task.name" class="title">
            <textarea v-model="task.description" class="description" rows="3"></textarea>
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
        <a href='' onclick="event.preventDefault()"
        class="date start-date two wide column">
            <span>
                {{task.startDate ? getStartDate : '-'}}
                {{task.hasStartTime ? getStartHour : ''}}
            </span>
        </a>
        <a href='' onclick="event.preventDefault()"
        class="date end-date two wide column">
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
    getMonthLabel: function(what){
        if(what == 'start')
            var base = this.task.startDate.getMonth()+1
        else if (what == 'end')
            var base = this.task.endDate.getMonth()+1
        var m = '';
        switch(base){
            case 1: m = "jan"; break;
            case 2: m = "fev"; break;
            case 3: m = "mar"; break;
            case 4: m = "abr"; break;
            case 5: m = "maio"; break;
            case 6: m = "jun"; break;
            case 7: m = "jul"; break;
            case 8: m = "ago"; break;
            case 9: m = "set"; break;
            case 10: m = "out"; break;
            case 11: m = "nov"; break;
            case 12: m = "dez"; break;
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
        this.editing = !this.editing
    },
    saveTask(){
        this.$emit('update-task', this.task)
        this.editing = false
    },
    cancelChanges(){
        this.task = this.taskBeforeChange
        this.editing = false
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
            &.date{
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
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
                    border-right: none;
                    border-top: none;
                    border-bottom: none;
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
            text-align: center;
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
