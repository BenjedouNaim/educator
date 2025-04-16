"use server"

import type { Student } from "@/types"
import { getStudents as apiGetStudents, getStudentById as apiGetStudentById } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function getStudents(): Promise<Student[]> {
  return apiGetStudents()
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  return apiGetStudentById(id)
}

export async function createStudent(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    // In a real app, this would call your API to create a student
    // For now, we'll just simulate a successful creation

    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    // Validate form data
    if (!name || !email) {
      return { success: false, message: "Name and email are required" }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the students page to show the new student
    revalidatePath("/students")

    return { success: true }
  } catch (error) {
    console.error("Error creating student:", error)
    return { success: false, message: "Failed to create student" }
  }
}
