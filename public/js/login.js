formLogin.addEventListener('submit', async event => {
  event.preventDefault();
  console.log('Formulario de inicio de sesión enviado');
  const input_email = document.getElementById('input_email');
  const input_password = document.getElementById('input_password');

  if (
    input_email instanceof HTMLInputElement &&
    input_password instanceof HTMLInputElement
  ) {
    const datosUsuario = {
      input_email: input_email.value,
      input_password: input_password.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    };

    try {
      const response = await fetch('/api/login', options)

      if (response.ok) {
        // Login exitoso, redireccionar a la página de bienvenida
        window.location.href = '/bienvenida';
      } else {
        // Manejar errores en caso de que la solicitud no sea exitosa
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      // Mostrar el error en la consola para fines de depuración
      console.log(error);
    }
  }
});
