import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, GraduationCap, ClipboardList } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Students",
      description: "Manage student profiles and enrollments",
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      href: "/students",
    },
    {
      title: "Courses",
      description: "Create and manage course offerings",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      href: "/courses",
    },
    {
      title: "Assignments",
      description: "Create and track course assignments",
      icon: <ClipboardList className="h-8 w-8 text-primary" />,
      href: "/assignments",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold tracking-tight">Course Management Platform</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive solution for managing students, courses, and assignments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <CardTitle className="text-center">{feature.title}</CardTitle>
              <CardDescription className="text-center">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href={feature.href}>Manage {feature.title}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
