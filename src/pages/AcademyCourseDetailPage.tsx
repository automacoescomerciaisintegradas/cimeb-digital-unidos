import { useParams } from 'react-router-dom';
import { useCourseDetail } from '@/hooks/useCourses';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import React from 'react';
// import { PlayCircleIcon } from 'lucide-react'; // Optional for later

const AcademyCourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courseDetail, loading, error } = useCourseDetail(courseId || null);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-8 w-3/4 mb-4" /> {/* Title skeleton */}
        <Skeleton className="h-4 w-1/2 mb-6" /> {/* Subtitle/instructor skeleton */}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-48 w-full" /> {/* Image/Description skeleton */}
            <Skeleton className="h-32 w-full" /> {/* Syllabus skeleton */}
            <Skeleton className="h-32 w-full" /> {/* Modules/Lessons skeleton */}
          </div>
          <div className="space-y-6">
            <Skeleton className="h-24 w-full" /> {/* Instructor Info skeleton */}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-600">
        <h1 className="text-2xl font-bold mb-4">Error Loading Course</h1>
        <p>{error.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  if (!courseDetail) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
        <p>The course you are looking for does not exist or could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Basic Info Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{courseDetail.title}</h1>
        <p className="text-gray-700 mb-4">{courseDetail.description || "No description available."}</p>
        {/* Placeholder for Instructor Name - will be part of courseDetail as per previous step */}
        {courseDetail.instructor_name && (
          <p className="text-sm text-gray-600">Instructor: {courseDetail.instructor_name}</p>
        )}
      </section>

      {/* Cover Image Placeholder */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Cover Image</h2>
        {courseDetail.thumbnail_url ? (
          <img src={courseDetail.thumbnail_url} alt={courseDetail.title} className="w-full max-w-md h-auto rounded-lg shadow-md" />
        ) : (
          <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p>No Cover Image</p>
          </div>
        )}
      </section>

      {/* Syllabus (Ementa) Section */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Syllabus / Ementa</CardTitle>
          </CardHeader>
          <CardContent>
            {courseDetail.description ? (
              <p>{courseDetail.description}</p>
            ) : (
              <p>No detailed syllabus information available for this course.</p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Modules and Lessons Section */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Modules & Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            {courseDetail.modules && courseDetail.modules.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {courseDetail.modules.map((module, index) => (
                  <AccordionItem value={`module-${module.id || index}`} key={module.id || index}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-lg">{`Module ${index + 1}: ${module.title}`}</span>
                        {module.description && <p className="text-sm text-gray-600 mt-1">{module.description}</p>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {module.lessons && module.lessons.length > 0 ? (
                        <ul className="space-y-2 pt-2">
                          {module.lessons.map(lesson => (
                            <li key={lesson.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                              {/* Optional: Add PlayCircleIcon here later */}
                              <span>{lesson.title}</span>
                              {lesson.duration_minutes && (
                                <span className="text-xs text-gray-500">{lesson.duration_minutes} min</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 p-2">No lessons in this module.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p>No modules defined for this course yet.</p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Instructor Info Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Instructor Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            {courseDetail.instructor_avatar_url || courseDetail.instructor_name ? (
              <>
                <Avatar className="h-24 w-24">
                  <AvatarImage src={courseDetail.instructor_avatar_url || undefined} alt={courseDetail.instructor_name || 'Instructor'} />
                  <AvatarFallback>
                    {/* Create initials from name, e.g., John Doe -> JD */}
                    {courseDetail.instructor_name
                      ? courseDetail.instructor_name.split(' ').map(n => n[0]).join('').toUpperCase()
                      : 'N/A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{courseDetail.instructor_name || "Instructor details not available"}</h3>
                  <p className="text-sm text-gray-700 mt-1">{courseDetail.instructor_bio || "No biography provided."}</p>
                </div>
              </>
            ) : (
              <p>No instructor information available for this course.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AcademyCourseDetailPage;
