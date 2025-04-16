import { getCourseById } from "@/actions/courses"
import { getStudents } from "@/actions/students"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, GraduationCap, ClipboardList, Plus } from "lucide-react"
import AssignStudentsForm from "@/components/forms/AssignStudentsForm"

interface CourseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: CourseDetailPageProps) {
  const resolvedParams = await params
  const course = await getCourseById(resolvedParams.id)

  if (!course) {
    notFound()
  }

  const allStudents = await getStudents()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Course Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Title</dt>
                <dd className="text-lg">{course.title}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                <dd className="text-lg">{course.description}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                <dd>{formatDate(course.createdAt)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" /> Enrolled Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            {course.students && course.students.length > 0 ? (
              <div className="space-y-4">
                {course.students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/students/${student.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No students enrolled in this course yet.</p>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Assign Students</h3>
              <AssignStudentsForm
                courseId={course.id}
                allStudents={allStudents}
                enrolledStudentIds={course.students?.map((s) => s.id) || []}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" /> Assignments
            </CardTitle>
            <Button size="sm" asChild>
              <Link href={`/assignments/create?courseId=${course.id}`}>
                <Plus className="mr-2 h-4 w-4" /> Add Assignment
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {course.assignments && course.assignments.length > 0 ? (
              <div className="space-y-4">
                {course.assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                      <p className="text-sm mt-2">Due: {formatDate(assignment.dueDate)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={assignment.completed ? "default" : "outline"}
                        size="sm"
                        className={assignment.completed ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {assignment.completed ? "Completed" : "Mark Complete"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No assignments created for this course yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
