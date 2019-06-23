<template>
    <a href='#' class="week-day" 
    :class="{'hide': !day.day, 'today': day.isToday, 'tasks': day.task}">
        <template v-if="day.day">
            <p class="number">{{day.day}}</p>
            <p class="tasks-qty">
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
        align-items: stretch;
        justify-content: flex-end;
        width: 3em;
        height: 3em;
        margin: 0.1em;
        border: 1px solid #999;
        border-radius: 3px;
        &.hide{
            border: none;
        }
        &.today{
            border: 2px solid red !important;
            border-radius: 2em;
        }
        &.tasks{
            background: hsl(140, 50%, 50%);
            color: white;
            border: none;
        }
        .number{
            height: 40%;;
        }
        .tasks-qty{
            height: 30%;
            font-size: 0.8em;
        }
    }
</style>
