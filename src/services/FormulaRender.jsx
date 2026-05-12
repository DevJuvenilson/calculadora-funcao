import FuncaoSegundoGrau from "../components/FuncaoSegundoGrau/index.jsx"; 
import FuncaoPrimeiroGrau from "../components/FuncaoPrimeiroGrau/index.jsx"; 
import FuncaoSenoidal from "../components/FuncaoSenoidal/index.jsx"; 
import FuncaoCossenoidal from "../components/FuncaoCossenoidal/index.jsx"; 
import FuncaoTangente from "../components/FuncaoTangente/index.jsx"; 
import FuncaoBiquadratica from "../components/FuncaoBiquadratica/index.jsx"; 

const formulasMap = {
    funcaoPrimeiroGrau: <FuncaoPrimeiroGrau />,
    funcaoSegundoGrau: <FuncaoSegundoGrau />,
    funcaoBiquadratica: <FuncaoBiquadratica />,
    // funcaoExponencial: <FuncaoExponencial />,
    // funcaoLogaritmica: <FuncaoLogaritmica />,
    // funcaoModular: <FuncaoModular />,
    // funcaoConstante: <FuncaoConstante />,
    funcaoSenoidal: <FuncaoSenoidal />,
    funcaoCossenoidal: <FuncaoCossenoidal />,
    funcaoTangente: <FuncaoTangente />,
    // funcaoLogaritmica: <FuncaoLogaritmica />,
};

export default function FormulaRender({ formula }) {
    return formulasMap[formula] || null;
}