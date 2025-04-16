"use client"

import type React from "react"

import { useState } from "react"
import { assignStudentsToCourse } from "@/actions/courses"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import type { Student } from "@/types"

interface AssignStudentsFormProps {
  courseId: string
  allStudents: Student[]
  enrolledStudentIds: string[]
}

export default function AssignStudentsForm({ courseId, allStudents, enrolledStudentIds }: AssignStudentsFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>(enrolledStudentIds)

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId)
      } else {
        return [...prev, studentId]
      }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await assignStudentsToCourse(courseId, selectedStudents)

      if (result.success) {
        toast({
          title: "Success",
          description: "Students assigned successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to assign students",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4 max-h-60 overflow-y-auto border rounded-md p-4">
        {allStudents.length === 0 ? (
          <p className="text-muted-foreground">No students available</p>
        ) : (
          allStudents.map((student) => (
            <div key={student.id} className="flex items-center space-x-2">
              <Checkbox
                id={`student-${student.id}`}
                checked={selectedStudents.includes(student.id)}
                onCheckedChange={() => handleStudentToggle(student.id)}
              />
              <label
                htmlFor={`student-${student.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {student.name} ({student.email})
              </label>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mr-2">Saving...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            "Save Assignments"
          )}
        </Button>
      </div>
    </form>
  )
}
