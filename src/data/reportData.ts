import type { ScriptAction } from '../simulation/parkingLot';

export const REPORT_PDF_URL = '/assets/aistudio/Smart_Parking_Lot_Formatted_c29b1d92.pdf';

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
  sourceFilename: 'parking_simple.c',
  compilerCommand: 'gcc -std=c11 -Wall -Wextra parking_simple.c -o parking',
  reportPages: 13,
  team: [
    { name: 'Himani', enrollment: '00296302825' },
    { name: 'Khushboo', enrollment: '03296302825' },
    { name: 'Shivanshu', enrollment: '01596302825' },
  ],
  keywords: ['Data Structures', 'Stack', 'Queue', 'LIFO', 'FIFO', 'Parking Management', 'C', 'Circular Queue'],
};

export const ABSTRACT_TEXT =
  'Parking is a daily problem in cities. When a lot is full, vehicles may wait at the gate in no fixed order, wasting time and fuel. This report presents a Smart Parking Lot Management System, a menu-driven C program that uses two linear data structures. A stack (LIFO) stores vehicles parked inside the lot, and a queue (FIFO) stores vehicles waiting outside. The program checks capacity, rejects duplicate vehicle numbers, and automatically parks the first waiting vehicle when a slot is freed.';

export const OBJECTIVES = [
  'Store parked and waiting vehicles in a stack and queue respectively.',
  'Check capacity before parking and reject duplicate vehicle numbers.',
  'Automatically allocate a freed slot to the first waiting vehicle.',
  'Display the parked list, waiting list and current parking status.',
];

export const STACK_VS_QUEUE_ROWS = [
  { point: 'Rule', stack: 'LIFO', queue: 'FIFO' },
  { point: 'Insertion', stack: 'Top', queue: 'Rear' },
  { point: 'Deletion', stack: 'Top', queue: 'Front' },
  { point: 'Implementation', stack: 'Array, top index', queue: 'Circular array, front/rear' },
  { point: 'Role', stack: 'Parked vehicles', queue: 'Waiting vehicles' },
  { point: 'Operation time', stack: 'O(1)', queue: 'O(1)' },
];

export const MANUAL_VS_SYSTEM_ROWS = [
  { point: 'Records', manual: 'Register or memory', system: 'Stored in arrays' },
  { point: 'When full', manual: 'Unorganised waiting', system: 'FIFO waiting queue' },
  { point: 'Free slot', manual: 'Manual search', system: 'Automatic allocation' },
  { point: 'Duplicate entry', manual: 'May go unnoticed', system: 'Detected by program' },
  { point: 'Status', manual: 'Counted manually', system: 'Displayed through menu' },
];

export const VARIABLES_TABLE = [
  {
    item: 'parked',
    type: 'char[MAX][LEN]',
    purpose: 'Stack of parked vehicle numbers',
    module: 'stack',
  },
  {
    item: 'waiting',
    type: 'char[MAX][LEN]',
    purpose: 'Circular queue of waiting vehicles',
    module: 'queue',
  },
  {
    item: 'top',
    type: 'int',
    purpose: 'Index of top parked vehicle (-1 if empty)',
    module: 'stack',
  },
  {
    item: 'front, rear',
    type: 'int',
    purpose: 'Front and next insertion index of queue',
    module: 'queue',
  },
  {
    item: 'count',
    type: 'int',
    purpose: 'Number of waiting vehicles',
    module: 'queue',
  },
  {
    item: 'capacity',
    type: 'int',
    purpose: 'Parking capacity (1 to 100)',
    module: 'config',
  },
  {
    item: 'MAX, LEN',
    type: 'Constants',
    purpose: '100 vehicles per array; 32 characters per record',
    module: 'config',
  },
];

