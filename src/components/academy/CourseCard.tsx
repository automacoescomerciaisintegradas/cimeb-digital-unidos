
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { Course } from '@/types/course';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline">Teologia</Badge>
          <Badge variant="secondary">{course.level || 'Iniciante'}</Badge>
        </div>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <CardDescription>Professor CIMEB</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description || 'Descrição do curso em breve.'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {course.duration_hours || 0}h de conteúdo
          </span>
          <Button size="sm" asChild>
            <Link to={`/academy/courses/${course.id}`}>
              <Play className="w-4 h-4 mr-2" />
              Ver Curso
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
