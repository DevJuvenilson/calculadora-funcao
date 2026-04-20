import FuncaoSegundoGrau from "../components/FuncaoSegundoGrau/index.jsx"; 
import FuncaoPrimeiroGrau from "../components/FuncaoPrimeiroGrau/index.jsx"; 

const formulasMap = {
    funcaoSegundoGrau: <FuncaoSegundoGrau />,
    funcaoPrimeiroGrau: <FuncaoPrimeiroGrau />,
    // cicloTrigonometrico: <CicloTrigonometrico />,
};

export default function FormulaRender({ formula }) {
    return formulasMap[formula] || null;
}