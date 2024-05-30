用于区分数据类型
get 请求的 headers 没有 content-type
## 格式
Content-Type：type/subtype;parameter

type：主类型，任意的字符串，如text，如果是*号代表所有；
subtype：子类型，任意的字符串，如html，如果是*号代表所有，用“/”与主类型隔开；
parameter：可选参数，如charset，boundary等
## 常见类型
text/plain：纯文本格式；
text/html：HTML格式；
text/css：Cascading Style Sheets；
text/javascript：JavaScript代码；
application/json：JSON格式数据；
application/xml：XML格式数据；
application/octet-stream：二进制流数据；
image/jpeg：JPEG格式图片；
image/gif：GIF格式图片；
image/png：PNG格式图片；
audio/mpeg：MP3格式音频；
video/mp4：MP4格式视频；
multipart/form-data：表单数据；
application/x-www-form-urlencoded：URL编码表单数据；
-[Content-type详解](https://blog.csdn.net/qq_44741577/article/details/136507746)