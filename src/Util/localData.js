export function setLocalStorageWithExpiration(key, value) {
 const expiration = new Date().getTime() + 2 * 60 * 1000; // Calculate expiration time
 const data = { value, expiration };

 localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorageWithExpiration(key) {
 let item = localStorage.getItem(key);

 if (item) {
  let storedData = JSON.parse(item);

  if (storedData && storedData.expiration > new Date().getTime()) {
   return storedData.value; // Return the value if it's still valid
  } else {
   localStorage.removeItem(key); // Remove the item if it has expired
   return null; // Return null for expired data
  }
 }
}
