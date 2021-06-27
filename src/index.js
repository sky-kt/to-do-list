import { button } from "./button.js"
import { projectButton } from "./projectButton.js"
import { projectFunctions } from "./projectFunctions"
import { status } from "./status.js"
import { taskFunctions } from "./taskFunctions.js"
import { date } from "./date"

let tasksToLoad = "inbox";
export { tasksToLoad }

Date.prototype.getWeek = function () {
    var firstDay = new Date(this.setDate(1)).getDay();
    var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
    return Math.ceil((firstDay + totalDays) / 7);
}

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
        if(tasksToLoad === 'inbox' || tasksToLoad === 'today' || tasksToLoad === 'week') {
            taskFunctions.construct(newTaskInfo)
        }
        else { 
            projectFunctions.construct(newTaskInfo)
        }
        loadCorrectTasks()
        status.init()
        date.init()
        button.makeButton()
        activateButton()
    })
    buttonForm.addEventListener('focusout', () => {
        button.makeButton()
        activateButton()
    })
}

let activateProjectButton = () => {
    let newProjectButton = document.getElementById('newProjectButton')
    newProjectButton.addEventListener('click', () => {
        projectButton.makeForm()
        activateProjectForm()
    })
} 

let activateProjectForm = () => {
    let projectButtonForm = document.getElementById('projectButtonForm')
    let projectButtonFormInput = document.getElementById('projectButtonFormInput')

    projectButtonForm.addEventListener('submit', () => {
        let projectName = projectButtonFormInput.value
        projectFunctions.makeProject(projectName)
        projectFunctions.loadProjectNames()

        //on click change project
        projectFunctions.init()

        projectButton.makeButton()
        activateProjectButton()
    })
    projectButtonForm.addEventListener('focusout', () => {
        projectButton.makeButton()
        activateProjectButton()
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
    else {
        console.log('desiredtask array & project list')
        projectFunctions.load()
    }
}

let setTitle = (newTitle) => {
    let taskTabTitle = document.getElementById('taskTabTitle')
    taskTabTitle.textContent = newTitle
}

let inbox = document.getElementById('inbox')
let today = document.getElementById('today')
let week = document.getElementById('week')

let loadInbox = () => {
    tasksToLoad = "inbox"
    loadCorrectTasks()
    status.init()
    date.init()
    setTitle('Inbox')
}

let loadToday = () => {
    tasksToLoad = "today"
    loadCorrectTasks()
    status.init()
    date.init()
    setTitle('Today')
}

let loadWeek = () => {
    tasksToLoad = "week"
    loadCorrectTasks()
    status.init()
    date.init()
    setTitle('This Week')
}

inbox.addEventListener("click", () => {
    loadInbox()
})

today.addEventListener("click", () => {
    loadToday()
})

week.addEventListener("click", () => {
    loadWeek()
})


localStorage.removeItem('projectList')
localStorage.removeItem('taskArray')

loadInbox()

projectFunctions.loadProjectList()
projectFunctions.loadProjectNames()
projectFunctions.init()

button.makeButton()
activateButton()

projectButton.makeButton()
activateProjectButton()
