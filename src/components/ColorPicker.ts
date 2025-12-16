import { IColorOption } from '@/types/interfaces';
import { generateId } from '@/utils/helpers';

export class ColorPicker {
  private container: HTMLElement;
  private colors: IColorOption[];
  private selectedColor: string;
  private onChangeCallback: (color: string) => void;
  private id: string; // Оставляем, так как она может пригодиться для будущих расширений

  constructor(
    container: HTMLElement,
    colors: IColorOption[],
    initialColor: string,
    onChange: (color: string) => void
  ) {
    this.container = container;
    this.colors = colors;
    this.selectedColor = initialColor;
    this.onChangeCallback = onChange;
    this.id = generateId(); // Генерируем ID, даже если сейчас не используем

    this.render();
  }

  private render(): void {
    // Очищаем контейнер
    this.container.innerHTML = '';

    // Создаем заголовок
    const title = document.createElement('h2');
    title.className = 'control-title';
    title.textContent = this.container.dataset.title || 'Выбор цвета';

    // Создаем контейнер для цветов
    const colorContainer = document.createElement('div');
    colorContainer.className = 'color-options';

    // Добавляем элементы цветов
    this.colors.forEach((color) => {
      const colorElement = this.createColorElement(color);
      colorContainer.appendChild(colorElement);
    });

    // Добавляем элементы в контейнер
    this.container.appendChild(title);
    this.container.appendChild(colorContainer);
  }

  private createColorElement(color: IColorOption): HTMLElement {
    const colorElement = document.createElement('div');
    colorElement.className = 'color-option';

    if (color.value === this.selectedColor) {
      colorElement.classList.add('active');
    }

    colorElement.style.backgroundColor = color.value;
    colorElement.textContent = color.name;
    colorElement.setAttribute('data-color', color.value);

    // Добавляем обработчик клика
    colorElement.addEventListener('click', () => {
      this.selectColor(color.value);
    });

    return colorElement;
  }

  public selectColor(color: string): void {
    this.selectedColor = color;

    // Обновляем активный цвет
    const colorElements = this.container.querySelectorAll('.color-option');
    colorElements.forEach((el) => {
      // Используем getAttribute вместо dataset для совместимости
      const elColor = el.getAttribute('data-color');
      if (elColor === color) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Вызываем колбэк
    this.onChangeCallback(color);
  }

  public getSelectedColor(): string {
    return this.selectedColor;
  }

  public updateColors(newColors: IColorOption[]): void {
    this.colors = newColors;
    this.render();
  }

  // Метод для получения ID (чтобы использовать переменную)
  public getId(): string {
    return this.id;
  }
}