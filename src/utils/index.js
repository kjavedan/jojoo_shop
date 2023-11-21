import { format } from 'date-fns';
export function validateUsername(rule, value, callback) {
    // Regular expression to check for special characters
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<> ]/
  
    if (specialCharRegex.test(value)) {
      callback(new Error('Username cannot contain special characters'))
    } else {
      callback()
    }
  }

  export function formatDate(dateString) {
    // Check if dateString is defined before creating a Date object
    const dateObject = dateString ? new Date(dateString) : null;
  
    // Format the date using date-fns if it's defined
    const formattedDate = dateObject ? format(dateObject, 'yyyy-MM-dd HH:mm') : 'Undefined Date';
  
    return formattedDate;
  }