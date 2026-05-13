import './styles.css';
import '../BotaoCalcular/styles.css';
import { useState } from 'react';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '../Tooltip';

export default function FuncaoExponencial() {
    const paragrafoRef = useRef(null);

    const [a, setA] = useState('');

    const handleChangeA = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        if (/^-?\d*\.?\d*$/.test(value)) {
            setA(value);
        }
    };

    // Texto para copiar em formato LaTeX
    const formulaText = `f(x) = ${a || 'a'}^{x}`;

    const [imagem, setImagem] = useState('');
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
            alert("O valor de 'a' não pode ser 1, pois não geraria uma função exponencial.");
            return;
        }
    
        // Imagem: sempre {y ∈ ℝ | y > 0}
        setImagem("Im = {y ∈ ℝ | y > 0}");
        
        // Raiz: função exponencial não possui raiz real
        setRaiz("Não existe raiz real");
        
        // Intersecção no eixo Y: f(0) = a^0 = 1
        setInterseccaoY("1,00");
        
        // Comportamento: crescente ou decrescente
        if (aNum > 1) {
            setComportamento("Crescente");
        } else if (aNum > 0 && aNum < 1) {
            setComportamento("Decrescente");
        }
    };
    

    return (
        <div className="funcao-exponencial">
            <header>
                <p ref={paragrafoRef} className='formula'>f(x) = {a || 'a'}<sup>x</sup></p>
            </header>
            
            <CopyButton text={formulaText} label='Copiar' />

            <div className="formulario">

                <label className='label'>INSIRA OS VALORES</label>
                <div className='valores'>
                    <Tooltip text="Base da função exponencial. Deve ser positiva e diferente de 1." position="top">
                        <input type="text" inputMode="decimal" id="a" className='valorA' placeholder='a' value={a} onChange={handleChangeA} />
                    </Tooltip>
                </div>

                <label className='label'>RESULTADOS</label>
                <div className='resultados'>
                    <Tooltip text="Conjunto de todos os valores que a função pode assumir. Para funções exponenciais, sempre maiores que zero." position="top">
                        <input type="text" id="imagem" className='valorImagem' placeholder='Imagem' value={imagem} disabled />
                    </Tooltip>
                    <Tooltip text="Função exponencial nunca cruza o eixo X, portanto não possui raiz real. O gráfico se aproxima assintoticamente do eixo X, mas nunca o toca." position="top">
                        <input type="text" id="raiz" className='valorRaiz' placeholder='Raiz' value={raiz} disabled />
                    </Tooltip>
                    <Tooltip text="Ponto onde a função cruza o eixo Y. Para qualquer base a, temos f(0) = a^0 = 1." position="top">
                        <input type="text" id="interseccaoY" className='valorInterseccaoY' placeholder='Intersecção Y' value={`f(0) = ${interseccaoY}`} disabled />
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