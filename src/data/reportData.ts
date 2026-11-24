import type { ScriptAction } from '../simulation/parkingLot';

export const REPORT_PDF_URL = '/assets/aistudio/Project-Report_42888068.pdf';

export const PROJECT_METADATA = {
  institute: 'Maharaja Surajmal Institute of Technology',
  department: 'Department of Information Technology',
  affiliation: 'Affiliated to Guru Gobind Singh Indraprastha University, Delhi',
  subject: 'Data Structures (DSA)',
  documentType: 'B.Tech Project Report',
  title: 'Smart Parking Lot Management System',
  subtitle: 'Using Stack and Queue in C',
  programme: 'B.Tech Information Technology, 3rd Semester',
  section: 'IT-E',
  submittedTo: 'Dr. Sunesh Malik',
  submissionDate: '25/11/2026',
  academicSession: '2026–27',
  compilerCommand: 'gcc -std=c11 -Wall -Wextra main.c -o parking',
  team: [
    { name: 'Himani', enrollment: '00296302825' },
    { name: 'Khushboo', enrollment: '03296302825' },
    { name: 'Shivanshu', enrollment: '01596302825' },
  ],
  keywords: ['Data Structures', 'Stack', 'Queue', 'LIFO', 'FIFO', 'Parking Management', 'C', 'Structs'],
};

export const ABSTRACT_TEXT =
  'Parking is a daily problem in cities. When a lot is full, vehicles wait at the gate in no fixed order, which wastes time and fuel and causes arguments and traffic jams. This project presents a Smart Parking Lot Management System, a menu-driven C program that uses two core linear data structures: a Stack (LIFO) to store vehicles parked inside a single-lane lot, and a Queue (FIFO) to store vehicles waiting outside. The program enforces lot capacity, parks or queues each arriving vehicle, rejects duplicate vehicle numbers, and automatically parks the longest-waiting vehicle whenever a slot becomes free.';

export const OBJECTIVES = [
  'Store parked vehicles in a Stack (LIFO) and waiting vehicles in a Queue (FIFO).',
  'Verify available parking capacity before assigning a slot.',
  'Enqueue arriving vehicles into a fair waiting line when the lot is full.',
  'Automatically dequeue and park the front waiting vehicle whenever a parked vehicle exits.',
  'Display live parked and waiting lists on demand while rejecting duplicate vehicle numbers.',
];

export const STACK_VS_QUEUE_ROWS = [
  { point: 'Rule', stack: 'LIFO (Last In, First Out)', queue: 'FIFO (First In, First Out)' },
  { point: 'Insertion', stack: 'At the top (push)', queue: 'At the rear (enqueue)' },
  { point: 'Deletion', stack: 'From the top (pop)', queue: 'From the front (dequeue)' },
  { point: 'C Implementation', stack: 'Array struct Stack (top)', queue: 'Circular array struct Queue (front, rear)' },
  { point: 'Role in this project', stack: 'Parked vehicles inside the lane', queue: 'Waiting vehicles outside the gate' },
  { point: 'Time per operation', stack: 'O(1)', queue: 'O(1)' },
];

export const MANUAL_VS_SYSTEM_ROWS = [
  { point: 'Records', manual: 'Paper register or guard memory', system: 'Stored cleanly in C Stack & Queue structs' },
  { point: 'When full', manual: 'Vehicles wait in no fixed order', system: 'Vehicles wait in a fair FIFO queue' },
  { point: 'Free slot', manual: 'Found by manual visual search', system: 'Allocated automatically on exit' },
  { point: 'Duplicate vehicle', manual: 'May go unnoticed or logged twice', system: 'Detected and rejected immediately' },
  { point: 'Live status', manual: 'Counted by hand', system: 'Reported instantly via one menu option' },
];

export const VARIABLES_TABLE = [
  {
    item: 'Parked vehicles',
    type: 'struct Stack parked',
    purpose: 'Vehicles inside the lot. The last parked vehicle sits at top and leaves first.',
    module: 'stack',
  },
  {
    item: 'Waiting vehicles',
    type: 'struct Queue waiting',
    purpose: 'Vehicles waiting outside. The first to arrive sits at front and is served first.',
    module: 'queue',
  },
  {
    item: 'Vehicle number',
    type: 'char plate[20]',
    purpose: 'Unique null-terminated registration plate string such as MH12AB1234.',
    module: 'struct',
  },
  {
    item: 'Capacity',
    type: 'int capacity',
    purpose: 'Maximum number of vehicles that can be parked simultaneously.',
    module: 'struct',
  },
  {
    item: 'Parking lot',
    type: 'struct ParkingLot',
    purpose: 'Groups the parked stack, waiting queue, and lot capacity into a single C structure.',
    module: 'struct',
  },
];