export interface WalkthroughPreset {
  id: 'table-5-1' | 'sample-6-2';
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
    reference: 'Table 5.1 · Page 6',
    capacity: 3,
    description: 'Replays the exact 8-step sequence with vehicles V1–V5 demonstrating Stack filling, Queue overflow, and automatic slot transfer.',
    steps: [
      { type: 'entry', plate: 'V1', label: 'Step 1: V1 enters → parked at Slot 1' },
      { type: 'entry', plate: 'V2', label: 'Step 2: V2 enters → parked at Slot 2' },
      { type: 'entry', plate: 'V3', label: 'Step 3: V3 enters (full) → Slot 3' },
      { type: 'entry', plate: 'V4', label: 'Step 4: V4 enters → joins Queue Pos 1' },
      { type: 'entry', plate: 'V5', label: 'Step 5: V5 enters → joins Queue Pos 2' },
      { type: 'exit', label: 'Step 6: V3 leaves; V4 parked automatically' },
      { type: 'exit', label: 'Step 7: V4 leaves; V5 parked automatically' },
      { type: 'exit', label: 'Step 8: V5 leaves → Slot 3 stays free' },
    ],
  },
  {
    id: 'sample-6-2',
    title: 'Sample Run Session (Capacity 2)',
    reference: 'Section 6.2 · Page 11',
    capacity: 2,
    description: 'Replays the recorded C terminal run using plates MH12AB1234, DL01CD5678, UP16EF9012, and HR26GH3456.',
    steps: [
      { type: 'entry', plate: 'MH12AB1234', label: 'Choice 1: MH12AB1234 parked at slot 1' },
      { type: 'entry', plate: 'DL01CD5678', label: 'Choice 1: DL01CD5678 parked at slot 2 (Full)' },
      { type: 'entry', plate: 'UP16EF9012', label: 'Choice 1: UP16EF9012 waiting at position 1' },
      { type: 'entry', plate: 'HR26GH3456', label: 'Choice 1: HR26GH3456 waiting at position 2' },
      { type: 'displayParked', label: 'Choice 3: Display Parked Vehicles' },
      { type: 'displayWaiting', label: 'Choice 3: Display Waiting Vehicles' },
      { type: 'status', label: 'Choice 4: Parking Status (2/2 parked, 2 waiting)' },
      { type: 'exit', label: 'Choice 2: DL01CD5678 leaves → UP16EF9012 auto-parked' },
      { type: 'entry', plate: 'UP16EF9012', label: 'Choice 1: Duplicate UP16EF9012 rejected' },
    ],
  },
];

export const ENTRY_ALGORITHM_STEPS = [
  { id: 'start', step: 1, title: 'Read vehicle number', detail: 'Read a bounded line with readLine() and parse plate[LEN] via sscanf().' },
  { id: 'dup', step: 2, title: 'Vehicle already in system?', detail: 'exists() scans parked[0..top] and circular waiting[] using strcmp(); rejects duplicates.' },
  { id: 'full', step: 3, title: 'Parking full? (top + 1 < capacity)', detail: 'If space is available, push(plate) onto parked[++top] and show slot number (top + 1).' },
  { id: 'qfull', step: 4, title: 'Waiting queue full? (count < MAX)', detail: 'When parked is full, check if the circular waiting queue has space; if full, reject entry.' },
  { id: 'enqueue', step: 5, title: 'Enqueue vehicle & show position', detail: 'Copy plate into waiting[rear], wrap rear = (rear + 1) % MAX, increment count, and report position.' },
];

export const EXIT_ALGORITHM_STEPS = [
  { id: 'empty', step: 1, title: 'Is the stack empty?', detail: 'If top == -1, print "Parking lot is empty." and return safely without underflow.' },
  { id: 'pop', step: 2, title: 'Pop top vehicle & show exit message', detail: 'Print parked[top--] as departed from the single-lane parking lot.' },
  { id: 'qempty', step: 3, title: 'Is the waiting queue empty?', detail: 'If count == 0, leave the freed slot open and return.' },
  { id: 'transfer', step: 4, title: 'Dequeue front & push onto stack', detail: 'push(waiting[front]), advance front = (front + 1) % MAX, decrement count, and show automatic allocation.' },
];

export interface TestCaseItem {
  no: number;
  title: string;
  expected: string;
  status: 'Pass';
  demoAction?: 'free-slot' | 'full-lot' | 'empty-exit' | 'dup-parked' | 'dup-waiting' | 'auto-park' | 'display-lists';
}

