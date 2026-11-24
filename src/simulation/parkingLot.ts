export type EventKind =
  | 'parked'
  | 'queued'
  | 'duplicate'
  | 'exited'
  | 'auto-allocated'
  | 'empty-exit'
  | 'invalid-input'
  | 'display'
  | 'status'
  | 'system';

export interface ConsoleEntry {
  id: number;
  kind: EventKind;
  command?: string;
  lines: string[];
}

export interface LastTransition {
  type: 'idle' | 'parked' | 'queued' | 'duplicate' | 'exited' | 'auto-allocated' | 'empty-exit' | 'invalid';
  plate?: string;
  autoAllocatedPlate?: string;
  slot?: number;
  queuePosition?: number;
  message: string;
}

export interface ParkingLotState {
  capacity: number;
  /** Index 0 is bottom (Slot 1), last element is TOP (Slot N). */
  parked: string[];
  /** Index 0 is FRONT (Position 1), last element is REAR. */
  waiting: string[];
  consoleLog: ConsoleEntry[];
  nextLogId: number;
  lastTransition: LastTransition;
}

export const MIN_CAPACITY = 1;
export const MAX_CAPACITY = 8;

export function normalizePlate(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, '');
}

export function isValidPlate(raw: string): boolean {
  const cleaned = normalizePlate(raw);
  return cleaned.length >= 2 && cleaned.length <= 16 && /^[A-Z0-9-]+$/.test(cleaned);
}

export function createParkingLot(capacity: number): ParkingLotState {
  const safeCap = Math.max(MIN_CAPACITY, Math.min(MAX_CAPACITY, Math.floor(capacity || 3)));
  return {
    capacity: safeCap,
    parked: [],
    waiting: [],
    consoleLog: [
      {
        id: 1,
        kind: 'system',
        lines: [
          '===== SMART PARKING LOT MANAGEMENT SYSTEM =====',
          `Parking capacity initialized to ${safeCap}.`,
        ],
      },
    ],
    nextLogId: 2,
    lastTransition: {
      type: 'idle',
      message: `Lot ready with capacity ${safeCap}. Enter a vehicle plate to begin.`,
    },
  };
}

export function isParked(state: ParkingLotState, plate: string): boolean {
  return state.parked.includes(plate);
}

export function isWaiting(state: ParkingLotState, plate: string): boolean {
  return state.waiting.includes(plate);
}

export function isFull(state: ParkingLotState): boolean {
  return state.parked.length >= state.capacity;
}

export function getFreeSlots(state: ParkingLotState): number {
  return Math.max(0, state.capacity - state.parked.length);
}

export function vehicleEntry(state: ParkingLotState, rawPlate: string): ParkingLotState {
  const plate = normalizePlate(rawPlate);

  if (!isValidPlate(plate)) {
    const message = 'Invalid vehicle number. Enter 2–16 letters or digits (e.g. MH12AB1234).';
    return {
      ...state,
      consoleLog: [
        ...state.consoleLog,
        {
          id: state.nextLogId,
          kind: 'invalid-input',
          command: `1. Vehicle Entry -> "${rawPlate.trim()}"`,
          lines: [message],
        },
      ],
      nextLogId: state.nextLogId + 1,
      lastTransition: {
        type: 'invalid',
        message,
      },
    };
  }

  if (isParked(state, plate) || isWaiting(state, plate)) {
    const message = `Vehicle ${plate} is already in the system.`;
    return {
      ...state,
      consoleLog: [
        ...state.consoleLog,
        {
          id: state.nextLogId,
          kind: 'duplicate',
          command: `1. Vehicle Entry -> ${plate}`,
          lines: [message],
        },
      ],
      nextLogId: state.nextLogId + 1,
      lastTransition: {
        type: 'duplicate',
        plate,
        message,
      },
    };
  }

  if (!isFull(state)) {
    const nextParked = [...state.parked, plate];
    const slot = nextParked.length;
    const message = `Vehicle ${plate} parked at slot ${slot}.`;
    return {
      ...state,
      parked: nextParked,
      consoleLog: [
        ...state.consoleLog,
        {
          id: state.nextLogId,
          kind: 'parked',
          command: `1. Vehicle Entry -> ${plate}`,
          lines: [message],
        },
      ],
      nextLogId: state.nextLogId + 1,
      lastTransition: {
        type: 'parked',
        plate,
        slot,
        message,
      },
    };
  }

  const nextWaiting = [...state.waiting, plate];
  const position = nextWaiting.length;
  const message = `Parking is FULL. Vehicle ${plate} added to waiting queue at position ${position}.`;
  return {
    ...state,
    waiting: nextWaiting,
    consoleLog: [
      ...state.consoleLog,
      {
        id: state.nextLogId,
        kind: 'queued',
        command: `1. Vehicle Entry -> ${plate}`,
        lines: [message],
      },
    ],
    nextLogId: state.nextLogId + 1,
    lastTransition: {
      type: 'queued',
      plate,
      queuePosition: position,
      message,
    },
  };
}

