const counter = document.querySelector("#counter")
const plusButton = document.querySelector("#plus")
const minusButton = document.querySelector('#minus')
const likeButton = document.querySelector('#heart')
const likes = document.querySelector(".likes")
let timerButton = document.querySelector('#pause')
const commentList = document.querySelector('#list')
const form = document.querySelector('#comment-form')


const changeCounter = op => {
  count = parseInt(counter.textContent)

  if (op === "add") {
    return counter.textContent = count + 1
  }
  return counter.textContent = count - 1
}

const toggleTimer = id => {
  if (id === "pause") {
    timerButton.id = "resume"
    timerButton.textContent = "resume"
    document.body.removeEventListener('click', handleBodyClick)
    return clearInterval(timer)
  }
  timerButton.id = "pause"
  timerButton.textContent = "pause"
  document.body.addEventListener('click', handleBodyClick)
  return timer = setInterval(_ => changeCounter("add"), 1000)
}

const addLike = time => {

  let li = Array.from(likes.children).find(child => child.dataset.time === time) || document.createElement("li")
  li.dataset.time = li.dataset.time || time
  li.dataset.likes = li.dataset.likes ?? 0
  li.dataset.likes++
  li.textContent = `${time} has ${li.dataset.likes} likes!`
  likes.appendChild(li)
}

const postComment = e => {
  e.preventDefault()
  let newComment = document.createElement("p")
  newComment.className = "comment"
  newComment.textContent = e.target[0].value
  list.appendChild(newComment)
}

const handleBodyClick = e => {
  switch (true){
    case (e.target === plusButton):
      changeCounter("add")
      break
    case (e.target === minusButton):
      changeCounter("sub")
      break
    case (e.target === timerButton):
      e.cancelBubble = true
      toggleTimer(e.target.id)
      break
    case (e.target === likeButton):
      addLike(counter.textContent)
      break
  }
}

document.body.addEventListener('click', handleBodyClick)
timerButton.addEventListener('click', handleBodyClick)
form.addEventListener('submit', postComment)
let timer = setInterval(_ => changeCounter("add"), 1000)
