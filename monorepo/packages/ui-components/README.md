## Instalación

```bash
# npm
npm install @jorgeetrejoo/react-ui-components

# pnpm
pnpm add @jorgeetrejoo/react-ui-components

# yarn
yarn add @jorgeetrejoo/react-ui-components
```

## Uso

Para utilizar esta biblioteca, importa los estilos y componentes necesarios.

```tsx
// Importar estilos (requerido)
import "@jorgeetrejoo/react-ui-components/dist/index.css";

// Importar componentes
import {Button, Input, Card} from "@jorgeetrejoo/react-ui-components";

function App() {
  return (
    <div className="p-4">
      <Card>
        <h2 className="text-xl font-bold mb-4">Formulario de contacto</h2>
        <div className="space-y-4">
          <Input placeholder="Nombre completo" />
          <Input placeholder="Email" type="email" />
          <Button>Enviar</Button>
        </div>
      </Card>
    </div>
  );
}
```

## Componentes

### Botón

Un componente de botón versátil y personalizable.

### Importación

```tsx
import {Button} from "@jorgeetrejoo/react-ui-components";

<Button>Enviar</Button>;
```

### Props

| Prop      | Tipo    | Opciones                                   | Default   | Descripción             |
| --------- | ------- | ------------------------------------------ | --------- | ----------------------- |
| variant   | string  | 'primary', 'secondary', 'outline', 'ghost' | 'primary' | Estilo visual del botón |
| size      | string  | 'sm', 'md', 'lg'                           | 'md'      | Tamaño del botón        |
| disabled  | boolean | -                                          | false     | Deshabilita el botón    |
| className | string  | -                                          | ''        | Clases CSS adicionales  |

### Input

Un componente de input versátil y personalizable.

### Importación

```tsx
import {Input} from "@jorgeetrejoo/react-ui-components";

<Input placeholder="Nombre completo" />;
```

### Props

| Prop        | Tipo    | Default | Descripción                                 |
| ----------- | ------- | ------- | ------------------------------------------- |
| type        | string  | 'text'  | Tipo de input (text, email, password, etc.) |
| placeholder | string  | ''      | Texto placeholder                           |
| disabled    | boolean | false   | Deshabilita el input                        |
| error       | boolean | false   | Aplica estilo de error                      |
| className   | string  | ''      | Clases CSS adicionales                      |
