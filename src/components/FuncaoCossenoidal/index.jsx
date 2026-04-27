import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoCossenoidal() {
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

    const [imagem, setImagem] = useState('');
    const [periodo, setPeriodo] = useState('');

    const handleCalcular = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const cNum = parseFloat(c);
    
        if (cNum === 0) {
            alert("O coeficiente 'c' não pode ser zero.");
            return;
        }

        if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
            alert("Por favor, insira todos os valores corretamente.");
            return;
        }
    
        // Cálculo da imagem: [a - |b|, a + |b|]
        const imagemMin = aNum - Math.abs(bNum);
        const imagemMax = aNum + Math.abs(bNum);
        
        // Cálculo do período: 2π / |c|
        const periodoCalc = (2 * Math.PI) / Math.abs(cNum);
    
        setImagem(`[${imagemMin.toFixed(2).split('.').join(',')}; ${imagemMax.toFixed(2).split('.').join(',')}]`);
        setPeriodo(`${periodoCalc.toFixed(2).split('.').join(',')}`);
    };

    return (
        <div className="funcao-cossenoidal">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {a || 'a'} + {b || 'b'}  cos({c || 'c'}  x)</p>
            </header>
            
            <CopyButton targetRef={paragrafoRef} />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Deslocamento vertical. Define o centro da oscilação." position="top">
                        <input type="number" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                    </Tooltip>
                    <Tooltip text="Amplitude. Define a altura da onda. Quanto maior, mais intensa a oscilação." position="top">
                        <input type="number" id="b" className='valorB' placeholder='b' value={b} onChange={handleChangeB} />
                    </Tooltip>
                    <Tooltip text="Frequência angular. Afeta a velocidade da oscilação. Não pode ser zero." position="top">
                        <input type="number" id="c" className='valorC' placeholder='c' value={c} onChange={handleChangeC} />
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="Intervalo de valores que a função pode assumir." position="top">
                        <input type="text" id="imagem" className='valorImagem' placeholder='Im = [ ]' value={"Im = " + imagem} disabled />
                    </Tooltip>
                    <Tooltip text="Comprimento do intervalo no qual a função se repete." position="top">
                        <input type="text" id="periodo" className='valorPeriodo' placeholder='T' value={"T = " + periodo} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}
