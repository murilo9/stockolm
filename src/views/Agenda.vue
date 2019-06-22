<template>
  <div class="agenda">
    <div v-for="(month, m) in calendar.years[0].months" :key="m" class="month">
      <p>{{month.name}}</p>
      <p class="week">
        <span v-for="(weekLabel, l) in calendar.weekLabels" :key="l" class="week-day hide">
          {{weekLabel}}
        </span>
      </p>
      <p v-for="(week, wd) in month.weeks" :key="wd" class="week">
        <a href='#' 
        v-for="(day, d) in week" 
        :key="d" class="week-day" 
        :class="{'hide': !day.day, 'today': day.isToday}">
          <template v-if="day.day">
            {{day.day}}
          </template>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
var data = function(){
  return {
    calendar: {
      weekLabels: [
        "dom", "seg", "ter", "qua", "qui", "sex", "sab"
      ],
      years: [
        {
          title: "2019",
          dispExtend: false,
          months: []
        }
      ]
    }
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
      //Cria as 6 semanas do mês:
      for(var w = 0; w < 6; w++){
        var week = [];
        //Cria os 7 dias da semana
        for(var wd = 0; wd < 7; wd++){
          var weekDay = {
            weekEnd: false
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
              //Verifica se o dia possui tarefas:

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
  }
}

export default {
  data: data,
  methods: methods,
  created(){
    this.generateCalendar();
  }
}
</script>

<style lang="scss" scoped>
a{
  color: inherit;
}
p{
  margin: 0;
}
.agenda{
  margin: 0 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #444;
  .month{
    .week{
      display: flex;
      .week-day{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2em;
          height: 2em;
          margin: 0.1em;
          border: 1px solid #999;
          border-radius: 3px;
          &.hide{
            border: none;
          }
          &.today{
            border: 2px solid red;
            border-radius: 1em;
          }
        }
    }
  }
}

  
</style>
