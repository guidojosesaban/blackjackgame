♠️ Blackjack HyperDeck
Una aplicación web interactiva que implementa el juego clásico de Blackjack (21), con un enfoque en una interfaz de usuario futurista (HyperDeck), dinámica y totalmente responsiva.

⚙️ Tecnologías Utilizadas
Este proyecto fue construido utilizando tecnologías fundamentales de desarrollo web, prestando especial atención a la separación de responsabilidades:

JavaScript (ES6+): Implementación de toda la lógica de juego, la gestión de estados (puntajes, saldo) y las interacciones de la UI.

HTML5: Estructura semántica de la aplicación y la interfaz de usuario (UI), incluyendo la integración de modales.

CSS3: Aplicación del diseño futurista y responsivo, utilizando propiedades avanzadas como transform y perspective para crear efectos 3D y de profundidad en la mesa y las cartas.

Bootstrap (Grid): Utilizado para el sistema de cuadrícula (grid) base, facilitando el diseño responsivo del layout principal.

Lodash (Underscore.js): Utilizado para la función de shuffle (_.shuffle) para barajar el mazo de cartas.

✨ Características Principales
Lógica de Juego Completa: Implementación de las reglas clásicas del Blackjack, incluyendo la gestión dinámica del valor de los Ases (11 o 1) para evitar pasarse de 21.

Detección de Blackjack Inicial: Comprobación inmediata de 21 en las dos primeras cartas para pagos de 2:1 (o 1:1 en caso de empate/push).

Sistema de Apuestas: Flujo controlado mediante un modal (modal-apuesta) que gestiona el saldo y la apuesta de cada mano.

Diseño Futurista (HyperDeck): Estilo oscuro con acentos de color Neón Azul/Cyan (var(--color-accent)), con efectos de glow y sombras 3D que dan profundidad a las cartas.

Responsive Design: La interfaz se adapta correctamente a pantallas de escritorio y dispositivos móviles gracias a CSS Grid y Media Queries.

🚀 Estructura de Archivos
La estructura del proyecto es clara y modular. Todos los archivos se encuentran bajo el directorio principal blackjack-hyperdeck/:

index.html
  -  Propósito: Estructura principal de la aplicación y el juego.

README.md
  -  Propósito: Este documento de información del proyecto.

assets/
  assets/css/
    -  styles.css (Contiene todos los estilos futuristas, 3D y responsivos.)

  assets/js/
    -  juego.js (Contiene toda la lógica principal del juego de Blackjack.)
    -  underscore-min.js (Librería Lodash/Underscore utilizada para la función de barajar.)

  assets/cartas/
    -  Propósito: Directorio que contiene todas las imágenes de las cartas.

💡 Cómo Ejecutar el Proyecto
Clonar el Repositorio: Descarga o clona la carpeta del proyecto.

Abrir index.html: Simplemente abre el archivo index.html en tu navegador web (Chrome, Firefox, etc.).

Jugar: El juego te pedirá inmediatamente realizar una apuesta en el modal pop-up para comenzar la partida.
