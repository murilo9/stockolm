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
        <a href='' onclick="event.preventDefault()"
        class="title nine wide column"
        @click="active = !active">
            <p>{{task.name}}</p>
            <p v-if="active" class="description">{{task.description}}</p>
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
        <a href='' onclick="event.preventDefault()"
        class="delete end-date one wide column"
        @click="deleteTask">
            <i class="x icon"></i>
        </a>
    </div>
</template>

<script>
var data = function(){
    return {
        active: false
    }
}

var computed = {
    getStartDate(){
        var m = this.getMonthLabel('start');
        var d = this.task.startDate.getDate();
        return d+' '+m;
    },
    getEndDate(){
        var m = this.getMonthLabel('end');
        var d = this.task.endDate.getDate();
        return d+' '+m;
    },
    getStartHour(){
        var h = this.task.startDate.getHours()
        var m = this.task.startDate.getMinutes()
        return h+':'+m
    },
    getEndHour(){
        var h = this.task.endDate.getHours()
        var m = this.task.endDate.getMinutes()
        return h+':'+m
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
    changeState: function(){
        this.$emit('change-state', this.task.id)
    },
    deleteTask: function(){
        this.$emit('delete-task', this.task.id)
    }
}

var props = [
    'task'
]
export default {
    data: data,
    methods: methods,
    computed: computed,
    props: props
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
            &.title{
                color: #0fab93;
                justify-content: center;
                padding-left: 0 !important;
            }
            &.date{
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            .description{
                color: hsl(220, 85%, 40%);
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
        .delete{
            color: crimson;
        }
    }
</style>
