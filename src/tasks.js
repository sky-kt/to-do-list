let tasks = (() => {
    let taskList = []

    let makeForm = () => {
        let buttonContainer = document.getElementById('buttonContainer')
        removeAllChildren(buttonContainer)

        let buttonForm = document.createElement("form")
        let buttonFormInput = document.createElement('input')
        buttonFormInput.type = "text"
        buttonFormInput.name = "taskName" 

        buttonForm.appendChild(buttonFormInput)
        buttonContainer.appendChild(buttonForm)

        buttonForm.addEventListener('submit', () => {
            makeButton(buttonFormInput.value)
        })
    }

    let makeButton = (input) => {
        pushInput(input)

        let buttonContainer = document.getElementById('buttonContainer')
        removeAllChildren(buttonContainer)

        let newTaskButton = document.createElement('div')
        let newTaskButtonText = document.createTextNode("+ New Task")

        newTaskButton.appendChild(newTaskButtonText)
        newTaskButton.setAttribute('id', 'newTaskButton')
        buttonContainer.appendChild(newTaskButton)

        newTaskButton.addEventListener('click', makeForm)
    }

    let pushInput = (input) => {
        console.log('gets here')
        if(input !== undefined) {
            taskList.push(input)
            console.log(taskList)
        } else return
    }

    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return { makeButton, makeForm }

})()

export { tasks }