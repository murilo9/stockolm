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
        class="title nine wide column">
            <span>{{task.name}}</span>
        </a>
        <a href='' onclick="event.preventDefault()"
        class="priority one wide column">
            <i class="circle icon" :class="'_'+task.priority"></i>
        </a>
        <a href='' onclick="event.preventDefault()"
        class="date start-date two wide column">
            <span>{{task.startDate ? getStartDate : '-'}}</span>
        </a>
        <a href='' onclick="event.preventDefault()"
        class="date end-date two wide column">
            <span>{{task.endDate ? getEndDate : '-'}}</span>
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

    }
}

var computed = {
    getStartDate: function(){
        var m = this.getMonthLabel('start');
        var d = this.task.startDate.getDate();
        return d+' '+m;
        return 'startDate'
    },
    getEndDate: function(){
        var m = this.getMonthLabel('end');
        var d = this.task.endDate.getDate();
        return m+'/'+d;
        return 'endDate'
    }
}

var methods = {
    getMonthLabel: function(what){
        if(what == 'start')
            var base = this.task.startDate.getMonth()+1;
        else if (what == 'end')
            var base = this.task.endDate.getMonth()+1;
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
    changeState: function(){
        this.$emit('change-state', this.task.id);
    },
    deleteTask: function(){
        this.$emit('delete-task', this.task.id);
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
        border-radius: 5px;
        display: flex;
        justify-content: center;
        a{
            color: inherit;
            width: 100%;
            padding: 0.5em;
            display: flex !important;
            justify-content: center;
            &.title{
                justify-content: end;
                padding-left: 0 !important;
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
                color: hsl(0, 80%, 50%);
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
