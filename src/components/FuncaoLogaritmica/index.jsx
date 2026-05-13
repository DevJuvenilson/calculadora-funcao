import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoLogaritmica() {
    const paragrafoRef = useRef(null);

    const [a, setA] = useState('');

    const handleChangeA = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setA(value);
        }
    };

    const toggleSignA = () => {
        if (a !== '') {
            setA(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`);
        }
    };

    // Texto para copiar em formato LaTeX
    const formulaText = `f(x) = \\log_{${a || 'a'}}(x)`;

    const [dominio, setDominio] = useState('');
    const [raiz, setRaiz] = useState('');
    const [interseccaoY, setInterseccaoY] = useState('');
    const [comportamento, setComportamento] = useState('');

    const handleCalcular = () => {
        const aNum = parseFloat(a);

        if (isNaN(aNum)) {
            alert("Por favor, insira o valor de 'a' corretamente.");
            return;
        }

        if (aNum <= 0) {
            alert("O valor de 'a' deve ser positivo e diferente de zero.");
            return;
        }

        if (aNum === 1) {
            alert("O valor de 'a' não pode ser 1, pois não geraria uma função logarítmica.");
            return;
        }

        // Domínio: sempre {x ∈ ℝ | x > 0}
        setDominio("D = {x ∈ ℝ | x > 0}");

        // Raiz: x = 1 (porque log_a(1) = 0)
        setRaiz("x = 1");

        // Intersecção no eixo Y: não existe (domínio não inclui x = 0)
        setInterseccaoY("Não existe");

        // Comportamento: crescente ou decrescente
        if (aNum > 1) {
            setComportamento("Crescente");
        } else if (aNum > 0 && aNum < 1) {
            setComportamento("Decrescente");
        }
    };


    return (
        <div className="funcao-logaritmica">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = log<sub>{a || 'a'}</sub>(x)</p>
            </header>

            <CopyButton text={formulaText} label='Copiar' />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Base do logaritmo. Deve ser positiva e diferente de 1." position="top">
                        <div className='input-group'>
                            <button type="button" className='toggle-sign' onClick={toggleSignA}>±</button>
                            <input type="text" inputMode="decimal" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                        </div>
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="Conjunto de todos os valores de x para os quais a função é definida. Logaritmo é definido apenas para números positivos." position="top">
                        <input type="text" id="dominio" className='valorDominio' placeholder='Domínio' value={dominio} disabled />
                    </Tooltip>
                    <Tooltip text="Valor de x onde a função cruza o eixo X. Para logaritmo, log_a(1) = 0 para qualquer base a." position="top">
                        <input type="text" id="raiz" className='valorRaiz' placeholder='Raiz' value={raiz} disabled />
                    </Tooltip>
                    <Tooltip text="A função logarítmica não intersecta o eixo Y, porque seu domínio não inclui x = 0. O gráfico se aproxima assintoticamente do eixo Y, mas nunca o toca." position="top">
                        <input type="text" id="interseccaoY" className='valorInterseccaoY' placeholder='Intersecção Y' value={`Y(0) = ${interseccaoY}`} disabled />
                    </Tooltip>
                    <Tooltip text="Se a > 1, a função é crescente. Se 0 < a < 1, a função é decrescente." position="top">
                        <input type="text" id="comportamento" className='valorComportamento' placeholder='Comportamento' value={comportamento} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}