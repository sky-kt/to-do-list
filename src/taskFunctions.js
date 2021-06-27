import { tasksToLoad } from "./index.js"
import { projectFunctions } from "./projectFunctions"

let taskFunctions = (() => {
    let taskArray = []

    let loadArray = () => {
        // localStorage.clear()
        if(localStorage.getItem("taskArray")) {
            taskArray = JSON.parse(localStorage.getItem("taskArray"))
        }
    }

    loadArray()

    let saveArray = () => {
        localStorage.setItem("taskArray", JSON.stringify(taskArray));
    }

    let construct = (input) => {
        if(input === '') {
            alert('You cannot create an empty task!')
        }
        else if(tasksToLoad === "today" || tasksToLoad === "week") { 
            taskArray.push([input, findDate()]) 
        }
        else { taskArray.push([input]) }
        saveArray()
    }

    let findDate = () => {
        let today = new Date().toLocaleDateString()
        let todayArray = today.split('/')

        let month = todayArray[0]
        let day = todayArray[1]
        month = month.padStart(3, '0').slice(-2)
        day = day.padStart(3, '0').slice(-2)
        todayArray[0] = todayArray[2] 
        todayArray[1] = month 
        todayArray[2] = day 
        today = todayArray.join('-')
        return today
    }

    let loadInbox = () => {
        load(taskArray)
        saveArray()
    }

    let loadToday = () => {
        let desiredTasks = []
        let today = findDate() 

        for(let task in taskArray) {
            console.log('under')
            if(taskArray[task].length > 1 && taskArray[task][1] === today) {
                desiredTasks.push(taskArray[task])
            }
        }
        console.log(desiredTasks)
        load(desiredTasks)
        saveArray()
    }

    let loadWeek = () => { 
        let desiredTasks = []
        for(let task in taskArray) {
            if(taskArray[task][1]) {
                let myDate = new Date(taskArray[task][1])
                if (myDate.getWeek() === (new Date()).getWeek()) {
                    console.log('same week')
                    desiredTasks.push(taskArray[task])
                }
            }
        }
        load(desiredTasks)
        saveArray()
    }

    let load = (activeTasks) => {
        let taskContainer = document.getElementById('taskContainer')
        console.log('active tasks >>>>', activeTasks)
        removeAllChildren(taskContainer)

        for(let indivTask in activeTasks) {
            let task = document.createElement('div')
            task.classList.add('task')
            let taskStatus = document.createElement('div')
            taskStatus.classList.add('taskStatus')
            let notDone = document.createElement('div')
            notDone.classList.add('notDone')
            let icon = document.createElement('i')
            icon.classList.add('far', 'fa-circle')
            let taskTextContainer = document.createElement('div')
            taskTextContainer.classList.add('taskTextContainer')
            let taskText = document.createElement('p')
            taskText.classList.add('taskText')
            let taskTextNode = document.createTextNode(activeTasks[indivTask][0])
            console.log(taskTextNode)
            let taskDate = document.createElement('form')
            taskDate.classList.add('taskDate')
            let dateLabel = document.createElement('label')
            dateLabel.for = "dueDate"
            let dateInput = document.createElement('input')
            dateInput.type = "date"
            dateInput.classList.add("dueDate")
            dateInput.name = "dueDate"

            if(activeTasks[indivTask][1]) {
                dateInput.value = activeTasks[indivTask][1]
            }

            taskDate.appendChild(dateLabel)
            taskDate.appendChild(dateInput)
            notDone.prepend(icon)
            taskText.appendChild(taskTextNode)
            taskTextContainer.appendChild(taskText)
            makeEditable(taskTextContainer)
            taskStatus.appendChild(notDone)
            taskStatus.appendChild(taskTextContainer)
            task.appendChild(taskStatus)
            task.appendChild(taskDate)
            taskContainer.appendChild(task)
        }
        saveArray()
    }

    let makeEditable = (taskTextContainer) => {
        let taskText = taskTextContainer.firstChild
        let taskTextContent = taskText.textContent
        taskText.addEventListener("click", () => {
            taskText.remove()
            //add form

            let newTextForm = document.createElement('form')
            newTextForm.classList.add('newTextForm')

            let newTextInput = document.createElement('input')

            newTextInput.type = "text"
            newTextInput.name = "newTaskName" 
            newTextInput.classList.add('newTextInput')

            newTextForm.appendChild(newTextInput)
            taskTextContainer.appendChild(newTextForm)

            newTextForm.addEventListener("submit", () => {

                let taskToChange = taskTextContainer.parentNode.parentNode
                let desiredIndex = Array.from(taskToChange.parentNode.children).indexOf(taskToChange)

                if(tasksToLoad === 'inbox' || tasksToLoad === 'today' || tasksToLoad === 'week') {
                    taskArray[desiredIndex].shift()
                    taskArray[desiredIndex].unshift(newTextInput.value)
                }
                else { 
                    projectFunctions.projectList[tasksToLoad][desiredIndex].shift()
                    projectFunctions.projectList[tasksToLoad][desiredIndex].unshift(newTextInput.value)
                }

                removeAllChildren(taskTextContainer)
                let newTaskText = document.createElement('p')
                newTaskText.classList.add('taskText')
                let newTaskTextNode = document.createTextNode(newTextInput.value)
                newTaskText.appendChild(newTaskTextNode)
                taskTextContainer.appendChild(newTaskText)
                makeEditable(taskTextContainer)
                saveArray()
                projectFunctions.saveProjectList()
            })
            newTextForm.addEventListener("focusout", () => {
                removeAllChildren(taskTextContainer)
                let newTaskText = document.createElement('p')
                newTaskText.classList.add('taskText')
                let newTaskTextNode = document.createTextNode(taskTextContent)
                newTaskText.appendChild(newTaskTextNode)
                taskTextContainer.appendChild(newTaskText)
                makeEditable(taskTextContainer)
            })
            // newTextForm.focus()
            newTextInput.focus()
        })
    }
    
    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    return { loadInbox, loadToday, loadWeek,
        load, construct, taskArray, saveArray}
})()

export { taskFunctions }