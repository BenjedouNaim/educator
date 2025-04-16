"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createAssignment } from "@/actions/assignments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Course } from "@/types"

interface AssignmentFormProps {
  courses: Course[]
  selectedCourseId?: string
}

export default function AssignmentForm({ courses, selectedCourseId }: AssignmentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courseId, setCourseId] = useState(selectedCourseId || "")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await createAssignment(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Assignment created successfully",
        })

        // Redirect to the course page if a course was selected
        if (courseId) {
          router.push(`/courses/${courseId}`)
        } else {
          router.push("/assignments")
        }
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create assignment",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Enter assignment title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Enter assignment description" rows={4} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input id="dueDate" name="dueDate" type="date" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="courseId">Course</Label>
        <Select value={courseId} onValueChange={(value) => setCourseId(value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="courseId" value={courseId} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mr-2">Creating...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            "Create Assignment"
          )}
        </Button>
      </div>
    </form>
  )
}
