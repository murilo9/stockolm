<template>
  <div class="agenda">
    <h1>Agenda</h1>
    <div v-for="(month, m) in calendar.years[0].months" :key="m" class="month">
      <a v-if="month.actual" id="month"></a>
      <h3>{{month.name}}</h3>
      <p class="week">
        <WeekDay v-for="(weekLabel, l) in calendar.weekLabels"
        :key="l"
        :day="weekLabel" />
      </p>
      <p v-for="(week, wd) in month.weeks" :key="wd" class="week">
        <WeekDay v-for="(day, d) in week" 
        :key="d"
        :day="day" />
      </p>
    </div>
  </div>
</template>

<script>
import WeekDay from '../components/WeekDay.vue';

var data = function(){
  return {
    calendar: {
      weekLabels: [
        {l:"dom"}, {l:"seg"}, {l:"ter"}, {l:"qua"}, {l:"qui"}, {l:"sex"}, {l:"sab"}
      ],
      years: [
        {
          title: "2019",
          dispExtend: false,
          months: []
        }
      ]
    },
    tasks: [
      {
        title: 'Programar site do Stockolm',
        startDate: new Date('July 01, 2019'),
        endDate: undefined,
        priority: 1,
        status: 0
      },
      {
        title: 'Programar o sistema do Stockolm',
        startDate: undefined,
        endDate: undefined,
        priority: 1,
        status: 1
      },
      {
        title: 'Fazer coisa que começa e termina no mesmo dia',
        startDate: new Date('June 23, 2019'),
        endDate: new Date('June 23, 2019'),
        priority: 1,
        status: 1
      },
      {
        title: 'Fazer fucking tarefa de libras',
        startDate: new Date('June 28, 2019'),
        endDate: new Date('June 28, 2019'),
        priority: 3,
        status: 0
      },
      {
        title: 'Estudar libras',
        startDate: undefined,
        endDate: new Date('June 27, 2019'),
        priority: 2,
        status: 0
      },
      {
        title: 'Estudar libras',
        startDate: undefined,
        endDate: new Date('June 22, 2019'),
        priority: 1,
        status: 0
      }
    ]
  }
}

