import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function DesmosGraph() {
    const calculatorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.Desmos) {
                setIsReady(true);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isReady || !calculatorRef.current) return;

        // eslint-disable-next-line no-undef
        const calculator = Desmos.GraphingCalculator(calculatorRef.current, {
            expressions: true,
            keypad: true,
        });

        return () => calculator.destroy();
    }, [isReady]);

    return (
        <div ref={calculatorRef} className='desmosContainer' />
    );
}