export const TEST_CASES: TestCaseItem[] = [
  { no: 1, title: 'Entry with free slot', expected: 'Parked, slot number shown', status: 'Pass', demoAction: 'free-slot' },
  { no: 2, title: 'Entry when parking is full', expected: 'Joins waiting queue', status: 'Pass', demoAction: 'full-lot' },
  { no: 3, title: 'Exit from empty lot', expected: 'Empty message, no crash', status: 'Pass', demoAction: 'empty-exit' },
  { no: 4, title: 'Duplicate parked vehicle', expected: 'Entry rejected', status: 'Pass', demoAction: 'dup-parked' },
  { no: 5, title: 'Duplicate waiting vehicle', expected: 'Entry rejected', status: 'Pass', demoAction: 'dup-waiting' },
  { no: 6, title: 'Exit when vehicles are waiting', expected: 'Front vehicle parked automatically', status: 'Pass', demoAction: 'auto-park' },
  { no: 7, title: 'Invalid menu number', expected: 'Invalid choice message', status: 'Pass' },
  { no: 8, title: 'Letters instead of menu number', expected: 'Invalid choice message', status: 'Pass' },
  { no: 9, title: 'Display vehicle lists', expected: 'Correct TOP and FRONT order', status: 'Pass', demoAction: 'display-lists' },
  { no: 10, title: 'Full waiting queue / wraparound', expected: 'Overflow rejected; freed index reused', status: 'Pass' },
];

export const COMPLEXITY_ROWS = [
  {
    fn: 'push(), enqueue()',
    time: 'O(1)',
    space: 'O(1)',
    reason: 'Index and one fixed-length record',
  },
  {
    fn: 'entry()',
    time: 'O(n + m)',
    space: 'O(1)',
    reason: 'Duplicate check scans both arrays',
  },
  {
    fn: 'vehicleExit()',
    time: 'O(1)',
    space: 'O(1)',
    reason: 'Pop, dequeue and push',
  },
  {
    fn: 'display()',
    time: 'O(n + m)',
    space: 'O(1)',
    reason: 'Traverses both arrays',
  },
  {
    fn: 'status()',
    time: 'O(1)',
    space: 'O(1)',
    reason: 'Uses stored counts',
  },
];

export const LIMITATIONS = [
  'Only the top vehicle of the stack can exit, as the model represents a single lane.',
  'The parking and waiting arrays each store a maximum of 100 vehicle numbers.',
  'Data is lost when the program closes.',
  'No entry time, fee calculation, database or graphical interface.',
  'Waiting vehicles cannot cancel their position; number plate format is not fully validated.',
];

export const FUTURE_SCOPE = [
  'Allow any vehicle to exit by using an additional stack to move blocking vehicles.',
  'Add entry and exit timestamps and calculate parking fees.',
  'Store records in a file or database.',
  'Introduce a graphical interface and support multiple parking lanes.',
  'Use a priority queue for emergency vehicles if required.',
];

export const REAL_WORLD_USES = [
  'Shopping malls & multiplexes',
  'Hospitals & emergency drop-off lanes',
  'University & college campuses',
  'Residential societies',
  'Systems with limited capacity & waiting lines',
];

