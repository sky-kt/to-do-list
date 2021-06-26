let projectButton = (() => {
    let makeForm = () => {
        let projectButtonContainer = document.getElementById('projectButtonContainer')
        removeAllChildren(projectButtonContainer)

        let projectButtonForm = document.createElement("form")
        projectButtonForm.setAttribute('id', 'projectButtonForm')

        let projectButtonFormInput = document.createElement('input')
        projectButtonFormInput.setAttribute('id', 'projectButtonFormInput')
        projectButtonFormInput.type = "text"
        projectButtonFormInput.name = "projectName" 

        projectButtonForm.appendChild(projectButtonFormInput)
        projectButtonContainer.appendChild(projectButtonForm)
        projectButtonFormInput.focus()
    }

    let makeButton = () => {
        let projectButtonContainer = document.getElementById('projectButtonContainer')
        removeAllChildren(projectButtonContainer)

        let newProjectButton = document.createElement('div')
        let newProjectButtonText = document.createElement("p")
        newProjectButtonText.setAttribute('id', 'newProjectButtonText')
        let newProjectButtonTextNode = document.createTextNode("+ New Project")
        newProjectButtonText.appendChild(newProjectButtonTextNode)

        newProjectButton.appendChild(newProjectButtonText)
        newProjectButton.setAttribute('id', 'newProjectButton')
        projectButtonContainer.appendChild(newProjectButton)

        newProjectButton.addEventListener('click', makeForm)
    }

    let removeAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return { makeButton, makeForm }
})()

export { projectButton }