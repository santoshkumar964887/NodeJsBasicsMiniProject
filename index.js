var url=require('url');
var http=require('http');
var fs =require('fs');
const replacetemplet=(temp, product) => {
    let output = temp.replace(/{%productName%}/g, product.productName);
    output = output.replace(/{%image%}/g, product.image);
    output = output.replace(/{%price%}/g, product.price);
    output = output.replace(/{%from%}/g, product.from);
    output = output.replace(/{%nutrients%}/g, product.nutrients);
    output = output.replace(/{%quantity%}/g, product.quantity);
    output = output.replace(/{%description%}/g, product.description);
    output = output.replace(/{%id%}/g, product.id);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
  }
const data=fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const overviewTemplete=fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const productTemplete=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const templet_overviewcard=fs.readFileSync(`${__dirname}/templates/templet_overview.html`,'utf-8');

const dataobj=JSON.parse(data);
var server=http.createServer((req,res)=>{
    var {pathname,query}=url.parse(req.url,true);

    if(pathname==='/' || pathname==='/overview'){
      const templetoptions=dataobj.map(el=>replacetemplet(templet_overviewcard,el)).join(' ');
         let output =overviewTemplete.replace('{%product_card%}',templetoptions);
        res.writeHead(200,{
            'content-type':'text/html'
        })
        res.end(output);


    }
    else if(pathname==='/product'){
        const result=dataobj[query.id];
        let output=replacetemplet(productTemplete,result);
        res.writeHead(200,{
            'content-type':'text/html'
        });
     res.end(output);}
    else if(pathname==='/api'){
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