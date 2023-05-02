class UserManager {
    constructor() {
        this.usuarios = []
    }

    guardar(user) {
        this.usuarios.push(user)
    }

    searchByEmail(email) {
        const buscado = this.usuarios.find(u => u.email === email)
        if (!buscado) throw new Error('usuario no encontrado')
       
        return { ...buscado }
    }

    getAll() {
       
        return [...this.usuarios]
    }
}

export const usersManager = new UserManager()