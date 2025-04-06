import FuncaoSegundoGrau from "../components/FuncaoSegundoGrau/index.jsx";

export default function FormulaRender(formula) {

    console.log(formula);
    if (formula === 'funcaoSegundoGrau') {
        return <FuncaoSegundoGrau />;
    }
}