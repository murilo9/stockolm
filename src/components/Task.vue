<template>
    <tr class="task">
        <td>
            <a href='' onclick="event.preventDefault()">
                <template v-if="task.status == 2">
                    <i class="circle outline icon"></i>
                </template>
                <template v-else-if="task.status == 1">
                    <i class="check icon"></i>
                </template>
                <template v-else>
                    <i class="ellipsis horizontal icon"></i>
                </template>
            </a>
        </td>
        <td class="title">
            <a href='' onclick="event.preventDefault()">
                {{task.title}}
            </a>
        </td>
        <td class="priority">
            <a href='' onclick="event.preventDefault()">
                <i class="circle icon" :class="'_'+task.priority"></i>
            </a>
        </td>
        <td class="date start-date">
            <a href='' onclick="event.preventDefault()">
                {{task.startDate ? getStartDate : '-'}}
            </a>
        </td>
        <td class="date end-date">
            <a href='' onclick="event.preventDefault()">
                {{task.endDate ? getEndDate : '-'}}
            </a>
        </td>
    </tr>
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
    },
    getEndDate: function(){
        var m = this.getMonthLabel('end');
        var d = this.task.endDate.getDate();
        return m+'/'+d;
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
        a{
            color: inherit;
            width: 100%;
        }
        .priority{
            text-align: center;
            ._1{
                color: hsl(200, 60%, 50%);
            }
            ._2{
                color: hsl(280, 60%, 60%);
            }
            ._3{
                color: hsl(50, 60%, 50%);
            }
        }
        .date{
            text-align: center;
        }
    }
</style>
