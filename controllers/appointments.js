const { response } = require('express');
const Turno = require('../models/Turno');
const { parseISO } = require("date-fns");

const createAppointment = async ( req, res = response) => {
  try {
    const { day, start_hour, end_hour, date, isActive, client_name, client_phone, client_email, professional_id, duration, professional_name, client_id, service_name } = req.body;
    const uid  = req.uid;  
    console.log(professional_id);
    console.log(req.body);
    const turno = new Turno({
      day,
      start_hour,
      end_hour,
      date,
      isActive,
      client_name,
      client_phone,
      client_email,
      professional_id,
      duration,
      professional_name,
      client_id,
      service_name
    });
    console.log(JSON.stringify(turno));
    await turno.save();
    res.status(201).json({
      ok: true,
      turno
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
      err: err
    });
  }
}


const getAppointments = async (req, res = response) => {
  try {
    const turnos = await Turno.find();
    res.status(200).json({
      ok: true,
      turnos
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

const getAppointmentsByClientId = async (req, res = response) => {
  const { id } = req.params;
  try {
    const turnos = await Turno.find({ client_id: id });
    res.status(200).json({
      ok: true,
      turnos
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

const updateAppointment = async (req, res = response) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    console.log(id);
    const { day, start_hour, end_hour, date, isActive, client_name, client_phone, client_email, professional_id, duration, professional_name, client_id, service_name } = req.body;
    const turno = await Turno.findByIdAndUpdate(id, {
      day,
      start_hour,
      end_hour,
      date,
      isActive,
      client_name,
      client_phone,
      client_email,
      professional_id,
      duration,
      professional_name,
      client_id,
      service_name
    });
    res.status(200).json({
      ok: true,
      turno
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

const deleteAppointment = async (req, res = response) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      message: 'El turno se borró correctamente'
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByClientId
};