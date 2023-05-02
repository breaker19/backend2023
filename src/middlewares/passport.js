import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { ErrorDeAutenticacion } from '../utils/error.js'
import { validarQueSeanIguales } from '../utils/criptografia.js'
import {githubClientId, githubClientSecret, githubCallbackUrl} from '../../config/auth.config.js'
import {User} from '../utils/user.js'
import { usersManager } from '../managers/user.manager.js'

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    // esto es lo que estaba en el controller de login
    const buscado = await usersManager.searchByEmail(username)
    if (!buscado)
        return done(new ErrorDeAutenticacion())
    if (!validarQueSeanIguales(password, buscado.password))
        return done(new ErrorDeAutenticacion())
    delete buscado.password
    done(null, buscado)
}))

passport.use('github', new GithubStrategy({
    clientID: githubClientId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    let user
    try {
        user = await usersManager.searchByEmail(profile.username)
        
    } catch (error) {
        // @ts-ignore
        user = new User({
            email: profile.username,
        })
        await usersManager.guardar(user)
    }
    done(null, user)
}))

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos son para cargar como middlewares antes de los controladores correspondientes
// export const authenticateLocal = 
export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })