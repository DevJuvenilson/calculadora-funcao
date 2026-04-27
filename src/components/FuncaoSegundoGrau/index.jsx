import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoSegundoGrau() {
    const paragrafoRef = useRef(null);

    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');

    const handleChangeA = (event) => {
        setA(event.target.value);
    };

    const handleChangeB = (event) => {
        setB(event.target.value);
    };

    const handleChangeC = (event) => {
        setC(event.target.value);
    };

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
            setSolucao(`S = {${x1.toFixed(2)} ; ${x2.toFixed(2)}}`);
        }
    
        setXVertice(xv.toFixed(2));
        setYVertice(yv.toFixed(2));
    };
    

    return (
        <div className="funcao-segundo-grau">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {a || 'a'}x² + {b || 'b'}x + {c || 'c'}</p>
            </header>
            
            <CopyButton targetRef={paragrafoRef} />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Coeficiente angular. Determina a abertura da parábola. Não pode ser zero." position="top">
                        <input type="number" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                    </Tooltip>
                    <Tooltip text="Coeficiente linear. Afeta a posição horizontal da parábola." position="top">
                        <input type="number" id="b" className='valorB' placeholder='b' value={b} onChange={handleChangeB} />
                    </Tooltip>
                    <Tooltip text="Termo independente. Determina onde a parábola cruza o eixo Y." position="top">
                        <input type="number" id="c" className='valorC' placeholder='c' value={c} onChange={handleChangeC} />
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