export function vehicleExit(state: ParkingLotState): ParkingLotState {
  if (state.parked.length === 0) {
    const message = 'Parking lot is empty. No vehicle to exit.';
    return {
      ...state,
      consoleLog: [
        ...state.consoleLog,
        {
          id: state.nextLogId,
          kind: 'empty-exit',
          command: '2. Vehicle Exit',
          lines: [message],
        },
      ],
      nextLogId: state.nextLogId + 1,
      lastTransition: {
        type: 'empty-exit',
        message,
      },
    };
  }

  const leaving = state.parked[state.parked.length - 1];
  const remainingParked = state.parked.slice(0, -1);
  const lines = [`Vehicle ${leaving} has left the parking lot.`];

  if (state.waiting.length > 0) {
    const [nextVehicle, ...remainingWaiting] = state.waiting;
    const nextParked = [...remainingParked, nextVehicle];
    const autoMsg = `Slot free. Waiting vehicle ${nextVehicle} is now parked automatically.`;
    lines.push(autoMsg);

    return {
      ...state,
      parked: nextParked,
      waiting: remainingWaiting,
      consoleLog: [
        ...state.consoleLog,
        {
          id: state.nextLogId,
          kind: 'auto-allocated',
          command: '2. Vehicle Exit',
          lines,
        },
      ],
      nextLogId: state.nextLogId + 1,
      lastTransition: {
        type: 'auto-allocated',
        plate: leaving,
        autoAllocatedPlate: nextVehicle,
        slot: nextParked.length,
        message: `${leaving} exited from top. ${nextVehicle} dequeued from front and auto-parked at slot ${nextParked.length}.`,
      },
    };
  }

  return {
    ...state,
    parked: remainingParked,
    consoleLog: [
      ...state.consoleLog,
      {
        id: state.nextLogId,
        kind: 'exited',
        command: '2. Vehicle Exit',
        lines,
      },
    ],
    nextLogId: state.nextLogId + 1,
    lastTransition: {
      type: 'exited',
      plate: leaving,
      message: `Vehicle ${leaving} exited from the top of the stack. Slot ${state.parked.length} is now free.`,
    },
  };
}

export function formatDisplayParked(state: ParkingLotState): string[] {
  if (state.parked.length === 0) {
    return ['No vehicles are parked.'];
  }
  const lines = ['Parked vehicles (top to bottom):'];
  for (let i = state.parked.length - 1; i >= 0; i--) {
    const slot = i + 1;
    const topMark = i === state.parked.length - 1 ? ' <-- TOP' : '';
    lines.push(`  Slot ${slot} : ${state.parked[i]}${topMark}`);
  }
  return lines;
}

export function formatDisplayWaiting(state: ParkingLotState): string[] {
  if (state.waiting.length === 0) {
    return ['No vehicles are waiting.'];
  }
  const lines = ['Waiting vehicles (front to rear):'];
  for (let i = 0; i < state.waiting.length; i++) {
    const pos = i + 1;
    const frontMark = i === 0 ? ' <-- FRONT' : '';
    lines.push(`  Position ${pos} : ${state.waiting[i]}${frontMark}`);
  }
  return lines;
}

export function formatStatus(state: ParkingLotState): string {
  return `Capacity: ${state.capacity} | Parked: ${state.parked.length} | Free: ${getFreeSlots(state)} | Waiting: ${state.waiting.length}`;
}

export function logDisplayParked(state: ParkingLotState): ParkingLotState {
  return {
    ...state,
    consoleLog: [
      ...state.consoleLog,
      {
        id: state.nextLogId,
        kind: 'display',
        command: '3. Display Parked Vehicles',
        lines: formatDisplayParked(state),
      },
    ],
    nextLogId: state.nextLogId + 1,
  };
}

export function logDisplayWaiting(state: ParkingLotState): ParkingLotState {
  return {
    ...state,
    consoleLog: [
      ...state.consoleLog,
      {
        id: state.nextLogId,
        kind: 'display',
        command: '4. Display Waiting Vehicles',
        lines: formatDisplayWaiting(state),
      },
    ],
    nextLogId: state.nextLogId + 1,
  };
}

export function logStatus(state: ParkingLotState): ParkingLotState {
  return {
    ...state,
    consoleLog: [
      ...state.consoleLog,
      {
        id: state.nextLogId,
        kind: 'status',
        command: '5. Show Parking Status',
        lines: [formatStatus(state)],
      },
    ],
    nextLogId: state.nextLogId + 1,
  };
}

export type ScriptAction =
  | { type: 'entry'; plate: string; label: string }
  | { type: 'exit'; label: string }
  | { type: 'displayParked'; label: string }
  | { type: 'displayWaiting'; label: string }
  | { type: 'status'; label: string };

export function executeScriptStep(state: ParkingLotState, action: ScriptAction): ParkingLotState {
  switch (action.type) {
    case 'entry':
      return vehicleEntry(state, action.plate);
    case 'exit':
      return vehicleExit(state);
    case 'displayParked':
      return logDisplayParked(state);
    case 'displayWaiting':
      return logDisplayWaiting(state);
    case 'status':
      return logStatus(state);
  }
}

export function buildWalkthroughStateAtStep(
  capacity: number,
  steps: ScriptAction[],
  stepCount: number
): ParkingLotState {
  let state = createParkingLot(capacity);
  const clamped = Math.max(0, Math.min(steps.length, stepCount));
  for (let i = 0; i < clamped; i++) {
    state = executeScriptStep(state, steps[i]);
  }
  return state;
}
