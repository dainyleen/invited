document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('registrar')
  const input = form.querySelector('input')

  const mainDiv = document.querySelector('.main')
  const ul = document.getElementById('invitedList')

  const div = document.createElement('div')
  const filterLabel = document.createElement('label')
  const filterCheckbox = document.createElement('input')

  filterLabel.textContent = "Hide those who haven't responded"
  filterCheckbox.type = 'checkbox'
  div.appendChild(filterLabel)
  div.appendChild(filterCheckbox)
  mainDiv.insertBefore(div, ul)

  filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked
    const lis = ul.children
    if (isChecked) {
      for (let i = 0; i <lis.length; i++) {
        let li = lis[i]
        if (li.className === 'responded') {
          li.style.display = ''
        } else {
          li.style.display = 'none'
        }
      }
    } else {
      for (let i = 0; i <lis.length; i++) {
        let li = lis[i]
        li.style.display = ''
      }
    }
  })

  function createLI (text) {

    function createElement(elementName, prop, value) {
      const element = document.createElement(elementName)
      element[prop] = value
      return element
    }

    function appendToLI(elementName, prop, value) {
      const element = createElement(elementName, prop, value)
      li.appendChild(element)
      return element
    }

    const li = document.createElement('li')
    appendToLI('span', 'textContent', text)
    const label = appendToLI('label', 'textContent', 'confirmed')
    const checkbox = createElement('input', 'type', 'checkbox')
    label.appendChild(checkbox)
    appendToLI('button', 'textContent', 'edit')
    appendToLI('button', 'textContent', 'remove')
    return li
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = input.value
    input.value = ''
    const li = createLI(text)
    ul.appendChild(li)
  })

  ul.addEventListener('change', (e) => {
    const checkbox = e.target
    const checked = checkbox.checked
    const listItem = checkbox.parentNode.parentNode

    if (checked) {
      listItem.className = 'responded'
    } else {
      listItem.className = ''
    }
  })

  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target
      const li = button.parentNode
      const ul = li.parentNode

      function removeName() {
        ul.removeChild(li)
      }

      function editName() {
        const span = li.firstElementChild
        const input = document.createElement('input')
        input.type = 'text'
        input.value = span.textContent
        li.insertBefore(input, span)
        li.removeChild(span)
        button.textContent = 'save'
      }

      function saveName() {
        const input = li.firstElementChild
        const span = document.createElement('span')
        span.textContent = input.value 
        li.insertBefore(span, input)
        li.removeChild(input)
        button.textContent = 'edit'
      }
      if (button.textContent === 'remove') {
        removeName()
      } else if (button.textContent === 'edit') {
        editName()
      } else if (button.textContent === 'save') {
        saveName()
      }
    }
  })

})