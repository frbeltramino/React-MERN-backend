const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async (req, res = response) => {

  const { email, password } = req.body;

  try {

  let usuario = await Usuario.findOne({ email });
  if (usuario) {
    res.status(400).json({
      ok: false,
      message: 'Un usuario existe con ese correo'
    });
    return;
  }

  usuario = new Usuario( req.body );

  //Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();
  //generar JWT
  const token = await generarJWT(usuario._id, usuario.name);


  res.status(201).json({
    ok: true,
    uid: usuario._id,
    name: usuario.name,
    token
  });
} catch (err) {
  res.status(500).json({
    ok: false,
    message: 'Por favor hable con el administrador'
  });
}
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      res.status(400).json({
        ok: false,
        message: 'El usuario no existe con ese email'
      });
      return;
    }
  
    //Validar contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      res.status(400).json({
        ok: false,
        message: 'La contraseña es incorrecta'
      });
      return;
    }

    //Generar token
    const token = await generarJWT(usuario._id, usuario.name);


    res.status(200).json({
      ok: true,
      uid: usuario._id,
      name: usuario.name,
      token
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
 
}

const revalidarToken = async (req, res = response) => {

  const { uid, name } = req;

  // generar un nuevo JWT y retornarlo

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token
  });
}


module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
};