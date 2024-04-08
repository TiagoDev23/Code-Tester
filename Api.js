const express = require("express");
const { static } = require("express");
const app = express();
const { json } = require("body-parser");
const compiler=require("compilex")
const options = {stats:true}
compiler.init(options)

// Define o middleware para analisar o corpo da solicitação como JSON
app.use(json());

// Define o middleware para servir arquivos estáticos do CodeMirror
app.use("/codemirror-5.65.16", static("C:/Users/tiago/OneDrive/Documentos/Compilador/codemirror-5.65.16"));

// Define o middleware para servir a página HTML
app.get("/", function(req, res) {
    res.sendFile("C:/Users/tiago/OneDrive/Documentos/Compilador/index.html");
});

app.post("/compile", function(req, res){  
    var code = req.body.code 
    var input = req.body.input
    var lang = req.body.lang
    var envData = { OS : "windows"};
    try{
        if(lang=="Cpp"){
            if(!input){
                var envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}}; // (uses g++ command to compile )
                //else
                var envData = { OS : "linux" , cmd : "gcc", options:{timeout:10000} }; // ( uses gcc command to compile )
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            } else{
                //if windows  
                var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    res.send(data);
                });
            }
        }
        else if(lang=="Java"){
            if(!input){
                var envData = { OS : "windows"}; 
                //else
                var envData = { OS : "linux" }; // (Support for Linux in Next version)
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }
            else{
                //if windows  
                var envData = { OS : "windows"}; 
                //else
                var envData = { OS : "linux" }; // (Support for Linux in Next version)
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }
        }
        else if(lang=="Python"){
            if(!input){
            var envData = { OS : "windows"}; 
            //else
            var envData = { OS : "linux" }; 
            compiler.compilePython( envData , code , function(data){
                res.send(data);
            });       
            }
            else{
            //if windows  
            var envData = { OS : "windows"}; 
            //else
            var envData = { OS : "linux" }; 
            compiler.compilePythonWithInput( envData , code , input ,  function(data){
                res.send(data);        
            });
            }
        }
    }
    catch(e){
        console.log("error")
    }
})

// Inicia o servidor na porta 8000
app.listen(8000, function() {
    console.log("Servidor está escutando na porta 8000");
});
