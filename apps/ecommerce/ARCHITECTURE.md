# Arquitectura

Este documento describe la arquitectura detallada, patrones de diseño y decisiones técnicas implementadas en el proyecto de e-commerce La Tiendita.

## Visión General de la Arquitectura

La Tiendita sigue una arquitectura frontend moderna basada en componentes con gestión de estado centralizada. La aplicación está construida utilizando React y TypeScript, con Vite como bundler y entorno de desarrollo.

### Principios Arquitectónicos Clave

1. **Flujo de datos unidireccional**: Utilizamos Zustand para implementar un patrón similar a Flux/Redux.
2. **Separación de responsabilidades**: Implementamos el patrón Contenedor/Presentacional.
3. **Modularidad**: Componentes pequeños y enfocados que se combinan para crear interfaces complejas.
4. **Persistencia local**: Almacenamiento en localStorage para productos, carrito y facturas.
5. **Tipado estático**: Uso extensivo de TypeScript para garantizar la integridad de datos.

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

### Explicación de la Estructura

- **actions/**: Contiene funciones que interactúan con APIs externas. Por ejemplo, `registerLocation` en `submit-location-client.ts` maneja la validación del país mediante la API de REST Countries.

- **assets/**: Almacena recursos estáticos y datos iniciales. El archivo `Products.ts` contiene el mock inicial de productos.

- **components/ui/**: Componentes reutilizables de UI que siguen un enfoque de "atomic design":

  - Componentes atómicos: Input, Label, Button
  - Componentes moleculares: ProductCard, CardProductCart
  - Componentes organismicos: Cart, FormBilling

- **helpers/**: Funciones utilitarias como `formatToMoney` para dar formato a valores monetarios.

- **layouts/**: Componentes de estructura que definen el marco visual de las páginas. El `MainLayout` incluye elementos comunes como el Header.

- **lib/**: Utilidades y configuraciones, como la función `cn` para combinar clases CSS.

- **pages/**: Componentes contenedores para cada ruta principal de la aplicación (Home, Cart, Admin).

- **store/**: Implementaciones de Zustand para gestión de estado global:

  - `useProductStore`: Gestión de productos y stock
  - `useCartStore`: Gestión del carrito y operaciones de compra
  - `useInvoiceStore`: Gestión de facturas generadas
  - `useAuthStore`: Autenticación y manejo de roles

- **types/**: Definiciones de tipos TypeScript para toda la aplicación:
  - `Product.ts`: Tipado para productos y operaciones relacionadas
  - `Client.ts`: Esquemas y tipos para datos de cliente
  - `Invoice.ts`: Estructura de facturas

## Patrones de Diseño Implementados

### 1. Patrón Flux/Redux (mediante Zustand)

Este patrón implementa un flujo de datos unidireccional donde el estado se almacena en un store centralizado, y solo puede ser modificado a través de acciones predefinidas.

**Implementación:**

```typescript
// src/store/useCartStore/index.tsx
export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      // Estado
      items: [],

      // Acciones que modifican el estado
      addToCart: (product: Product, quantity = 1) => {
        const productStoreRef = productStore();
        // Lógica para agregar al carrito
        set((state) => {
          // Actualización del estado
        });
      },

      // Selectores que derivan datos del estado
      getTotalItems: (): number => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "carrito-prueba-tecnica",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

**Beneficios:**

- Flujo de datos predecible y fácil de seguir.
- Centralización del estado de la aplicación.
- Facilidad para implementar características como persistencia.
- Separación clara entre estado y lógica de UI.

### 2. Patrón Contenedor/Presentacional

Separamos los componentes que gestionan el estado y la lógica (contenedores) de los componentes que se encargan de la presentación.

Ejemplos:

**Componente Contenedor:**

```tsx
// src/pages/Home/index.tsx
export function HomePage() {
  const { products } = useProductStore();

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
```

**Componente Presentacional:**

```tsx
// src/components/ui/ProductCard/index.tsx
export const ProductCard = ({product}: ProductCardProps) => {
  const {addToCart} = useCartStore();
  const {products} = useProductStore();

  const currentProduct = products.find((p) => p.id === product.id) || product;

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    if (currentProduct.stock > 0) {
      addToCart(currentProduct, 1);
    }
  };

  return (
    // Renderizado de UI
  );
};
```

**Beneficios:**

- Mejor separación de responsabilidades.
- Mayor reutilización de componentes presentacionales.
- Facilita las pruebas unitarias.
- Mejora la mantenibilidad y escalabilidad del código.

### 3. Patrón Observador

Implementado a través del sistema de reactividad de React y los hooks personalizados de Zustand.

**Ejemplo:**

```tsx
// En un componente React
const { items, getSubtotal, getTotalTax, getGrandTotal } = useCartStore();
// El componente se vuelve a renderizar automáticamente cuando estos valores cambian
```

**Beneficios:**

- Actualizaciones automáticas de la UI cuando cambia el estado
- Código más declarativo
- Reducción de lógica para sincronizar UI con estado

## Patrón Repositorio

Abstrae el acceso a datos detrás de interfaces consistentes, independientemente de la fuente.

**Ejemplo:**

```tsx
// src/store/useProductStore/index.ts
export const useProductStore = create<ProductState>((set) => ({
  products: [],

  loadProducts: () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      set({ products: JSON.parse(storedProducts) });
    } else {
      localStorage.setItem("products", JSON.stringify(initProductsMock));
      set({ products: initProductsMock });
    }
  },

  decreaseStock: (productId: number, quantity: number) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },
}));
```

**Beneficios:**

- Aísla los detalles de acceso a datos del resto de la aplicación
- Facilita el cambio de fuente de datos (por ejemplo, de localStorage a una API REST)
- Centraliza la lógica de persistencia

### Patrón Singleton

Los stores de Zustand actúan como singletons, garantizando una única instancia del estado global.

**Ejemplo:**

```tsx
// Creado una vez, accesible globalmente
export const useCartStore = create(persist<CartState>(...));
```

**Beneficios:**

- Garantiza una única fuente de verdad para el estado
- Evita inconsistencias por múltiples instancias
- Proporciona acceso global al estado desde cualquier parte de la aplicación

### Patrón Adaptador

Utilizado para transformar datos de APIs externas al formato interno de la aplicación.

**Ejemplo:**

```tsx
// src/actions/submit-location-client.ts
export async function registerLocation(values: z.infer<typeof schemaLocation>) {
  // Adapta datos de API externa al formato interno
  const response = await fetch("https://restcountries.com/v3.1/region/america");
  const americasCountries: Country[] = await response.json();
  // Transformación y validación
}
```

**Beneficios:**

- Aísla los cambios en APIs externas
- Normaliza los datos para uso interno
- Simplifica el manejo de diferentes formatos de datos

## Flujos de Datos Principales

### Flujo de Carga de Productos

1. Al iniciar la aplicación, MainLayout llama a loadProducts del store de productos
2. El store verifica si hay productos en localStorage
   - Si existen, los carga en el estado
   - Si no, carga el mock inicial y lo guarda en localStorage
3. Los componentes que consumen el store de productos se renderizan con los datos

### Flujo de Carrito de Compras

1. Usuario hace clic en "Agregar a carrito" en un ProductCard
2. Se ejecuta addToCart del store de carrito
3. El store actualiza el estado del carrito y decrementa el stock del producto
4. Los componentes que muestran el carrito y los productos se actualizan automáticamente

### Flujo de Generación de Facturas

1. Usuario completa el formulario de datos de envío
2. Al enviar el formulario, se valida el país con la API REST Countries
3. Si la validación es exitosa, se ejecuta checkout del store de carrito
4. El store crea una nueva factura con los datos del cliente y productos
5. La factura se almacena en localStorage
6. El carrito se vacía y el usuario recibe confirmación de compra

## Consideraciones Técnicas

### Gestión de Estado

Para la gestión de estado global utilizamos Zustand en lugar de Redux o Context API por:

1. **Simplicidad:** API más simple y menos verbosa que Redux
2. **Rendimiento:** Actualizaciones selectivas que evitan renderizados innecesarios
3. **Middleware:** Fácil integración con middleware como persist para localStorage
4. **TypeScript:** Excelente integración con TypeScript

### Patrones CSS

Utilizamos Tailwind CSS con un enfoque de utilidades primero, aprovechando:

1. **CSS moderno:** Uso de containerQuery, has, within, etc.
2. **Tema personalizado:** Variables CSS para colores y estilos consistentes
3. **Componentes responsivos:** Diseño adaptable a diferentes tamaños de pantalla
4. **Utility-first:** Clases atómicas para construir interfaces rápidamente

### Tipado con TypeScript

Implementamos un sistema de tipos extensivo con:

1. **Interfaces y tipos:** Definiciones claras para productos, carrito, facturas, etc.
2. **Esquemas de validación:** Uso de Zod para validar datos de formularios
3. **Genéricos:** Para stores y componentes reutilizables

## Limitaciones y Consideraciones Futuras

### Limitaciones Actuales

1. **Persistencia Local:** Actualmente solo usamos localStorage, lo que limita la cantidad de datos que podemos almacenar.
2. **Autenticación Simulada:** El sistema de autenticación es básico y simulado.
3. **Validación de Países:** La validación es simple y no considera otros factores logísticos.

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

## Conclusión

La arquitectura de La Tiendita se basa en principios modernos de desarrollo frontend, con énfasis en el flujo de datos unidireccional, componentes reutilizables y tipado fuerte. Los patrones implementados facilitan la mantenibilidad, escalabilidad y testabilidad del código.

La combinación de React, TypeScript, Zustand y Tailwind CSS proporciona una base sólida para construir una aplicación robusta y extensible, mientras que la organización de carpetas y la separación de responsabilidades permiten un desarrollo eficiente y colaborativo.
