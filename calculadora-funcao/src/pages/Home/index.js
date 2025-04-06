import './styles.css';
import FormulaRender from '../../services/FormulaRender';
import { useState } from 'react';

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

                        <label htmlFor="formulas">Escolha a fórmula:</label>
                        <select name="formulas" id="formulas" onChange={handleFormulaChange}>
                            <option value="funcaoSegundoGrau">Função do segundo grau</option>
                            <option value="funcaoPrimeiroGrau">Função do primeiro grau</option>
                            <option value="cicloTrigonometrico">Ciclo trigonométrico</option>
                        </select>

                        <FormulaRender formula={formula} />
                    </div>

                    <div className="conteudo-direito">
                        <header>
                            <h1>GRÁFICO</h1>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;