import { button } from "./button.js"
import { status } from "./status.js"
import { taskFunctions } from "./taskFunctions.js"

let tasksToLoad = "inbox";
export { tasksToLoad }

let activateButton = () => {
    let newTaskButton = document.getElementById('newTaskButton')
    newTaskButton.addEventListener('click', () => {
        button.makeForm()
        activateForm()
    })
}

let activateForm = () => {
    let buttonForm = document.getElementById('buttonForm')
    let buttonFormInput = document.getElementById('buttonFormInput')
    buttonForm.addEventListener('submit', () => {
        let newTaskInfo = buttonFormInput.value
        taskFunctions.construct(newTaskInfo)
        loadCorrectTasks()
        status.init()
        //restart process again
        button.makeButton()
        activateButton()
    })
}

let loadCorrectTasks = () => {
    if(tasksToLoad === "inbox") {
        console.log('loading inbox')
        taskFunctions.loadInbox()
    }
    else if(tasksToLoad === "today") {
        console.log('loading today')
        taskFunctions.loadToday()
    }
    else if(tasksToLoad === "week") {
        console.log('loading week')
        taskFunctions.loadWeek()
    }
}

let inbox = document.getElementById('inbox')
let today = document.getElementById('today')
let week = document.getElementById('week')

inbox.addEventListener("click", () => {
    console.log('inbox')
    tasksToLoad = "inbox"
    loadCorrectTasks()
    status.init()
})

today.addEventListener("click", () => {
    console.log('today')
    tasksToLoad = "today"
    loadCorrectTasks()
    status.init()
})

week.addEventListener("click", () => {
    console.log('week')
    tasksToLoad = "week"
    loadCorrectTasks()
    status.init()
})

button.makeButton()
activateButton()