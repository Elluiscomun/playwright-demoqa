# Automatización de Pruebas – Practice Form (QA)

## 📌 Descripción del proyecto

Este proyecto implementa **pruebas automatizadas** sobre el formulario **Student Registration Form** disponible en:

> https://demoqa.com/automation-practice-form

Las pruebas fueron desarrolladas utilizando **Playwright con TypeScript**.

##  Tecnologías utilizadas
- **Node.js v24.12.0**
- **Playwright**
- **TypeScript**
- **@faker-js/faker**
- **dotenv**


## Ejecución del proyecto
1️. Instalar dependencias
```bash
npm install
```
2️. Ejecutar pruebas
```bash
npx playwright test
```
3️. Ejecutar en modo UI (opcional)
```bash
npx playwright test --ui
```
## 🚀 Ejecución automática de pruebas con GitHub Actions

Este proyecto utiliza **GitHub Actions** para ejecutar automáticamente las pruebas E2E de **Playwright**.

### ¿Cuándo se ejecutan las pruebas?

El workflow se ejecuta automáticamente cuando:

- Se hace `push` a las ramas `main` o `master`
- Se crea o actualiza un `pull_request`
- Se ejecuta manualmente desde la pestaña **Actions** de GitHub