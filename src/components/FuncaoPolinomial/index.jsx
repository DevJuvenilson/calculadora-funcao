import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';
import SignToggleButton from '../SignToggleButton';

export default function FuncaoPolinomial() {
    const paragrafoRef = useRef(null);

    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [d, setD] = useState('');
    const [e, setE] = useState('');
    const [f, setF] = useState('');

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

    const handleChangeD = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setD(value);
        }
    };

    const handleChangeE = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setE(value);
        }
    };

    const handleChangeF = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setF(value);
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

    const toggleSignD = () => {
        if (d !== '') {
            setD(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`);
        }
    };

    const toggleSignE = () => {
        if (e !== '') {
            setE(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`);
        }
    };

    const toggleSignF = () => {
        if (f !== '') {
            setF(prev => prev.startsWith('-') ? prev.slice(1) : `-${prev}`);
        }
    };

    // Texto para copiar em formato LaTeX
    const formulaText = `f(x) = ${a || 'a'}x^{5} + ${b || 'b'}x^{4} + ${c || 'c'}x^{3} + ${d || 'd'}x^{2} + ${e || 'e'}x + ${f || 'f'}`;

    const [raizes, setRaizes] = useState('');
    const [interseccaoY, setInterseccaoY] = useState('');
    const [extremos, setExtremos] = useState('');

    // Função auxiliar para avaliar o polinômio
    const avaliarPolinomio = (x, aNum, bNum, cNum, dNum, eNum, fNum) => {
        return aNum * Math.pow(x, 5) + bNum * Math.pow(x, 4) + cNum * Math.pow(x, 3) + dNum * Math.pow(x, 2) + eNum * x + fNum;
    };

    // Função auxiliar para avaliar a derivada (para encontrar extremos)
    const avaliarDerivada = (x, aNum, bNum, cNum, dNum, eNum) => {
        return 5 * aNum * Math.pow(x, 4) + 4 * bNum * Math.pow(x, 3) + 3 * cNum * Math.pow(x, 2) + 2 * dNum * x + eNum;
    };

    // Método de Newton-Raphson para encontrar raízes
    const encontrarRaizNewtonRaphson = (xInicial, aNum, bNum, cNum, dNum, eNum, fNum) => {
        let x = xInicial;
        const h = 0.0001;
        for (let i = 0; i < 100; i++) {
            const fx = avaliarPolinomio(x, aNum, bNum, cNum, dNum, eNum, fNum);
            const fpx = (avaliarPolinomio(x + h, aNum, bNum, cNum, dNum, eNum, fNum) - fx) / h;
            if (Math.abs(fpx) < 1e-10) break;
            const xNovo = x - fx / fpx;
            if (Math.abs(xNovo - x) < 1e-6) {
                return x;
            }
            x = xNovo;
        }
        return x;
    };

    const handleCalcular = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const cNum = parseFloat(c);
        const dNum = parseFloat(d);
        const eNum = parseFloat(e);
        const fNum = parseFloat(f);

        if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || isNaN(dNum) || isNaN(eNum) || isNaN(fNum)) {
            alert("Por favor, insira todos os valores corretamente.");
            return;
        }

        // Calcular raízes
        const raizesEncontradas = [];
        const tentativas = [];
        for (let i = -10; i <= 10; i++) {
            tentativas.push(i);
        }

        for (let tentativa of tentativas) {
            const raiz = encontrarRaizNewtonRaphson(tentativa, aNum, bNum, cNum, dNum, eNum, fNum);
            const valor = avaliarPolinomio(raiz, aNum, bNum, cNum, dNum, eNum, fNum);
            
            if (Math.abs(valor) < 0.01) {
                // Verificar se a raiz já foi encontrada
                let jaExiste = false;
                for (let r of raizesEncontradas) {
                    if (Math.abs(r - raiz) < 0.1) {
                        jaExiste = true;
                        break;
                    }
                }
                if (!jaExiste) {
                    raizesEncontradas.push(raiz);
                }
            }
        }

        // Formatar raízes
        let raizesTexto = '';
        if (raizesEncontradas.length === 0) {
            raizesTexto = 'S = { }';
        } else {
            raizesTexto = 'S = {' + raizesEncontradas.map(r => r.toFixed(2).replace('.', ',')).join('; ') + '}';
        }
        setRaizes(raizesTexto);

        // Calcular intersecção com eixo Y (f(0))
        setInterseccaoY(`f(0) = ${fNum.toFixed(2).replace('.', ',')}`);

        // Encontrar extremos locais (raízes da derivada)
        const extremosEncontrados = [];
        for (let i = -10; i <= 10; i++) {
            const extremo = encontrarRaizNewtonRaphson(i, 5 * aNum, 4 * bNum, 3 * cNum, 2 * dNum, eNum, 0);
            const valorDerivada = avaliarDerivada(extremo, aNum, bNum, cNum, dNum, eNum);
            
            if (Math.abs(valorDerivada) < 0.01) {
                let jaExiste = false;
                for (let ex of extremosEncontrados) {
                    if (Math.abs(ex - extremo) < 0.1) {
                        jaExiste = true;
                        break;
                    }
                }
                if (!jaExiste) {
                    extremosEncontrados.push(extremo);
                }
            }
        }

        setExtremos(`${extremosEncontrados.length} ponto(s) de extremo local`);
    };

    return (
        <div className="funcao-polinomial">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {a || 'a'}x⁵ + {b || 'b'}x⁴ + {c || 'c'}x³ + {d || 'd'}x² + {e || 'e'}x + {f || 'f'}</p>
            </header>

            <CopyButton text={formulaText} label='Copiar' />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Coeficiente de x⁵. Determina o comportamento geral da função. Não pode ser zero." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignA} disabled={a === ''} />
                            <input type="text" inputMode="decimal" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Coeficiente de x⁴. Afeta a forma da curva." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignB} disabled={b === ''} />
                            <input type="text" inputMode="decimal" id="b" className='valorB' placeholder='b' value={b} onChange={handleChangeB} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Coeficiente de x³. Afeta a forma da curva." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignC} disabled={c === ''} />
                            <input type="text" inputMode="decimal" id="c" className='valorC' placeholder='c' value={c} onChange={handleChangeC} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Coeficiente de x². Afeta a forma da curva." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignD} disabled={d === ''} />
                            <input type="text" inputMode="decimal" id="d" className='valorD' placeholder='d' value={d} onChange={handleChangeD} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Coeficiente de x. Afeta a inclinação da curva." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignE} disabled={e === ''} />
                            <input type="text" inputMode="decimal" id="e" className='valorE' placeholder='e' value={e} onChange={handleChangeE} />
                        </div>
                    </Tooltip>
                    <Tooltip text="Termo independente. Determina onde a curva cruza o eixo Y." position="top">
                        <div className='input-group'>
                            <SignToggleButton onClick={toggleSignF} disabled={f === ''} />
                            <input type="text" inputMode="decimal" id="f" className='valorF' placeholder='f' value={f} onChange={handleChangeF} />
                        </div>
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="Conjunto solução da função. Raízes reais encontradas." position="top">
                        <input type="text" id="raizes" className='valorRaizes' placeholder='S = { }' value={raizes} disabled />
                    </Tooltip>
                    <Tooltip text="Ponto onde a função cruza o eixo Y, quando x = 0." position="top">
                        <input type="text" id="interseccaoY" className='valorInterseccaoY' placeholder='f(0) = Y' value={interseccaoY} disabled />
                    </Tooltip>
                    <Tooltip text="Quantidade de máximos e mínimos locais (pontos críticos). Um polinômio de grau 5 pode ter até 4." position="top">
                        <input type="text" id="extremos" className='valorExtremos' placeholder='Extremos' value={extremos} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}
