import { Request, Response } from 'express';
import { lessonService } from '../services/lesson.service';
import admin from '../config/firebase';


export const lessonController = {
async create(req: Request, res: Response) {
    try {
      const { title, content, fileId, courseId, assignment } = req.body;
      if (!title || !courseId) {
        return res.status(400).json({ error: 'Title and courseId are required' });
      }

      const lessonData: any = {
        title,
        content,
        fileId,
        courseId,
      };

      if (assignment) {
        lessonData.assignment = {
          dueDate: assignment.dueDate ? new Date(assignment.dueDate) : undefined,
          maxPoints: assignment.maxPoints,
        };
      }

      const lesson = await lessonService.create(lessonData);


      try {
        const courseData = await lessonService.searchToken(courseId);
        if (courseData) {
          const tokens : string[] = courseData.enrollments
            .map(e  => e.student.fcmToken)
            .filter((token): token is string => token !== null && token !== "");
          if (tokens.length > 0) {
            const messagePayload = {
              notification: {
                title: `Materi Baru: ${courseData.title}`,
                body: `${courseData.teacher.name} baru saja mengupload materi "${title}". Cek sekarang!`,
              },
              data: {
                type: 'LESSON_NEW',
                lessonId: lesson.id, 
                courseId: courseId,
                click_action: 'FLUTTER_NOTIFICATION_CLICK'
              },
              tokens: tokens,
            };
            
            const sendResponse = await admin.messaging().sendEachForMulticast(messagePayload);
            console.log(`Notifikasi terkirim: ${sendResponse.successCount} sukses, ${sendResponse.failureCount} gagal.`);
          }
        }
      } catch (notifError) {
        console.error('Gagal mengirim notifikasi:', notifError);
      }
      res.status(201).json(lesson);

    } catch (error) {
      console.error('Error creating lesson:', error);
      res.status(500).json({ error: 'Failed to create lesson' });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const lessons = await lessonService.findAll();
      res.json(lessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      res.status(500).json({ error: 'Failed to fetch lessons' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lesson = await lessonService.findById(id);

      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      res.json(lesson);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      res.status(500).json({ error: 'Failed to fetch lesson' });
    }
  },

  async findByCourseId(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const lessons = await lessonService.findByCourseId(courseId);
      res.json(lessons);
    } catch (error) {
      console.error('Error fetching course lessons:', error);
      res.status(500).json({ error: 'Failed to fetch course lessons' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, fileId } = req.body;
      const existingLesson = await lessonService.findById(id);
      if (!existingLesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      const lesson = await lessonService.update(id, {
        title,
        content,
        fileId,
      });

      res.json(lesson);
    } catch (error) {
      console.error('Error updating lesson:', error);
      res.status(500).json({ error: 'Failed to update lesson' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingLesson = await lessonService.findById(id);
      if (!existingLesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      await lessonService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      res.status(500).json({ error: 'Failed to delete lesson' });
    }
  },
};
