let button = (() => {
    let makeForm = () => {
        let buttonContainer = document.getElementById('buttonContainer')
        removeAllChildren(buttonContainer)

        let buttonForm = document.createElement("form")
        buttonForm.setAttribute('id', 'buttonForm')

        let buttonFormInput = document.createElement('input')
        buttonFormInput.setAttribute('id', 'buttonFormInput')
        buttonFormInput.type = "text"
        buttonFormInput.name = "taskName" 

        buttonForm.appendChild(buttonFormInput)
        buttonContainer.appendChild(buttonForm)
        buttonFormInput.focus()
    }

    let makeButton = (input) => {
        console.log(`input:${input}`)

        if(input != undefined) {
            console.log('can push')
            pushTask(input)
        }

        let buttonContainer = document.getElementById('buttonContainer')
        removeAllChildren(buttonContainer)

        let newTaskButton = document.createElement('div')
        let newTaskButtonText = document.createTextNode("+ New Task")

        newTaskButton.appendChild(newTaskButtonText)
        newTaskButton.setAttribute('id', 'newTaskButton')
        buttonContainer.appendChild(newTaskButton)

        newTaskButton.addEventListener('click', makeForm)
    }

    let pushTask = (input) => {
        console.log(input)
        tasks.construct(input)
        tasks.load()
        status.init()
    }

    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return { makeButton, makeForm }

})()

export { button }