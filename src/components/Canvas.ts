import { getCursorPosition, isTouchDevice, debounce } from '@/utils/helpers';

export class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private container: HTMLElement;
  private isDrawing = false;
  private lastPoint = { x: 0, y: 0 };
  private brushColor = '#6c8b9f';
  private brushSize = 3;
  private backgroundColor = '#a7d2cb';

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'drawingCanvas';
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Не удалось получить контекст canvas');
    }
    this.ctx = context;

    this.setupCanvas();
    this.setupEventListeners();
    this.render();
  }

  private setupCanvas(): void {
    this.setCanvasSize();
    this.clearCanvas();

    // Обработчик изменения размера окна с дебаунсом
    const handleResize = debounce(() => {
      this.setCanvasSize();
      this.clearCanvas();
    }, 100);

    window.addEventListener('resize', handleResize);
  }

  private render(): void {
    // Создаем заголовок холста
    const header = document.createElement('div');
    header.className = 'canvas-header';

    const title = document.createElement('div');
    title.className = 'canvas-title';
    title.textContent = 'Холст для рисования';

    const tools = document.createElement('div');
    tools.className = 'tools';

    const clearBtn = document.createElement('button');
    clearBtn.className = 'tool-btn clear';
    clearBtn.textContent = 'Очистить холст';
    clearBtn.addEventListener('click', () => this.clearCanvas());

    tools.appendChild(clearBtn);
    header.appendChild(title);
    header.appendChild(tools);

    // Очищаем контейнер и добавляем элементы
    this.container.innerHTML = '';
    this.container.appendChild(header);
    this.container.appendChild(this.canvas);
  }

  private setCanvasSize(): void {
    const containerWidth = this.container.clientWidth;
    this.canvas.width = containerWidth - 30; // Учитываем padding
    this.canvas.height = 500;
  }

  private setupEventListeners(): void {
    // Мышь
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

    // Касания
    if (isTouchDevice()) {
      this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
      this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
      this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
    }
  }

  private startDrawing(e: MouseEvent): void {
    this.isDrawing = true;
    this.lastPoint = getCursorPosition(this.canvas, e);
  }

  private draw(e: MouseEvent): void {
    if (!this.isDrawing) return;

    const currentPoint = getCursorPosition(this.canvas, e);

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(currentPoint.x, currentPoint.y);
    this.ctx.strokeStyle = this.brushColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    this.lastPoint = currentPoint;
  }

  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      this.canvas.dispatchEvent(mouseEvent);
    }
  }

  private stopDrawing(): void {
    this.isDrawing = false;
  }

  public setBrushColor(color: string): void {
    this.brushColor = color;
  }

  public setBackgroundColor(color: string): void {
    this.backgroundColor = color;

    // Сохраняем текущий рисунок
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    // Заливаем холст новым цветом
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Восстанавливаем рисунок
    this.ctx.putImageData(imageData, 0, 0);
  }

  public clearCanvas(): void {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public getCanvasElement(): HTMLCanvasElement {
    return this.canvas;
  }
}