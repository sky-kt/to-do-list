let tasks = (() => {
    let create = (input) => {
        let taskContainer = document.getElementById('taskContainer')

        let task = document.createElement('div')
        task.classList.add('task')

        let taskStatus = document.createElement('div')
        taskStatus.classList.add('taskStatus')

        let notDone = document.createElement('div')
        notDone.classList.add('notDone')

        let icon = document.createElement('i')
        icon.classList.add('far', 'fa-circle')

        let taskText = document.createElement('p')
        taskText.classList.add('taskText')
        let taskTextNode = document.createTextNode(input)

        let taskDate = document.createElement('div')
        taskDate.classList.add('taskDate')
        let taskDateText = document.createTextNode('Date')

        //append children
        taskDate.appendChild(taskDateText)
        
        notDone.prepend(icon)
        taskText.appendChild(taskTextNode)

        taskStatus.appendChild(notDone)
        taskStatus.appendChild(taskText)

        task.appendChild(taskStatus)
        task.appendChild(taskDate)

        taskContainer.appendChild(task)
    }

    return { create }
})()

export { tasks }