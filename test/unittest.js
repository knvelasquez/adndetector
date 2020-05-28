const expect = require('chai').expect
const adn=require('../model/AdnModeloClase')
const dna=["ATGCGA","CAGXAC", "TTxAxX","AGAAXA","CCxCTA","TTTRTA"]

var assert = require('assert');
describe('Ejecución de Pruebas', function() {
    //1. unit test
    describe('Validación en la cadena de DNA', function() {
      it('La longitud del dna debe ser igual a 16', function() {
          expect(dna.length).to.be.equal(6)
      });    
    })

    //2. unit test
    describe('Validación DNA sea de un mutante', function() {
      it('Debería retornar true si es un mutante', function() {
          let adnservice=new adn.service({        
            adn:dna,
            sec:["A","T","C","G"]
        })
        expect(adnservice.isMutante).to.be.equals(true) 
      });        
    })
    //3. unit test
    describe('Validación DNA sea de un humano', function() {
      it('Deberia retornar false si es un humano', function() {
          let adnservice=new adn.service({        
            adn:dna,
            sec:["A","T","C","G"]
        })
        expect(adnservice.isMutante).to.be.equals(false) 
      });        
    })
})
