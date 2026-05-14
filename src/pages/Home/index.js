import './styles.css';
import '../../styles/darkTheme.css';
import FormulaRender from '../../services/FormulaRender';
import { useState } from 'react';
import DesmosGraph from '../../components/DesmosGraph/DesmosGraph';
import ThemeToggle from '../../components/ThemeToggle';

function App() {

    const [formula, setFormula] = useState('funcaoPrimeiroGrau');
    const handleFormulaChange = (event) => {
        setFormula(event.target.value);
    };

    return (
        <div className="App">
            <ThemeToggle />
            <div className='background'>
                <div className="container">
                    <div className="conteudo-esquerdo">
                        <header>
                            <h1>CALCULADORA</h1>
                        </header>

                        <label htmlFor="formulas">ESCOLHA A FÓRMULA</label>
                        <select name="formulas" id="formulas" onChange={handleFormulaChange}>
                            <option value="funcaoPrimeiroGrau">Função Afim</option>
                            <option value="funcaoSegundoGrau">Função Quadrática</option>
                            <option value="funcaoBiquadratica">Função Biquadrática</option>
                            <option value="funcaoPolinomial">Função Polinomial</option>
                            <option value="funcaoExponencial">Função Exponencial</option>
                            <option value="funcaoLogaritmica">Função Logarítmica</option>
                            <option value="funcaoModular">Função Modular</option>
                            <option value="funcaoConstante">Função Constante</option>
                            <option value="funcaoSenoidal">Função Senoidal</option>
                            <option value="funcaoCossenoidal">Função Cossenoidal</option>
                            <option value="funcaoTangente">Função Tangente</option>
                        </select>

                        <FormulaRender formula={formula} />
                    </div>

                    <div className="conteudo-direito">
                        <DesmosGraph />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;