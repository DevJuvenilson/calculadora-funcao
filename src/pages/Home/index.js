import './styles.css';
import FormulaRender from '../../services/FormulaRender';
import { useState } from 'react';
import DesmosGraph from '../../components/DesmosGraph/DesmosGraph';

function App() {

    const [formula, setFormula] = useState('funcaoSegundoGrau');
    const handleFormulaChange = (event) => {
        setFormula(event.target.value);
    };

    return (
        <div className="App">
            <div className='background'>
                <div className="container">
                    <div className="conteudo-esquerdo">
                        <header>
                            <h1>CALCULADORA</h1>
                        </header>

                        <label htmlFor="formulas">ESCOLHA A FÓRMULA</label>
                        <select name="formulas" id="formulas" onChange={handleFormulaChange}>
                            <option value="funcaoSegundoGrau">Função do segundo grau</option>
                            <option value="funcaoPrimeiroGrau">Função do primeiro grau</option>
                            <option value="cicloTrigonometrico">Ciclo trigonométrico</option>
                            <option value="funcaoLogaritmica">Função logarítmica</option>
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