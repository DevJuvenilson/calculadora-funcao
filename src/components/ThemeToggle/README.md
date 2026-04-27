# Theme Toggle Component

## Descrição

Um componente de alternância de tema (Light/Dark Mode) para a aplicação de calculadora.

## Funcionalidades

- **Ícone de Sol/Lua**: Exibe um ícone de sol no modo claro e uma lua no modo escuro
- **Persistência**: Salva a preferência do usuário no localStorage
- **Preferência do Sistema**: Detecta automaticamente a preferência de tema do sistema operacional caso o usuário nunca tenha feito uma escolha
- **Estilo Animado**: Inclui animações suaves ao interagir com o botão

## Como Funciona

1. O botão está posicionado no topo direito da tela
2. Ao clicar, alterna entre o modo claro e escuro
3. A preferência é salva e persistida entre sessões
4. O tema afeta:
   - Background da página (imagem de fundo)
   - Cores de fundo e texto
   - Inputs e selects
   - Botões e outros elementos

## Estilos Utilizados

### Modo Claro
- Background: Azul texturizado
- Cores primárias: Cinza claro (#f4f4f4)
- Texto: Cinza escuro (#333)

### Modo Escuro
- Background: Cinza texturizado escuro
- Cores primárias: Cinza muito escuro (#1a1a1e, #2a2a2e)
- Texto: Cinza claro (#e8e8e8)

## Contexto

O componente utiliza um `ThemeContext` (Context API do React) para gerenciar o estado do tema globalmente, permitindo que qualquer componente acesse e modifique o tema usando o hook `useTheme()`.

### Usando o Hook useTheme

```jsx
import { useTheme } from '../../context/ThemeContext';

function MeuComponente() {
    const { isDark, toggleTheme } = useTheme();
    
    return (
        <div>
            <p>Modo escuro ativado: {isDark ? 'Sim' : 'Não'}</p>
            <button onClick={toggleTheme}>Alternar Tema</button>
        </div>
    );
}
```

## Variáveis CSS

O componente aplica a classe `dark-theme` ao elemento `<html>` quando o modo escuro está ativado. Você pode usar seletores CSS como:

```css
:root.dark-theme body {
    background-color: #1a1a1e;
}

:root.dark-theme .meuElemento {
    color: #e8e8e8;
}
```