export const REFERENCES = [
  { id: 1, text: 'Reema Thareja, Data Structures Using C, Oxford University Press.' },
  { id: 2, text: 'Ellis Horowitz, Sartaj Sahni and Susan Anderson-Freed, Fundamentals of Data Structures in C, Universities Press.' },
  { id: 3, text: 'Seymour Lipschutz, Data Structures, Schaum’s Outline Series, McGraw-Hill.' },
  { id: 4, text: 'Brian W. Kernighan and Dennis M. Ritchie, The C Programming Language, 2nd ed., Prentice Hall.' },
  { id: 5, text: 'C Reference, String handling', url: 'https://en.cppreference.com/w/c/string/byte' },
  { id: 6, text: 'C Reference, Input/output', url: 'https://en.cppreference.com/w/c/io' },
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

export const MAIN_C_SOURCE = `#include <stdio.h>
#include <string.h>

#define MAX 100
#define LEN 32

char parked[MAX][LEN], waiting[MAX][LEN];
int top = -1, front = 0, rear = 0, count = 0, capacity;

void push(const char plate[]) {
    strcpy(parked[++top], plate);
}

void enqueue(const char plate[]) {
    strcpy(waiting[rear], plate);
    rear = (rear + 1) % MAX;
    count++;
}

int exists(const char plate[]) {
    for (int i = 0; i <= top; i++)
        if (strcmp(parked[i], plate) == 0) return 1;
    for (int i = 0; i < count; i++)
        if (strcmp(waiting[(front+i)%MAX], plate) == 0) return 1;
    return 0;
}

void entry(const char plate[]) {
    if (exists(plate)) {
        printf("Vehicle %s is already in the system.\\n", plate);
    } else if (top + 1 < capacity) {
        push(plate);
        printf("Vehicle %s parked at slot %d.\\n", plate, top+1);
    } else if (count < MAX) {
        enqueue(plate);
        printf("Parking full. %s waiting at position %d.\\n", plate, count);
    } else {
        puts("Waiting queue is full.");
    }
}

void vehicleExit(void) {
    if (top == -1) {
        puts("Parking lot is empty.");
        return;
    }
    printf("Vehicle %s has left.\\n", parked[top--]);
    if (count > 0) {
        push(waiting[front]);
        front = (front + 1) % MAX;
        count--;
        printf("%s parked automatically.\\n", parked[top]);
    }
}

void display(void) {
    puts("Parked vehicles (top to bottom):");
    if (top == -1) puts("None");
    for (int i = top; i >= 0; i--)
        printf("Slot %d: %s%s\\n", i+1, parked[i], i==top?" (TOP)":"");
    puts("Waiting vehicles (front to rear):");
    if (count == 0) puts("None");
    for (int i = 0; i < count; i++)
        printf("Position %d: %s%s\\n", i+1, waiting[(front+i)%MAX],
               i==0?" (FRONT)":"");
}

void status(void) {
    printf("Capacity: %d | Parked: %d | Free: %d | Waiting: %d\\n",
           capacity, top+1, capacity-top-1, count);
}

/* Read a bounded line; discard any excess input. */
int readLine(char line[], int size) {
    if (!fgets(line, size, stdin)) return 0;
    if (!strchr(line, '\\n')) {
        int ch;
        while ((ch = getchar()) != '\\n' && ch != EOF) {}
        return -1;
    }
    return 1;
}

int readNumber(void) {
    char line[80], extra;
    int n, result = readLine(line, sizeof line);
    if (result == 0) return -2;
    if (result == 1 && sscanf(line, "%3d %c", &n, &extra) == 1 && n >= 0)
        return n;
    return -1;
}

int main(void) {
    int choice;
    char line[80], plate[LEN], extra;
    puts("===== SMART PARKING LOT MANAGEMENT SYSTEM =====");
    do {
        printf("Enter parking capacity (1-100): ");
        capacity = readNumber();
        if (capacity == -2) return 0;
    } while (capacity < 1 || capacity > MAX);

    do {
        puts("\\n1. Vehicle Entry\\n2. Vehicle Exit\\n3. Display Vehicles"
             "\\n4. Parking Status\\n0. Exit Program");
        printf("Enter choice: ");
        choice = readNumber();
        switch (choice) {
            case 1:
                printf("Enter vehicle number: ");
                if (readLine(line, sizeof line) == 1 &&
                    sscanf(line, "%31s %c", plate, &extra) == 1)
                    entry(plate);
                else puts("Invalid vehicle number.");
                break;
            case 2: vehicleExit(); break;
            case 3: display(); break;
            case 4: status(); break;
            case 0: puts("Thank you for using the system."); break;
            case -2: return 0;
            default: puts("Invalid choice. Try again.");
        }
    } while (choice != 0);
    return 0;
}
`;


