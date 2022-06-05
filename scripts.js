/* passo a passo 
1- fazer funcao para adicionar uma tarefa com o texto inserido apartir do botao
*/
const input = document.getElementById('input')
const boxTasks = document.querySelector('.box-tasks')
const elementEmpty = document.createElement('div')

var taskQuant = 0
var elementDel = 0

function addtask() {
  var inputTrim = document.getElementById('input').value.trim()
  inputTrim = inputTrim.length
  if (inputTrim == 0) {
    input.classList.add('error')
    input.value = ''
    input.setAttribute('placeholder', 'Digite caracteres validos')
  } else {
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
      }
    }
  }
}
