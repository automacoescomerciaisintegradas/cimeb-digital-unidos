
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Course, Module, Lesson, ModuleWithLessons, CourseDetail } from '@/types/course'; // Ensure all are imported

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCourses = async () => {
    try {
      console.log('Buscando cursos...');
      
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
        title: "Erro ao carregar cursos",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, refetch: fetchCourses };
};

export const useCourseDetail = (courseId: string | null) => {
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null); // Or a more specific error type
  const { toast } = useToast();

  const fetchCourseDetail = async (id: string) => {
    if (!id) {
      setCourseDetail(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Course by ID (including new instructor fields)
      // const { data: courseData, error: courseError } = await supabase
      //   .from('courses')
      //   .select('*') // This should ideally select specific fields including instructor_name, instructor_bio, instructor_avatar_url
      //   .eq('id', id)
      //   .single();

      // if (courseError) throw courseError;
      // if (!courseData) throw new Error('Course not found');

      // 2. Fetch Modules for the Course
      // const { data: modulesData, error: modulesError } = await supabase
      //   .from('modules')
      //   .select('*, lessons(*, module_id)') // Example of embedding lessons; adjust as needed for order and structure.
                                            // Or fetch lessons separately per module.
      //   .eq('course_id', id)
      //   .order('order_index', { ascending: true });

      // if (modulesError) throw modulesError;

      // // 3. Structure data into CourseDetail
      // // This will involve mapping modulesData and ensuring lessons are correctly nested if fetched as above,
      // // or performing separate lesson fetches and combining.
      // const fetchedModules: ModuleWithLessons[] = modulesData ? await Promise.all(modulesData.map(async (module) => {
      //   const { data: lessonsData, error: lessonsError } = await supabase
      //     .from('lessons')
      //     .select('*')
      //     .eq('module_id', module.id)
      //     .order('order_index', { ascending: true });
      //   if (lessonsError) throw lessonsError;
      //   return { ...module, lessons: lessonsData || [] };
      // })) : [];


      // const detail: CourseDetail = { ...courseData, modules: fetchedModules };
      // setCourseDetail(detail);

      // For now, since we are building the skeleton:
      setCourseDetail(null); // Replace with actual data once Supabase calls are implemented
      console.log(`Skeleton: Would fetch details for course ${id}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));


    } catch (err: any) {
      console.error(`Error fetching course detail for ${id}:`, err);
      setError(err);
      toast({
        title: "Erro ao carregar detalhes do curso",
        description: err.message,
        variant: "destructive",
      });
      setCourseDetail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail(courseId);
    } else {
      setCourseDetail(null);
      setLoading(false);
    }
  }, [courseId]);

  return { courseDetail, loading, error, refetch: () => courseId ? fetchCourseDetail(courseId) : Promise.resolve() };
};
