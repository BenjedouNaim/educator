import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StudentForm from "@/components/forms/StudentForm"

export default function CreateStudentPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Create Student</h1>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>Enter the details for the new student</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentForm />
        </CardContent>
      </Card>
    </div>
  )
}
