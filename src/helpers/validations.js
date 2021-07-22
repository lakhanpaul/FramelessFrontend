const validations = {
  required: {
    rule: () => /\S/,
    formatter(fieldName) {
      return `${fieldName} is required.`
    },
  },
  numeric: {
    rule: () => /^\d+$/,
    formatter(fieldName) {
      return `${fieldName} should contain only numbers.`
    },
  },
}

export default validations
// this file contains some basic validations which can be called on the form component
