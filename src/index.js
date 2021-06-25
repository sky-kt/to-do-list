import { button } from "./button.js"
import { status } from "./status.js"
import { taskFunctions } from "./taskFunctions.js"
import { date } from "./date"

let tasksToLoad = "inbox";
export { tasksToLoad }

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

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
        date.init()
        //restart process again
        button.makeButton()
        activateButton()
    })
}

let loadCorrectTasks = () => {
    if(tasksToLoad === "inbox") {
        taskFunctions.loadInbox()
    }
    else if(tasksToLoad === "today") {
        taskFunctions.loadToday()
    }
    else if(tasksToLoad === "week") {
        taskFunctions.loadWeek()
    }
}

let setTitle = (newTitle) => {
    let taskTabTitle = document.getElementById('taskTabTitle')
    taskTabTitle.textContent = newTitle
}

let inbox = document.getElementById('inbox')
let today = document.getElementById('today')
let week = document.getElementById('week')

inbox.addEventListener("click", () => {
    tasksToLoad = "inbox"
    loadCorrectTasks()
    status.init()
    date.init()
    setTitle('Inbox')
})

today.addEventListener("click", () => {
    tasksToLoad = "today"
    loadCorrectTasks()
    status.init()
    date.init()
    setTitle('Today')
})

week.addEventListener("click", () => {
    tasksToLoad = "week"
    loadCorrectTasks()
    status.init()
    date.init()
    setTitle('This Week')
})

button.makeButton()
activateButton()
