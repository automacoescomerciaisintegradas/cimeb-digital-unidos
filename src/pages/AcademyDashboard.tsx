
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, Award, Play, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Usando tipos mais simples baseados no schema atual do Supabase
interface Course {
  id: string;
  title: string;
  description: string | null;
  duration_hours: number | null;
  level: string | null;
  price: number | null;
  thumbnail_url: string | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

const AcademyDashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
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
      console.log('Buscando cursos...');
      
      // Buscar cursos disponíveis
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (coursesError) {
        console.error('Erro ao buscar cursos:', coursesError);
        throw coursesError;
      }
      
      console.log('Cursos encontrados:', coursesData);
      setCourses(coursesData || []);

    } catch (error: any) {
      console.error('Erro completo:', error);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
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
                <p className="text-2xl font-bold">
                  {courses.reduce((total, course) => total + (course.duration_hours || 0), 0)}h
                </p>
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

        {/* Cursos Disponíveis */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cursos Disponíveis</h2>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
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
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Ver Curso
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso disponível</h3>
              <p className="text-gray-500">Novos cursos serão adicionados em breve!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademyDashboard;
