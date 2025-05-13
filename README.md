# Instrucciones para Ejecutar el Proyecto Next.js con Docker

A continuación, te guiaré a través de los pasos para ejecutar el proyecto con Docker, incluyendo la construcción de la imagen y la ejecución del contenedor.

## 1. **Clonar el Repositorio**

Primero, clona el repositorio en tu máquina local:
```bash
git clone git@github.com:AnthonyTepach/probable-octo-memory.git
cd proyecto-nextjs
```
## 2. **Construir la Imagen de Docker**

Desde la raíz del proyecto, ejecuta el siguiente comando para construir la imagen de Docker:
```bash
docker build -t tarjetas-reloj-checador:dev .
```
## 3. **Ejecutar el Contenedor**

Una vez que la imagen esté construida, puedes ejecutar el contenedor con el siguiente comando:
```bash
docker run -d \
  --name container-biotimepro-pdf \
  -p 4001:4000 \
  -v "$PWD":/app \
  -v /app/node_modules \
  -v "$PWD/public/resources_pdf:/app/public/resources_pdf" \
  tarjetas-reloj-checador:dev

```
## 4. **Verificar que el Contenedor Está Corriendo**

Para verificar que el contenedor está en ejecución, puedes usar el siguiente comando:
```bash
docker ps
```
Este comando te mostrará los contenedores activos en tu sistema. Busca el contenedor llamado nextjs-dev-container y asegúrate de que el puerto 40001 esté mapeado.

## **5. Acceder a la Aplicación**

Con el contenedor en funcionamiento, puedes acceder a la aplicación desde tu navegador web visitando la siguiente URL:
```bash
http://localhost:40001
```

La aplicación Next.js debería estar corriendo y disponible en esa dirección.

## **6. Detener el Contenedor**

Cuando hayas terminado y quieras detener el contenedor, usa el siguiente comando:
```bash
docker stop nextjs-dev-container
```
Este comando detendrá el contenedor que está ejecutando la aplicación.

Si deseas eliminar el contenedor, usa:
```bash
docker rm nextjs-dev-container
```
## **7. Otros Comandos Útiles**

A continuación, algunos comandos adicionales que pueden ser útiles:

Ver los logs del contenedor:
```bash
docker logs nextjs-dev-container
```
Eliminar la imagen (si ya no la necesitas):
```bash
docker rmi tarjetas-reloj-checador:dev
```
## **8. Notas**

Asegúrate de que el directorio 
```bash 
$(PWD)/public/resources_pdf
``` 
esté disponible en tu sistema local, ya que este directorio se monta dentro del contenedor.

Si prefieres usar Docker Compose, puedes usar el archivo docker-compose.yml para automatizar la ejecución.

En ese caso, puedes ejecutar 
```bash
docker-compose up --build -d 
```
para construir y levantar los contenedores.


## Authors

- [@AnthonyTepach](https://github.com/AnthonyTepach)

