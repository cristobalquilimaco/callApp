Documentación del Proyecto: Aplicación para un Contact Center 

¿De qué se trata este proyecto? 

Este proyecto es una aplicación web desarrollada en Next.js para un centro de contacto (o "contact center"). La idea es mostrar información en tiempo real sobre los agentes (las personas que atienden llamadas) y los clientes que están esperando ser atendidos. Los datos iniciales se obtienen con WebSockets para recibir actualizaciones en tiempo real. 

 

¿Qué hace la aplicación? 

La aplicación cumple con los siguientes puntos clave: 

Muestra una lista de agentes: 

Cada agente tiene un nombre, un estado (si está disponible, en llamada o en pausa) y un tiempo que lleva en disponible o en llamada. 

Puedes ver en tiempo real cómo están los agentes y cuánto tiempo llevan en su estado actual. 

Muestra una lista de clientes en espera: 

Cada cliente tiene un nombre y un tiempo que lleva esperando. 

Los clientes se ordenan por el tiempo que llevan esperando, de mayor a menor o de menor a mayor tiempo 

Filtros para organizar la información: 

Puedes filtrar a los agentes por su estado (por ejemplo, ver solo los que están disponibles, en llamadas o en pausa). 

También puedes ordenar a los clientes por su tiempo de espera, de menor a mayor o viceversa. 

Actualización en tiempo real: 

La aplicación se conecta usando WebSockets, lo que permite que los estados de los agentes y los clientes se actualicen automáticamente sin necesidad de recargar la página. 

Por ejemplo, si un agente pasa de "disponible" a "en llamada", lo verás reflejado al instante. 

Manejo de estados globales: 

Usamos React Context para manejar la información de agentes y clientes de manera global, sin tener que pasar datos entre componentes manualmente. 

Esto hace que el código sea más limpio y fácil de mantener. 

Simulación de llamadas: 

La aplicación simula llamadas entrantes cada 3 segundos y las asigna a los agentes disponibles. 

Esto ayuda a probar cómo se comporta el sistema cuando hay mucha actividad. 

 

¿Cómo está organizado el proyecto? 

El proyecto está estructurado en varias carpetas y archivos para mantener todo ordenado y fácil de entender. Aquí te explico las partes más importantes: 

1. Carpetas principales 

app/: Aquí están las páginas principales de la aplicación. 

layout.jsx: Define la estructura general de la aplicación (como un esqueleto). 

page.jsx: Es la página principal donde se muestran los agentes y los clientes. 

loading.jsx: Es una pantalla de carga que se muestra los primeros 4 segundos al iniciar la aplicación. 

agents/: Contiene la página específica para mostrar la lista de agentes. 

page.jsx: Muestra la lista de agentes. 

clients/: Contiene la página específica para mostrar la lista de clientes. 

page.jsx: Muestra la lista de clientes. 

api/: Aquí está la configuración de la API y WebSockets. 

socket/router.js: Configura los WebSockets para actualizaciones en tiempo real. 

components/: Aquí están los componentes reutilizables. 

AgentList.jsx: Muestra la lista de agentes. 

ClientList.jsx: Muestra la lista de clientes. 

Filters.jsx: Contiene los filtros para agentes y clientes. 

BtnBack/: Contiene el botón para regresar. 

BtnBack.jsx: Componente del botón. 

btnBack.module.css: Estilos del botón. 

header/: Contiene el encabezado de la aplicación. 

Header.jsx: Componente del encabezado. 

header.module.css: Estilos del encabezado. 

loading/: Contiene los componentes de carga. 

GlobalLoader.jsx: Muestra el loader inicial. 

Loader.jsx: Componente del loader. 

loading.module.css: Estilos del loader. 

styles/: Contiene los estilos CSS modularizados. 

agentList.module.css: Estilos para la lista de agentes. 

clientList.module.css: Estilos para la lista de clientes. 

filters.module.css: Estilos para los filtros. 

context/: Aquí está el contexto de la aplicación. 

AppContext.jsx: Maneja la información global de agentes y clientes. 

hooks/: Aquí están los hooks personalizados. 

useAgents.js: Se encarga de obtener y gestionar la lista de agentes. 

useClients.js: Se encarga de obtener y gestionar la lista de clientes. 

utils/: Aquí están las funciones útiles. 

addClient.js: Agrega clientes a la cola de espera. 

api.js: Configura las llamadas a la API. 

assignCalls.js: Asigna llamadas a los agentes disponibles. 

formatTime.js: Convierte el tiempo de segundos a un formato más amigable (MM:SS). 

simulateCalls.js: Simula las llamadas entrantes. 

websocket.js: Configura los WebSockets para actualizaciones en tiempo real. 

data/: Aquí están los archivos JSON con datos iniciales. 

agents.json: Lista de agentes. 

clients.json: Lista de clientes. 

 

¿Cómo funciona la aplicación? 

Al iniciar la aplicación: 

Aparece una pantalla de carga durante los primeros 4 segundos. 

Después, se muestran las listas de agentes y clientes. 

Lista de agentes: 

Cada agente aparece con su nombre, estado y tiempo en espera o en llamada. 

Puedes filtrar a los agentes por su estado (por ejemplo, ver solo los que están disponibles). 

Lista de clientes: 

Cada cliente aparece con su nombre y el tiempo que lleva esperando. 

Puedes ordenar a los clientes por tiempo de espera (de menor a mayor o viceversa). 

Si hay más de 10 clientes, puedes hacer clic en "Ver más" para mostrar todos. 

Actualización en tiempo real: 

Los estados de los agentes y clientes se actualizan automáticamente gracias a los WebSockets. 

Por ejemplo, si un agente pasa de "disponible" a "en llamada", lo verás reflejado al instante. 

Simulación de llamadas: 

Cada 3 segundos, la aplicación simula una llamada entrante y la asigna a un agente disponible. 

Esto ayuda a probar cómo se comporta el sistema cuando hay mucha actividad. 

 

¿Qué tecnologías se usaron? 

Next.js: Es el framework que usamos para construir la aplicación. Nos permite crear páginas rápidas y bien organizadas. 

React Hooks: Usamos useState, useEffect y useContext para manejar los estados y la lógica de la aplicación. 

Fetch API: Para hacer llamadas al backend y obtener la información de agentes y clientes. 

WebSockets: Para recibir actualizaciones en tiempo real. 

CSS Modules: Para los estilos, evitando conflictos entre componentes. 

 

¿Cómo puedo probar la aplicación? 

Puedes Ingresar a la Url:  https://callappcristobal.netlify.app/ 

También Puedes ver su código en Github: https://github.com/cristobalquilimaco/callApp 

 

Inicia la aplicación: 

Al abrir la aplicación, verás una pantalla de carga durante 4 segundos. 

Después, se mostrarán las listas de agentes y clientes. 

Usa los filtros: 

Filtra a los agentes por su estado (disponible, en llamada, etc.). 

Ordena a los clientes por tiempo de espera. 

Ver más clientes: 

Si hay más de 10 clientes, haz clic en "Ver más" para mostrar todos. 

Observa las actualizaciones: 

Los estados de los agentes y clientes se actualizan automáticamente en tiempo real. 

 
