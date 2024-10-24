export class AxcySetup {
  position: string;
  width: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  transform?: string;
  opacity?: string;
  zIndex?: string;

  constructor(options: {
    position: string;
    width: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    transform?: string;
    opacity?: string;
    zIndex?: string;
  }) {
    this.position = options.position;
    this.width = options.width;
    this.top = options.top;
    this.left = options.left;
    this.bottom = options.bottom;
    this.right = options.right;
    this.transform = options.transform;
    this.opacity = options.opacity;
    this.zIndex = options.zIndex;
  }
}
