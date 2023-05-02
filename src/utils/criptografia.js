import bcrypt from 'bcryptjs'

const alfabeto = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'o', 'n', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', ' ', '"', '{', '}', ',', ':',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'o', 'n', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', ' ', '"', '{', '}', ',', ':',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
]

const corrimiento = 10

function cifrarLetra(letra, corrimiento) {
    const index = alfabeto.findIndex(l => l === letra)
    const nuevoIndice = index + corrimiento
    return alfabeto[nuevoIndice]
}

// // reversible!
// export function cifrarFrase(frase) {
//     return frase.split('').map(letra => cifrarLetra(letra, corrimiento)).join('')
// }

// export function descifrarFrase(frase) {
//     return frase.split('').map(letra => cifrarLetra(letra, -corrimiento)).join('')
// }

// // irreversible!
export function hashear(frase) {
    return bcrypt.hashSync(frase, bcrypt.genSaltSync(10))
}

export function validarQueSeanIguales(recibida, almacenada) {
    // return hashear(recibida) !== almacenada
    return bcrypt.compareSync(recibida, almacenada)
}