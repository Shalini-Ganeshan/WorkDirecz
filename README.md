# WorkWiz - Freelance Task Management Platform

**WorkWiz** is a web portal specifically designed to streamline the task management process for **freelance workers** and **admins**. It allows admins to create and assign tasks to freelancers, who can then complete and submit them for review. Admins can approve or reject the tasks, ensuring a smooth workflow for both parties. Built with a **microservices architecture**, **WorkWiz** is scalable, easy to maintain, and optimized for handling large volumes of freelance work.

The platform is developed using **Spring Boot** for the backend, **React** for the frontend, **MySQL** for database management, and **Redux** for state management.

---

## Key Features

- **Admin Dashboard**:
  - Create and assign tasks to freelancers.
  - Review submitted tasks and approve/reject them.
  - Track the progress of tasks and manage task deadlines.

- **Freelancer Dashboard**:
  - View assigned tasks and deadlines.
  - Submit completed tasks for review and approval.
  - Track task status (e.g., submitted, accepted, rejected).

- **Task Management**:
  - Real-time updates on task assignments and progress.
  - Ability for freelancers to submit tasks for review and revision.
  - Admins can accept or reject submissions with feedback.

- **Microservices Architecture**:
  - Each service (e.g., Task Management, User Management, etc.) is decoupled to ensure scalability and maintainability.
  
- **State Management with Redux**:
  - Redux is used for managing global state across the platform, such as task data, user sessions, and UI elements.

---

## Technologies Used

- **Backend**: 
  - [Spring Boot](https://spring.io/projects/spring-boot) - For building the RESTful APIs and handling business logic.
  - [Spring Security](https://spring.io/projects/spring-security) - For securing the application (authentication & authorization).
  - [Spring Data JPA](https://spring.io/projects/spring-data) - For working with MySQL databases.
  - [JWT (JSON Web Tokens)](https://jwt.io/) - For user authentication and session management.

- **Frontend**:
  - [React](https://reactjs.org/) - For building the dynamic user interface.
  - [Redux](https://redux.js.org/) - For managing global state across the application, ensuring consistency of tasks, users, and UI components.
  - [React Router](https://reactrouter.com/) - For handling routing and navigation between pages (e.g., dashboard, task details).
  - [Axios](https://axios-http.com/) - For making HTTP requests to the backend.
  - [Redux Thunk](https://github.com/reduxjs/redux-thunk) - For handling asynchronous actions, such as fetching tasks and submitting them.

- **Database**:
  - [MySQL](https://www.mysql.com/) - Relational database to store user data, task details, and submission statuses.

- **Architecture**:
  - **Microservices**: Each service (e.g., Task Management, User Management, etc.) is decoupled to ensure scalability and maintainability.
