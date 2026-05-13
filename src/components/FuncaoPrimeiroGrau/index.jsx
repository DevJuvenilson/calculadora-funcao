import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoPrimeiroGrau() {
    const paragrafoRef = useRef(null);

    const [a, setA] = useState('');
    const [b, setB] = useState('');

    const handleChangeA = (event) => {
        let value = event.target.value;

        // troca vírgula por ponto
        value = value.replace(',', '.');

        // permite apenas números, -, e .
        if (/^-?\d*\.?\d*$/.test(value)) {
            setA(value);
        }
    };

    const handleChangeB = (event) => {
        let value = event.target.value;

        // troca vírgula por ponto
        value = value.replace(',', '.');

        // permite apenas números, -, e .
        if (/^-?\d*\.?\d*$/.test(value)) {
            setB(value);
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

    const [raiz, setRaiz] = useState('');
    const [coeficienteAngular, setCoeficienteAngular] = useState('');
    const [coeficienteLinear, setCoeficienteLinear] = useState('');

    const handleCalcular = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);

        if (isNaN(aNum) || isNaN(bNum)) {
            alert("Por favor, insira todos os valores corretamente.");
            return;
        }

        if (aNum === 0) {
            alert("O coeficiente 'a' não pode ser zero.");
            return;
        }

        // Cálculos
        const raizCalc = -bNum / aNum;

        setCoeficienteAngular(aNum.toFixed(2).split('.').join(','));
        setCoeficienteLinear(bNum.toFixed(2).split('.').join(','));
        setRaiz(`x = ${raizCalc.toFixed(2).split('.').join(',')}`);
    };

    return (
        <div className="funcao-primeiro-grau">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {a || 'a'}x + {b || 'b'}</p>
            </header>

            <CopyButton targetRef={paragrafoRef} />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <div className='input-group'>
                        <button type="button" className='toggle-sign' onClick={toggleSignA}>±</button>
                        <input type="number" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                    </div>
                    <div className='input-group'>
                        <button type="button" className='toggle-sign' onClick={toggleSignB}>±</button>
                        <input type="number" id="b" className='valorB' placeholder='b' value={b} onChange={handleChangeB} />
                    </div>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="A raiz da função. f(x) = 0" position="top">
                        <input type="text" id="raiz" className='valorRaiz' placeholder='Raiz' value={raiz} disabled />
                    </Tooltip>
                    <Tooltip text="O coeficiente angular da função. Determina a inclinação da reta." position="top">
                        <input type="text" id="coeficienteAngular" className='valorCoeficienteAngular' placeholder='Coef. Angular' value={"a = " + coeficienteAngular} disabled />
                    </Tooltip>
                    <Tooltip text="O coeficiente linear da função. Determina o ponto de interseção com o eixo Y." position="top">
                        <input type="text" id="coeficienteLinear" className='valorCoeficienteLinear' placeholder='Coef. Linear' value={"b = " + coeficienteLinear} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}
