import { tasksToLoad } from "./index.js"
let taskFunctions = (() => {
    let taskArray = []

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

    let construct = (input) => {
        if(tasksToLoad === "today") { 
            console.log(findDate())
            taskArray.push([input, findDate()]) 
            console.log('pushed?')
        }
        else { taskArray.push([input]) }
        console.log('task array is', taskArray)
    }

    let loadInbox = () => {
        load(taskArray)
    }

    let loadToday = () => {
        console.log('AHHHH')
        //loop over all items in task array, checking if it has a second value
        //if it does, check the date- should be the same
        let desiredTasks = []
        
        let today = findDate() 

        for(let task in taskArray) {
            if(taskArray[task][1] === today) {
                desiredTasks.push(taskArray[task])
            }
        }

        console.log(desiredTasks)
        load(desiredTasks)
    }

    let load = (activeTasks) => {
        console.log(`tasksToLoad: ${tasksToLoad}`)
        let taskContainer = document.getElementById('taskContainer')
        removeAllChildren(taskContainer)

        for(let indivTask in activeTasks) {
            console.log(`tasksToLoad: ${tasksToLoad}`)
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
            let taskDate = document.createElement('form')
            taskDate.classList.add('taskDate')
            let dateLabel = document.createElement('label')
            dateLabel.for = "dueDate"
            let dateInput = document.createElement('input')
            dateInput.type = "date"
            dateInput.class = "dueDate"
            dateInput.name = "dueDate"

            if(activeTasks[indivTask][1]) {
                dateInput.value = activeTasks[indivTask][1]
            }

            dateInput.addEventListener("change", () => {
                let inputtedDate = dateInput.value
                activeTasks[indivTask].push(inputtedDate)
            })
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
    }
    

    let makeEditable = (taskTextContainer) => {
        let taskText = taskTextContainer.firstChild
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

            newTextForm.addEventListener("submit", () => {
                removeAllChildren(taskTextContainer)
                let newTaskText = document.createElement('p')
                newTaskText.classList.add('taskText')
                let newTaskTextNode = document.createTextNode(newTextInput.value)
                newTaskText.appendChild(newTaskTextNode)
                taskTextContainer.appendChild(newTaskText)
                makeEditable(taskTextContainer)
            })
            taskTextContainer.appendChild(newTextForm)
        })
    }
    
    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    return { loadInbox, loadToday, construct, taskArray}
})()

export { taskFunctions }