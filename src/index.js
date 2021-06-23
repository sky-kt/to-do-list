import { button } from "./button.js"
import { status } from "./status.js"
import { tasks } from "./tasks.js"


button.makeButton()

let activateButton = () => {
    let newTaskButton = document.getElementById('newTaskButton')
    newTaskButton.addEventListener('click', () => {
        button.makeForm()
        activateForm()
    })
}
let activateForm = () => {
    let buttonForm = document.getElementById('buttonForm')
    buttonForm.addEventListener('submit', () => {
        button.makeButton()
        activateButton()
    })
}