export interface WalkthroughPreset {
  id: 'table-5-1' | 'sample-6-3';
  title: string;
  reference: string;
  capacity: number;
  description: string;
  steps: ScriptAction[];
}

export const WALKTHROUGH_PRESETS: WalkthroughPreset[] = [
  {
    id: 'table-5-1',
    title: 'Slot Allocation Example (Capacity 3)',
    reference: 'Table 5.1 · Page 7',
    capacity: 3,
    description: 'Replays the exact 8-step sequence with vehicles V1–V5 demonstrating Stack filling, Queue overflow, and automatic slot transfer.',
    steps: [
      { type: 'entry', plate: 'V1', label: 'Step 1: V1 enters → parked at Slot 1' },
      { type: 'entry', plate: 'V2', label: 'Step 2: V2 enters → parked at Slot 2' },
      { type: 'entry', plate: 'V3', label: 'Step 3: V3 enters → lot is now full (Slot 3)' },
      { type: 'entry', plate: 'V4', label: 'Step 4: V4 enters → no space, joins Queue Pos 1' },
      { type: 'entry', plate: 'V5', label: 'Step 5: V5 enters → no space, joins Queue Pos 2' },
      { type: 'exit', label: 'Step 6: V3 leaves (TOP) → V4 parked automatically' },
      { type: 'exit', label: 'Step 7: V4 leaves (TOP) → V5 parked automatically' },
      { type: 'exit', label: 'Step 8: V5 leaves (TOP) → Slot 3 stays free' },
    ],
  },
  {
    id: 'sample-6-3',
    title: 'Full Console Test Session (Capacity 2)',
    reference: 'Section 6.3 · Pages 13–14',
    capacity: 2,
    description: 'Replays the recorded C terminal run using real Indian registration plates (MH12AB1234 through KA05IJ7890).',
    steps: [
      { type: 'entry', plate: 'MH12AB1234', label: 'Entry: MH12AB1234 parks at Slot 1' },
      { type: 'entry', plate: 'DL01CD5678', label: 'Entry: DL01CD5678 parks at Slot 2 (Full)' },
      { type: 'entry', plate: 'UP16EF9012', label: 'Entry: UP16EF9012 queued at Position 1' },
      { type: 'entry', plate: 'HR26GH3456', label: 'Entry: HR26GH3456 queued at Position 2' },
      { type: 'entry', plate: 'KA05IJ7890', label: 'Entry: KA05IJ7890 queued at Position 3' },
      { type: 'displayParked', label: 'Menu 3: Display Parked Vehicles' },
      { type: 'displayWaiting', label: 'Menu 4: Display Waiting Vehicles' },
      { type: 'status', label: 'Menu 5: Show Parking Status' },
      { type: 'exit', label: 'Menu 2: DL01CD5678 exits → UP16EF9012 auto-parked' },
      { type: 'exit', label: 'Menu 2: UP16EF9012 exits → HR26GH3456 auto-parked' },
      { type: 'exit', label: 'Menu 2: HR26GH3456 exits → KA05IJ7890 auto-parked' },
      { type: 'displayWaiting', label: 'Menu 4: Confirm waiting queue is empty' },
      { type: 'entry', plate: 'DL01CD5678', label: 'Re-entry: DL01CD5678 returns → Queue Pos 1' },
    ],
  },
];

export const ENTRY_ALGORITHM_STEPS = [
  { id: 'start', step: 1, title: 'Read vehicle number', detail: 'Read the incoming vehicle registration plate into char plate[20] using scanf().' },
  { id: 'dup', step: 2, title: 'Check duplicates across Stack & Queue', detail: 'Scan both arrays with strcmp(); if the plate already exists, print a warning and return.' },
  { id: 'full', step: 3, title: 'Compare Stack top to capacity', detail: 'Check if lot->parked.top == lot->capacity - 1. If full, branch to step 5.' },
  { id: 'push', step: 4, title: 'Push onto Stack & report slot', detail: 'Increment top, copy plate via strcpy(), print slot number (top + 1), and return.' },
  { id: 'enqueue', step: 5, title: 'Enqueue into Waiting Queue', detail: 'Insert plate at rear of the circular queue, increment count, print queue position, and return.' },
];

