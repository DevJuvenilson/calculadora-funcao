import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoModular() {
    const paragrafoRef = useRef(null);

    const [a, setA] = useState('');
    const [b, setB] = useState('');

    const handleChangeA = (event) => {
        setA(event.target.value);
    };

    const handleChangeB = (event) => {
        setB(event.target.value);
    };

    // Texto para copiar em formato LaTeX
    const formulaText = `f(x)=\\left|${a || 'a'}x+${b || 'b'}\\right|`;

    const [vertice, setVertice] = useState('');
    const [raiz, setRaiz] = useState('');
    const [interseccaoY, setInterseccaoY] = useState('');
    const [imagem, setImagem] = useState('');

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
    
        // Vértice/ponto de dobra: x = -b/a
        const verticeCoordenada = -bNum / aNum;
        setVertice(verticeCoordenada.toFixed(2).split('.').join(','));
        
        // Raiz: |ax + b| = 0 => ax + b = 0 => x = -b/a
        setRaiz(`S = { ${verticeCoordenada.toFixed(2).split('.').join(',')} }`);
        
        // Intersecção no eixo Y: f(0) = |a*0 + b| = |b|
        const interseccaoYValue = Math.abs(bNum);
        setInterseccaoY(interseccaoYValue.toFixed(2).split('.').join(','));
        
        // Imagem: sempre {y ∈ ℝ | y ≥ 0}
        setImagem("Im = {y ∈ ℝ | y ≥ 0}");
    };
    

    return (
        <div className="funcao-modular">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = |{a || 'a'}x + {b || 'b'}|</p>
            </header>
            
            <CopyButton text={formulaText} label='Copiar' />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Coeficiente angular. Determina a inclinação da reta dentro do módulo. Não pode ser zero." position="top">
                        <input type="number" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                    </Tooltip>
                    <Tooltip text="Coeficiente linear. Afeta a posição do vértice da função modular." position="top">
                        <input type="number" id="b" className='valorB' placeholder='b' value={b} onChange={handleChangeB} />
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="Ponto de dobra ou vértice da função modular. Onde a função muda de direção." position="top">
                        <input type="text" id="vertice" className='valorVertice' placeholder='Vértice' value={`x = ${vertice}`} disabled />
                    </Tooltip>
                    <Tooltip text="Ponto onde a função modular toca o eixo X. Onde |ax + b| = 0." position="top">
                        <input type="text" id="raiz" className='valorRaiz' placeholder='Raiz' value={raiz} disabled />
                    </Tooltip>
                    <Tooltip text="Ponto onde a função cruza o eixo Y. Calculado como f(0) = |b|." position="top">
                        <input type="text" id="interseccaoY" className='valorInterseccaoY' placeholder='Intersecção Y' value={`Y(0) = ${interseccaoY}`} disabled />
                    </Tooltip>
                    <Tooltip text="Conjunto de todos os valores que a função pode assumir. Para funções modulares, sempre maiores ou iguais a zero." position="top">
                        <input type="text" id="imagem" className='valorImagem' placeholder='Imagem' value={imagem} disabled />
                    </Tooltip>
                </div>
                <button type="button" onClick={handleCalcular}>CALCULAR</button>
            </div>
        </div>
    );
}