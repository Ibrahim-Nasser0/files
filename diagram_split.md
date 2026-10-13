# Sequence Diagram — Split by Section

---

## Section 1 — Login & Logout

```mermaid
sequenceDiagram
    autonumber
    actor Student
    actor Instructor
    actor Admin
    participant UI as Frontend
    participant Auth as Auth / API Gateway
    participant DB as Database

    note over Student,Auth: All roles share the same login mechanism

    Student->>UI: Login (email, password)
    activate UI
    UI->>Auth: Send credentials
    activate Auth
    Auth->>DB: Verify credentials & get role
    activate DB
    DB-->>Auth: User data + role
    deactivate DB
    alt Valid credentials
        Auth-->>UI: Login successful + access token
        UI-->>Student: Show role-specific dashboard
    else Invalid credentials
        Auth-->>UI: 401 Unauthorized
        UI-->>Student: Show error message
    end
    deactivate Auth
    deactivate UI

    Instructor->>UI: Login (email, password)
    activate UI
    UI->>Auth: Send credentials
    activate Auth
    Auth->>DB: Verify credentials & get role
    activate DB
    DB-->>Auth: User data + role
    deactivate DB
    alt Valid credentials
        Auth-->>UI: Login successful + access token
        UI-->>Instructor: Show role-specific dashboard
    else Invalid credentials
        Auth-->>UI: 401 Unauthorized
        UI-->>Instructor: Show error message
    end
    deactivate Auth
    deactivate UI

    note over Admin,DB: Admin account is pre-created in the database.
    Admin->>UI: Login (email, password)
    activate UI
    UI->>Auth: Send credentials
    activate Auth
    Auth->>DB: Verify credentials & get role
    activate DB
    DB-->>Auth: User data + role (Admin)
    deactivate DB
    alt Valid credentials
        Auth-->>UI: Login successful + access token
        UI-->>Admin: Show role-specific dashboard
    else Invalid credentials
        Auth-->>UI: 401 Unauthorized
        UI-->>Admin: Show error message
    end
    deactivate Auth
    deactivate UI

    note over Student,Auth: Logout (applies to all roles)
    Student->>UI: Logout
    activate UI
    UI->>Auth: Invalidate token
    activate Auth
    Auth->>DB: Blacklist / remove token
    activate DB
    DB-->>Auth: Done
    deactivate DB
    Auth-->>UI: Logged out
    deactivate Auth
    UI-->>Student: Redirect to login screen
    deactivate UI
```

---

## Section 2 — Admin: User Management & Settings

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant UI as Frontend
    participant Auth as Auth / API Gateway
    participant System as Core System
    participant DB as Database

    Admin->>UI: Access user management
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    alt Token valid
        Auth->>System: Forward (check admin role)
        activate System
        System->>DB: Fetch all users
        activate DB
        DB-->>System: Users list
        deactivate DB
        System-->>Auth: Users data
        deactivate System
        Auth-->>UI: Show users
        UI-->>Admin: Display user list (add/edit/remove buttons)
    else Token expired or invalid
        Auth-->>UI: 401 Unauthorized
        UI-->>Admin: Redirect to login
    end
    deactivate Auth
    deactivate UI

    opt Add User
        Admin->>UI: Fill new user details, select role
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Insert new user
        activate DB
        DB-->>System: Created
        deactivate DB
        System-->>Auth: Success
        deactivate System
        Auth-->>UI: User added
        deactivate Auth
        UI-->>Admin: Confirmation
        deactivate UI
    end

    opt Edit / Remove User
        Admin->>UI: Select user, modify or delete
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Perform update / delete
        activate DB
        DB-->>System: Completed
        deactivate DB
        System-->>Auth: Confirmation
        deactivate System
        Auth-->>UI: Action done
        deactivate Auth
        UI-->>Admin: Confirmation
        deactivate UI
    end

    Admin->>UI: Change system settings (deadline grace, permissions)
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Store new settings
    activate DB
    DB-->>System: Updated
    deactivate DB
    System-->>Auth: Settings saved
    deactivate System
    Auth-->>UI: Settings updated
    deactivate Auth
    UI-->>Admin: Confirmation
    deactivate UI