export const EXIT_ALGORITHM_STEPS = [
  { id: 'empty', step: 1, title: 'Check if Stack is empty', detail: 'If lot->parked.top == -1, print "Parking lot is empty" and return safely (no underflow).' },
  { id: 'pop', step: 2, title: 'Pop top vehicle from Stack', detail: 'Copy lot->parked.items[top], decrement top, and confirm the vehicle has exited.' },
  { id: 'qempty', step: 3, title: 'Check if Waiting Queue is empty', detail: 'If lot->waiting.count == 0, leave the freed slot open and return.' },
  { id: 'transfer', step: 4, title: 'Dequeue front & push onto Stack', detail: 'Read items[front], advance front modulo MAX_QUEUE, push onto parked stack, and announce auto-parking.' },
];

export interface TestCaseItem {
  no: number;
  title: string;
  expected: string;
  status: 'Pass';
  demoAction?: 'free-slot' | 'full-lot' | 'empty-exit' | 'dup-parked' | 'dup-waiting' | 'auto-park' | 'display-lists';
}

export const TEST_CASES: TestCaseItem[] = [
  { no: 1, title: 'Vehicle enters when a slot is free', expected: 'Parked, slot number shown', status: 'Pass', demoAction: 'free-slot' },
  { no: 2, title: 'Vehicle enters when the lot is full', expected: 'Joins the waiting queue', status: 'Pass', demoAction: 'full-lot' },
  { no: 3, title: 'Exit when the lot is empty', expected: 'Message, no crash', status: 'Pass', demoAction: 'empty-exit' },
  { no: 4, title: 'Same vehicle number entered twice', expected: 'Second entry rejected', status: 'Pass', demoAction: 'dup-parked' },
  { no: 5, title: 'Same number entered while waiting', expected: 'Second entry rejected', status: 'Pass', demoAction: 'dup-waiting' },
  { no: 6, title: 'Exit when vehicles are waiting', expected: 'Front vehicle parked automatically', status: 'Pass', demoAction: 'auto-park' },
  { no: 7, title: 'Wrong menu number (9)', expected: '"Invalid choice", menu shown again', status: 'Pass' },
  { no: 8, title: 'Letters instead of a number', expected: '"Invalid input", no crash', status: 'Pass' },
  { no: 9, title: 'Display parked and waiting lists', expected: 'Correct order with TOP and FRONT marks', status: 'Pass', demoAction: 'display-lists' },
];

export const COMPLEXITY_ROWS = [
  {
    fn: 'isFull(), showStatus()',
    time: 'O(1)',
    space: 'O(1)',
    reason: 'Compares integer top / count fields and prints counters directly.',
  },
  {
    fn: 'vehicleEntry()',
    time: 'O(n + m)',
    space: 'O(1)',
    reason: 'Scans both arrays in place with strcmp() for duplicates; push/enqueue is O(1).',
  },
  {
    fn: 'vehicleExit()',
    time: 'O(1)',
    space: 'O(1)',
    reason: 'At most one stack pop, one circular queue dequeue, and one stack push.',
  },
  {
    fn: 'displayParked()',
    time: 'O(n)',
    space: 'O(1)',
    reason: 'Iterates directly from parked.top down to 0 without extra buffer allocation.',
  },
  {
    fn: 'displayWaiting()',
    time: 'O(m)',
    space: 'O(1)',
    reason: 'Iterates directly from waiting.front across count elements in place.',
  },
];

export const LIMITATIONS = [
  'Only the top vehicle of the Stack can exit. In a real multi-lane lot, any vehicle can leave.',
  'All state resides in RAM and is lost when the console program closes.',
  'No entry/exit timestamp tracking or parking fee calculation.',
  'Console-only interface modeling one single-lane lot and one gate.',
  'A waiting vehicle cannot leave the middle of the FIFO queue on its own.',
  'Registration plate format is accepted as any non-whitespace string in the C version.',
];

export const FUTURE_SCOPE = [
  'Allow arbitrary vehicle exit using a dynamic array or hash table paired with an auxiliary stack for temporarily displaced cars.',
  'Add entry/exit timestamps using <time.h> and automated hourly parking fee computation.',
  'Persist records to a file (fopen/fwrite) or relational database across restarts.',
  'Build a full graphical desktop or mobile attendant interface.',
  'Upgrade to a Priority Queue (binary heap) to fast-track ambulances, emergency responders, or accessibility vehicles.',
  'Support multi-floor parking garages and distinct vehicle sizes (two-wheelers, sedans, SUVs).',
];

