export function validateUsername(rule, value, callback) {
    // Regular expression to check for special characters
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<> ]/
  
    if (specialCharRegex.test(value)) {
      callback(new Error('Username cannot contain special characters'))
    } else {
      callback()
    }
  }