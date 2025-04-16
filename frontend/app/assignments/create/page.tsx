import { getCourses } from "@/actions/courses"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AssignmentForm from "@/components/forms/AssignmentForm"

interface CreateAssignmentPageProps {
  searchParams: {
    courseId?: string
  }
}

export default async function CreateAssignmentPage({ searchParams }: CreateAssignmentPageProps) {
  const courses = await getCourses()
  const selectedCourseId = searchParams.courseId

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Create Assignment</h1>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Information</CardTitle>
          <CardDescription>Enter the details for the new assignment</CardDescription>
        </CardHeader>
        <CardContent>
          <AssignmentForm courses={courses} selectedCourseId={selectedCourseId} />
        </CardContent>
      </Card>
    </div>
  )
}
