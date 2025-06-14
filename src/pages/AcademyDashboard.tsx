
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/hooks/useCourses';
import { AcademyHeader } from '@/components/academy/AcademyHeader';
import { StatsCards } from '@/components/academy/StatsCards';
import { CoursesList } from '@/components/academy/CoursesList';
import { LoadingSpinner } from '@/components/academy/LoadingSpinner';

const AcademyDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { courses, loading: coursesLoading } = useCourses();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/academy/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || coursesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AcademyHeader />
      
      <div className="container mx-auto px-4 py-8">
        <StatsCards courses={courses} />
        <CoursesList courses={courses} />
      </div>
    </div>
  );
};

export default AcademyDashboard;
