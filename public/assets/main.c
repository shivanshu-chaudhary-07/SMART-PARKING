/*
 * Smart Parking Lot Management System
 * Using Stack (LIFO) for parked vehicles and Queue (FIFO) for waiting vehicles in C
 *
 * Compile: gcc -std=c11 -Wall -Wextra main.c -o parking
 * Run:     ./parking
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PLATE 32
#define MAX_WAITING 256

typedef struct {
    char **items;
    int top;
    int capacity;
} Stack;

typedef struct {
    char items[MAX_WAITING][MAX_PLATE];
    int front;
    int rear;
    int count;
} Queue;

typedef struct {
    int capacity;
    Stack parked;
    Queue waiting;
} ParkingLot;

/* ---------- Stack Operations (LIFO) ---------- */

static int stackInit(Stack *s, int cap) {
    s->items = (char **)malloc((size_t)cap * sizeof(char *));
    if (!s->items) return 0;
    for (int i = 0; i < cap; i++) {
        s->items[i] = (char *)malloc(MAX_PLATE * sizeof(char));
        if (!s->items[i]) {
            for (int j = 0; j < i; j++) free(s->items[j]);
            free(s->items);
            return 0;
        }
    }
    s->top = -1;
    s->capacity = cap;
    return 1;
}

static void stackFree(Stack *s) {
    for (int i = 0; i < s->capacity; i++) {
        free(s->items[i]);
    }
    free(s->items);
}

static int stackIsEmpty(const Stack *s) {
    return s->top == -1;
}

static int stackIsFull(const Stack *s) {
    return s->top + 1 == s->capacity;
}

static int stackSize(const Stack *s) {
    return s->top + 1;
}

static void stackPush(Stack *s, const char *plate) {
    if (stackIsFull(s)) return;
    s->top++;
    strncpy(s->items[s->top], plate, MAX_PLATE - 1);
    s->items[s->top][MAX_PLATE - 1] = '\0';
}

static void stackPop(Stack *s, char *outPlate) {
    if (stackIsEmpty(s)) return;
    strncpy(outPlate, s->items[s->top], MAX_PLATE - 1);
    outPlate[MAX_PLATE - 1] = '\0';
    s->top--;
}

/* ---------- Queue Operations (FIFO) ---------- */

