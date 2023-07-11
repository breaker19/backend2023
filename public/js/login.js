const formLogin = document.getElementById('formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email = document.getElementById('input_email')
    const input_password = document.getElementById('input_password')

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        email: input_email.value,
        password: input_password.value,
      }

      const { status } = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      })

      if (status === 201) {
        window.location.href = '/register'
      } else {
        alert('Usuario o contraseña incorrectos')
      }
    }
  })
}