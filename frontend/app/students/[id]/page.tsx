import { getStudentById } from "@/actions/students"
import { getCourses } from "@/actions/courses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen } from "lucide-react"

interface StudentDetailPageProps {
  params: {
    id: string
  }
}

export default async function StudentDetailPage({ params }: StudentDetailPageProps) {
  const student = await getStudentById(params.id)

  if (!student) {
    notFound()
  }

  // Get courses this student is enrolled in
  const allCourses = await getCourses({ studentId: student.id })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Student Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd className="text-lg">{student.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="text-lg">{student.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                <dd>{formatDate(student.createdAt)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {allCourses.length === 0 ? (
              <p className="text-muted-foreground">This student is not enrolled in any courses yet.</p>
            ) : (
              <div className="space-y-4">
                {allCourses.map((course) => (
                  <div key={course.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/courses/${course.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