static void queueInit(Queue *q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

static int queueIsEmpty(const Queue *q) {
    return q->count == 0;
}

static int queueIsFull(const Queue *q) {
    return q->count == MAX_WAITING;
}

static void queueEnqueue(Queue *q, const char *plate) {
    if (queueIsFull(q)) return;
    q->rear = (q->rear + 1) % MAX_WAITING;
    strncpy(q->items[q->rear], plate, MAX_PLATE - 1);
    q->items[q->rear][MAX_PLATE - 1] = '\0';
    q->count++;
}

static void queueDequeue(Queue *q, char *outPlate) {
    if (queueIsEmpty(q)) return;
    strncpy(outPlate, q->items[q->front], MAX_PLATE - 1);
    outPlate[MAX_PLATE - 1] = '\0';
    q->front = (q->front + 1) % MAX_WAITING;
    q->count--;
}

/* ---------- ParkingLot Logic ---------- */

static int isParked(const ParkingLot *lot, const char *plate) {
    for (int i = lot->parked.top; i >= 0; i--) {
        if (strcmp(lot->parked.items[i], plate) == 0) return 1;
    }
    return 0;
}

static int isWaiting(const ParkingLot *lot, const char *plate) {
    for (int i = 0; i < lot->waiting.count; i++) {
        int idx = (lot->waiting.front + i) % MAX_WAITING;
        if (strcmp(lot->waiting.items[idx], plate) == 0) return 1;
    }
    return 0;
}

static void vehicleEntry(ParkingLot *lot, const char *plate) {
    if (isParked(lot, plate) || isWaiting(lot, plate)) {
        printf("Vehicle %s is already in the system.\n", plate);
        return;
    }
    if (!stackIsFull(&lot->parked)) {
        stackPush(&lot->parked, plate);
        printf("Vehicle %s parked at slot %d.\n", plate, stackSize(&lot->parked));
    } else if (!queueIsFull(&lot->waiting)) {
        queueEnqueue(&lot->waiting, plate);
        printf("Parking is FULL. Vehicle %s added to waiting queue at position %d.\n",
               plate, lot->waiting.count);
    } else {
        printf("Both parking lot and waiting queue are full.\n");
    }
}

static void vehicleExit(ParkingLot *lot) {
    if (stackIsEmpty(&lot->parked)) {
        printf("Parking lot is empty. No vehicle to exit.\n");
        return;
    }

    char leaving[MAX_PLATE];
    stackPop(&lot->parked, leaving);
    printf("Vehicle %s has left the parking lot.\n", leaving);

    if (!queueIsEmpty(&lot->waiting)) {
        char nextVehicle[MAX_PLATE];
        queueDequeue(&lot->waiting, nextVehicle);
        stackPush(&lot->parked, nextVehicle);
        printf("Slot free. Waiting vehicle %s is now parked automatically.\n",
               nextVehicle);
    }
}

static void displayParked(const ParkingLot *lot) {
    if (stackIsEmpty(&lot->parked)) {
        printf("No vehicles are parked.\n");
        return;
    }
    printf("Parked vehicles (top to bottom):\n");
    for (int i = lot->parked.top; i >= 0; i--) {
        int slot = i + 1;
        printf("  Slot %d : %s%s\n", slot, lot->parked.items[i],
               (i == lot->parked.top) ? " <-- TOP" : "");
    }
}

static void displayWaiting(const ParkingLot *lot) {
    if (queueIsEmpty(&lot->waiting)) {
        printf("No vehicles are waiting.\n");
        return;
    }
    printf("Waiting vehicles (front to rear):\n");
    for (int i = 0; i < lot->waiting.count; i++) {
        int idx = (lot->waiting.front + i) % MAX_WAITING;
        printf("  Position %d : %s%s\n", i + 1, lot->waiting.items[idx],
               (i == 0) ? " <-- FRONT" : "");
    }
}

static void showStatus(const ParkingLot *lot) {
    int parkedCount = stackSize(&lot->parked);
    printf("Capacity: %d | Parked: %d | Free: %d | Waiting: %d\n",
           lot->capacity, parkedCount, lot->capacity - parkedCount, lot->waiting.count);
}

static void clearInputLine(void) {
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF) {
    }
}

int main(void) {
    int capacity = 0;
    printf("===== SMART PARKING LOT MANAGEMENT SYSTEM (C) =====\n");
    printf("Enter parking capacity: ");
    while (scanf("%d", &capacity) != 1 || capacity <= 0) {
        clearInputLine();
        printf("Please enter a positive number: ");
    }

    ParkingLot lot;
    lot.capacity = capacity;
    if (!stackInit(&lot.parked, capacity)) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }
    queueInit(&lot.waiting);

    int choice = -1;
    do {
        printf("\n----------- MENU -----------\n");
        printf("1. Vehicle Entry\n");
        printf("2. Vehicle Exit\n");
        printf("3. Display Parked Vehicles\n");
        printf("4. Display Waiting Vehicles\n");
        printf("5. Show Parking Status\n");
        printf("0. Exit Program\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            clearInputLine();
            printf("Invalid input. Try again.\n");
            choice = -1;
            continue;
        }

        switch (choice) {
            case 1: {
                char plate[MAX_PLATE];
                printf("Enter vehicle number: ");
                if (scanf("%31s", plate) == 1) {
                    vehicleEntry(&lot, plate);
                }
                break;
            }
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
            case 0:
                printf("Thank you for using the system.\n");
                break;
            default:
                printf("Invalid choice. Try again.\n");
        }
    } while (choice != 0);

    stackFree(&lot.parked);
    return 0;
}
