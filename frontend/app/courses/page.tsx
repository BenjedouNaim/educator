"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getCourses } from "@/actions/courses"
import { getStudents } from "@/actions/students"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import type { Course, Student, CourseFilters } from "@/types"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [filters, setFilters] = useState<CourseFilters>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [coursesData, studentsData] = await Promise.all([getCourses(filters), getStudents()])
        setCourses(coursesData)
        setStudents(studentsData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [filters])

  const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, title: e.target.value }))
  }

  const handleStudentFilterChange = (value: string) => {
    setFilters((prev) => ({ ...prev, studentId: value || undefined }))
  }

  const handleAssignmentFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, assignmentTitle: e.target.value }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <Button asChild>
          <Link href="/courses/create">
            <Plus className="mr-2 h-4 w-4" /> Add Course
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" /> Filter Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Title</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title..."
                  className="pl-8"
                  value={filters.title || ""}
                  onChange={handleTitleFilterChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Student</label>
              <Select value={filters.studentId || ""} onValueChange={handleStudentFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Assignment Title</label>
              <Input
                placeholder="Search by assignment..."
                value={filters.assignmentTitle || ""}
                onChange={handleAssignmentFilterChange}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No courses found
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.students?.length || 0}</TableCell>
                      <TableCell>{course.assignments?.length || 0}</TableCell>
                      <TableCell>{formatDate(course.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/courses/${course.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
