// Интерфейс для цвета
export interface IColorOption {
    name: string;
    value: string;
}

// Интерфейс для событий изменения цвета
export interface IColorChangeEvent {
    type: 'background' | 'brush';
    color: string;
}

// Интерфейс для настроек рисования
export interface IDrawingSettings {
    backgroundColor: string;
    brushColor: string;
    brushSize: number;
}

// Интерфейс для координат
export interface IPoint {
    x: number;
    y: number;
}