```

---

## Section 3 — Admin: Course Management

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant UI as Frontend
    participant Auth as Auth / API Gateway
    participant System as Core System
    participant DB as Database
    participant Notify as Notification Service

    Admin->>UI: Access course management
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward (check admin role)
    activate System
    System->>DB: Fetch all courses
    activate DB
    DB-->>System: Courses list
    deactivate DB
    System-->>Auth: Courses data
    deactivate System
    Auth-->>UI: Show courses
    deactivate Auth
    UI-->>Admin: Display courses with management options
    deactivate UI

    opt Create Course
        Admin->>UI: Fill course details (name, description, etc.)
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Insert new course
        activate DB
        DB-->>System: Created
        deactivate DB
        System-->>Auth: Success
        deactivate System
        Auth-->>UI: Course created
        deactivate Auth
        UI-->>Admin: Confirmation
        deactivate UI
    end

    opt Edit Course
        Admin->>UI: Select course, modify details
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Update course details
        activate DB
        DB-->>System: Updated
        deactivate DB
        System-->>Auth: Success
        deactivate System
        Auth-->>UI: Course updated
        deactivate Auth
        UI-->>Admin: Confirmation
        deactivate UI
    end

    opt Delete Course
        Admin->>UI: Select course, confirm deletion
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Check for dependencies (assignments, materials, enrollments)
        activate DB
        DB-->>System: Dependency check result
        deactivate DB
        alt No dependencies
            System->>DB: Delete course
            activate DB
            DB-->>System: Deleted
            deactivate DB
            System-->>Auth: Success
            Auth-->>UI: Course deleted
            UI-->>Admin: Confirmation
        else Has dependencies
            System-->>Auth: 409 Conflict – has existing data
            Auth-->>UI: Error
            UI-->>Admin: Show reason (assignments / enrollments exist)
        end
        deactivate System
        deactivate Auth
        deactivate UI
    end

    opt Assign Instructors to Course
        Admin->>UI: Select course, manage instructor assignments
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Fetch available instructors (role = Instructor)
        activate DB
        DB-->>System: Instructors list
        deactivate DB
        System-->>Auth: Instructors data
        deactivate System
        Auth-->>UI: Show instructors and current assignments
        deactivate Auth
        UI-->>Admin: Display list with assignment toggles
        deactivate UI

        Admin->>UI: Select instructors to assign / unassign
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Update course-instructor assignments
        activate DB
        DB-->>System: Updated
        deactivate DB
        System->>Notify: Notify newly assigned instructors
        activate Notify
        Notify-->>System: Notification queued
        deactivate Notify
        System-->>Auth: Assignments updated
        deactivate System
        Auth-->>UI: Success
        deactivate Auth
        UI-->>Admin: Confirmation
        deactivate UI
    end

    opt Enroll Students in Course
        Admin->>UI: Select course, manage student enrollments
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Fetch available students (role = Student)
        activate DB
        DB-->>System: Students list
        deactivate DB
        System-->>Auth: Students data
        deactivate System
        Auth-->>UI: Show students and current enrollments
        deactivate Auth
        UI-->>Admin: Display list with enrollment toggles
        deactivate UI

        Admin->>UI: Select students to enroll / unenroll
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Update course-student enrollments
        activate DB
        DB-->>System: Updated
        deactivate DB
        System->>Notify: Notify newly enrolled students
        activate Notify
        Notify-->>System: Notification queued
        deactivate Notify
        System-->>Auth: Enrollments updated
        deactivate System
        Auth-->>UI: Success
        deactivate Auth
        UI-->>Admin: Confirmation
        deactivate UI
    end
```

---

## Section 4 — Instructor Actions

