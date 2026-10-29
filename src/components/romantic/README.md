# Personaje romántico

## Respaldo SVG actual

`RomanticCharacterFallback.jsx` dibuja el personaje por partes: cabello, rostro, cuello, torso, brazos, piernas y botas. El respaldo toma como referencia la captura compartida: cabello oscuro rizado, piel cálida, camiseta verde de manga corta, pantalón gris y botas marrones. CSS mueve las piernas y brazos durante la entrada, gira la cabeza y cambia la expresión y el brazo en cada beso.

El mensaje final vive en la columna de la carta y aparece después del segundo beso; no acompaña al personaje como globo.

## Recurso Rive disponible

El proyecto contiene `src/assets/images/28195-53259-character-builder.riv`. Identifiqué la máquina `State Machine 1`, el modelo `ViewModel1` y sus propiedades de color (`skinColor`, `topColor`, `pantColor`, `hairColor`, `shoeColor`) y selección (`shoe`, `pant`, `topOutfit`, `hairStyle`, `idle`). El archivo también contiene clips con nombres como `Jump9`, `Move arm9`, `Move arm 29`, `Idle9`, `Blink Eyes` y `smale reward9`.

En la vista local, la máquina y el modelo cargaron, pero el canvas del recurso no dibujó un personaje visible con la instancia y valores predeterminados. Por eso `riveCharacterConfig.js` mantiene el modo SVG como representación visible. El adaptador de Rive se conserva para volver a activarlo cuando el ViewModel y las poses se hayan configurado en el editor.

Queda pendiente preparar y revisar en Rive poses consistentes de caminar, girar al recuerdo, llevar la mano a la boca, lanzar el beso y sonreír. Los nombres de clips disponibles no se consideran prueba de que esas poses estén listas.
