const express=require('express')
const bodyParser = require('body-parser');
const app=express()
const PORT = process.env.PORT || 3000
app.set('port', PORT)
app.use(bodyParser.json());
const adn=require('./model/AdnModeloClase')
const db=require('./model/DbModeloClase')
app.use(express.static(__dirname));
app.use(express.static("testreport/"));
app.post('/mutant',async(req,res)=>{  
    if(req.body.dna.length!==6){
        res.status(400).send("La solicitud contiene sintaxis errónea y no debería repetirse")   
    }
    //validar longitud and
    const dna=await db.service.getMutante(req.body.dna)
    let isMutante=false
    if(dna.length>0)
    {
        isMutante=Boolean(dna[0].mutante)               
    }
    else{
        let adnservice=new adn.service({        
            adn:req.body.dna,
            sec:["A","T","C","G"]
        })
        isMutante=adnservice.isMutante
        await db.service.setMutante({
            adn:req.body.dna,
            isMutant:isMutante
        })        
    }         
    res.status((isMutante)?200:403).send()                   
})
app.get('/stats',async(req,res)=>{
    return res.send(await db.service.getStats()).status(200)    
})
//Ejecucion del Servidor Express
app.listen(PORT, function() {
    console.log("Listen app started on port:" + PORT)
});