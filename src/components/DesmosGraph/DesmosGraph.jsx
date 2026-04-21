import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function DesmosGraph() {
    const calculatorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

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

        return () => calculator.destroy();
    }, [isReady]);

    return (
        <div ref={calculatorRef} className='desmosContainer' />
    );
}
