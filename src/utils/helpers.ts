// Вспомогательные функции

// Генерация уникального ID
export const generateId = (): string => {
    return 'id-' + Math.random().toString(36).substr(2, 9);
};

// Проверка поддержки touch событий
export const isTouchDevice = (): boolean => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Получение позиции курсора относительно элемента
export const getCursorPosition = (
    canvas: HTMLCanvasElement, 
    event: MouseEvent | TouchEvent
): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
    } else {
        // Для TouchEvent
        const touch = event.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
    }
    
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
};

// Дебаунс функция для оптимизации производительности
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};