# CultivarIoT - Sistema Gerenciador de Estufas Inteligentes

# Inicialização do sistema 

## 1. Iniciar Servidor Fog

Dentro da pasta "servidor-fog", executar "make up".

## 2. Iniciar Servidor Web

Dentro da pasta "servidor-web", executar "make up".

# Rotas Úteis do Servidor Fog

## POST /payload

Utilizados pelos dispositivos sensores para enviar dados de seus atributos à Fog.

### Cabeçalho

- sensor_id: identificador do sensor. Por exemplo, 6309270ffaa6976990d15eac para o sensor S1, de Umidade e temperatura ou 6309270ffaa6976990d15ead para o sensor S2, também de umidade e temperatura, ambos pertencentes ao mesmo sistema.
  
### Corpo

Contém os valores lidos de cada atributo do respectivo sensor. O exemplo abaixo corresponde aos valores de umidade (626fea1b9668ef298f120f7e) e temperatura (626fea1b9668ef298f120f7f).

```
{
	"payloadAttributes": [
		{
			"attribute_id": "626fea1b9668ef298f120f7e",
			"value": "73"
		},
		{
			"attribute_id": "626fea1b9668ef298f120f7f",
			"value": "21"
		}
	]
}
```