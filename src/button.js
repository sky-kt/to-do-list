import { tasks } from "./tasks.js"
import { status } from "./status.js"

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
        buttonFormInput.focus()

        buttonForm.appendChild(buttonFormInput)
        buttonContainer.appendChild(buttonForm)
    }

    let makeButton = () => {
        let buttonContainer = document.getElementById('buttonContainer')
        removeAllChildren(buttonContainer)

        let newTaskButton = document.createElement('div')
        let newTaskButtonText = document.createTextNode("+ New Task")

        newTaskButton.appendChild(newTaskButtonText)
        newTaskButton.setAttribute('id', 'newTaskButton')
        buttonContainer.appendChild(newTaskButton)
    }

    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return { makeButton, makeForm }

})()

export { button }