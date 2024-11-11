# Proyecto To-Do-List

## Descripción del proyecto

Se creó un proyecto en el cual el usuario podrá gestionar tareas. El mismo pedirá de manera obligatoria el ingreso de un título.
El campo Detalle y Fecha de vencimiento son Opcionales.
Al crear la task, el sistema comprobará que el campo título no esté vacío y que no exista una task con el mismo nombre.

La descripción de la task estará oculta hasta que se haga click en show task.


## Funcionalidades

El usuario podrá crear la tarea, confirmarla o desconfirmar, y eliminarla.
Al Crear la tarea, la misma se visualizará en "Tareas Pendientes".
Haciendo click en confirmar tarea, la misma pasará a "Tareas Completadas". Lo mismo se podrá hacer de Completadas a Pendientes.
Al eliminar la tarea, de cualquiera de las 2 listas, la misma se borrará y no se podrá recuperar.
Las task pueden ser modificadas, permitiendo la modificación de cualquier campo de la misma (titulo, fecha de vencimiento, descripcion).

## Integración con API

La integración de la API gestiona tareas remotas, cargando así las mismas en el sistema.

Las rutas de la API fueron chequeadas y documentadas con BRUNO

## Recursos utilizados

Se utilizó font de google para la tipografía del sitio.
La tipografía es  Poppins: https://fonts.google.com/specimen/Poppins?query=poppins

Para la definición de colores se utilizó Eva Design System https://colors.eva.design/

Para los íconos se utilizó IconSVG https://iconsvg.xyz/

Para la api se utilizó jsonplaceholder https://jsonplaceholder.typicode.com

API Cliente BRUNO https://www.usebruno.com/