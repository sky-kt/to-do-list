import { taskFunctions } from "./taskFunctions.js"
import { tasksToLoad } from "./index.js"
import { projectFunctions } from "./projectFunctions.js"

let date = (() => {
    let init = () => {
        console.log('changes...')
        document.querySelectorAll(".dueDate").forEach(currentDueDate => {
            currentDueDate.addEventListener("change", () => {
                let inputtedDate = currentDueDate.value
                let taskToChangeDate = currentDueDate.parentNode.parentNode
                let taskToChange
                let desiredIndex = Array.from(taskToChangeDate.parentNode.children).indexOf(taskToChangeDate)
                if(tasksToLoad === 'inbox' || tasksToLoad === 'today' || tasksToLoad === 'week') {
                    taskToChange = taskFunctions.taskArray[desiredIndex]
                    taskFunctions.saveArray()
                }
                else {
                    taskToChange = projectFunctions.projectList[tasksToLoad][desiredIndex]
                }
                if(taskToChange.length > 1) taskToChange.pop()
                taskToChange.push(inputtedDate)
            })
        })
        //remove last index of array!!!!!!!!!!!!!!!!1
    }

    return { init }
})()

export { date }
