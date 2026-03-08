// DTO — Define exactamente qué datos se envían y reciben
// Esto separa la lógica de los datos y valida la estructura

export function createJobDTO(formData) {
  return {
    company:      formData.company.trim(),
    position:     formData.position.trim(),
    status:       formData.status,
    date_applied: formData.date_applied,
    link:         formData.link.trim() || null,
    notes:        formData.notes.trim() || null,
  }
}

export function validateJobDTO(dto) {
  const errors = {}

  if (!dto.company || dto.company.length < 2)
    errors.company = 'Company name must be at least 2 characters'

  if (!dto.position || dto.position.length < 2)
    errors.position = 'Position must be at least 2 characters'

  if (!dto.status)
    errors.status = 'Status is required'

  if (!dto.date_applied)
    errors.date_applied = 'Date is required'

  if (dto.link && !dto.link.startsWith('http'))
    errors.link = 'Link must start with http:// or https://'

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export function validateAuthDTO(formData) {
  const errors = {}

  if (!formData.email || !formData.email.includes('@'))
    errors.email = 'Enter a valid email address'

  if (!formData.password || formData.password.length < 6)
    errors.password = 'Password must be at least 6 characters'

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}