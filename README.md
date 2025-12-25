🧠 Smart UI Flow Builder

🚀 Visual Flow Builder para crear, conectar, validar y ejecutar flujos lógicos de forma interactiva.

Diseñado como una herramienta low-code / no-code, permite construir flujos paso a paso mediante drag & drop, conexiones visuales con flechas y validaciones automáticas.

👉 Ideal para modelar procesos, lógica de negocio, workflows y automatizaciones.

🔗 Live Demo:
https://TU-USUARIO.github.io/smart-ui-flow-builder

✨ Características principales

✅ Drag & Drop de nodos
✅ Conexiones visuales con flechas
✅ Preview Mode (bloquea edición)
✅ Guardar y cargar flujo (LocalStorage)
✅ Exportar / Importar JSON
✅ Validación lógica del flujo
✅ Validación visual (nodos aislados, errores)
✅ UX guiada integrada
✅ Arquitectura modular y escalable

⚠️ No es un proyecto básico — está pensado como pieza de portafolio profesional.

🧩 Tipos de nodos soportados

▶ Inicio

⚙ Proceso

❓ Decisión

⏹ Fin

🔘 Botón

📝 Input

🧾 Card

🧩 Text Node

Cada nodo es extensible y desacoplado del canvas.

🧠 Validación del flujo

El sistema valida automáticamente:

❌ Flujos sin nodos

❌ Nodos aislados

❌ Falta de nodo inicial

❌ Falta de nodo final

❌ Ciclos infinitos

❌ Conexiones inválidas

Los errores se muestran de forma clara al usuario.

🎮 Cómo usar la aplicación

1️⃣ Arrastra nodos desde el sidebar
2️⃣ Click en un nodo → click en otro nodo para conectar
3️⃣ Click sobre una flecha para eliminar conexión
4️⃣ Usa Preview para bloquear edición
5️⃣ Guardar almacena el flujo en el navegador
6️⃣ Exportar genera un archivo JSON
7️⃣ Importar carga un flujo existente


🛠️ Tecnologías utilizadas

⚛ React

⚡ Vite

🎨 Tailwind CSS

🧠 State management propio

💾 LocalStorage

📦 GitHub Pages (deploy)

📁 Estructura del proyecto
src/
├── components/
│   ├── flow/          # Canvas, nodos, preview, validación
│   ├── layout/        # Sidebar, Topbar, AppLayout
│   ├── nodes/         # Tipos de nodos
│   └── UI/            # Componentes reutilizables
├── hooks/
├── store/
├── pages/
├── styles/
└── main.jsx


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 Instalación local
git clone https://github.com/eljhosm0n/smart-ui-flow-builder.git
cd smart-ui-flow-builder
npm install
npm run dev

🌍 Deploy
npm run build
npm run deploy
🎯 Casos de uso
Modelado de procesos
Flujos de negocio
Automatización visual
Prototipado de lógica
Herramientas low-code
Visualización de workflows

👨‍💻 Autor
Jhostin Alexander Molina Julio
Ingeniería de Sistemas | Full Stack Developer

💼 LinkedIn: jhostin molina julio
💻 GitHub: eljhosm0n
