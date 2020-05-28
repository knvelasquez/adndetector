class AdnModeloClase{
    constructor(prop){
        this.adn=prop.adn
        this.sec=prop.sec
        this.cadenas={
            horizontales:[],
            verticales:[],            
            diagonales:[],
            diagonalesInv:[]
        }
        this.setCadenasHorizontalesDiagonales()
        this.setCadenasVerticalesDiagonales()
        this.isMutante=this.validarSecuencia(this.cadenas.horizontales)||
                       this.validarSecuencia(this.cadenas.verticales)||
                       this.validarSecuencia(this.cadenas.diagonales)||
                       this.validarSecuencia(this.cadenas.diagonalesInv)
    }    
    setCadena(arreglo_cadenas,cadena){
        if(cadena.length<1)
            return false;
        arreglo_cadenas.push(cadena)
    }
    validarIndices(fila,columna){        
        return (fila>=this.adn.length || columna>=this.adn[fila].length || columna < 0)
    } 
    validarSecuencia(cadena){                      
        let resultado=false;
        for(let i=0;i<cadena.length;i++){
            if(cadena[i].join("").match(/(.)\1{3}/g)!==null){
                resultado=true
                break
            }
        }                
        return resultado
    }
    setCadenasHorizontalesDiagonales(){    
        /*  Recorrido en funcion de las filas empezando con el valor igual a 0 para obtener un Array de cadenas 
            de valores en las direcciones hotizontales, diagonales y diagonales invertidas del ADN Array indicado, 
            validando que la longitud de cadenas de sus bases nitrogenadas sea igual o superior a 4 valores, 
            las cadenas con longitud inferior seran ignoradas
            
            Ejemplo de Arreglo de Cadenas formula:[0,1,2,3,4,5,6,n+1]

            Horizontales        Diagonales          Diagonales Ivertidas   
            [1,1,1,1,1,1]       [0,0,0,0,0,0]       [0,0,0,0,0,0]
            [2,2,2,2,2,2]       [1,0,0,0,0,0]       [0,0,0,0,0,1]
            [3,3,3,3,3,3]       [2,1,0,0,0,4]       [0,0,0,0,1,2]
            [4,4,4,4,4,4]       [0,2,1,0,4,0]       [0,0,0,1,2,0]
            [5,5,5,5,5,5]       [0,0,2,1,0,0]       [0,0,1,2,0,0]
            [6,6,6,6,6,6]       [0,0,0,2,1,0]       [0,1,2,0,0,0]    */            
        let longitud=(this.adn.length-(this.sec.length));          
        for(let inicialFila=0,cadenas_horizontales=[],cadenas_diagonales=[],cadenas_diagonales_inv=[];
                inicialFila<this.adn.length;
                    (inicialFila++,cadenas_horizontales=[],cadenas_diagonales=[],cadenas_diagonales_inv=[])){       
            // Horizontal       
            //console.log(inicialFila)
            for(let indiceColumna=0;indiceColumna<this.adn[inicialFila].length;indiceColumna++){                 
                cadenas_horizontales.push(this.adn[inicialFila].charAt(indiceColumna))        
            }                     
            //Inserta las cadenas horizontales            
            this.setCadena(this.cadenas.horizontales,cadenas_horizontales)                        
            //Validacion Para ignorar las cadenas diagonales con bases nitrogenadas inferiores a 4
            if(inicialFila<1 || inicialFila>longitud)continue            
            for(let indiceFila=inicialFila,indiceColumnaIzq=0,indiceColumnaDer=(this.adn[inicialFila].length-1);
                    indiceFila<this.adn.length;
                        (indiceFila++,indiceColumnaIzq++,indiceColumnaDer--)){ 
                //Valida que la cadena no exceda del indice                
                if(!this.validarIndices(indiceFila,indiceColumnaIzq)){                                        
                    cadenas_diagonales.push(this.adn[indiceFila].charAt(indiceColumnaIzq));
                    cadenas_diagonales_inv.push(this.adn[indiceFila].charAt(indiceColumnaDer));                    
                }                                                                        
            }   
            //Inserta las cadenas diagonales y diagonales invertidas
            this.setCadena(this.cadenas.diagonales,cadenas_diagonales)
            this.setCadena(this.cadenas.diagonalesInv,cadenas_diagonales_inv)                                                                                                                                                          
        }
    }  
    setCadenasVerticalesDiagonales(){  
        /*  Recorrido en funcion de las columnas empezando con el valor igual a 0 para obtener un Array de cadenas
            de valores en las direcciones verticales,diagonales y diagonales invertidas del ADN Array indicado, 
            validando que la longitud de cadenas de sus bases nitrogenada sea igual o superior a 4 valores,
            las cadenas con longitud inferior seran ignoradas
            
            Ejemplo de Arreglo de Cadenas formula:[0,1,2,3,4,5,6,n+1]               
            
            Verticales          Diagonales          Diagonales Invertidas
            [1,2,3,4,5,6]       [1,2,3,0,0,0]       [0,0,0,1,2,3]
            [1,2,3,4,5,6]       [0,1,2,3,0,0]       [0,0,1,2,3,0]
            [1,2,3,4,5,6]       [0,0,1,2,3,0]       [0,1,2,3,0,0]      
            [1,2,3,4,5,6]       [0,0,0,1,2,3]       [1,2,3,0,0,0]
            [1,2,3,4,5,6]       [0,0,0,0,1,2]       [2,3,0,0,0,0]
            [1,2,3,4,5,6]       [0,0,0,0,0,1]       [3,0,0,0,0,0] 
        */                
        for(let inicialColumna=0,cadenas_verticales=[],cadenas_diagonales=[],cadenas_diagonales_inv=[];
                inicialColumna<this.adn[0].length;
                    (inicialColumna++,cadenas_verticales=[],cadenas_diagonales=[],cadenas_diagonales_inv=[])){            
            for(let indiceFila=0,indiceColumna=inicialColumna,columna2=this.adn[0].length-1-inicialColumna;
                    indiceFila<this.adn.length;                        
                        (indiceFila++,indiceColumna++,columna2--)){                                          
                cadenas_verticales.push(this.adn[indiceFila].charAt(inicialColumna))                    
                //Validacion Para ignorar las cadenas diagonales con bases nitrogenadas inferiores a 4                        
                if(inicialColumna<=(this.adn[0].length-this.sec.length) && !this.validarIndices(indiceFila,indiceColumna)){
                    cadenas_diagonales.push(this.adn[indiceFila].charAt(indiceColumna))
                }
                //Validacion Para ignorar las cadenas diagonales con bases nitrogenadas inferiores a 4
                if(this.adn[0].length-inicialColumna>=4 && !this.validarIndices(indiceFila,columna2)){
                    cadenas_diagonales_inv.push(this.adn[indiceFila].charAt(columna2))
                }                                                                             
            }
            //Inserta las cadenas Verticales,Diagonales y Diagonales Invertidas       
            this.setCadena(this.cadenas.verticales,cadenas_verticales) 
            this.setCadena(this.cadenas.diagonales,cadenas_diagonales) 
            this.setCadena(this.cadenas.diagonalesInv,cadenas_diagonales_inv)           
        }
    } 
}
exports.service=AdnModeloClase