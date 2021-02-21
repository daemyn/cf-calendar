export class UnavailableSlotError extends Error {
  constructor() {
    super('Slot is not available');
  }
}
