"use server"

import type { Assignment } from "@/types"
import { getAssignments as apiGetAssignments, getAssignmentById as apiGetAssignmentById } from "@/lib/api"
import { revalidatePath } from "next/cache"

export async function getAssignments(): Promise<Assignment[]> {
  return apiGetAssignments()
}

export async function getAssignmentById(id: string): Promise<Assignment | undefined> {
  return apiGetAssignmentById(id)
}

export async function createAssignment(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    // In a real app, this would call your API to create an assignment
    // For now, we'll just simulate a successful creation

    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const dueDate = formData.get("dueDate") as string
    const courseId = formData.get("courseId") as string

    // Validate form data
    if (!title || !courseId) {
      return { success: false, message: "Title and course are required" }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the assignments page to show the new assignment
    revalidatePath("/assignments")
    // Also revalidate the course page since it shows assignments
    revalidatePath(`/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error("Error creating assignment:", error)
    return { success: false, message: "Failed to create assignment" }
  }
}

export async function toggleAssignmentCompletion(
  assignmentId: string,
  completed: boolean,
): Promise<{ success: boolean; message?: string }> {
  try {
    // In a real app, this would call your API to update an assignment
    // For now, we'll just simulate a successful update

    // Validate input
    if (!assignmentId) {
      return { success: false, message: "Assignment ID is required" }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the assignments page to show the updated assignment
    revalidatePath("/assignments")

    return { success: true }
  } catch (error) {
    console.error("Error updating assignment:", error)
    return { success: false, message: "Failed to update assignment" }
  }
}
