let status = ((notDone) => {
    //add ability to change icon on click
    let init = () => {
        document.querySelectorAll(".notDone").forEach(notDone => {
            notDone.addEventListener("click", () => {
                removeAllChildren(notDone)
                let done = document.createElement('i')
                done.classList.add('fas', 'fa-check-circle')
                notDone.prepend(done)
                console.log('done')
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