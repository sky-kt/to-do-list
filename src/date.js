import { taskFunctions } from "./taskFunctions.js"

let date = (() => {
    let init = () => {
        console.log('changes...')
        document.querySelectorAll(".dueDate").forEach(currentDueDate => {
            currentDueDate.addEventListener("change", () => {
                let inputtedDate = currentDueDate.value
                let taskToChangeDate = currentDueDate.parentNode.parentNode
                let taskToChange = taskFunctions.taskArray[Array.from(taskToChangeDate.parentNode.children).indexOf(taskToChangeDate)]
                if(taskToChange.length > 1) taskToChange.pop()
                taskToChange.push(inputtedDate)
            })
        })
        //remove last index of array!!!!!!!!!!!!!!!!1
    }

    return { init }
})()

export { date }
