import { date } from "./date.js"
import { status } from "./status"
import { tasksToLoad } from "./index.js"
import { taskFunctions } from "./taskFunctions.js"

let projectFunctions = (() => {
    let projectList = {}

    let loadProjectList = () => {
        // localStorage.clear()
        if(localStorage.getItem("projectList")) {
            projectList = JSON.parse(localStorage.getItem("projectList"))
            console.log('taskarray detected!')
        }
    }
    loadProjectList()

    let saveProjectList = () => {
        localStorage.setItem("projectList", JSON.stringify(projectList));
    }

    let construct = (newTaskInfo) => {
        projectList[tasksToLoad].push([newTaskInfo])
        saveProjectList()
    }

    let load = () => {
        console.log('loading project')
        let desiredTaskArray = projectList[tasksToLoad]
        taskFunctions.load(desiredTaskArray)
        console.log(desiredTaskArray)
        saveProjectList()
    }

    let makeProject = (projectName) => {
        if(projectList[projectName]) {
            alert('You cannot have duplicate projects!')
        } else projectList[projectName] = []
        //maybe does not re init?
    }

    let loadProjectNames = () => {
        let projectNames = Object.keys(projectList)
        let projectContainer = document.getElementById('projectContainer')
        console.log(projectNames)
        removeAllChildren(projectContainer)

        for(let proj in projectNames) { 
            let project = document.createElement('div')
            project.classList.add("project")
            let projectName = document.createElement('p')
            projectName.classList.add('projectName')
            let projectNameNode = document.createTextNode(projectNames[proj])
            projectName.appendChild(projectNameNode)
            project.appendChild(projectName)
            projectContainer.appendChild(project)
            let projectID = 'PROJ_' + projectNames[proj] 
            project.setAttribute('id', projectID)
            let trashContainer = document.createElement('div')
            trashContainer.classList.add('class', 'trashContainer')
            let trashIcon = document.createElement('i')
            trashIcon.classList.add('fa', 'fa-trash-alt')
            trashContainer.appendChild(trashIcon)
            project.appendChild(trashContainer)
        }
        saveProjectList()
    }

    let init = () => {
        let taskTabTitle = document.getElementById('taskTabTitle')
        document.querySelectorAll('.project').forEach((project) => {
            project.addEventListener("click", () => {
                let projectNames = Object.keys(projectList)
                let taskContainer = document.getElementById('taskContainer')
                removeAllChildren(taskContainer)
                let desiredIndex = Array.from(project.parentNode.children).indexOf(project)
                let projectName = projectNames[desiredIndex]
                taskTabTitle.textContent = projectName 
                tasksToLoad = project.id.slice(5)
                load()
                date.init()
                status.init()
            })
        })
        document.querySelectorAll('.trashContainer').forEach((trash) => {
            trash.addEventListener("click", (e) => {
                e.stopPropagation()
                let projectNames = Object.keys(projectList)
                let projectToTrash = trash.parentElement
                let desiredIndex = Array.from(projectToTrash.parentNode.children).indexOf(projectToTrash)
                let projectDeleteName = projectNames[desiredIndex]
                let projectContainer = document.getElementById('projectContainer')
                delete projectList[projectDeleteName]
                saveProjectList()

                projectToTrash.classList.add('fadingProject')

                setTimeout(() => {
                    projectContainer.removeChild(projectToTrash)
                }, 500)
            })
        })
        console.log(projectList)
    }

    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return { 
        makeProject, loadProjectNames, init, load, 
        construct, projectList, loadProjectList, 
        saveProjectList
    }

})()

export { projectFunctions }