<template>
    <div class="projects">
        <ProjectViewer 
        :project="projects[getProjectIndex($route.params.id)]" 
        v-if="$route.params.id"/>
        <div class="projects-dashboard" v-else>
            <h1 class="fa-center" v-if="projects">Projetos</h1>
            <h2 v-else>Não há projetos</h2>
            <div class="projects-list">
                <a href='#'
                onclick='event.preventDefault()'
                class="project-card" 
                @click="$router.push('projetos/'+project.id)"
                v-for="(project, p) in projects" 
                @mouseenter="project.hideDetails = false"
                @mouseleave="project.hideDetails = true"
                :key="p">
                    <p class="name">{{project.name}}</p>
                    <p class="situation">{{project.situation}}</p>
                    <p class="descri">{{project.description}}</p>
                    <div class="project-card-details" :class="{'hide':project.hideDetails}">
                        <p class="tasks-qty">
                            {{taskCount(project.tasks)}} tarefas
                        </p>
                        <p>
                            Iniciado em {{getDateString(project.startedAt)}}
                        </p>
                        <p>
                            Termina em {{getDateString(project.edsAt)}}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .projects{
        padding: 0 10%;
        text-align: left;
        .projects-dashboard{
            color: white;
            .projects-list{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: flex-start;
                .project-card{
                    width: 290px !important;
                    display: inline-block;
                    background: white;
                    color: #16a590;
                    padding: 1em;
                    margin: 1em;
                    box-shadow: 2px 2px 4px #666;
                    p{
                        margin-bottom: 0.5em;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                    .name{
                        font-weight: bold;
                        font-size: 1.2em;
                        margin-bottom: 0;
                    }
                    .situation{
                        font-size: 0.85em;
                        margin-bottom: 1.3em;
                    }
                    .project-card-details{
                        &.hide{
                            display: none;
                        }
                    }
                }
            }
        }
    }
    .fa-center{
        text-align: center;
    }
</style>

<script>
    import ProjectViewer from '../components/ProjectViewer.vue'

    var components = {
        ProjectViewer
    }

    var methods = {
        getProjectIndex(projectId){
            var indexFound = false
            this.$data.projects.forEach((project, i) => {
                if(project.id == projectId)
                    indexFound = i
            })
            return indexFound
        },
        taskCount(tasks){
            var qty = 0
            tasks.forEach((task, i) => {
                if(task.tasks){
                    qty += this.taskCount(task.tasks)
                }
                else
                    qty++;
            })
            return qty
        },
        getDateString(date){
            if(date){
                var day = date.getDate();
                var month = date.getMonth()+1;
                var year = date.getFullYear();
                return day+'/'+month+'/'+year;
            }
        }
    }

    var data = () => {
        return {
            projects: [
                {   
                    id: 0,
                    name: 'ERP',
                    description: 'Software de gestão empresarial',
                    situation: 'Em definição',
                    startedAt: new Date('jul 1 2019'),
                    endsAt: new Date('sep 30 2019'),
                    tasks: [
                        {
                            name: 'Mapeamento das regras de negócio',
                            status: 3,
                            priority: 1,
                            startDate: new Date('jul 1 2019'),
                            endDate: new Date('jul 4 2019'),
                            finishedAt: new Date('jul 6 2019')
                        },
                        {
                            name: 'Documentação da arquitetura do sistema',

                        }
                    ],
                    hideDetails: true
                },
                {
                    id: 3,
                    name: 'Site Petshop',
                    description: 'Site do pethsop',
                    situation: 'Em deploy/teste',
                    startedAt: new Date('apr 1 2019'),
                    endsAt: new Date('jul 11 2019'),
                    tasks: [
                        {
                            name: 'Construir back-end',
                            status: 2,
                            priority: 1,
                            startDate: new Date('apr 2 2019'),
                            endDate: new Date('jun 20 2019'),
                            tasks: [
                                {
                                    name: 'Rotas da REST API',
                                    status: 3,
                                    priority: 2,
                                    startDate: new Date('apr 2 2019'),
                                    endDate: new Date('apr 4 2019'),
                                    finishedAt: new Date('apr 3 2019')
                                },
                                {
                                    name: 'ORM',
                                    status: 3,
                                    priority: 2,
                                    startDate: new Date('apr 2 2019'),
                                    endDate: new Date('apr 25 2019'),
                                    finishedAt: new Date('apr 22 2019')
                                },
                                {
                                    name: 'Middleware',
                                    status: 3,
                                    priority: 1,
                                    startDate: new Date('apr 20 2019'),
                                    endDate: new Date('may 20 2019'),
                                    finishedAt: new Date('may 12')
                                }
                            ]
                        },
                        {
                            name: 'Construir front-end',
                            status: 2,
                            priority: 1,
                            startDate: new Date('may 16 2019'),
                            endDate: new Date('jul 5 2019'),
                            tasks: [
                                {
                                    name: 'Ambiente de produção Vue',
                                    status: 3,
                                    priority: 2,
                                    startDate: new Date('may 16 2019'),
                                    endDate: new Date('may 18 2019'),
                                    finishedAt: new Date('may 16 2019')
                                },
                                {
                                    name: 'Estrutura das páginas',
                                    status: 3,
                                    priority: 1,
                                    startDate: new Date('may 17 2019'),
                                    endDate: new Date('jun 10 2019'),
                                    finishedAt: new Date('jun 11 2019'),
                                    tasks: [
                                        {
                                            name: 'Home',
                                            status: 3,
                                            priority: 1,
                                            finishedAt: new Date('may 23 2019')
                                        },
                                        {
                                            name: 'Produtos',
                                            status: 3,
                                            priority: 1,
                                            finishedAt: new Date('may 30 2019')
                                        },
                                        {
                                            name: 'Localização',
                                            status: 3,
                                            priority: 1,
                                            finishedAt: new Date('jun 11 2019')
                                        },
                                        {
                                            name: 'Sobre',
                                            status: 3,
                                            priority: 1,
                                            finishedAt: new Date('jun 4 2019')
                                        }
                                    ]
                                },
                                {
                                    name: 'Comunicação com a API',
                                    status: 3,
                                    priority: 1,
                                    startDate: new Date('jun 8 2019'),
                                    endDate: new Date('jun 28 2019')
                                }
                            ]
                        }
                    ],
                    hideDetails: true
                }
            ]
        }
    }

    export default {
        data: data,
        components: components,
        methods: methods
    }
</script>