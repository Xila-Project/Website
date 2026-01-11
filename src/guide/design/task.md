---
layout: doc
---

# 🏁 Task

Xila is a multitasking operating system. It is designed to run multiple tasks simultaneously. Each task is a separate program that runs independently of the others. Tasks can communicate with each other using messages and events.

## Management

Tasks are managed by the kernel, more specifically by the `Task::Manager_type`. The task manager is responsible for registering tasks and their metadata. However, the scheduling is delegated to the underlying (RT)OS.

## Implementation

Under the hood, tasks are implemented as a `std::thread::Thread`. However, on regular operating systems, tasks are executed similarly to threads, but on microcontrollers, tasks are executed in a cooperative multitasking manner. This means that tasks must yield control to other tasks in order to allow them to run.

## Memory

Each task has its own stack, however, due to the absence of MMU in most microcontrollers, the memory space is shared between tasks and thus tasks can access each other's memory. This is a limitation of the current implementation and may change in the future.

## Metadata

Each task has metadata associated with it.
This metadata includes :

- `Name`: The name of the task.
- `Priority`: The priority of the task.
- `State`: The state of the task (running, ready, blocked, etc.).
- `Stack size`: The size of the stack allocated to the task.
- `Parent`: The parent task of the task.

## Priority

Each task has a priority level, which determines the order in which tasks are executed. Tasks with higher priority levels are executed before tasks with lower priority levels.
