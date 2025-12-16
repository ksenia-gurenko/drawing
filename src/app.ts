import { Controls } from '@/components/Controls';
import { Canvas } from '@/components/Canvas';
import type { IColorOption } from '@/types/interfaces';

// Конфигурация цветов
const BG_COLORS: IColorOption[] = [
  { name: 'Пастельно-голубой', value: '#a7d2cb' },
  { name: 'Пастельно-розовый', value: '#f2d7d5' },
  { name: 'Пастельно-зеленый', value: '#d1e8d2' },
];

const BRUSH_COLORS: IColorOption[] = [
  { name: 'Пастельно-синий', value: '#6c8b9f' },
  { name: 'Пастельно-красный', value: '#c97d7d' },
  { name: 'Пастельно-фиолетовый', value: '#9a7aa0' },
];

class DrawingApp {
  private canvas: Canvas | null = null;
  private controls: Controls | null = null; // Добавляем обратно, но исправляем использование

  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    // Получаем контейнеры
    const controlsContainer = document.getElementById('controlsContainer');
    const canvasContainer = document.getElementById('canvasContainer');

    if (!controlsContainer || !canvasContainer) {
      console.error('Не удалось найти необходимые элементы DOM');
      return;
    }

    // Инициализируем компоненты
    this.canvas = new Canvas(canvasContainer);

    this.controls = new Controls(
      controlsContainer,
      BG_COLORS,
      BRUSH_COLORS,
      BG_COLORS[0].value,
      BRUSH_COLORS[0].value,
      this.handleColorChange.bind(this)
    );

    // Устанавливаем начальные цвета
    this.canvas.setBackgroundColor(BG_COLORS[0].value);
    this.canvas.setBrushColor(BRUSH_COLORS[0].value);
  }

  private handleColorChange(type: 'background' | 'brush', color: string): void {
    if (!this.canvas) return;

    if (type === 'background') {
      this.canvas.setBackgroundColor(color);
    } else {
      this.canvas.setBrushColor(color);
    }
  }

  // Метод для получения контролов (если понадобится)
  public getControls(): Controls | null {
    return this.controls;
  }
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  new DrawingApp();
});