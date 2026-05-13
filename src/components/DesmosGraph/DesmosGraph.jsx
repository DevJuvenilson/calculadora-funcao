import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function DesmosGraph() {
    const calculatorRef = useRef(null);
    const pasteInputRef = useRef(null);
    const calculatorInstanceRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showPasteNotification, setShowPasteNotification] = useState(false);

    useEffect(() => {
        if (window.Desmos) {
            setIsReady(true);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.desmos.com/api/v1.8/calculator.js?apiKey=${process.env.REACT_APP_DESMOS_API_KEY}`;
        script.onload = () => setIsReady(true);
        document.head.appendChild(script);

        return () => {
            // Optionally remove the script if component unmounts
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    useEffect(() => {
        if (!isReady || !calculatorRef.current) return;

        // eslint-disable-next-line no-undef
        const calculator = Desmos.GraphingCalculator(calculatorRef.current, {
            expressions: true,
            keypad: true,
        });

        calculatorInstanceRef.current = calculator;

        return () => calculator.destroy();
    }, [isReady]);

    // Monitorar mudanças de tamanho para detectar mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Interceptar paste no campo oculto
    const handlePaste = (event) => {
        event.preventDefault();
        
        const text = event.clipboardData?.getData('text') || '';
        
        if (!text || !calculatorInstanceRef.current) {
            console.warn('Nenhum texto para colar ou calculator não está pronto');
            return;
        }

        try {
            // Adicionar a expressão ao Desmos
            calculatorInstanceRef.current.setExpression({
                id: `expr_${Date.now()}`,
                latex: text,
            });

            // Mostrar notificação
            setShowPasteNotification(true);
            setTimeout(() => setShowPasteNotification(false), 2000);
        } catch (error) {
            console.error('Erro ao colar expressão no Desmos:', error);
            alert('Erro ao colar a fórmula. Verifique se a sintaxe está correta.');
        }
    };

    // Botão para colar no mobile
    const handlePasteButtonClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            
            if (!text || !calculatorInstanceRef.current) {
                alert('Nada para colar na área de transferência');
                return;
            }

            calculatorInstanceRef.current.setExpression({
                id: `expr_${Date.now()}`,
                latex: text,
            });

            setShowPasteNotification(true);
            setTimeout(() => setShowPasteNotification(false), 2000);
        } catch (error) {
            console.error('Erro ao acessar área de transferência:', error);
            
            // Fallback: focar no campo oculto para permitir paste via menu do navegador
            if (pasteInputRef.current) {
                pasteInputRef.current.focus();
                pasteInputRef.current.select();
            }
        }
    };

    return (
        <div className='desmosWrapper'>
            <div ref={calculatorRef} className='desmosContainer' />
            
            {/* Campo oculto para interceptar paste */}
            <input
                ref={pasteInputRef}
                type="text"
                className='hiddenPasteInput'
                onPaste={handlePaste}
                placeholder="Cole aqui"
                aria-label="Campo para colar fórmulas"
            />

            {/* Botão de Colar para Mobile */}
            {isMobile && (
                <button
                    className='pasteMobileButton'
                    onClick={handlePasteButtonClick}
                    title="Colar fórmula copiada"
                    aria-label="Colar fórmula no gráfico"
                >
                    📋 Colar Fórmula
                </button>
            )}

            {/* Notificação de Sucesso */}
            {showPasteNotification && (
                <div className='pasteNotification'>
                    ✓ Fórmula colada com sucesso!
                </div>
            )}
        </div>
    );
}
