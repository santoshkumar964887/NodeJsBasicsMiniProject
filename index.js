var http=require('http');
var server=http.createServer((req,res)=>{
    res.end('creating server');
    console.log(req);
})

server.listen(800,'127.0.0.1',()=>{
    console.log('Listening to resquests on port 800');
})