import './styles.css';

export default function FuncaoSegundoGrau() {
    return (
        <div className="funcao-segundo-grau">
            <header>
                <h1>Função do segundo grau</h1>
            </header>
            <div className="formulario">
                <label htmlFor="a">Valor de A:</label>
                <input type="number" id="a" name="a" />
                <label htmlFor="b">Valor de B:</label>
                <input type="number" id="b" name="b" />
                <label htmlFor="c">Valor de C:</label>
                <input type="number" id="c" name="c" />
                <button type="submit">Calcular</button>
            </div>
        </div>
    );
}