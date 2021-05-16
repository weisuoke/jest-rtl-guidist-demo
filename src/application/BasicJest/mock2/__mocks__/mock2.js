export const fetchData = () => {
  return new Promise((resolve) => {
    resolve("(function(){return '123'})()" )
  })
}