export const REAL_WORLD_USES = [
  'Shopping malls & multiplexes',
  'Hospitals & emergency drop-off lanes',
  'University & college campuses',
  'Airports & short-stay valet lanes',
  'Residential societies',
  'Hospital token queues & online ticket waiting rooms',
];

export const REFERENCES = [
  { id: 1, text: 'E. Horowitz, S. Sahni and S. Anderson-Freed, Fundamentals of Data Structures in C, Universities Press.' },
  { id: 2, text: 'S. Lipschutz, Data Structures (Schaum’s Outline Series), McGraw-Hill Education.' },
  { id: 3, text: 'R. Thareja, Data Structures Using C, Oxford University Press.' },
  { id: 4, text: 'B. W. Kernighan and D. M. Ritchie, The C Programming Language (2nd Edition), Prentice Hall.' },
  { id: 5, text: 'ISO/IEC 9899 (C11) Standard Library Reference — <stdio.h> & <string.h>', url: 'https://en.cppreference.com/w/c' },
  { id: 6, text: 'GNU C Compiler (GCC) Documentation — C11 Compilation & Warning Flags', url: 'https://gcc.gnu.org/onlinedocs/' },
];

export const SAMPLE_PLATES = [
  'MH12AB1234',
  'DL01CD5678',
  'UP16EF9012',
  'HR26GH3456',
  'KA05IJ7890',
  'RJ14KL2345',
  'GJ01MN6789',
  'PB10PQ4321',
];

