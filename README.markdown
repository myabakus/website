Exportar para produccion
==================

1. Por consola llegamos a la raiz donde esta el proyecto localmente

2. Ejecutamos el comando

  ```bash
  npm install // Este comando se ejecuta una solo vez, descarga los paquete que necesitamos
  ```
  ```bash
  npm run build // Este comando se ejecuta siempre que vamos a subir archivos a produccion
  ```

3. El comando **npm run build** genera un directorio llamado **dist**, los archivos dentro de este directorio se deben copiar todos a la carpeta website dentro del servidor
