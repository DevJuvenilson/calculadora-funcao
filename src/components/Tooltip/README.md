# Componente Tooltip

Componente reutilizável de tooltip que aparece ao passar o mouse sobre um elemento.

## Uso

```jsx
import Tooltip from '../components/Tooltip';

<Tooltip 
  text="Descrição que aparecerá no tooltip"
  position="top"
>
  <input type="number" placeholder="Campo" />
</Tooltip>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `text` | string | - | Texto que será exibido no tooltip (obrigatório) |
| `position` | string | 'top' | Posição do tooltip: 'top', 'bottom', 'left' ou 'right' |
| `children` | ReactNode | - | Elemento que acionará o tooltip ao ser hovado (obrigatório) |

## Exemplos

### Tooltip na parte superior
```jsx
<Tooltip text="Este é um tooltip superior" position="top">
  <button>Passe o mouse aqui</button>
</Tooltip>
```

### Tooltip na parte inferior
```jsx
<Tooltip text="Este é um tooltip inferior" position="bottom">
  <input type="text" placeholder="Digite algo" />
</Tooltip>
```

### Tooltip à esquerda
```jsx
<Tooltip text="Este é um tooltip à esquerda" position="left">
  <span>Conteúdo</span>
</Tooltip>
```

### Tooltip à direita
```jsx
<Tooltip text="Este é um tooltip à direita" position="right">
  <label>Label com tooltip</label>
</Tooltip>
```

## Características

- ✅ Reutilizável em qualquer componente
- ✅ Suporta 4 posições diferentes
- ✅ Animação suave de aparecimento
- ✅ Design responsivo
- ✅ Sombra elegante
- ✅ Seta indicadora de posição
