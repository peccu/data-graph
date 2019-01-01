// https://vincent.billey.me/pure-javascript-immutable-array/
function push(arr, newEntry){
  return [ ...arr, newEntry ];
}
function pop(arr){
  return arr.slice(0, -1);
}
function shift(arr){
  return arr.slice(1);
}
function unshift(arr, newEntry){
  return [ newEntry, ...arr ];
}
function sort(arr, compareFunction) {
  return [ ...arr ].sort(compareFunction);
}
function reverse(arr) {
  return [ ...arr ].reverse();
}
function splice(arr, start, deleteCount, ...items) {
  return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ];
}
function immutableDelete(arr, index) {
  return arr.slice(0,index).concat(arr.slice(index+1));
}
export default {
  push,
  pop,
  shift,
  unshift,
  sort,
  reverse,
  splice,
  immutableDelete
};
