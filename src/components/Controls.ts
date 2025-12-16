import { ColorPicker } from './ColorPicker.js';
import { IColorOption } from '../types/interfaces.js';

export class Controls {
    private container: HTMLElement;
    private bgColors: IColorOption[];
    private brushColors: IColorOption[];
    private currentBgColor: string;
    private currentBrushColor: string;
    private onColorChangeCallback: (type: 'background' | 'brush', color: string) => void;
    
    private bgColorPicker: ColorPicker | null = null;
    private brushColorPicker: ColorPicker | null = null;
    private currentColorsContainer: HTMLElement | null = null;

    constructor(
        container: HTMLElement,
        bgColors: IColorOption[],
        brushColors: IColorOption[],
        initialBgColor: string,
        initialBrushColor: string,
        onColorChange: (type: 'background' | 'brush', color: string) => void
    ) {
        this.container = container;
        this.bgColors = bgColors;
        this.brushColors = brushColors;
        this.currentBgColor = initialBgColor;
        this.currentBrushColor = initialBrushColor;
        this.onColorChangeCallback = onColorChange;
        
        this.render();
    }

    private render(): void {
        // Очищаем контейнер
        this.container.innerHTML = '';
        
        // Создаем секцию для выбора цвета фона
        const bgSection = document.createElement('div');
        bgSection.className = 'control-section';
        bgSection.dataset.title = 'Цвет фона';
        
        // Создаем секцию для выбора цвета кисти
        const brushSection = document.createElement('div');
        brushSection.className = 'control-section';
        brushSection.dataset.title = 'Цвет кисти';
        
        // Инициализируем компоненты выбора цвета
        this.bgColorPicker = new ColorPicker(
            bgSection,
            this.bgColors,
            this.currentBgColor,
            (color) => {
                this.currentBgColor = color;
                this.updateCurrentColorsDisplay();
                this.onColorChangeCallback('background', color);
            }
        );
        
        this.brushColorPicker = new ColorPicker(
            brushSection,
            this.brushColors,
            this.currentBrushColor,
            (color) => {
                this.currentBrushColor = color;
                this.updateCurrentColorsDisplay();
                this.onColorChangeCallback('brush', color);
            }
        );
        
        // Создаем отображение текущих цветов
        this.createCurrentColorsDisplay();
        
        // Добавляем все в контейнер
        this.container.appendChild(bgSection);
        this.container.appendChild(brushSection);
        
        if (this.currentColorsContainer) {
            this.container.appendChild(this.currentColorsContainer);
        }
    }

    private createCurrentColorsDisplay(): void {
        this.currentColorsContainer = document.createElement('div');
        this.currentColorsContainer.className = 'current-colors';
        
        // Отображение цвета фона
        const bgDisplay = document.createElement('div');
        bgDisplay.className = 'color-display';
        
        const bgLabel = document.createElement('div');
        bgLabel.className = 'color-label';
        bgLabel.textContent = 'Фон:';
        
        const bgPreview = document.createElement('div');
        bgPreview.className = 'color-preview';
        bgPreview.id = 'currentBgColor';
        bgPreview.style.backgroundColor = this.currentBgColor;
        
        bgDisplay.appendChild(bgLabel);
        bgDisplay.appendChild(bgPreview);
        
        // Отображение цвета кисти
        const brushDisplay = document.createElement('div');
        brushDisplay.className = 'color-display';
        
        const brushLabel = document.createElement('div');
        brushLabel.className = 'color-label';
        brushLabel.textContent = 'Кисть:';
        
        const brushPreview = document.createElement('div');
        brushPreview.className = 'color-preview';
        brushPreview.id = 'currentBrushColor';
        brushPreview.style.backgroundColor = this.currentBrushColor;
        
        brushDisplay.appendChild(brushLabel);
        brushDisplay.appendChild(brushPreview);
        
        // Добавляем оба отображения в контейнер
        this.currentColorsContainer.appendChild(bgDisplay);
        this.currentColorsContainer.appendChild(brushDisplay);
    }

    private updateCurrentColorsDisplay(): void {
        const bgPreview = document.getElementById('currentBgColor');
        const brushPreview = document.getElementById('currentBrushColor');
        
        if (bgPreview) {
            bgPreview.style.backgroundColor = this.currentBgColor;
        }
        
        if (brushPreview) {
            brushPreview.style.backgroundColor = this.currentBrushColor;
        }
    }

    public setBackgroundColor(color: string): void {
        this.currentBgColor = color;
        if (this.bgColorPicker) {
            this.bgColorPicker.selectColor(color);
        }
        this.updateCurrentColorsDisplay();
    }

    public setBrushColor(color: string): void {
        this.currentBrushColor = color;
        if (this.brushColorPicker) {
            this.brushColorPicker.selectColor(color);
        }
        this.updateCurrentColorsDisplay();
    }

    public updateColors(
        bgColors: IColorOption[],
        brushColors: IColorOption[]
    ): void {
        this.bgColors = bgColors;
        this.brushColors = brushColors;
        
        if (this.bgColorPicker) {
            this.bgColorPicker.updateColors(bgColors);
        }
        
        if (this.brushColorPicker) {
            this.brushColorPicker.updateColors(brushColors);
        }
    }
}