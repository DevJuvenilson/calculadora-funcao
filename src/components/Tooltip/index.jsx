import { useState } from 'react';
import './styles.css';

export default function Tooltip({ children, text, position = 'top' }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div 
            className="tooltip-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && (
                <div className={`tooltip tooltip-${position}`}>
                    {text}
                </div>
            )}
        </div>
    );
}
