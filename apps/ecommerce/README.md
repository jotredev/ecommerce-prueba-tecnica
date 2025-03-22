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
- Singleton Pattern
- Adapters Pattern

## Estructura del Proyecto

### **`src/`**

- **`actions/`** - Acciones para interactuar con APIs externas
- **`assets/`** - Recursos estáticos y mocks de datos
- **`components/`** - Componentes reutilizables
  - **`/ui`** - Componentes de interfaz de usuario
- **`helpers/`** - Funciones auxiliares (formateo, etc.)
- **`layouts/`** - Layouts principales de la aplicación
- **`lib/`** - Utilidades y configuraciones
- **`pages/`** - Páginas principales de la aplicación
- **`stores/`** - Stores de Zustand para el manejo del estado global
- **`types/`** - Definiciones de tipos TypeScript

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

## Testing de Componentes

### Testing del Componente ProductCard

El proyecto implementa pruebas unitarias completas para el componente ProductCard utilizando Vitest y React Testing Library, asegurando el correcto funcionamiento en diferentes escenarios de uso.

### Tests Implementados

Se han desarrollado tres pruebas principales que validan aspectos críticos del componente:

1. Renderizado correcto de la información del producto
2. Interacción con el botón "Agregar a carrito"
3. Visualización correcta del estado "Sin stock"

### Herramientas de Testing Utilizadas

**Container**

```tsx
const { container } = render(<ProductCard product={mockProduct} />);
const productCard = container.querySelector('[data-testid="product-card"]');
```

- Proporciona acceso directo al DOM donde se renderiza el componente
- Permite realizar consultas mediante atributos `data-testid` especialmente añadidos para testing
- Facilita la selección de elementos específicos sin depender de clases CSS o estructura DOM que podría cambiar

**Screen**

```tsx
expect(screen.getByTestId("product-category")).toHaveTextContent(
  "Frutas Frescas"
);
expect(screen.getByTestId("product-stock")).toHaveTextContent("Stock (10)");
expect(screen.getByTestId("product-button-add-to-cart")).toHaveTextContent(
  "Agregar a carrito"
);
```

- Ofrece una API global para acceder a elementos del DOM
- Proporciona métodos de búsqueda basados en atributos `data-testid`
- Facilita aserciones sobre el contenido textual de los elementos

**WaitFor**

```tsx
await waitFor(() => {
  expect(addToCartMock).toHaveBeenCalledWith(mockProduct, 1);
});
```

- Permite hacer aserciones sobre cambios asíncronos
- Espera a que las condiciones especificadas se cumplan antes de continuar
- Mejora la robustez de tests con operaciones que no son inmediatas

**Act**

```tsx
await act(async () => {
  fireEvent.click(addButton);
});
```

- Garantiza que los eventos de React se procesen completamente
- Asegura que todas las actualizaciones de estado se apliquen antes de las aserciones
- Previene advertencias relacionadas con actualizaciones de UI no sincronizadas

### Testing del la función FormatMoney

El proyecto implementa pruebas unitarias para la función utilitaria formatMoney que convierte valores numéricos a formato de moneda, utilizando Vitest y React Testing Library.

### Test implementados

Se han desarrollado tres pruebas principales que validan aspectos críticos de la función:

1. Formateo correcto de valores monetarios enteros
2. Formateo preciso de valores monetarios negativos
3. Manejo adecuado de valores con decimales

### Herramientas de Testing Utilizadas

**Container**

```tsx
const { container } = render(<PriceDisplay amount={1000} />);
```

- Proporciona acceso al elemento DOM raíz del componente
- Permite verificar la correcta estructura mediante selectores específicos
- Facilita la comprobación de la existencia de elementos contenedores

**Screen**

```tsx
const priceElement = screen.getByTestId("formatted-price");
expect(priceElement.textContent).toBe("$1,000.00");
```

- Simplifica la localización de elementos mediante atributos `data-testid`
- Facilita la verificación del contenido textual formateado
- Proporciona una API intuitiva para consultar elementos renderizados

**WaitFor**

```tsx
await waitFor(() => {
  expect(priceElement.textContent).toBe("$1,000.00");
  expect(
    container.querySelector('[data-testid="price-container"]')
  ).toBeTruthy();
});
```

- Asegura que los cambios en el DOM se hayan completado antes de hacer aserciones
- Mejora la estabilidad de las pruebas esperando que los elementos estén disponibles
- Permite verificar múltiples condiciones una vez se haya estabilizado el renderizado

**Act**

```tsx
await act(async () => {
  render(<PriceDisplay amount={-500} />);
});
```

- Garantiza que todas las actualizaciones del estado de React se completen
- Envuelve operaciones que podrían causar actualizaciones del estado
- Evita advertencias relacionadas con actualizaciones de React no manejadas

### Testing del Componente FormBilling

El proyecto implementa pruebas unitarias completas para el componente FormBilling utilizando Vitest y React Testing Library, asegurando su correcto funcionamiento en diferentes escenarios de uso, incluyendo validación de formularios y comunicación con servicios externos.

### Tests Implementados

Se han desarrollado cuatro pruebas principales que validan aspectos críticos del componente:

- Renderizado correcto de todos los campos obligatorios del formulario
- Validación y envío correcto de datos del formulario
- Manejo de errores cuando falla la validación del país
- Mostrar mensaje informativo cuando el cliente ya ha registrado información

### Herramientas de Testing Utilizadas

**Screen**

```tsx
const inputName = screen.getByTestId("input-name");
expect(inputName).toBeInTheDocument();
```

- Proporciona acceso global a los elementos del DOM renderizados
- Permite localizar elementos mediante atributos `data-testid` específicos
- Facilita aserciones sobre la presencia y contenido de los elementos

**FireEvent**

```tsx
fireEvent.change(screen.getByTestId("input-name"), {
  target: { value: "Jorge Trejo" },
});
```

- Simula eventos de usuario como cambios en inputs y clics
- Permite probar interacciones del usuario con el formulario
- Mantiene actualizado el estado interno de los componentes

**WaitFor**

```tsx
await waitFor(() => {
  expect(registerLocation).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Jorge Trejo",
      phone: "6144555555",
      email: "test@gmail.com",
      country: "MX",
    })
  );
});
```

- Permite realizar aserciones sobre operaciones asíncronas
- Espera a que una condición se cumpla antes de continuar
- Ideal para probar llamadas a APIs y cambios de estado asíncronos

**Act**

```tsx
await act(async () => {
  fireEvent.click(screen.getByTestId("button-submit"));
});
```

- Asegura que todas las actualizaciones de estado de React se completen
- Envuelve operaciones que provocan cambios de estado asíncronos
- Previene warnings relacionados con actualizaciones pendientes de UI

**Mocks**

```tsx
vi.mock("@/actions/submit-location-client");
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
```

- Aísla el componente de sus dependencias externas
- Permite simular respuestas específicas de acciones
- Facilita la verificación de llamadas a servicios externos y librerías

## Autor

Desarrollado como prueba técnica integral para Senior Frontend por [@jotredev](https://www.github.com/jotredev)

## Arquitectura de la aplicación

[Arquitectura](https://github.com/jotredev/ecommerce-prueba-tecnica/blob/main/ARCHITECTURE.md)
