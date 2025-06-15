# Banker

## Documentación

### Introducción

Banker es una aplicación desarrollada para cualquier empresa bancaria que busque modernizarse o que quiera montar una banca Online. Nosotros disponemos la aplicación, el mantenimiento y la gestión.

### Manual

#### Requerimientos

Banker necesita para funcionar:

##### Sin Docker:

* Base de Datos Relacional
* Redis
* RabbitMQ
* NodeJS + NPM
* Nginx
  
##### Con Docker:

* Se monta automáticamente

#### Inicialización/despliegue del proyecto

Con Docker:

* Git Clone (URL github del proyecto)
* Desde la carpeta Raíz (/): Usar en sh : `docker compose up`
* Cargar el Script de /dbCreationSchema/db.sql en la base de datos desde http://localhost:8000 (PHPMyAdmin). Todos los datos de la DB se guardaran en /db
* Entrar a la dirección http://localhost y ya está funcionando

Sin Docker:

* Git Clone (URL Github del proyecto)
* Ahora procederemos a montar todo por partes
* Necesitamos un servidor de Redis, otro de MYSQL o MariaDB (O el que se quiera, menos mongoDB) y otro de RabbitMQ funcionando
* Instalar NodeJS y NPM
* En /Backend ejecutar `npm install` y `npm run:start` (Desarrollo)
* En /Frontend ejecutar `npm install` y `npm run:dev` (Desarrollo)
* En /blockchain ejecutar `npm install` y `npx hardhat node` para abrir el nodo de BlockChain TestNet
* Cuando Blockchain este cargado, tendremos que ejecutar por sh el script /blockchain/deploySmartContracts/autorun.sh (El smart contract de la Stable Coin)
* Ejecutar el Script /dbCreationSchema/db.sql en la Base de datos

#### Configuración

Toda la configuración está en los archivos .env (Environment Variables) dentro de las carpetas `/frontend` y `/backend`

Desde aquí hay muchos ajustes de configuración, como la dirección del Backend, el Frontend, Redis, RabbitMQ y mucho más. Puedes personalizar todo lo que quieras para ajustarte a tus necesidades.

#### Roles

##### Administrador

El Administrador es un usuario con role 2

Ya existe un administrador al desplegar la apliación, si quieres más crea un usuario y desde la base de datos cambiale el Role a 2

El administrador puede:

* Listar todos los usuarios (No puede borrarlos, garantizamos la seguridad al usuario de que un administrador no puede gestionar sus cuentas ni usuarios libremente. Solucionar problemas, no darlos)
* Listar todas las cuentas (No puede borrarlas pero si bloquearlas. Una cuenta de banco a balance 0 si se puede borrar, pero solo lo puede hacer el usuario)
* Listar todos los Movimientos (Solo puede borrar movimientos entre cuentas normales)

##### Usuario

El usuario es el cliente que accede a la página, puede:

* Editar su usuario (Añadir foto,editar email y nombre y contraseña)
* Ver sus cuentas de banco y Blockchain
* Crear nuevas cuentas (Tanto Normales como añadir sus cuentas de  Blockchain)
* Ver el saldo de las cuentas
* Ver movimientos de una cuenta
* Editar una cuenta Normal
* Borrar una cuenta normal si el balance es 0.00
* Hacer Transferencias hacia cuentas
* Recibir Transferencia a su cuenta
* Realizar ingresos desde cuentas de Blockchain
* Realizar depositos hacia cuentas de Blockchain
* Realizar transferencias desde cuentas de Blockchain
* Comprar edificios que generan StableCoins

## Manual de Usuario Final

Al desplegar la aplicación, tendrás el manual en http://localhost/statics/manual desde la propia página de Banker

## Manual de Backend

El manual (hecho automáticamente con Swagger) de Backend está en http://localhost/backend/api

Le faltan descripciones pero se pueden ver todos los controladores y Endpoints