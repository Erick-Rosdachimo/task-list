const input = document.getElementById('input')
const boxTasks = document.querySelector('.box-tasks')
const elementEmpty = document.createElement('div')

var taskQuant = 0

function addtask() {
  var inputTrim = document.getElementById('input').value.trim()
  inputTrim = inputTrim.length
  if (inputTrim == 0) {
    input.classList.add('error')
    input.value = ''
    input.setAttribute('placeholder', 'Digite caracteres validos')
    input.focus()
  } else {
    // arrumando o input
    input.classList.remove('error')
    input.setAttribute('placeholder', 'Nova tarefa...')

    // task atual
    const task = document.getElementsByClassName('task')

    // criando os elementos
    const novaTask = document.createElement('div')
    const novaTaskP = document.createElement('p')
    const novaTaskSpan = document.createElement('span')
    const novaTaskI1 = document.createElement('i')
    const novaTaskI2 = document.createElement('i')

    // nomeando os elementos
    novaTask.classList.add('task')
    novaTaskI1.classList.add('icon-ok')
    novaTaskI2.classList.add('icon-trashcan')

    novaTaskI1.addEventListener('click', () => complete(novaTask, novaTaskP))

    novaTaskI2.addEventListener('click', () =>
      handleDeleteClick(novaTask, novaTaskP)
    )

    // colocando o texto
    novaTaskP.textContent = input.value

    //posicionando os elementos
    boxTasks.appendChild(novaTask)

    task[taskQuant].appendChild(novaTaskP)
    input.value = ''
    task[taskQuant].appendChild(novaTaskSpan)

    // ------ span atual ------
    const spanAtual = task[taskQuant].lastChild

    spanAtual.appendChild(novaTaskI1)
    spanAtual.appendChild(novaTaskI2)

    taskQuant = taskQuant + 1
    input.value = ''
    input.focus()
  }

  const handleDeleteClick = (novaTask, novaTaskP) => {
    const tasks = boxTasks.childNodes

    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild.isSameNode(novaTaskP)

      if (currentTaskIsBeingClicked) {
        novaTask.remove()
      }
    }

    taskQuant = taskQuant - 1
  }

  const complete = (novaTask, novaTaskP) => {
    const tasks = boxTasks.childNodes

    for (const task of tasks) {
      const iconClicked = task.firstChild.isSameNode(novaTaskP)

      if (iconClicked) {
        novaTask.classList.toggle('complete')
        if (novaTask.classList.contains('complete')) {
          novaTask.style.backgroundColor = '#4b4b4b'
        } else {
          changeTaskAndButtons()
        }
      }
    }
  }

  changeTaskAndButtons()
}

var valueBtn
var open = document.querySelector('.changeTheme')
var close = document.querySelector('.icon-cross')

function aparecer() {
  var change = document.querySelector('.changeBox')
  change.style.display = 'block'
}

function sumir() {
  var change = document.querySelector('.changeBox')
  change.style.display = 'none'
}

close.addEventListener('click', sumir)
open.addEventListener('click', aparecer)

var mexeu = false

function changeTaskAndButtons() {
  var buttonAdd = document.querySelector('button.add')
  var tasks = document.querySelectorAll('.task:not(.complete)')
  var changeBtn = document.querySelector('.changeTheme')
  var saveBtn = document.querySelector('.save')
  if (mexeu) {
    buttonAdd.style.backgroundColor = valueBtn
    changeBtn.style.backgroundColor = valueBtn
    saveBtn.style.backgroundColor = valueBtn

    for (const task of tasks) {
      task.style.backgroundColor = valueBtn
    }
  } else {
    tasksAndButtons()
  }
}

function tasksAndButtons() {
  var valueTaskButton = document.getElementById('tasksAndButtons').value
  var buttonAdd = document.querySelector('button.add')
  var tasks = document.querySelectorAll('.task:not(.complete)')
  var changeBtn = document.querySelector('.changeTheme')
  var saveBtn = document.querySelector('.save')
  valueBtn = valueTaskButton

  buttonAdd.style.backgroundColor = valueTaskButton
  changeBtn.style.backgroundColor = valueTaskButton
  saveBtn.style.backgroundColor = valueTaskButton

  for (const task of tasks) {
    task.style.backgroundColor = valueTaskButton
  }
}

function changeAction() {
  var valueBackground = document.getElementById('background').value

  var body = document.getElementById('body')
  let footer = document.getElementById('footer')

  body.style.backgroundColor = valueBackground
  footer.style.backgroundColor = valueBackground

  mexeu = true
  tasksAndButtons()
}
