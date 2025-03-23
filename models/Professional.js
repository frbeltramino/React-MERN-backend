const mongoose = require('mongoose');

const WorkingDaySchema = new mongoose.Schema({
    day: { type: String, required: true },
    working_hours: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    }
});

const ProfessionalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    working_days: [WorkingDaySchema],
    holidays: [{ type: String }]  // Fechas en formato 'YYYY-MM-DD'
});

module.exports = mongoose.model('Professional', ProfessionalSchema);