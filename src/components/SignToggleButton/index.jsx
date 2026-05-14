export default function SignToggleButton({ onClick, disabled = false }) {
    return (
        <button 
            type="button" 
            className='sign-toggle-button' 
            onClick={onClick}
            disabled={disabled}
            title="Alternar sinal (positivo/negativo)"
            aria-label="Alternar sinal"
        >
            ±
        </button>
    );
}