import type { ScriptAction } from '../simulation/parkingLot';

export const REPORT_PDF_URL = '/assets/aistudio/Project-Report_42888068.pdf';

export const PROJECT_METADATA = {
  institute: 'Maharaja Surajmal Institute of Technology',
  department: 'Department of Information Technology',
  affiliation: 'Affiliated to Guru Gobind Singh Indraprastha University, Delhi',
  subject: 'Data Structures (DSA)',
  documentType: 'B.Tech Project Report',
  title: 'Smart Parking Lot Management System',
  subtitle: 'Using Stack and Queue in C++',
  programme: 'B.Tech Information Technology, 3rd Semester',
  section: 'IT-E',
  submittedTo: 'Dr. Sunesh Malik',
  submissionDate: '25/11/2026',
  academicSession: '2026–27',
  compilerCommand: 'g++ -std=c++17 -Wall -Wextra main.cpp -o parking',
  team: [
    { name: 'Himani', enrollment: '00296302825' },
    { name: 'Khushboo', enrollment: '03296302825' },
    { name: 'Shivanshu', enrollment: '01596302825' },
  ],
  keywords: ['Data Structures', 'Stack', 'Queue', 'LIFO', 'FIFO', 'Parking Management', 'C++', 'STL'],
};

export const ABSTRACT_TEXT =
  'Parking is a daily problem in cities. When a lot is full, vehicles wait at the gate in no fixed order, which wastes time and fuel and causes arguments and traffic jams. This project presents a Smart Parking Lot Management System, a menu-driven C++ program that uses two core linear data structures: a Stack (LIFO) to store vehicles parked inside a single-lane lot, and a Queue (FIFO) to store vehicles waiting outside. The program enforces lot capacity, parks or queues each arriving vehicle, rejects duplicate vehicle numbers, and automatically parks the longest-waiting vehicle whenever a slot becomes free.';

export const OBJECTIVES = [
  'Store parked vehicles in a Stack (LIFO) and waiting vehicles in a Queue (FIFO).',
  'Verify available parking capacity before assigning a slot.',
  'Enqueue arriving vehicles into a fair waiting line when the lot is full.',
  'Automatically dequeue and park the front waiting vehicle whenever a parked vehicle exits.',
  'Display live parked and waiting lists on demand while rejecting duplicate vehicle numbers.',
];

export const STACK_VS_QUEUE_ROWS = [
  { point: 'Rule', stack: 'LIFO (Last In, First Out)', queue: 'FIFO (First In, First Out)' },
  { point: 'Insertion', stack: 'At the top (push)', queue: 'At the rear (enqueue / push)' },
  { point: 'Deletion', stack: 'From the top (pop)', queue: 'From the front (dequeue / pop)' },
  { point: 'STL header', stack: '<stack>', queue: '<queue>' },
  { point: 'Role in this project', stack: 'Parked vehicles inside the lane', queue: 'Waiting vehicles outside the gate' },
  { point: 'Time per operation', stack: 'O(1)', queue: 'O(1)' },
];

export const MANUAL_VS_SYSTEM_ROWS = [
  { point: 'Records', manual: 'Paper register or guard memory', system: 'Stored cleanly in C++ STL containers' },
  { point: 'When full', manual: 'Vehicles wait in no fixed order', system: 'Vehicles wait in a fair FIFO queue' },
  { point: 'Free slot', manual: 'Found by manual visual search', system: 'Allocated automatically on exit' },
  { point: 'Duplicate vehicle', manual: 'May go unnoticed or logged twice', system: 'Detected and rejected immediately' },
  { point: 'Live status', manual: 'Counted by hand', system: 'Reported instantly via one menu option' },
];

