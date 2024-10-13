export function splitCamelCaseToWords(text: string) {
    // Split the string at each capital letter and join with a space
    let result = text.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Capitalize only the first letter of the result
    result = result.charAt(0).toUpperCase() + result.slice(1);
    
    return result;
}

export function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  export function isPlainArray(value) {
    return Array.isArray(value);
  }