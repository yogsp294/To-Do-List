const toDoForm = document.querySelector("#to-do-app-form")
const taskList = document.querySelector("#to-do-list")

let toDoList = JSON.parse(window.localStorage.getItem('tasks')) ? JSON.parse(window.localStorage.getItem('tasks')) : []

taskList.classList.add("hidden")

const getTasks = () => {

  toDoForm.addEventListener("submit", e => {
    e.preventDefault()
    const input = e.target.querySelector("input")
    const value = input.value
    if (value !== "") toDoList.push(value)
    // Reset input
    input.value = ""

    window.localStorage.setItem('tasks', JSON.stringify(toDoList));

    if (toDoList.length > 0) addTasks(toDoList)
  })

}

getTasks()

const addTasks = (tasks) => {

  if (taskList.classList.contains("hidden") && tasks.length > 0) taskList.classList.remove("hidden")

  if (tasks.length <= 0) taskList.classList.add("hidden")

  taskList.innerHTML = ""

  tasks.forEach((task, index) => {
    const taskValue = task
    // Generate list HTML
    const listItem = generateListHTML(taskValue, index)
    taskList.insertAdjacentHTML("beforeend", listItem)
  })
}

const generateListHTML = (content, index) => {
  const list = `<li class="to-do-item" data-index="${index}">
            <form class="form">
              <div class="form-group">
                <p class="to-do-text">${content}</p>

                <input type="text" value="${content}" class="form-input">

                <div class="options">
                  <button type="button" class="btn btn-update"><i class="ri-edit-line"></i></button>
                  <button type="button" class="btn btn-delete"><i class="ri-delete-bin-line"></i></button>
                </div>

              </div>
            </form>
          </li>`

  return list
}

addTasks(toDoList)

// Update and remove tasks
taskList.addEventListener("click", e => {
  const updateBtn = e.target.closest(".btn-update")
  const deleteBtn = e.target.closest(".btn-delete")
  if (updateBtn) return updateTask(updateBtn)
  if (deleteBtn) return deleteTask(deleteBtn)
})

function updateTask(target) {

  const list = target.closest(".to-do-item")
  const form = target.closest(".form")
  const formInput = form.querySelector("input")
  const text = form.querySelector(".to-do-text")
  const index = +list.dataset.index

  list.classList.toggle("is-edit")

  if (list.classList.contains("is-edit")) {
    formInput.focus()
    const valLength = formInput.value.length
    formInput.setSelectionRange(valLength, valLength)
    target.innerHTML = `<i class="ri-check-line"></i>`
  } else {
    target.innerHTML = `<i class="ri-edit-line"></i>`
    update(formInput, index)
  }

  form.addEventListener("submit", e => {
    e.preventDefault()
    update(formInput, index)
  })

}

function update(input, index) {
  const newValue = input.value
  if (newValue !== "") toDoList[index] = newValue
  window.localStorage.setItem('tasks', JSON.stringify(toDoList));

  addTasks(toDoList)
}

function deleteTask(target) {

  const list = target.closest(".to-do-item")
  const index = +list.dataset.index

  toDoList.splice(index, 1)

  window.localStorage.setItem('tasks', JSON.stringify(toDoList));

  addTasks(toDoList)

}