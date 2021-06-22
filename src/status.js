let status = ((notDone) => {
    //add ability to change icon on click
    let init = () => {
        let notDone = document.querySelectorAll(".notDone")
        console.log(notDone)
        let lastNotDone = notDone[notDone.length - 1]
        console.log(`lastnotdone: ${lastNotDone}`)

        lastNotDone.addEventListener("click", () => {
            removeAllChildren(lastNotDone)
            let done = document.createElement('i')
            done.classList.add('fas', 'fa-check-circle')
            lastNotDone.prepend(done)
            console.log('done')
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