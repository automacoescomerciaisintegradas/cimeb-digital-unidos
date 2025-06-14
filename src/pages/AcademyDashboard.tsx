
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, Award, Play, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration_hours: number;
  level: string;
  category: string;
  thumbnail_url: string;
  is_published: boolean;
}

interface Enrollment {
  id: string;
  progress: number;
  status: string;
  course: Course;
}

const AcademyDashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/academy/auth');
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, loading, navigate]);

  const fetchData = async () => {
    try {
      // Buscar cursos disponíveis
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Buscar matrículas do usuário
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', user?.id)
        .eq('status', 'active');

      if (enrollmentsError) throw enrollmentsError;
      setEnrollments(enrollmentsData || []);

    } catch (error: any) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user?.id,
          course_id: courseId,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Matrícula realizada!",
        description: "Você foi matriculado no curso com sucesso."
      });

      fetchData(); // Recarregar dados
    } catch (error: any) {
      toast({
        title: "Erro na matrícula",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando Academy...</p>
        </div>
      </div>
    );
  }

  const enrolledCourseIds = enrollments.map(e => e.course.id);
  const availableCourses = courses.filter(course => !enrolledCourseIds.includes(course.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-900">CIMEB Academy</h1>
            <Badge variant="secondary">Bem-vindo, {user?.user_metadata?.name || user?.email}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar ao Site
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Matriculados</p>
                <p className="text-2xl font-bold">{enrollments.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Horas de Estudo</p>
                <p className="text-2xl font-bold">
                  {enrollments.reduce((total, e) => total + (e.course.duration_hours || 0), 0)}h
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Disponíveis</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificados</p>
                <p className="text-2xl font-bold">
                  {enrollments.filter(e => e.progress === 100).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meus Cursos */}
        {enrollments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Cursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant={enrollment.progress === 100 ? "default" : "secondary"}>
                        {enrollment.progress}% Concluído
                      </Badge>
                      <Badge variant="outline">{enrollment.course.level}</Badge>
                    </div>
                    <CardTitle className="text-lg">{enrollment.course.title}</CardTitle>
                    <CardDescription>{enrollment.course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {enrollment.course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {enrollment.course.duration_hours}h de conteúdo
                      </span>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Continuar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Cursos Disponíveis */}
        {availableCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cursos Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{course.category}</Badge>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {course.duration_hours}h de conteúdo
                      </span>
                      <Button size="sm" onClick={() => handleEnroll(course.id)}>
                        Matricular-se
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso disponível</h3>
            <p className="text-gray-500">Novos cursos serão adicionados em breve!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyDashboard;
