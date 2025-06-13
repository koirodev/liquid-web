export class LiquidWebError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'LiquidWebError';
    this.originalError = originalError;
  }
}
