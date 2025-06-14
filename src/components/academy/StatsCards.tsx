
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Clock, Users, Award } from 'lucide-react';
import { Course } from '@/types/course';

interface StatsCardsProps {
  courses: Course[];
}

export const StatsCards = ({ courses }: StatsCardsProps) => {
  const totalHours = courses.reduce((total, course) => total + (course.duration_hours || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="flex items-center p-6">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Cursos Disponíveis</p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-6">
          <Clock className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Horas de Conteúdo</p>
            <p className="text-2xl font-bold">{totalHours}h</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-6">
          <Users className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Matriculado</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-6">
          <Award className="h-8 w-8 text-yellow-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Certificados</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
