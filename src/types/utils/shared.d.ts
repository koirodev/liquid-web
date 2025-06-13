export interface Vec2 {
  x: number;
  y: number;
}

export interface ShaderOptions {
  width: number;
  height: number;
  fragment: (uv: Vec2, mouse?: Vec2) => Vec2;
  mousePosition?: Vec2;
}

export type FragmentShaderType = keyof typeof fragmentShaders;

export function smoothStep(a: number, b: number, t: number): number;

export const fragmentShaders: {
  liquidGlass: (uv: Vec2) => Vec2;
};

export class ShaderDisplacementGenerator {
  constructor(options: ShaderOptions);
  updateShader(mousePosition?: Vec2): string;
  destroy(): void;
  getScale(): number;
}
