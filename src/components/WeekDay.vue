<template>
    <a href='#' class="week-day" 
    :class="{'hide': !day.day, 'today': day.isToday, 'tasks': day.task, 'weekend': day.weekEnd}">
        <template v-if="day.day">
            <p class="number">{{day.day}}</p>
            <p class="tasks-qty" :class="'_'+day.task.priority">
                <template v-if="day.task">
                {{day.task.tasks}}
                </template>
            </p>
        </template>
        <template v-else>
            {{day.l}}
        </template>
    </a>
</template>

<script>
var data = function(){
    return {

    }
}

var props = [
    'day'
]

var methods = {

}

export default {
    data: data,
    props: props,
    methods: methods
}
</script>

<style lang="scss" scoped>
    .week-day{
        p{
            margin: 0
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        width: 3em;
        height: 3em;
        margin: 0.1em;
        border: 1px solid white;
        border-radius: 3px;
        overflow: hidden;
        &.hide{
            border: none;
            justify-content: center;
        }
        &.today{
            border: 2px solid red !important;
            border-radius: 2em;
        }
        &.tasks{
            color: hsl(140, 50%, 50%);
            background: white;
            border: none;
            .tasks-qty{
                color: #444;
                &._1{
                color: hsl(170, 60%, 40%);
                }
                &._2{
                    color: hsl(50, 90%, 50%);
                }
                &._3{
                    color: hsl(0, 80%, 50%);
                }
            }
        }
        &.weekend{
            color: #444;
        }
        .number{
            height: 40%;
            font-weight: bold;
        }
        .tasks-qty{
            height: 30%;
            font-size: 0.8em;
            font-weight: bold;
        }
    }
</style>
