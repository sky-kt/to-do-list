let tasks = (() => {
    let taskArray = []

    let construct = (input) => {
        console.log(input)
        taskArray.push(input)
        console.log(input)
    }

    let load = () => {
        for(let indivTask in taskArray) {
            let taskContainer = document.getElementById('taskContainer')

            let task = document.createElement('div')
            task.classList.add('task')

            let taskStatus = document.createElement('div')
            taskStatus.classList.add('taskStatus')

            let notDone = document.createElement('div')
            notDone.classList.add('notDone')

            let icon = document.createElement('i')
            icon.classList.add('far', 'fa-circle')

            console.log(icon)

            let taskTextContainer = document.createElement('div')
            taskTextContainer.classList.add('taskTextContainer')

            let taskText = document.createElement('p')
            taskText.classList.add('taskText')
            let taskTextNode = document.createTextNode(taskArray[indivTask])

            let taskDate = document.createElement('div')
            taskDate.classList.add('taskDate')

            let dateLabel = document.createElement('label')
            dateLabel.for = "dueDate"

            let dateInput = document.createElement('input')
            dateInput.type = "date"
            dateInput.class = "dueDate"
            dateInput.name = "dueDate"

            //append children
            console.log('appending?')
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
    return { load, construct }
})()

export { tasks }