function useAsync(asyncFn,options){
  const [] = 
  const fn = ()=>{
    asyncFn().then(res=>{

    })
  }

}
const {loading,data,errr} = useAsync(new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve(1)
  }, 1000);
}))