var url=require('url');
var http=require('http');
var fs =require('fs');
const data=fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const overviewTemplete=fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const productTemplete=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const templet_overviewTemplete=fs.readFileSync(`${__dirname}/templates/templet_overview.html`,'utf-8');

const dataobj=JSON.parse(data);
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