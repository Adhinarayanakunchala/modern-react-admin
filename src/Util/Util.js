

// Checks if object is empty  (return's true if empty, false otherwise)

export const CheckIsObjectEmpty = (obj) => {
 for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
   return false; // Object is not empty
  }
 }
 return true; // Object is empty
}

// Compares Objects and return only differences 

export const compareObjects = (obj1, obj2) => {
 const result = {};

 const deepCompare = (value1, value2) => {
  if (typeof value1 === 'object' && typeof value2 === 'object') {
   if (Array.isArray(value1) && Array.isArray(value2)) {
    // Deep compare arrays
    if (JSON.stringify(value1) !== JSON.stringify(value2)) {
     return value1;
    }
   } else {
    // Deep compare objects
    const nestedDifference = compareObjects(value1, value2);

    // If there are differences in the nested objects, return the entire object
    if (!isObjectEmpty(nestedDifference)) {
     return value1;
    }
   }
  } else {
   // Compare other types
   if (value1 !== value2) {
    return value1;
   }
  }

  return null;
 };

 for (const key in obj1) {
  if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
   const difference = deepCompare(obj1[key], obj2[key]);
   if (difference !== null) {
    result[key] = difference;
   }
  }
 }

 return result;
};

function isObjectEmpty(obj) {
 for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
   return false; // Object is not empty
  }
 }
 return true; // Object is empty
}

