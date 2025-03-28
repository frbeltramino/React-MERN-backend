const { response} = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {
  
  // x-token headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No se encontro el token'
    });
  }

  try {

    const {uid, name} = jwt.verify(
      token, 
      process.env.SECRET_JWT_SEED
    );
    req.uid = uid;
    req.name = name;
    

  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: 'No se pudo validar el token'
    });
  }

  next();


}

module.exports = {
  validarJWT
} 