export const MAIN_C_SOURCE = `/*
 * Smart Parking Lot Management System (Using Stack and Queue in C)
 * Maharaja Surajmal Institute of Technology - Dept. of Information Technology
 * Team: Himani (00296302825), Khushboo (03296302825), Shivanshu (01596302825)
 * Compile: gcc -std=c11 -Wall -Wextra main.c -o parking
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STACK 100
#define MAX_QUEUE 200
#define PLATE_LEN 20

typedef struct {
    char items[MAX_STACK][PLATE_LEN];
    int top;
} Stack;

typedef struct {
    char items[MAX_QUEUE][PLATE_LEN];
    int front;
    int rear;
    int count;
} Queue;

typedef struct {
    Stack parked;
    Queue waiting;
    int capacity;
} ParkingLot;

static void initLot(ParkingLot *lot, int capacity) {
    lot->parked.top = -1;
    lot->waiting.front = 0;
    lot->waiting.rear = -1;
    lot->waiting.count = 0;
    lot->capacity = capacity;
}

static int isFull(const ParkingLot *lot) {
    return (lot->parked.top + 1) >= lot->capacity;
}

static int isDuplicate(const ParkingLot *lot, const char *plate) {
    for (int i = 0; i <= lot->parked.top; i++) {
        if (strcmp(lot->parked.items[i], plate) == 0) {
            return 1;
        }
    }
    for (int i = 0; i < lot->waiting.count; i++) {
        int idx = (lot->waiting.front + i) % MAX_QUEUE;
        if (strcmp(lot->waiting.items[idx], plate) == 0) {
            return 1;
        }
    }
    return 0;
}

static void pushParked(ParkingLot *lot, const char *plate) {
    lot->parked.top++;
    strncpy(lot->parked.items[lot->parked.top], plate, PLATE_LEN - 1);
    lot->parked.items[lot->parked.top][PLATE_LEN - 1] = '\\0';
}

static void popParked(ParkingLot *lot, char *outPlate) {
    strncpy(outPlate, lot->parked.items[lot->parked.top], PLATE_LEN - 1);
    outPlate[PLATE_LEN - 1] = '\\0';
    lot->parked.top--;
}

static int enqueueWaiting(ParkingLot *lot, const char *plate) {
    if (lot->waiting.count >= MAX_QUEUE) {
        return 0;
    }
    lot->waiting.rear = (lot->waiting.rear + 1) % MAX_QUEUE;
    strncpy(lot->waiting.items[lot->waiting.rear], plate, PLATE_LEN - 1);
    lot->waiting.items[lot->waiting.rear][PLATE_LEN - 1] = '\\0';
    lot->waiting.count++;
    return 1;
}

static int dequeueWaiting(ParkingLot *lot, char *outPlate) {
    if (lot->waiting.count == 0) {
        return 0;
    }
    strncpy(outPlate, lot->waiting.items[lot->waiting.front], PLATE_LEN - 1);
    outPlate[PLATE_LEN - 1] = '\\0';
    lot->waiting.front = (lot->waiting.front + 1) % MAX_QUEUE;
    lot->waiting.count--;
    return 1;
}

static void vehicleEntry(ParkingLot *lot, const char *plate) {
    if (isDuplicate(lot, plate)) {
        printf("Vehicle %s is already in the system.\\n", plate);
        return;
    }
    if (!isFull(lot)) {
        pushParked(lot, plate);
        printf("Vehicle %s parked at slot %d.\\n", plate, lot->parked.top + 1);
    } else if (enqueueWaiting(lot, plate)) {
        printf("Parking is FULL. Vehicle %s added to waiting queue at position %d.\\n",
               plate, lot->waiting.count);
    } else {
        printf("Waiting queue is full. Cannot accept vehicle %s.\\n", plate);
    }
}

static void vehicleExit(ParkingLot *lot) {
    if (lot->parked.top == -1) {
        printf("Parking lot is empty. No vehicle to exit.\\n");
        return;
    }
    char leaving[PLATE_LEN];
    popParked(lot, leaving);
    printf("Vehicle %s has left the parking lot.\\n", leaving);

    if (lot->waiting.count > 0) {
        char nextVehicle[PLATE_LEN];
        dequeueWaiting(lot, nextVehicle);
        pushParked(lot, nextVehicle);
        printf("Slot free. Waiting vehicle %s is now parked automatically.\\n", nextVehicle);
    }
}

static void displayParked(const ParkingLot *lot) {
    if (lot->parked.top == -1) {
        printf("No vehicles are parked.\\n");
        return;
    }
    printf("Parked vehicles (top to bottom):\\n");
    for (int i = lot->parked.top; i >= 0; i--) {
        printf("  Slot %d : %s%s\\n",
               i + 1,
               lot->parked.items[i],
               (i == lot->parked.top) ? " <-- TOP" : "");
    }
}

static void displayWaiting(const ParkingLot *lot) {
    if (lot->waiting.count == 0) {
        printf("No vehicles are waiting.\\n");
        return;
    }
    printf("Waiting vehicles (front to rear):\\n");
    for (int i = 0; i < lot->waiting.count; i++) {
        int idx = (lot->waiting.front + i) % MAX_QUEUE;
        printf("  Position %d : %s%s\\n",
               i + 1,
               lot->waiting.items[idx],
               (i == 0) ? " <-- FRONT" : "");
    }
}

static void showStatus(const ParkingLot *lot) {
    int parkedCount = lot->parked.top + 1;
    int freeSlots = lot->capacity - parkedCount;
    printf("Capacity: %d | Parked: %d | Free: %d | Waiting: %d\\n",
           lot->capacity, parkedCount, freeSlots, lot->waiting.count);
}

static void clearInputBuffer(void) {
    int ch;
    while ((ch = getchar()) != '\\n' && ch != EOF) {
        /* discard remaining characters */
    }
}

int main(void) {
    int capacity = 0;
    printf("===== SMART PARKING LOT MANAGEMENT SYSTEM (C) =====\\n");
    while (1) {
        printf("Enter parking lot capacity (1-%d): ", MAX_STACK);
        if (scanf("%d", &capacity) == 1 && capacity >= 1 && capacity <= MAX_STACK) {
            clearInputBuffer();
            break;
        }
        printf("Invalid input. Please enter a number between 1 and %d.\\n", MAX_STACK);
        clearInputBuffer();
    }

    ParkingLot lot;
    initLot(&lot, capacity);

    int choice = 0;
    char plate[PLATE_LEN];

    while (1) {
        printf("\\n--- MENU ---\\n");
        printf("1. Vehicle Entry\\n");
        printf("2. Vehicle Exit\\n");
        printf("3. Display Parked Vehicles\\n");
        printf("4. Display Waiting Vehicles\\n");
        printf("5. Show Parking Status\\n");
        printf("6. Exit Program\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter a number.\\n");
            clearInputBuffer();
            continue;
        }
        clearInputBuffer();

        switch (choice) {
            case 1:
                printf("Enter vehicle number: ");
                if (scanf("%19s", plate) == 1) {
                    clearInputBuffer();
                    vehicleEntry(&lot, plate);
                }
                break;
            case 2:
                vehicleExit(&lot);
                break;
            case 3:
                displayParked(&lot);
                break;
            case 4:
                displayWaiting(&lot);
                break;
            case 5:
                showStatus(&lot);
                break;
            case 6:
                printf("Exiting Smart Parking Lot Management System.\\n");
                return 0;
            default:
                printf("Invalid choice. Select an option from 1 to 6.\\n");
                break;
        }
    }
}
`;

