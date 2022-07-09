// AO CARREGAR A PAGINA
window.addEventListener('load', () => {
  let arrayElements
  let tasksContadas = 1

  if (localStorage.localS == undefined) {
  } else {
    arrayElements = localStorage.localS.split('<%')

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
        novaTaskI1.addEventListener('click', () =>
          complete(novaTask, novaTaskP)
        )
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
              if (
                localStorage.localS.search(novaTaskP.innerHTML + '<%/') >= 0
              ) {
                splitOne = localStorage.localS.split(
                  novaTaskP.innerHTML + '<%/'
                )
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
              if (
                localStorage.localS.search(novaTaskP.innerHTML + '<%/') >= 0
              ) {
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
  }
  // definindo
  document.querySelector('button.add').style.backgroundColor =
    localStorage.corTask
  document.querySelector('.changeTheme').style.backgroundColor =
    localStorage.corTask
  document.querySelector('.save').style.backgroundColor = localStorage.corTask

  let tasksIncompletas = document.querySelectorAll('.task:not(.complete)')
  for (const task of tasksIncompletas) {
    task.style.backgroundColor = localStorage.corTask
  }
  if (localStorage.corTask == undefined) {
  } else {
    document.getElementById('tasksAndButtons').value = localStorage.corTask
  }
  document.querySelector('footer').style.backgroundColor =
    localStorage.corBackground
  document.querySelector('body').style.backgroundColor =
    localStorage.corBackground
  document.getElementById('background').value = localStorage.corBackground
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

function changeTaskAndButtons() {
  //value
  let valueBtn = document.getElementById('tasksAndButtons').value

  let tasksIncompletas = document.querySelectorAll('.task:not(.complete)')

  // definindo
  document.querySelector('button.add').style.backgroundColor = valueBtn
  document.querySelector('.changeTheme').style.backgroundColor = valueBtn
  document.querySelector('.save').style.backgroundColor = valueBtn

  localStorage.corTask = valueBtn

  for (const task of tasksIncompletas) {
    task.style.backgroundColor = valueBtn
  }
}

function changeAction() {
  let valueBackground = document.getElementById('background').value
  document.querySelector('body').style.backgroundColor = valueBackground
  document.querySelector('footer').style.backgroundColor = valueBackground
  localStorage.corBackground = valueBackground
  changeTaskAndButtons()
  fechaMudarCor()
}
