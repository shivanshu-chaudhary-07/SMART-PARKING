import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWalkthroughStateAtStep,
  createParkingLot,
  formatDisplayParked,
  formatDisplayWaiting,
  formatStatus,
  getOccupancyRate,
  vehicleEntry,
  vehicleExit,
} from './parkingLot';
import { WALKTHROUGH_PRESETS } from '../data/reportData';

test('Test Case 1 & 2: parks when free and queues when full', () => {
  let lot = createParkingLot(2);
  lot = vehicleEntry(lot, 'MH12AB1234');
  assert.deepEqual(lot.parked, ['MH12AB1234']);
  assert.equal(lot.lastTransition.type, 'parked');
  assert.equal(lot.lastTransition.slot, 1);

  lot = vehicleEntry(lot, 'DL01CD5678');
  assert.deepEqual(lot.parked, ['MH12AB1234', 'DL01CD5678']);

  lot = vehicleEntry(lot, 'UP16EF9012');
  assert.deepEqual(lot.parked, ['MH12AB1234', 'DL01CD5678']);
  assert.deepEqual(lot.waiting, ['UP16EF9012']);
  assert.equal(lot.lastTransition.type, 'queued');
  assert.equal(lot.lastTransition.queuePosition, 1);
});

test('Test Case 3: exiting an empty lot returns message without crashing', () => {
  let lot = createParkingLot(3);
  lot = vehicleExit(lot);
  assert.deepEqual(lot.parked, []);
  assert.equal(lot.lastTransition.type, 'empty-exit');
  assert.equal(
    lot.consoleLog[lot.consoleLog.length - 1].lines[0],
    'Parking lot is empty. No vehicle to exit.'
  );
});

test('Test Cases 4 & 5: rejects duplicate plates in Stack or Queue', () => {
  let lot = createParkingLot(1);
  lot = vehicleEntry(lot, 'DL01CD5678');
  lot = vehicleEntry(lot, 'dl01cd5678');
  assert.equal(lot.lastTransition.type, 'duplicate');
  assert.deepEqual(lot.parked, ['DL01CD5678']);
  assert.deepEqual(lot.waiting, []);

  lot = vehicleEntry(lot, 'UP16EF9012');
  assert.deepEqual(lot.waiting, ['UP16EF9012']);

  lot = vehicleEntry(lot, 'UP16EF9012');
  assert.equal(lot.lastTransition.type, 'duplicate');
  assert.deepEqual(lot.waiting, ['UP16EF9012']);
});

test('Test Case 6: exiting when waiting vehicles exist auto-parks front vehicle', () => {
  let lot = createParkingLot(2);
  lot = vehicleEntry(lot, 'MH12AB1234');
  lot = vehicleEntry(lot, 'DL01CD5678');
  lot = vehicleEntry(lot, 'UP16EF9012');
  lot = vehicleEntry(lot, 'HR26GH3456');

  lot = vehicleExit(lot);
  assert.equal(lot.lastTransition.type, 'auto-allocated');
  assert.equal(lot.lastTransition.plate, 'DL01CD5678');
  assert.equal(lot.lastTransition.autoAllocatedPlate, 'UP16EF9012');
  assert.deepEqual(lot.parked, ['MH12AB1234', 'UP16EF9012']);
  assert.deepEqual(lot.waiting, ['HR26GH3456']);
});

test('Test Case 9: displayParked and displayWaiting mark TOP and FRONT accurately', () => {
  let lot = createParkingLot(2);
  lot = vehicleEntry(lot, 'MH12AB1234');
  lot = vehicleEntry(lot, 'DL01CD5678');
  lot = vehicleEntry(lot, 'UP16EF9012');
  lot = vehicleEntry(lot, 'HR26GH3456');

  assert.deepEqual(formatDisplayParked(lot), [
    'Parked vehicles (top to bottom):',
    '  Slot 2 : DL01CD5678 <-- TOP',
    '  Slot 1 : MH12AB1234',
  ]);
  assert.deepEqual(formatDisplayWaiting(lot), [
    'Waiting vehicles (front to rear):',
    '  Position 1 : UP16EF9012 <-- FRONT',
    '  Position 2 : HR26GH3456',
  ]);
  assert.equal(formatStatus(lot), 'Capacity: 2 | Parked: 2 | Free: 0 | Waiting: 2');
});

test('Table 5.1 8-step walkthrough matches exact report state at every step', () => {
  const preset = WALKTHROUGH_PRESETS.find((p) => p.id === 'table-5-1')!;
  const step5 = buildWalkthroughStateAtStep(preset.capacity, preset.steps, 5);
  assert.deepEqual(step5.parked, ['V1', 'V2', 'V3']);
  assert.deepEqual(step5.waiting, ['V4', 'V5']);

  const step6 = buildWalkthroughStateAtStep(preset.capacity, preset.steps, 6);
  assert.deepEqual(step6.parked, ['V1', 'V2', 'V4']);
  assert.deepEqual(step6.waiting, ['V5']);

  const step7 = buildWalkthroughStateAtStep(preset.capacity, preset.steps, 7);
  assert.deepEqual(step7.parked, ['V1', 'V2', 'V5']);
  assert.deepEqual(step7.waiting, []);

  const step8 = buildWalkthroughStateAtStep(preset.capacity, preset.steps, 8);
  assert.deepEqual(step8.parked, ['V1', 'V2']);
  assert.deepEqual(step8.waiting, []);
});

test('Empty or malformed plate is rejected with invalid transition', () => {
  let lot = createParkingLot(3);
  lot = vehicleEntry(lot, '   ');
  assert.equal(lot.lastTransition.type, 'invalid');
  assert.deepEqual(lot.parked, []);
});

test('Occupancy rate over time and total vehicles served track accurately across entries, queues, and exits', () => {
  let lot = createParkingLot(2);
  assert.equal(getOccupancyRate(lot), 0);
  assert.equal(lot.totalVehiclesServed, 0);
  assert.equal(lot.history.length, 1);

  // Park 1st car -> 50%, served = 1
  lot = vehicleEntry(lot, 'V1');
  assert.equal(getOccupancyRate(lot), 50);
  assert.equal(lot.totalVehiclesServed, 1);

  // Park 2nd car -> 100%, served = 2
  lot = vehicleEntry(lot, 'V2');
  assert.equal(getOccupancyRate(lot), 100);
  assert.equal(lot.totalVehiclesServed, 2);

  // Queue 3rd car -> still 100%, served stays 2 (not parked yet)
  lot = vehicleEntry(lot, 'V3');
  assert.equal(getOccupancyRate(lot), 100);
  assert.equal(lot.totalVehiclesServed, 2);

  // Exit top -> V2 exits, V3 auto-parked -> 100%, served = 3, exited = 1
  lot = vehicleExit(lot);
  assert.equal(getOccupancyRate(lot), 100);
  assert.equal(lot.totalVehiclesServed, 3);
  assert.equal(lot.totalVehiclesExited, 1);

  // Exit top with empty queue -> 50%, served stays 3, exited = 2
  lot = vehicleExit(lot);
  assert.equal(getOccupancyRate(lot), 50);
  assert.equal(lot.totalVehiclesServed, 3);
  assert.equal(lot.totalVehiclesExited, 2);
  assert.deepEqual(
    lot.history.map((p) => p.occupancyRate),
    [0, 50, 100, 100, 100, 50]
  );
  assert.deepEqual(
    lot.history.map((p) => p.totalServed),
    [0, 1, 2, 2, 3, 3]
  );
});
