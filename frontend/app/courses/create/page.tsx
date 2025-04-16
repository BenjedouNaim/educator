import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CourseForm from "@/components/forms/CourseForm"

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Create Course</h1>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Enter the details for the new course</CardDescription>
        </CardHeader>
        <CardContent>
          <CourseForm />
        </CardContent>
      </Card>
    </div>
  )
}
