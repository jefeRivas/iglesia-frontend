export const validateMember = (member) => {
  const errors = [];
  
  if (!member.nombre || member.nombre.trim() === '') {
    errors.push('El nombre es requerido');
  }

  if (!member.areas || member.areas.length === 0) {
    errors.push('Debe seleccionar al menos un área');
  }

  if (!member.dias || member.dias.length === 0) {
    errors.push('Debe seleccionar al menos un día');
  }

  return errors;
};

export const validateSchedule = (schedule) => {
  const errors = [];
  
  if (!schedule || Object.keys(schedule).length === 0) {
    errors.push('La programación no puede estar vacía');
  }

  return errors;
};