```mermaid
sequenceDiagram
    autonumber
    actor Instructor
    participant UI as Frontend
    participant Auth as Auth / API Gateway
    participant System as Core System
    participant DB as Database
    participant Notify as Notification Service

    Instructor->>UI: Create new assignment (title, questions, deadline, student list)
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward after token validation
    activate System
    System->>DB: Store assignment
    activate DB
    DB-->>System: Assignment ID
    deactivate DB
    System->>Notify: Send notification to selected students
    activate Notify
    Notify-->>System: Notification queued
    deactivate Notify
    System-->>Auth: Assignment created
    deactivate System
    Auth-->>UI: Success
    deactivate Auth
    UI-->>Instructor: Confirmation
    deactivate UI

    Instructor->>UI: Edit assignment (title, questions, deadline, student list)
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Check assignment status and publish date
    activate DB
    DB-->>System: Status + publish date
    deactivate DB
    alt Before publish date
        System->>DB: Update assignment details
        activate DB
        DB-->>System: Updated
        deactivate DB
        System-->>Auth: Changes saved
        Auth-->>UI: Success
        UI-->>Instructor: Confirmation
    else After publish date
        System-->>Auth: 403 Forbidden – cannot edit after publication
        Auth-->>UI: Error
        UI-->>Instructor: Show reason
    end
    deactivate System
    deactivate Auth
    deactivate UI

    Instructor->>UI: Delete assignment
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Check publish date
    activate DB
    DB-->>System: Status + publish date
    deactivate DB
    alt After publish date
        System-->>Auth: 403 Forbidden – cannot delete after publication
        Auth-->>UI: Error
        UI-->>Instructor: Show reason
    else Before publish date
        System->>DB: Check if no submissions exist
        activate DB
        DB-->>System: Submissions count
        deactivate DB
        alt No submissions
            System->>DB: Remove assignment
            activate DB
            DB-->>System: Deleted
            deactivate DB
            System-->>Auth: Assignment removed
            Auth-->>UI: Success
            UI-->>Instructor: Confirmation
        else Has submissions
            System-->>Auth: 409 Conflict – cannot delete with existing submissions
            Auth-->>UI: Error
            UI-->>Instructor: Show reason
        end
    end
    deactivate System
    deactivate Auth
    deactivate UI

    Instructor->>UI: Upload course material (file, description)
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Store material
    activate DB
    DB-->>System: Material ID
    deactivate DB
    System->>Notify: Notify enrolled students about new material
    activate Notify
    Notify-->>System: Notification queued
    deactivate Notify
    System-->>Auth: Material uploaded
    deactivate System
    Auth-->>UI: Success
    deactivate Auth
    UI-->>Instructor: Success message
    deactivate UI

    Instructor->>UI: Manage course material (edit or remove)
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    alt Edit material
        System->>DB: Update material details
        activate DB
        DB-->>System: Updated
        deactivate DB
        System-->>Auth: Done
        Auth-->>UI: Material updated
        UI-->>Instructor: Confirmation
    else Remove material
        System->>DB: Delete material record
        activate DB
        DB-->>System: Removed
        deactivate DB
        System-->>Auth: Done
        Auth-->>UI: Material removed
        UI-->>Instructor: Confirmation
    end
    deactivate System
    deactivate Auth
    deactivate UI

    Instructor->>UI: View submissions for an assignment
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Fetch submissions
    activate DB
    DB-->>System: List of submissions
    deactivate DB
    System-->>Auth: Submission data
    deactivate System
    Auth-->>UI: Show submissions
    deactivate Auth
    UI-->>Instructor: Display submissions (list, files)
    deactivate UI

    loop For each submission
        Instructor->>UI: Enter grade & feedback
        activate UI
        UI->>Auth: Request with access token
        activate Auth
        Auth->>System: Forward
        activate System
        System->>DB: Update submission record
        activate DB
        DB-->>System: Updated
        deactivate DB
        System->>Notify: Notify student about grade
        activate Notify
        Notify-->>System: Notification sent
        deactivate Notify
        System-->>Auth: Grade recorded
        deactivate System
        Auth-->>UI: Grade saved
        deactivate Auth
        UI-->>Instructor: Confirmation
        deactivate UI
    end

    Instructor->>UI: Publish grades for assignment
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Mark grades as visible to students
    activate DB
    DB-->>System: Updated
    deactivate DB
    System->>Notify: Notify students – grades available
    activate Notify
    Notify-->>System: Notification queued
    deactivate Notify
    System-->>Auth: Grades published
    deactivate System
    Auth-->>UI: Success
    deactivate Auth
    UI-->>Instructor: Grades now visible to students
    deactivate UI
```

---

## Section 5 — Student Actions

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as Frontend
    participant Auth as Auth / API Gateway
    participant System as Core System
    participant DB as Database

    Student->>UI: Request assignments
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Fetch assignments for student's enrolled courses
    activate DB
    DB-->>System: List of assignments + deadlines + status
    deactivate DB
    System-->>Auth: Assignments data
    deactivate System
    Auth-->>UI: Show assignments
    deactivate Auth
    UI-->>Student: Display assignments with deadlines
    deactivate UI

    Student->>UI: Submit assignment (file / text)
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Check deadline and existing submission
    activate DB
    DB-->>System: Deadline + submission status
    deactivate DB
    alt Deadline passed
        System-->>Auth: 403 Forbidden – deadline has passed
        Auth-->>UI: Error
        UI-->>Student: "Submission closed – deadline passed"
    else Already submitted
        System-->>Auth: 409 Conflict – already submitted
        Auth-->>UI: Error
        UI-->>Student: "You have already submitted this assignment"
    else Valid submission
        System->>DB: Store submission (timestamp)
        activate DB
        DB-->>System: Submission ID
        deactivate DB
        System-->>Auth: Submission confirmed
        Auth-->>UI: Success
        UI-->>Student: "Submitted successfully"
    end
    deactivate System
    deactivate Auth
    deactivate UI

    Student->>UI: View grades
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Fetch published grades for student
    activate DB
    DB-->>System: List of grades + feedback
    deactivate DB
    System-->>Auth: Grades data
    deactivate System
    Auth-->>UI: Show grades
    deactivate Auth
    UI-->>Student: Display grades with comments
    deactivate UI

    Student->>UI: View materials
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Fetch materials for student's enrolled courses only
    activate DB
    DB-->>System: Materials list
    deactivate DB
    System-->>Auth: Materials data
    deactivate System
    Auth-->>UI: Show materials
    deactivate Auth
    UI-->>Student: Display downloadable materials
    deactivate UI

    Student->>UI: Check notifications
    activate UI
    UI->>Auth: Request with access token
    activate Auth
    Auth->>System: Forward
    activate System
    System->>DB: Fetch unread / read notifications
    activate DB
    DB-->>System: Notifications list
    deactivate DB
    System-->>Auth: Notifications
    deactivate System
    Auth-->>UI: Show notifications
    deactivate Auth
    UI-->>Student: Display notifications
    deactivate UI
```
