# E-commerce La Tiendita

## Descripción

Plataforma de e-commerce con funcionalidades diferenciadas para usuarios cliente y administrador. Los clientes pueden realizar compras, gestionar un carrito y generar facturas almacenadas en localStorage. Los administradores pueden visualizar y detallar todas las compras realizadas.

## Tecnologías

- **React 19.0.0** - Biblioteca principal para la construcción de la interfaz de usuario
- **TypeScript** - Añade tipado estático para mejorar la calidad del código
- **Vite** - Bundler y entorno de desarrollo moderno y rápido
- **Zustand** - Gestor de estado global con persistencia en localStorage
- **React Router DOM (v7.4.0)** - Enrutamiento de la aplicación
- **Tailwind CSS (v4.0.14)** - Framework CSS para diseño responsive
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Sonner** - Notificaciones tipo toast
- **React Icons** - Iconos para la interfaz

## Características Principales

- **Sistema de Roles**:

  - **Cliente**: Puede explorar productos, gestionar carrito y realizar compras
  - **Administrador**: Puede visualizar todas las facturas generadas

- **Gestión de Productos**:

  - Catálogo con 15 productos cargados desde localStorage
  - Actualización automática de stock al realizar compras
  - Clasificación por categorías (Frutas Frescas, Cítricos, Tropicales)

- **Carrito de Compras**:

  - Agregar productos con cantidad variable
  - Actualizar cantidades en tiempo real
  - Calcular subtotales, impuestos y totales
  - Persistencia de datos en localStorage

- **Proceso de Compra**:

  - Formulario para datos de envío (nombre, teléfono, correo, país)
  - Validación de país mediante integración con API REST Countries
  - Generación de facturas detalladas

- **Facturación**:
  - Almacenamiento de facturas en localStorage
  - Información detallada (productos, cantidades, precios, impuestos)
  - Consulta de historial para administradores

## Patrones de Diseño Implementados

- Flux/Redux (a través de Zustand)
- Contenedor/Presentacional
- Observer Pattern
- Repository Pattern

## Estructura del Proyecto

src/
|--- actions/ # Acciones para interactuar con APIs externas
|--- assets/ # Recursos estáticos y mocks de datos
|--- components/ # Componentes reutilizables
| |--- ui/ # Componentes de interfaz de usuario
|--- helpers/ # Funciones auxiliares (formateo, etc.)
|--- layouts/ # Layouts principales de la aplicación
|--- lib/ # Utilidades y configuraciones
|--- pages/ # Páginas principales de la aplicación
|--- store/ # Stores Zustand para estado global
|--- types/ # Definiciones de tipos TypeScript

## Instalación y Configuración

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

```bash
# Clonar el repositorio
git clone https://github.com/jotredev/ecommerce-prueba-tecnica.git
cd ecommerce-prueba-tecnica

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

## Scripts Disponibles

```bash
# Iniciar el servidor de desarrollo
pnpm dev

# Genera la versión para producción
pnpm build

# Ejecuta linter para verificar errores de código
pnpm lint

# Previsualiza la versión de producción localmente
pnpm preview
```

## Patrones de Diseño Implementados

- **Flux/Redux (a través de Zustand)**: Manejo centralizado del estado con flujo de datos unidireccional.

- **Patrón Contenedor/Presentacional**: Separación entre componentes que gestionan datos y componentes que se encargarn de la presentación.

- **Patrón Observador**: Componentes que responden a cambios en el estado global.

- **Patrón Repositorio**: Abstracción del acceso a datos (localstorage) detrás de interfaces consistentes.

- **Patrón Singleton**: Stores como instancias únicas para el manejo del estado global.

- **Patrón Composición De Componentes**: Construcción de interfaces complejas mediante la combinación de componentes más pequeños.

- **Inyección De Dependencias**: Uso de props para transmitir datos y comportamientos entre componentes.

## Funcionalidades detalladas

- **Gestión De Productos**
  Los productos se cargan desde un mock inicial y se almacenan en localStorage. Se actualizan dinámicamente cuando un cliente realiza compras, restando el stock disponible.

- Cada producto cuenta con

  - ID único
  - Nombre
  - Categoría
  - Stock disponible
  - Precio
  - Tasa de impuestos aplicable

- **Carrito De Compras**
  Los usuarios pueden:

  - Agregar productos al carrito
  - Ajustar cantidades
  - Eliminar productos del carrito
  - Calcular subtotales, impuestos y totales
  - Persistir los datos del carrito en localStorage

El carrito verifica en tiempo real el stock disponible y no permite agregar más productos de los que hay en existencia.

- **Validación De Envío**
  Antes de completar una compra, se valida que el país de envío pertenezca al contienente americano utilizando la API https://restcountries.com/v3.1/region/america. Esta validación asegura que solo se generen facturas para envíos dentro del continente americano.

- **Facturación**
  Al finalizar la compra se genera una factura detallada con la siguiente información:

- Información del cliente (nombre, teléfono, correo, país)
- Productos comprados y cantidades
- Desglose de precios (subtotales, impuestos, total)
- Fecha y hora de la compra
- Identificador único de la transacción

Las facturas generadas se almacenan en localStorage y pueden ser consultadas por los administradores.

## Arquitectura de la aplicación

La aplicación sigue una arquitectura basada en componentes con una gestión de estado cerntralizada:

1.- **Componentes UI**: Elementos visuales reutilizables (ProductCard, Cart, Input, etc.)
2.- **Páginas**: Vistas principales que componen la aplicación (Home, Cart, Admin, etc.)
3.- **Layouts**: Estructuras compartidas entre páginas (MainLayout, AdminLayout)
4.- **Stores**: Gestión centralizada del estado con Zustand (useProductStore, useCartStore, useInvoiceStore, useAuthStore)
5.- **Helpers/Utils**: Funciones auxiliares para operaciones comunes (formatToMoney, etc.)
6.- **Tipos**: Definiciones TypeScript que aseguran la integridad de los datos (Product, CartItem, Invoice, etc.)

## Flujo de datos

La aplicación implementa un flujo de datos unidireccional:

- El estado se almacena en stores centralizados (Zustand).
- Los componentes leen el estado de los stores.
- Las acciones del usuario disparan métodos en los stores.
- Los componentes se re-renderizan automáticamente cuando el estado cambia.

# Autor

Desarrollado como prueba técnica integral para Senior Frontend por [Jorge Trejo](@jotredev)
