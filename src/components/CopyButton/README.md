# CopyButton - Componente Reutilizável

Um componente React simples e reutilizável para copiar texto para a área de transferência do usuário.

## Recursos

- ✅ Copia texto de uma tag `<p>` ou qualquer outro elemento via ref
- ✅ Feedback visual ao usuário (muda de cor após copiar)
- ✅ Suporta texto customizável no botão
- ✅ Callback opcional para ações após copiar
- ✅ Animações suaves e responsivo

## Instalação

O componente já está criado em `src/components/CopyButton/`

## Uso

### Exemplo 1: Copiar texto de um elemento via ref

```jsx
import { useRef } from 'react';
import CopyButton from './components/CopyButton';

export function MinhaComponente() {
    const paragrafoRef = useRef(null);

    return (
        <>
            <p ref={paragrafoRef}>Este é o texto que será copiado!</p>
            <CopyButton targetRef={paragrafoRef} />
        </>
    );
}
```

### Exemplo 2: Copiar texto direto via prop

```jsx
import CopyButton from './components/CopyButton';

export function MinhaComponente() {
    const formulaTexto = "f(x) = 2x + 3";

    return (
        <div>
            <p>{formulaTexto}</p>
            <CopyButton text={formulaTexto} label="Copiar fórmula" />
        </div>
    );
}
```

### Exemplo 3: Com callback e label customizado

```jsx
import { useRef } from 'react';
import CopyButton from './components/CopyButton';

export function MinhaComponente() {
    const resultadoRef = useRef(null);

    const handleCopiado = () => {
        console.log('Texto copiado com sucesso!');
        // Você pode adicionar outras ações aqui
    };

    return (
        <>
            <p ref={resultadoRef}>Resultado da equação: x = 5</p>
            <CopyButton 
                targetRef={resultadoRef} 
                label="Copiar resultado"
                onCopySuccess={handleCopiado}
            />
        </>
    );
}
```

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `text` | string | Não | Texto a copiar (alternativa a `targetRef`) |
| `targetRef` | ref | Não | Ref para um elemento cuja text-content será copiada |
| `label` | string | Não | Texto exibido no botão (padrão: "Copiar") |
| `onCopySuccess` | function | Não | Callback chamado após copiar com sucesso |

## Comportamento

- Quando o botão é clicado, o texto é copiado para a área de transferência
- O botão muda de cor (azul → verde) e exibe "✓ Copiado!"
- Após 2 segundos, o botão retorna ao estado normal

## Notas

- Se ambos `text` e `targetRef` forem fornecidos, `targetRef` tem prioridade
- Se nenhum dos dois for fornecido, um aviso será exibido no console
- O componente usa a API moderna `navigator.clipboard.writeText()`
