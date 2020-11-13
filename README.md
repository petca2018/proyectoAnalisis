## informacion importante para la configuracion del proyecto

Primero debes clona este repositorio
```
git clone https://github.com/petca2018/proyectoAnalisis.git
cd proyectoAnalisis
```
luego debes seguir estos pasos para levantar el proyecto

## Paso 1: Crear el entorno virtual en el que se va a trabajar con django rest framework.
```
mkvirtualenv subasta –python=/usr/bin/python3 o,
mkvirtualenv subasta --python=/usr/bin/python3.x
```
## Paso 2: instalar los requermientos de backend.
```
pip install -r requirements.txt
```
## Paso 3: luego de instalar lor requerimientos hay que correr las migraciones para que se creen las
tablas en la base de datos, IMPORTANTE: es necesario tener ya creada la base de datos./manage.py migrate
## Paso 4: Iniciar el servidor
```
./manage.py runserver
```
## Paso 5: Iniciar el FrontEnd
hay que moverse a la carpeta llamada frontend y habrir la consola desde ahi, luego instalamos los
requerimientos.
```
npm install
```
## Paso 6: Luego de instalar los requerimientos podemos iniciar la aplicacion.
```
npm start
```
## estructura de arvchivos.
```
-- src/
  -- js/
    -- common/
      -- components/ --> todos los componentes aqui
  -- redux/
    -- modules/ --> El codigo de redux esta aqui
  -- utility/ --> todos los archivos jsx de utilidad estan aqui
  -- style/ --> los estilos css globales estan aqui
  -- assets/ --> los archivos estaticos ( imagenes, fuentes, etc) estan aqui.
  -- template/ --> templeates que se usan en la aplicacion
```
## Configuración.
Si observa la configuración de la carpeta, hay cuatro archivos
default.json: toda la configuración predeterminada
development.json: cuando ejecuta npm run dev, extraerá la configuración de ese archivo
release.json: cuando ejecute npm run build: release, usará esta configuración
production.json: cuando ejecute npm run build, usará esta configuraciónY en su archivo de configuración (archivo de configuración json), lo que sea que ponga dentro de la
aplicación, se inyectará en la aplicación cliente y podrá acceder a los datos de configuración de su
aplicación mediante el uso de variables __CONFIG__.
Digamos que tiene una configuración como la siguiente
```
{
"app": {
"apiURL": "http://foo.bar/"
}
}
```
En su aplicación React, puede acceder a estas variables
__CONFIG__.apiURL