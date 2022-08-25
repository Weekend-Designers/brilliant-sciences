export const classList = (...classes) => {
    let list = new String();
    classes.forEach(cl => {
        list += " " + cl;
    });
    list = list.trim();
    return list;
}

export const contains = (array, value) => {
    let contained = false;
    for (let index = 0; index < array.length; index++) {
        const ele = array[index];
        if(ele == value){
            console.log(ele + " == " + value, true);
            contained = true;
            break;
        }
    }
    return contained;
}

export const makeId = (length = 15) => {
  let output = '';
  let scope = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let scope_size = scope.length;
  for ( let index = 0; index < length; index++ ) {
    output += scope.charAt(Math.floor(Math.random() * scope_size));
  }
  return output;
}

export const maxWords = (text, length = 15) => {
  let output = String();
  // const regex = new RegExp(`^((\w){${length}}[^\s]*).*`)
  // output = text.replace(regex, "$1")
  let txt1 = text.split(/\s/).slice(0, length)
  let len = text.length
  txt1.forEach((ele) => {
    output += `${ele} `
  })
  if(len > length){
    output += "..."
  }
  return output;
}

export const createTimeStamp = (time) => {
  let output = String();
  return output;
}

export const makeIdNotIn = (list = Array(), length = 5) => {
  let output = '';
  let scope = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let scope_size = scope.length;
  do{
    for ( let index = 0; index < length; index++ ) {
      output += scope.charAt(Math.floor(Math.random() * scope_size));
    }
  }while(list.includes(output))
  return output;
}

export const extractIndex = (array = Array(), index = 0) => {
  let output = Array()
  array.forEach((element) => {
    if(index > -1 && index < element.length){
      output.push(element[index])
    }
  })
  return output
}

export const extractKey = (array = Array(), key) => {
  let output = Array()
  array.forEach((element) => {
    if(element[key]){
      output.push(element[key])
    }else{
      output.push(undefined)
    }
  })
  return output
}

export const makeBiKeyObject = (key1, arr1, key2, arr2) => {
  let output = Array()
  if(arr1.length == arr2.length){
    for( let index = 0; index < arr2.length; index++){
      output.push({
        [key1]: arr1[index],
        [key2]: arr2[index],
      })
    }
  }
  return output
}

export const maxChars = (text, length = 15) => {
  let output = text
  if(text.length > length){
    output = text.substring(0, length-3)
    output += "..."
  }
  return output
}