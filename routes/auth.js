/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');



router.post(
    '/new', 
    [//middlewares
      check('name', 'El nombre es requerido').not().isEmpty(),
      check('email', 'El email es requerido').isEmail(),  
      check('password', 'La contraseña de de ser de 6 caracteres').isLength({ min: 6 }),
      validarCampos
    ] , 
    crearUsuario
  );

router.post(
    '/', 
    [
      check('email', 'El email es requerido').isEmail(),  
      check('password', 'La contraseña de de ser de 6 caracteres').isLength({ min: 6 }),
      validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken
);

module.exports = router;