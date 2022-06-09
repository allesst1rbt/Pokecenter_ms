# Pokecenter_ms
Esses projeto consiste em uma api baseada em microserviços ultilizando Express+prisma+typescript+docker(o que eu mais gosto)
## observaçôes:
### 1-Tenha o docker instalado, se não tiver e caso queira, siga os passos abaixo
# Ultilizando com o docker:
## Instalando o docker:
### Windows:
#### 1-Primeiro instale o wsl na sua maquina https://docs.microsoft.com/pt-br/windows/wsl/install-win10
#### 2-Segundo  instale o docker na sua maquina https://docs.docker.com/engine/install/
### Unbutu:
#### 1-https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt
### Manjaro:
#### 1-https://linuxconfig.org/manjaro-linux-docker-installation
## Ultilizando a aplicação:
Clone a aplicação
````
git clone https://github.com/allesst1rbt/Pokecenter_ms.git
````
Adentre a pasta da aplicação 
````
cd $_
````
Suba o docker 
````
docker-compose up -d 
````
Adentre o docker e rode as migrations 
````
docker exec pokecenter_ms_users_1 bash 

npx prisma migrate dev 
````
## Realizando os testes:
Endpoints :
```
http://localhost:8080/transacao tipo POST
{
    "valor":1000,
    "tipo":"credito" ou "debito"
}

http://localhost:8080/saldo?id_do_cliente=<id_do_cliente> tipo GET

http://localhost:8080/cliente tipo POST
{
    "nome": "Carlos",
    "telefone": "(61) 98127-2202" -> precisa ser um numero de telefone valido,
    "saldo": 1000 ->não obrigatorio
}

http://localhost:8080/cliente?id_do_cliente=<id_do_cliente> tipo GET
```
