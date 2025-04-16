"use server"

import type { Course, CourseFilters } from "@/types"
import { getCourses as apiGetCourses, getCourseById as apiGetCourseById } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function getCourses(filters?: CourseFilters): Promise<Course[]> {
  return apiGetCourses(filters)
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  return apiGetCourseById(id)
}

export async function createCourse(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    // In a real app, this would call your API to create a course
    // For now, we'll just simulate a successful creation

    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string

    // Validate form data
    if (!title) {
      return { success: false, message: "Title is required" }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the courses page to show the new course
    revalidatePath("/courses")

    return { success: true }
  } catch (error) {
    console.error("Error creating course:", error)
    return { success: false, message: "Failed to create course" }
  }
}

export async function assignStudentsToCourse(
  courseId: string,
  studentIds: string[],
): Promise<{ success: boolean; message?: string }> {
  try {
    // In a real app, this would call your API to assign students to a course
    // For now, we'll just simulate a successful assignment

    // Validate input
    if (!courseId || !studentIds.length) {
      return { success: false, message: "Course ID and at least one student are required" }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the course page to show the updated student assignments
    revalidatePath(`/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error("Error assigning students to course:", error)
    return { success: false, message: "Failed to assign students to course" }
  }
}
