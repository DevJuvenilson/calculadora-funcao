import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoConstante() {
    const paragrafoRef = useRef(null);

    const [k, setK] = useState('');

    const handleChangeK = (event) => {
        setK(event.target.value);
    };

    // Texto para copiar em formato LaTeX
    const formulaText = `f(x)=${k || 'k'}`;

    const [raiz, setRaiz] = useState('');
    const [inclinacao, setInclinacao] = useState('');

    const handleCalcular = () => {
        const kNum = parseFloat(k);
    
        if (isNaN(kNum)) {
            alert("Por favor, insira o valor de 'k' corretamente.");
            return;
        }
    
        // Raiz: Se k ≠ 0, "Não existe". Se k = 0, "Infinitas raízes"
        if (kNum === 0) {
            setRaiz("Infinitas raízes");
        } else {
            setRaiz("Não existe");
        }
        
        // Inclinação: sempre 0° para função constante
        setInclinacao("0°");
    };
    

    return (
        <div className="funcao-constante">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {k || 'k'}</p>
            </header>
            
            <CopyButton text={formulaText} label='Copiar' />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Constante. Determina o valor fixo da função para qualquer x." position="top">
                        <input type="number" id="k" className='valorK' placeholder='k' value={k} onChange={handleChangeK} />
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="Se k ≠ 0, a função nunca toca o eixo X, portanto não possui raízes. Se k = 0, a função coincide com o eixo X, possuindo infinitas raízes." position="top">
                        <input type="text" id="raiz" className='valorRaiz' placeholder='Raiz' value={raiz} disabled />
                    </Tooltip>
                    <Tooltip text="Ângulo de inclinação da reta. Função constante é sempre horizontal, portanto inclinação é sempre 0°." position="top">
                        <input type="text" id="inclinacao" className='valorInclinacao' placeholder='Inclinação' value={inclinacao} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}