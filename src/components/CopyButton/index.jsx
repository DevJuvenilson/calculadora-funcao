import { useState } from 'react';
import './styles.css';

export default function CopyButton({ text, targetRef, label = 'Copiar', onCopySuccess }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            // Se targetRef foi fornecido, copia o textContent do elemento
            const textToCopy = targetRef?.current?.textContent || text;

            if (!textToCopy) {
                console.warn('CopyButton: Nenhum texto fornecido para copiar');
                return;
            }

            await navigator.clipboard.writeText(textToCopy);
            
            setCopied(true);
            onCopySuccess?.();
            
            // Remove o estado "copiado" após 2 segundos
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Erro ao copiar texto:', error);
        }
    };

    return (
        <button 
            className={`copyButton ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copiar para a área de transferência"
        >
            {copied ? '✓ Copiado!' : label}
        </button>
    );
}
