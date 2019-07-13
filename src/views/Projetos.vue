<template>
    <div class="projects">
        <ProjectViewer 
        :project="projects[getProjectIndex($route.params.id)]" 
        v-if="$route.params.id"/>
        <div class="projects-dashboard" v-else>
            <div class="project-card" 
            v-for="(project, p) in projects" 
            :key="p">
                <p>{{project.name}}</p>
                <p>{{project.description}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

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
                    ]
                },
                {
                    id: 1,
                    name: 'Site Petshop',
                    description: 'Site do pethsop',
                    situation: 'Em deploy/teste',
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
                    ]
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