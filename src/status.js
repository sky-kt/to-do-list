import { taskFunctions } from "./taskFunctions.js"
import { tasksToLoad } from "./index.js"
import { projectFunctions } from "./projectFunctions.js"

let status = (() => {
    //add ability to change icon on click
    let init = () => {
        document.querySelectorAll(".notDone").forEach(currentNotDone => {
            currentNotDone.addEventListener("click", () => {
                removeAllChildren(currentNotDone)
                let done = document.createElement('i')
                done.classList.add('fas', 'fa-check-circle')
                currentNotDone.prepend(done)

                let taskToDelete = currentNotDone.parentNode.parentNode
                if(tasksToLoad === 'inbox' || tasksToLoad === 'today' || tasksToLoad === 'week') {
                    taskFunctions.taskArray.splice(Array.from(taskToDelete.parentNode.children).indexOf(taskToDelete), 1)
                    taskFunctions.saveArray()
                }
                else {
                    projectFunctions.projectList[tasksToLoad].splice(Array.from(taskToDelete.parentNode.children).indexOf(taskToDelete), 1)
                }

                taskToDelete.classList.add('fadingTask')

                setTimeout(() => {
                    taskContainer.removeChild(currentNotDone.parentNode.parentNode)
                }, 500)
            })
        })
    }

    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    return { init }
})()

export { status }