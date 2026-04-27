import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        // Tenta recuperar a preferência salva no localStorage
        const saved = localStorage.getItem('theme');
        if (saved) {
            return saved === 'dark';
        }
        // Se não houver preferência salva, verifica a preferência do sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Salva a preferência no localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Aplica a classe ao documento para usar CSS variáveis
        if (isDark) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
}
