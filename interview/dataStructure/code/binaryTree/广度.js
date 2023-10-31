
/**
 * 思路：新建一个队列，把根节点放到队列
 * 每次把头节点拿出来，打印，把children放到队列去
 * 重复如此操作，直到队列为空
 */
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
const bfs = (root) => {
  const queue = [root];
  while(queue.length>0){
    const head = queue.shift();
    console.log(head.val);
    head.children?.forEach(child=>queue.push(child))
  }
}
bfs(tree)
