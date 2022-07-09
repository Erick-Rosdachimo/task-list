// AO CARREGAR A PAGINA
window.addEventListener('load', () => {
  let arrayElements = localStorage.localS.split('<%')
  let tasksContadas = 1

  for (const element of arrayElements) {
    if (tasksContadas == arrayElements.length) {
    } else {
      tasksContadas = tasksContadas + 1
      // Todas as tasks
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

      // Adicionando o EventListener com as funções para deletar e completar as tarefas
      novaTaskI1.addEventListener('click', () => complete(novaTask, novaTaskP))
      novaTaskI2.addEventListener('click', () =>
        deletarTarefa(novaTask, novaTaskP)
      )

      // colocando o texto
      if (localStorage.localS.search(element + '<%/') >= 0) {
        novaTask.classList.add('complete')
        novaTask.style.backgroundColor = '#4b4b4b'
        if (element[0] == '/') {
          novaTaskP.textContent = element.slice(1)
        } else {
          novaTaskP.textContent = element
        }
      } else {
        if (element[0] == '/') {
          novaTaskP.textContent = element.slice(1)
        } else {
          novaTaskP.textContent = element
        }
      }

      //posicionando os elementos
      boxTasks.appendChild(novaTask)
      task[task.length - 1].appendChild(novaTaskP)
      task[task.length - 1].appendChild(novaTaskSpan)
      novaTaskSpan.appendChild(novaTaskI1)
      novaTaskSpan.appendChild(novaTaskI2)

      // Deletar as tarefas
      const deletarTarefa = (novaTask, novaTaskP) => {
        // Todas as tasks
        const tasks = boxTasks.childNodes
        for (const task of tasks) {
          const currentTaskIsBeingClicked =
            task.firstChild.isSameNode(novaTaskP)
          if (currentTaskIsBeingClicked) {
            let splitOne
            if (localStorage.localS.search(novaTaskP.innerHTML + '<%/') >= 0) {
              splitOne = localStorage.localS.split(novaTaskP.innerHTML + '<%/')
            } else {
              splitOne = localStorage.localS.split(novaTaskP.innerHTML + '<%')
            }
            localStorage.localS = splitOne[0] + splitOne[1]
            console.log(localStorage.localS)
            novaTask.remove()
          }
        }
      }

      // Completar as tarefas
      const complete = (novaTask, novaTaskP) => {
        const tasks = boxTasks.childNodes
        for (const task of tasks) {
          const iconClicked = task.firstChild.isSameNode(novaTaskP)
          if (iconClicked) {
            if (localStorage.localS.search(novaTaskP.innerHTML + '<%/') >= 0) {
              localStorage.localS = localStorage.localS.replace(
                novaTaskP.innerHTML + '<%/',
                novaTaskP.innerHTML + '<%'
              )
            } else {
              localStorage.localS = localStorage.localS.replace(
                novaTaskP.innerHTML + '<%',
                novaTaskP.innerHTML + '<%/'
              )
            }

            novaTask.classList.toggle('complete')
            if (novaTask.classList.contains('complete')) {
              novaTask.style.backgroundColor = '#4b4b4b'
            } else {
              changeTaskAndButtons()
            }
          }
        }
      }

      // Finalizando
      input.focus()
    }
  }
})

const input = document.getElementById('input')
const boxTasks = document.querySelector('.box-tasks')

function addtask() {
  // Selecionando a quantidade de elementos escritos sem os espaços
  var inputTrim = document.getElementById('input').value.trim().length

  // Verifica se oque foi escrito é valido
  if (inputTrim == 0) {
    input.classList.add('error')
    input.value = ''
    input.setAttribute('placeholder', 'Digite caracteres validos')
    input.focus()
  } else {
    // arrumando o input
    input.classList.remove('error')
    input.setAttribute('placeholder', 'Nova tarefa...')

    // Todas as tasks
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

    // Adicionando o EventListener com as funções para deletar e completar as tarefas
    novaTaskI1.addEventListener('click', () => complete(novaTask, novaTaskP))
    novaTaskI2.addEventListener('click', () =>
      deletarTarefa(novaTask, novaTaskP)
    )

    // colocando o texto
    novaTaskP.textContent = input.value

    //posicionando os elementos
    boxTasks.appendChild(novaTask)
    task[task.length - 1].appendChild(novaTaskP)
    task[task.length - 1].appendChild(novaTaskSpan)
    novaTaskSpan.appendChild(novaTaskI1)
    novaTaskSpan.appendChild(novaTaskI2)

    if (localStorage.localS == undefined) {
      localStorage.localS = input.value + '<%'
    } else {
      localStorage.localS = localStorage.localS + input.value + '<%'
    }

    // Finalizando
    input.value = ''
    input.focus()
  }

  // Deletar as tarefas
  const deletarTarefa = (novaTask, novaTaskP) => {
    // Todas as tasks
    const tasks = boxTasks.childNodes
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild.isSameNode(novaTaskP)
      if (currentTaskIsBeingClicked) {
        let splitOne
        if (localStorage.localS.search(novaTaskP.innerHTML + '<%/') >= 0) {
          splitOne = localStorage.localS.split(novaTaskP.innerHTML + '<%/')
        } else {
          splitOne = localStorage.localS.split(novaTaskP.innerHTML + '<%')
        }
        localStorage.localS = splitOne[0] + splitOne[1]
        console.log(localStorage.localS)
        novaTask.remove()
      }
    }
  }

  // Completar as tarefas
  const complete = (novaTask, novaTaskP) => {
    const tasks = boxTasks.childNodes
    for (const task of tasks) {
      const iconClicked = task.firstChild.isSameNode(novaTaskP)
      if (iconClicked) {
        if (localStorage.localS.search(novaTaskP.innerHTML + '<%/') >= 0) {
          localStorage.localS = localStorage.localS.replace(
            novaTaskP.innerHTML + '<%/',
            novaTaskP.innerHTML + '<%'
          )
        } else {
          localStorage.localS = localStorage.localS.replace(
            novaTaskP.innerHTML + '<%',
            novaTaskP.innerHTML + '<%/'
          )
        }

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

let valueBtn
let open = document.querySelector('.changeTheme')
let close = document.querySelector('.icon-cross')

function abreMudarCor() {
  var change = document.querySelector('.changeBox')
  change.style.display = 'block'
}

function fechaMudarCor() {
  var change = document.querySelector('.changeBox')
  change.style.display = 'none'
}

close.addEventListener('click', fechaMudarCor)
open.addEventListener('click', abreMudarCor)

let mexeu = false

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
  fechaMudarCor()
}
