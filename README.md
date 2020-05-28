# Magneto cantidad de Mutantes

Proyecto desarrollado Node Js que detecta si un humano es mutante  basándose en su secuencia de ADN.

[https://adndetector.herokuapp.com/](https://adndetector.herokuapp.com/stats)
## Instalación

Clonar el repositorio y ejecutar el siguiente comando.

```node
npm install
node index.js
```

## Modo de  Uso
Realizar POST hacia la siguiente url con el parámetro dna indicado en el body como se indica más abajo

[https://mutant](https://adndetector.herokuapp.com/mutant)
```node
{
	"dna":["ATGCGA",
		   "CAGTGA",
		   "TTATGT",
		   "AGAAGG",
		   "CCCCTA",
		   "TCACTG"]
}
```
## Estadísticas
Las estadísticas podrán ser visualizadas por medio del siguiente enlace:
[https://stats](https://adndetector.herokuapp.com/stats)

## Pruebas
Las pruebas se pueden realizar de la siguiente manera

Ejecutando el siguiente comando
```node
npm run test
```
