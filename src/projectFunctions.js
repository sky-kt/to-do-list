import { date } from "./date.js"
import { status } from "./status"
import { tasksToLoad } from "./index.js"
import { taskFunctions } from "./taskFunctions.js"

let projectFunctions = (() => {
    let projectList = {

    }

    let construct = (newTaskInfo) => {
        projectList[tasksToLoad].push([newTaskInfo])
    }

    let load = () => {
        console.log('loading project')
        let desiredTaskArray = projectList[tasksToLoad]
        taskFunctions.load(desiredTaskArray)
        console.log(desiredTaskArray)
    }

    let makeProject = (projectName) => {
        if(projectList[projectName]) {
            alert('You cannot have duplicate projects!')
        } else projectList[projectName] = []
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
        }
    }

    let init = () => {
        let projectNames = Object.keys(projectList)
        let taskTabTitle = document.getElementById('taskTabTitle')
        let allProjects = document.querySelectorAll('.project').forEach((project) => {
            project.addEventListener("click", () => {
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
        console.log(projectList)
    }

    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return { makeProject, loadProjectNames, init, load, construct, projectList}

})()

export { projectFunctions }