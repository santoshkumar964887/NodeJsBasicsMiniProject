var url=require('url');
var http=require('http');
var fs =require('fs');
var data=fs.readFileSync(`${__dirname}/data.json`,'utf-8');
var server=http.createServer((req,res)=>{
    var patthName=req.url;

    if(patthName==='/' || patthName==='/overview'){
        res.end('route overview');


    }
    else if(patthName==='/product') res.end('route product');
    else if(patthName==='/api'){
        res.end(data)

    }
    else{
        res.writeHead(404,{
            'content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end('<h1>Page Not Found</h1>')
    }
})

server.listen(800,'127.0.0.1',()=>{
    console.log('Listening to resquests on port 800');
})