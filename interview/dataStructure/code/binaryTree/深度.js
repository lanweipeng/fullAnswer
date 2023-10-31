var tree={
  val:1,
  children:[
    {
      val:2,
      children:[{
        val:3
      }]
    },{
      val:4
    }
  ]
}
const dfs = (root) => {
  console.log(root.val);
  root.children?.forEach(dfs)
}
dfs(tree)