export const VARIABLES_TABLE = [
  {
    item: 'Parked vehicles',
    type: 'stack<string> parked',
    purpose: 'Vehicles inside the lot. The last parked vehicle sits at the top and leaves first.',
    module: 'stack',
  },
  {
    item: 'Waiting vehicles',
    type: 'queue<string> waiting',
    purpose: 'Vehicles waiting outside. The first to arrive sits at the front and is served first.',
    module: 'queue',
  },
  {
    item: 'Vehicle number',
    type: 'string plate',
    purpose: 'Unique registration plate identifier such as MH12AB1234.',
    module: 'class',
  },
  {
    item: 'Capacity',
    type: 'int capacity',
    purpose: 'Maximum number of vehicles that can be parked simultaneously.',
    module: 'class',
  },
  {
    item: 'Parking lot',
    type: 'class ParkingLot',
    purpose: 'Encapsulates private data members and public operations safely.',
    module: 'class',
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
    description: 'Replays the recorded C++ terminal run using real Indian registration plates (MH12AB1234 through KA05IJ7890).',
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
  { id: 'start', step: 1, title: 'Read vehicle number', detail: 'Capture the incoming vehicle registration plate from the attendant menu.' },
  { id: 'dup', step: 2, title: 'Check duplicates across Stack & Queue', detail: 'Copy and scan both containers; if already present, print message and stop.' },
  { id: 'full', step: 3, title: 'Compare Stack size to capacity', detail: 'Evaluate parked.size() == capacity. If full, branch to step 5.' },
  { id: 'push', step: 4, title: 'Push onto Stack & report slot', detail: 'Insert vehicle on top of parked stack, display slot number (parked.size()), and stop.' },
  { id: 'enqueue', step: 5, title: 'Enqueue into Waiting Queue', detail: 'Append vehicle to rear of waiting queue, display queue position (waiting.size()), and stop.' },
];

export const EXIT_ALGORITHM_STEPS = [
  { id: 'empty', step: 1, title: 'Check if Stack is empty', detail: 'If parked.empty() is true, print "Parking lot is empty" and stop safely (no underflow).' },
  { id: 'pop', step: 2, title: 'Pop top vehicle from Stack', detail: 'Read parked.top(), pop it from the stack, and confirm the vehicle has left the lot.' },
  { id: 'qempty', step: 3, title: 'Check if Waiting Queue is empty', detail: 'If waiting.empty() is true, leave the freed slot open and stop.' },
  { id: 'transfer', step: 4, title: 'Dequeue front & push onto Stack', detail: 'Read waiting.front(), pop from queue, push onto parked stack, and announce automatic allocation.' },
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
    fn: 'isFull(), status()',
    time: 'O(1)',
    space: 'O(1)',
    reason: 'Only compares integer sizes or prints counts directly.',
  },
  {
    fn: 'vehicleEntry()',
    time: 'O(n + m)',
    space: 'O(n + m)',
    reason: 'Duplicate check copies and scans both containers; the underlying push/enqueue is O(1).',
  },
  {
    fn: 'vehicleExit()',
    time: 'O(1)',
    space: 'O(1)',
    reason: 'At most one stack pop, one queue dequeue, and one stack push.',
  },
  {
    fn: 'displayParked()',
    time: 'O(n)',
    space: 'O(n)',
    reason: 'Copies the parked stack to traverse from top to bottom without mutating state.',
  },
  {
    fn: 'displayWaiting()',
    time: 'O(m)',
    space: 'O(m)',
    reason: 'Copies the waiting queue to print from front to rear safely.',
  },
];

export const LIMITATIONS = [
  'Only the top vehicle of the Stack can exit. In a real multi-lane lot, any vehicle can leave.',
  'All state resides in RAM and is lost when the console program closes.',
  'No entry/exit timestamp tracking or parking fee calculation.',
  'Console-only interface modeling one single-lane lot and one gate.',
  'A waiting vehicle cannot leave the middle of the FIFO queue on its own.',
  'Registration plate format is accepted as any non-whitespace string in the C++ version.',
];

export const FUTURE_SCOPE = [
  'Allow arbitrary vehicle exit using a vector or hash map paired with an auxiliary stack for temporarily displaced cars.',
  'Add entry/exit timestamps and automated hourly parking fee computation.',
  'Persist records to a file or relational database across restarts.',
  'Build a full graphical desktop or mobile attendant interface.',
  'Upgrade to a Priority Queue to fast-track ambulances, emergency responders, or accessibility vehicles.',
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
  { id: 1, text: 'E. Horowitz, S. Sahni and D. Mehta, Fundamentals of Data Structures in C++, Universities Press.' },
  { id: 2, text: 'S. Lipschutz, Data Structures (Schaum’s Outline Series), McGraw-Hill Education.' },
  { id: 3, text: 'R. Thareja, Data Structures Using C, Oxford University Press.' },
  { id: 4, text: 'M. A. Weiss, Data Structures and Algorithm Analysis in C++, Pearson.' },
  { id: 5, text: 'C++ Reference, std::stack', url: 'https://en.cppreference.com/w/cpp/container/stack' },
  { id: 6, text: 'C++ Reference, std::queue', url: 'https://en.cppreference.com/w/cpp/container/queue' },
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
