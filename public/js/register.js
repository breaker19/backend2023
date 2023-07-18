const formRegister = document.getElementById('formRegister')
if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_first_name = document.getElementById('input_first_name')
    const input_last_name = document.getElementById('input_last_name')
    const input_email = document.getElementById('input_email')
    const input_age = document.getElementById('input_age')
    const input_password = document.getElementById('input_password')

    if ( 
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
const datosUsuario = {
        input_first_name: input_first_name.value,
        input_last_name: input_last_name.value,
        input_email: input_email.value,
        input_age: input_age.value,
        input_password: input_password.value,
      }

      console.log(datosUsuario) // Agregar esta línea para depurar los datos del formulario

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify(datosUsuario)
      }
      
      try {
        const response = await fetch('/api/usuarios', options)
        const usuarioCreado = await response.json()

        console.log(usuarioCreado) // Agregar esta línea para depurar la respuesta de la solicitud

        if (response.ok) {
          window.location.href = '/login'
        } else {
          // Manejar errores en caso de que la solicitud no sea exitosa
        }
      } catch (error) {
        console.log(error) // Mostrar el error en la consola para fines de depuración
      }
    }
  })
  
}

