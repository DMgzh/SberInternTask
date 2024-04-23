import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

const uniqueIds = new Set();

const decoded = [];

encoded.forEach(obj => {
  for (const key in obj) {
    if (key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
      const id = obj[key];
      if (id !== null) {
        uniqueIds.add(id);
      }
    }
  }

  const newObj = { ...obj };
  for (const key in newObj) {
    if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
      const id = newObj[key];
      if (id !== null) {
        newObj[key] = translations[id];
      }
    }
  }

  decoded.push(newObj);
});

console.log(decoded)
console.log(uniqueIds);
