export interface Student {
    id: string
    name: string
    email: string
    createdAt: Date
  }
  
  export interface Course {
    id: string
    title: string
    description: string
    createdAt: Date
    students?: Student[]
    assignments?: Assignment[]
  }
  
  export interface Assignment {
    id: string
    title: string
    description: string
    dueDate: Date
    courseId: string
    course?: Course
    completed?: boolean
  }
  
  export interface StudentCourse {
    studentId: string
    courseId: string
  }
  
  export interface CourseFilters {
    title?: string
    studentId?: string
    assignmentTitle?: string
  }
  