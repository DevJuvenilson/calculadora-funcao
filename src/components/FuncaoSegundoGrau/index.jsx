import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';
import SignToggleButton from '../SignToggleButton';

export default function FuncaoSegundoGrau() {
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
    const formulaText = `f(x) = ${a || 'a'}x^{2} + ${b || 'b'}x + ${c || 'c'}`;

    const [delta, setDelta] = useState('');
    const [solucao, setSolucao] = useState('');
    const [xVertice, setXVertice] = useState('');
    const [yVertice, setYVertice] = useState('');

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

        const deltaCalc = bNum * bNum - 4 * aNum * cNum;
        setDelta(deltaCalc);

        // Fórmulas
        const x1 = (-bNum + Math.sqrt(deltaCalc)) / (2 * aNum);
        const x2 = (-bNum - Math.sqrt(deltaCalc)) / (2 * aNum);
        const xv = -bNum / (2 * aNum);
        const yv = -deltaCalc / (4 * aNum);

        if (deltaCalc < 0) {
            setSolucao("Sem raízes reais");
        } else {
            setSolucao(`S = {${x1.toFixed(2).split('.').join(',')}; ${x2.toFixed(2).split('.').join(',')}}`);
        }

        setXVertice(xv.toFixed(2).split('.').join(','));
        setYVertice(yv.toFixed(2).split('.').join(','));
    };


    return (
        <div className="funcao-segundo-grau">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {a || 'a'}x² + {b || 'b'}x + {c || 'c'}</p>
            </header>

            <CopyButton text={formulaText} label='Copiar' />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Coeficiente angular. Determina a abertura da parábola. Não pode ser zero." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignA} disabled={a === ''} />
                            <input type="text" inputMode="decimal" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Coeficiente linear. Afeta a posição horizontal da parábola." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignB} disabled={b === ''} />
                            <input type="text" inputMode="decimal" id="b" className='valorB' placeholder='b' value={b} onChange={handleChangeB} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Termo independente. Determina onde a parábola cruza o eixo Y." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignC} disabled={c === ''} />
                            <input type="text" inputMode="decimal" id="c" className='valorC' placeholder='c' value={c} onChange={handleChangeC} />
                        </div>
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text={"Indica a natureza das raízes da função."} position="top">
                        <input type="text" id="delta" className='valorDelta' placeholder='∆' value={"∆ = " + delta} disabled />
                    </Tooltip>
                    <Tooltip text="Conjunto solução da função." position="top">
                        <input type="text" id="solucao" className='valorSolucao' placeholder='S = { }' value={solucao} disabled />
                    </Tooltip>
                    <Tooltip text="Abscissa do vértice da parábola." position="top">
                        <input type="text" id="xVertice" className='valorxVertice' placeholder='Xv' value={"Xv = " + xVertice} disabled />
                    </Tooltip>
                    <Tooltip text="Ordenada do vértice da parábola." position="top">
                        <input type="text" id="yVertice" className='valoryVertice' placeholder='Yv' value={`Yv = ${yVertice}`} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}