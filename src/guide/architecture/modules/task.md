---
layout: doc
---

# 🏁 Task

Xila is a multitasking operating system. It is designed to run multiple tasks simultaneously. Each task is a separate thread that runs independently of the others. Tasks can communicate with each other using messages and events.

## Features

The task module offers the following features:

- **Asynchronous tasks**: Support for async/await syntax for non-blocking operations. No need to manually yield control or context switch penalties.
- **Creation and deletion**: Create and delete tasks dynamically.
- **Scheduling**: Preemptive and cooperative multitasking.
- **Synchronization**: Semaphores, mutexes, and other synchronization primitives.
- **Communication**: Message queues and event flags for inter-task communication.

## Dependencies

Task module is implemented on top of [embassy](https://github.com/embassy-rs/embassy) with the following crates:

- `embassy-executor`: Provides the executor for running asynchronous tasks.
- `embassy-sync`: Provides synchronization primitives like mutexes and semaphores.
- `embassy-time`: Provides time-related functionalities like delays and timeouts.

It also relies on the following modules:

- [Time](./time.md): Used for task delays and timeouts.
- [Users](./users.md): Used for task ownership and permissions.
- [Memory](./memory.md): Used for task stack allocation.

## Architecture

Each task is represented by a `Task` struct that contains the following information:

- `Name`: The name of the task.
- `Parent`: The parent task of the task.
- `Environment variables`: The environment variables associated with the task.
- `User`: The user that owns the task.

Each of these structures can be accessed and modified using the `TaskIdentifier` which is a system-wide unique identifier for each task.

## Known limitations

The task module has the following known limitations:

- **Need for cooperation**: Since it relies on an uninterruptible executor, all tasks must cooperate by yielding control periodically. Long-running tasks that do not await or yield can block the executor and prevent other tasks from running.

## Future improvements

Planned future improvements for the task module include:

- **Allow task to be moved accross executors**: Currently, tasks are bound to the executor they were created on. It would be beneficial to allow tasks to be dynamically moved between executors to improve load balancing and resource utilization.

## References

- <HostReference crate="task" />

## See also

- [Time](./time.md)
- [Users](./users.md)
- [Memory](./memory.md)