var methods ={
  generateCalendar: function(){
    var today = new Date();
    var baseDate = new Date();
    baseDate.setDate(1);
    baseDate.setMonth(0);
    var dayFullYearCounter = 1;
    //Cria os 12 meses do ano:
    for(var monthIndex = 0; monthIndex < 12; monthIndex++){
      var month = {
        dispExtend: false,
        actual: false,
        weeks: []
      }
      switch (monthIndex+1){
        case 1: month.name = "Janeiro"; break;
        case 2: month.name = "Fevereiro"; break;
        case 3: month.name = "Março"; break;
        case 4: month.name = "Abril"; break;
        case 5: month.name = "Maio"; break;
        case 6: month.name = "Junho"; break;
        case 7: month.name = "Julho"; break;
        case 8: month.name = "Agosto"; break;
        case 9: month.name = "Setembro"; break;
        case 10: month.name = "Outubro"; break;
        case 11: month.name = "Novembro"; break;
        case 12: month.name = "Dezembro"; break;
      }
      //Se o mês for o atual, marca ele:
      if(monthIndex == today.getMonth()){
        month.actual = true;
      }
      //Cria as 6 semanas do mês:
      for(var w = 0; w < 6; w++){
        var week = [];
        //Cria os 7 dias da semana
        for(var wd = 0; wd < 7; wd++){
          var weekDay = {
            weekEnd: false,
          };
          switch(baseDate.getDay()){
            case 0: weekDay.weekDayName = "dom"; weekDay.weekEnd = true; break;
            case 1: weekDay.weekDayName = "seg"; break;
            case 2: weekDay.weekDayName = "ter"; break;
            case 3: weekDay.weekDayName = "qua"; break;
            case 4: weekDay.weekDayName = "qui"; break;
            case 5: weekDay.weekDayName = "sex"; break;
            case 6: weekDay.weekDayName = "sab"; weekDay.weekEnd = true; break;
          }
          if(baseDate.getMonth() == monthIndex){  //Se estiver no mês correto
            if(baseDate.getDay() == wd){   //Se o dia atual for neste dia da semana
              weekDay.render = { extend: false }
              weekDay.day = baseDate.getDate();
              weekDay.id = dayFullYearCounter;
              dayFullYearCounter++;
              weekDay.task = false;   //A princípio, o dia não tem tarefas
              //Verifica se o dia possui tarefas (percorre o array de tarefas):
              this.$data.tasks.forEach(function(task, t){
                //Se a tarefa inicia e começa no mesmo dia
                if(task.startDate && task.endDate &&
                task.startDate.getFullYear() == task.endDate.getFullYear() &&
                task.startDate.getMonth() == task.endDate.getMonth() &&
                task.startDate.getDate() == task.endDate.getDate()){ 
                  //E se for hoje:  
                  if(task.endDate.getFullYear() == baseDate.getFullYear() &&
                  task.endDate.getMonth() == baseDate.getMonth() &&
                  task.endDate.getDate() == baseDate.getDate()){
                    if(!weekDay.task){    //Se o dia ainda não possuir o objeto task
                        weekDay.task = {  //Insere o objeto de task
                        tasks: 0,
                        priority: 0
                      }
                    }
                    //Incrementa o número de tarefas:
                    weekDay.task.tasks += 1;
                    //Define a prioridade das tarefas do dia:
                    if(task.priority > weekDay.task.priority)
                      weekDay.task.priority = task.priority;
                  }
                }
                //Se a tarefa termina neste dia:
                else if(task.endDate){    
                  if(task.endDate.getFullYear() == baseDate.getFullYear() &&
                  task.endDate.getMonth() == baseDate.getMonth() &&
                  task.endDate.getDate() == baseDate.getDate()){
                    if(!weekDay.task){    //Se o dia ainda não possuir o objeto task
                        weekDay.task = {  //Insere o objeto de task
                        tasks: 0,
                        priority: 0
                      }
                    }
                    //Incrementa o número de tarefas:
                    weekDay.task.tasks++;
                    //Define a prioridade das tarefas do dia:
                    if(task.priority > weekDay.task.priority)
                      weekDay.task.priority = task.priority;
                  }
                }
                //Se a tarefa começa neste dia:
                else if(task.startDate){    
                  if(task.startDate.getFullYear() == baseDate.getFullYear() &&
                  task.startDate.getMonth() == baseDate.getMonth() &&
                  task.startDate.getDate() == baseDate.getDate()){
                    if(!weekDay.task){    //Se o dia ainda não possuir o objeto task
                        weekDay.task = {  //Insere o objeto de task
                        tasks: 0,
                        priority: 0
                      }
                    }
                    //Incrementa o número de tarefas:
                    weekDay.task.tasks++;
                    //Define a prioridade das tarefas do dia:
                    if(task.priority > weekDay.task.priority)
                      weekDay.task.priority = task.priority;
                  }
                }
              });
              //Verifica se o dia é o atual
              if(baseDate.getDate() == today.getDate() && 
              baseDate.getMonth() == today.getMonth()){
                weekDay.isToday = true;
              }
              baseDate.setDate(baseDate.getDate()+1);
            }
          }
          //Insere o dia da semana criado dentro da semana:
          week.push(weekDay);
        }
        //Insere a semana criada dentro do mês:
        month.weeks.push(week);
      }
      //Insere o mês criado dentro do ano:
      this.$data.calendar.years[0].months.push(month);
    }
  },
  scrollToMonth: function(){
    document.getElementById('month');
  }
}

var components = {
  WeekDay
}

export default {
  data: data,
  methods: methods,
  components: components,
  created(){
    this.generateCalendar();
  }
}
</script>

<style lang="scss" scoped>
p{
  margin: 0;
}
.agenda{
  a{
    color: inherit;
  }
  margin: 0 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  .month{
    border-top: 1px solid white;
    padding: 1em 0;
    .week{
      display: flex;
      
    }
  }
}

  
</style>
