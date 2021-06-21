export let status = (() => {
    let init = (notDone) => {
        //add ability to change icon on click
        document.querySelectorAll(".notDone").forEach(notDone => {
            notDone.addEventListener("click", () => {
                notDone.removeChild(notDone.childNodes[0])
                notDone.removeChild(notDone.childNodes[0])
                let done = document.createElement('i')
                done.classList.add('fas', 'fa-check-circle')
                notDone.prepend(done)
                console.log('done')
            })
        })
    }

    return { init }
})()