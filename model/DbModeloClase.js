const mysql=require('mysql')
const db={}
let connection;
db.app=require('../props/app')  
db.mysql=require('../props/mysql')   
class DbModeloClase{
    constructor(config){
        this.config=config
    }
    setMutante(prop){
        return this.query('INSERT INTO adn_verificado VALUES("'+prop.adn+'",'+prop.isMutant+',Now())')
    }
    getMutante(adn){
        return this.query('SELECT * FROM adn_verificado WHERE adn=\''+adn+'\'')
    }    
    getStats(){
        return this.query('SELECT t2.count_mutant_dna AS count_mutant_dna,'
                                +'t1.count_human_dna AS count_human_dna,'                                
                                +'truncate(t2.count_mutant_dna/t1.count_human_dna,2) AS ratio '
                         +'FROM adn_verificado '
                         +'INNER JOIN(SELECT COUNT(*) AS count_human_dna  FROM adn_verificado WHERE mutante=0) AS t1 '
                         +'INNER JOIN(SELECT COUNT(*) AS count_mutant_dna FROM adn_verificado WHERE mutante=1) AS t2 '
                         +'GROUP BY t1.count_human_dna')
    }
    query(sql,args){
        return new Promise((resolve,reject)=>{
            this.open()            
            this.connection.query(sql,args,(err,rows)=>{
                console.debug(sql)
                if(err){
                    console.error(err)
                    return reject(err)  
                } 
                resolve(rows)
                this.close()
            })
        })
    }    
    open(){
        console.log("Estableciendo Conexion a la base de datos")
        this.connection=mysql.createConnection(this.config)
        console.debug("Conexion establecida");
    }
    close(){
        console.log("Cerrando Conexion a la base de datos")
        return new Promise((resolve,reject)=>{
            this.connection.end(err=>{
                if(err){
                    console.error("Hubo un error cerrando la conexion: " + err)
                    return reject(err)
                }                
                resolve()
                console.debug("Conexion cerrada")
            })
        })
    }
}
exports.service=new DbModeloClase(db.mysql[db.app.prop.env])