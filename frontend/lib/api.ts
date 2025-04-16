import type { Student, Course, Assignment, CourseFilters } from "@/types"

// Mock data for frontend development
const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    createdAt: new Date("2023-03-10"),
  },
]

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    createdAt: new Date("2023-01-01"),
    students: [mockStudents[0], mockStudents[1]],
    assignments: [
      {
        id: "1",
        title: "HTML Basics",
        description: "Create a simple HTML page",
        dueDate: new Date("2023-02-15"),
        courseId: "1",
      },
      {
        id: "2",
        title: "CSS Styling",
        description: "Style the HTML page created in the previous assignment",
        dueDate: new Date("2023-03-01"),
        courseId: "1",
      },
    ],
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts and frameworks",
    createdAt: new Date("2023-02-01"),
    students: [mockStudents[0], mockStudents[2]],
    assignments: [
      {
        id: "3",
        title: "React Components",
        description: "Build a component-based UI",
        dueDate: new Date("2023-04-10"),
        courseId: "2",
      },
    ],
  },
  {
    id: "3",
    title: "Database Design",
    description: "Learn relational database concepts and SQL",
    createdAt: new Date("2023-03-01"),
    students: [mockStudents[1]],
    assignments: [],
  },
]

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "HTML Basics",
    description: "Create a simple HTML page",
    dueDate: new Date("2023-02-15"),
    courseId: "1",
    course: mockCourses[0],
  },
  {
    id: "2",
    title: "CSS Styling",
    description: "Style the HTML page created in the previous assignment",
    dueDate: new Date("2023-03-01"),
    courseId: "1",
    course: mockCourses[0],
  },
  {
    id: "3",
    title: "React Components",
    description: "Build a component-based UI",
    dueDate: new Date("2023-04-10"),
    courseId: "2",
    course: mockCourses[1],
  },
]

// API client functions
export async function getStudents(): Promise<Student[]> {
  // In a real app, this would be a fetch call to your API
  return mockStudents
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  return mockStudents.find((student) => student.id === id)
}

export async function getCourses(filters?: CourseFilters): Promise<Course[]> {
  let filteredCourses = [...mockCourses]

  if (filters) {
    if (filters.title) {
      filteredCourses = filteredCourses.filter((course) =>
        course.title.toLowerCase().includes(filters.title!.toLowerCase()),
      )
    }

    if (filters.studentId) {
      filteredCourses = filteredCourses.filter((course) =>
        course.students?.some((student) => student.id === filters.studentId),
      )
    }

    if (filters.assignmentTitle) {
      filteredCourses = filteredCourses.filter((course) =>
        course.assignments?.some((assignment) =>
          assignment.title.toLowerCase().includes(filters.assignmentTitle!.toLowerCase()),
        ),
      )
    }
  }

  return filteredCourses
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  return mockCourses.find((course) => course.id === id)
}

export async function getAssignments(): Promise<Assignment[]> {
  return mockAssignments
}

export async function getAssignmentById(id: string): Promise<Assignment | undefined> {
  return mockAssignments.find((assignment) => assignment.id === id)
}
