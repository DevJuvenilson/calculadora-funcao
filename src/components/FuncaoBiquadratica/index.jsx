import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoBiquadratica() {
    const paragrafoRef = useRef(null);

    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');

    const handleChangeA = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setA(value);
        }
    };

    const handleChangeB = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setB(value);
        }
    };

    const handleChangeC = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setC(value);
        }
    };

    const toggleSignA = () => {
        if (a !== '') {
            setA(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`);
        }
    };

    const toggleSignB = () => {
        if (b !== '') {
            setB(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`);
        }
    };

    const toggleSignC = () => {
        if (c !== '') {
            setC(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`);
        }
    };

    // Texto para copiar em formato LaTeX
    const formulaText = `f(x) = ${a || 'a'}x^{4} + ${b || 'b'}x^{2} + ${c || 'c'}`;

    const [deltaAuxiliar, setDeltaAuxiliar] = useState('');
    const [raizesAuxiliares, setRaizesAuxiliares] = useState('');
    const [raizesFuncao, setRaizesFuncao] = useState('');
    const [corteY, setCorteY] = useState('');

    const handleCalcular = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const cNum = parseFloat(c);

        if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
            alert("Por favor, insira todos os valores corretamente.");
            return;
        }

        if (aNum === 0) {
            alert("O coeficiente 'a' não pode ser zero.");
            return;
        }

        // Cálculo da função biquadrática: f(x) = ax^4 + bx^2 + c
        // Substituição: y = x^2, então: ay^2 + by + c = 0

        // Delta da equação auxiliar
        const deltaAux = bNum * bNum - 4 * aNum * cNum;
        setDeltaAuxiliar(deltaAux.toFixed(2).split('.').join(','));

        // Raízes da equação auxiliar (y1 e y2)
        let raizesAux = '';
        let raizesFunc = [];

        if (deltaAux < 0) {
            raizesAux = "Sem raízes reais na equação auxiliar";
            raizesFunc = [];
        } else {
            const y1 = (-bNum + Math.sqrt(deltaAux)) / (2 * aNum);
            const y2 = (-bNum - Math.sqrt(deltaAux)) / (2 * aNum);

            raizesAux = `S = {${y1.toFixed(2).split('.').join(',')}; ${y2.toFixed(2).split('.').join(',')}}`;

            // Cálculo das quatro raízes da função biquadrática
            // Para cada y >= 0, x = ± √y

            if (y1 >= 0) {
                const x1 = Math.sqrt(y1);
                const x2 = -Math.sqrt(y1);
                raizesFunc.push(x1);
                raizesFunc.push(x2);
            }

            if (y2 >= 0 && Math.abs(y2 - y1) > 0.0001) {
                const x3 = Math.sqrt(y2);
                const x4 = -Math.sqrt(y2);
                raizesFunc.push(x3);
                raizesFunc.push(x4);
            }
        }

        setRaizesAuxiliares(raizesAux);

        // Formatação das raízes da função
        if (raizesFunc.length === 0) {
            setRaizesFuncao("Sem raízes reais");
        } else {
            const raizesFormatadas = raizesFunc
                .sort((a, b) => a - b)
                .map(r => r.toFixed(2).split('.').join(','))
                .join('; ');
            setRaizesFuncao(`S = {${raizesFormatadas}}`);
        }

        // Corte em Y: quando x = 0, f(0) = c
        setCorteY(cNum.toFixed(2).split('.').join(','));
    };


    return (
        <div className="funcao-biquadratica">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {a || 'a'}x⁴ + {b || 'b'}x² + {c || 'c'}</p>
            </header>

            <CopyButton text={formulaText} label='Copiar' />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Coeficiente de x⁴. Determina a abertura da curva. Não pode ser zero." position="top">
                        <div className='input-group'>
                            <button type="button" className='toggle-sign' onClick={toggleSignA}>±</button>
                            <input type="text" inputMode="decimal" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Coeficiente de x². Afeta a forma da curva." position="top">
                        <div className='input-group'>
                            <button type="button" className='toggle-sign' onClick={toggleSignB}>±</button>
                            <input type="text" inputMode="decimal" id="b" className='valorB' placeholder='b' value={b} onChange={handleChangeB} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Termo independente. Determina onde a curva cruza o eixo Y." position="top">
                        <div className='input-group'>
                            <button type="button" className='toggle-sign' onClick={toggleSignC}>±</button>
                            <input type="text" inputMode="decimal" id="c" className='valorC' placeholder='c' value={c} onChange={handleChangeC} />
                        </div>
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="Delta da equação auxiliar (ay² + by + c = 0, sendo y = x²)." position="top">
                        <input type="text" id="deltaAuxiliar" className='valorDeltaAuxiliar' placeholder='∆' value={"∆ = " + deltaAuxiliar} disabled />
                    </Tooltip>
                    <Tooltip text="Raízes da equação auxiliar (valores de y)." position="top">
                        <input type="text" id="raizesAuxiliares" className='valorRaizesAuxiliares' placeholder='Raízes auxiliares' value={raizesAuxiliares} disabled />
                    </Tooltip>
                    <Tooltip text="Raízes da função biquadrática (valores de x)." position="top">
                        <input type="text" id="raizesFuncao" className='valorRaizesFuncao' placeholder='Raízes' value={raizesFuncao} disabled />
                    </Tooltip>
                    <Tooltip text="Ordenada onde a curva cruza o eixo Y (quando x = 0)." position="top">
                        <input type="text" id="corteY" className='valorCorteY' placeholder='Corte em Y' value={`f(0) = ${corteY}`} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}