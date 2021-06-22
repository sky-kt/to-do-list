let status = ((notDone) => {
    //add ability to change icon on click
    let init = () => {
        document.querySelectorAll(".notDone").forEach(currentNotDone => {
            currentNotDone.addEventListener("click", () => {
                removeAllChildren(currentNotDone)
                let done = document.createElement('i')
                done.classList.add('fas', 'fa-check-circle')
                currentNotDone.prepend(done)

                let taskToDelete = currentNotDone.parentNode.parentNode
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