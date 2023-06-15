const form = document.getElementById('signupForm')

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    const url = '/sessions'
    const headers = {
        'Content-Type': 'application/json',
    }
    const method = 'POST'
    const body = JSON.stringify(obj)

    fetch(url,{
        headers,
        method,
        body
    })
    .then(response => {
        window.location.href = '/'
      })
    .catch(error => console.log(error))
}) 