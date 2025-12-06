import prisma from '../config/prisma';
import { Role } from '@prisma/client';

async function main() {
  console.log('🌱 Starting seeding...');

  console.log('🗑️  Clearing existing data...');
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
  await prisma.fileMetadata.deleteMany();

  console.log('📁 Creating file metadata...');

  const profileImage1 = await prisma.fileMetadata.create({
    data: {
      fileName: 'john-avatar.png',
      fileSize: 50000,
      fileType: 'image/png',
      fileUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    },
  });

  const profileImage2 = await prisma.fileMetadata.create({
    data: {
      fileName: 'jane-avatar.png',
      fileSize: 50000,
      fileType: 'image/png',
      fileUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    },
  });

  const profileImage3 = await prisma.fileMetadata.create({
    data: {
      fileName: 'alice-avatar.png',
      fileSize: 50000,
      fileType: 'image/png',
      fileUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    },
  });

  const profileImage4 = await prisma.fileMetadata.create({
    data: {
      fileName: 'bob-avatar.png',
      fileSize: 50000,
      fileType: 'image/png',
      fileUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    },
  });

  const profileImage5 = await prisma.fileMetadata.create({
    data: {
      fileName: 'charlie-avatar.png',
      fileSize: 50000,
      fileType: 'image/png',
      fileUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
    },
  });

  const profileImage6 = await prisma.fileMetadata.create({
    data: {
      fileName: 'admin-avatar.png',
      fileSize: 50000,
      fileType: 'image/png',
      fileUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  });

  const lessonFile1 = await prisma.fileMetadata.create({
    data: { fileName: 'html-basics.pdf', fileSize: 1024000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/html-basics.pdf' },
  });
  const lessonFile2 = await prisma.fileMetadata.create({
    data: { fileName: 'css-styling.pdf', fileSize: 2048000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/css-styling.pdf' },
  });
  const lessonFile3 = await prisma.fileMetadata.create({
    data: { fileName: 'js-fundamentals.pdf', fileSize: 1536000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/js-fundamentals.pdf' },
  });
  const lessonFile4 = await prisma.fileMetadata.create({
    data: { fileName: 'closures.pdf', fileSize: 1200000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/closures.pdf' },
  });
  const lessonFile5 = await prisma.fileMetadata.create({
    data: { fileName: 'async-js.pdf', fileSize: 1800000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/async-js.pdf' },
  });
  const lessonFile6 = await prisma.fileMetadata.create({
    data: { fileName: 'sql-basics.pdf', fileSize: 1400000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/sql-basics.pdf' },
  });
  const lessonFile7 = await prisma.fileMetadata.create({
    data: { fileName: 'normalization.pdf', fileSize: 1600000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/normalization.pdf' },
  });
  const lessonFile8 = await prisma.fileMetadata.create({
    data: { fileName: 'rn-basics.pdf', fileSize: 2200000, fileType: 'application/pdf', fileUrl: 'https://example.com/materials/rn-basics.pdf' },
  });

  const submissionFile1 = await prisma.fileMetadata.create({
    data: { fileName: 'alice-portfolio.zip', fileSize: 5000000, fileType: 'application/zip', fileUrl: 'https://github.com/alice/portfolio' },
  });
  const submissionFile2 = await prisma.fileMetadata.create({
    data: { fileName: 'bob-portfolio.zip', fileSize: 4500000, fileType: 'application/zip', fileUrl: 'https://github.com/bob/portfolio' },
  });
  const submissionFile3 = await prisma.fileMetadata.create({
    data: { fileName: 'alice-form-validation.zip', fileSize: 3000000, fileType: 'application/zip', fileUrl: 'https://github.com/alice/form-validation' },
  });
  const submissionFile4 = await prisma.fileMetadata.create({
    data: { fileName: 'charlie-async-exercise.zip', fileSize: 2500000, fileType: 'application/zip', fileUrl: 'https://github.com/charlie/async-exercise' },
  });
  const submissionFile5 = await prisma.fileMetadata.create({
    data: { fileName: 'charlie-db-schema.zip', fileSize: 1500000, fileType: 'application/zip', fileUrl: 'https://github.com/charlie/db-schema' },
  });

  console.log(`✅ Created file metadata entries`);

  console.log('👥 Creating users...');
  
  const teacher1 = await prisma.user.create({
    data: {
      email: 'john.doe@school.com',
      password: 'password123',
      name: 'John Doe',
      role: Role.TEACHER,
      profileImageId: profileImage1.id,
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: 'jane.smith@school.com',
      password: 'password123',
      name: 'Jane Smith',
      role: Role.TEACHER,
      profileImageId: profileImage2.id,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      email: 'alice@student.com',
      password: 'password123',
      name: 'Alice Johnson',
      role: Role.STUDENT,
      profileImageId: profileImage3.id,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: 'bob@student.com',
      password: 'password123',
      name: 'Bob Williams',
      role: Role.STUDENT,
      profileImageId: profileImage4.id,
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: 'charlie@student.com',
      password: 'password123',
      name: 'Charlie Brown',
      role: Role.STUDENT,
      profileImageId: profileImage5.id,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@school.com',
      password: 'admin123',
      name: 'Admin User',
      role: Role.ADMIN,
      profileImageId: profileImage6.id,
    },
  });

  console.log(`✅ Created 6 users`);

  console.log('📚 Creating courses...');
  
  const course1 = await prisma.course.create({
    data: {
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
      imagePath: 'assets/images/background1.jpg',
      teacherId: teacher1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript concepts including async programming, closures, and modern ES6+ features.',
      imagePath: 'assets/images/background1.jpg',
      teacherId: teacher1.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Database Design',
      description: 'Learn how to design and implement relational databases using SQL and PostgreSQL.',
      imagePath: 'assets/images/background2.jpg',
      teacherId: teacher2.id,
    },
  });

  const course4 = await prisma.course.create({
    data: {
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native and Flutter.',
      imagePath: 'assets/images/background4.jpg',
      teacherId: teacher2.id,
    },
  });

  console.log(`✅ Created 4 courses`);

  console.log('📝 Creating enrollments (will update with completedLessonIds after lessons are created)...');
  
  const enrollment1 = await prisma.enrollment.create({
    data: { studentId: student1.id, courseId: course1.id, completedLessonIds: [] },
  });
  const enrollment2 = await prisma.enrollment.create({
    data: { studentId: student1.id, courseId: course2.id, completedLessonIds: [] },
  });
  const enrollment3 = await prisma.enrollment.create({
    data: { studentId: student1.id, courseId: course3.id, completedLessonIds: [] },
  });
  const enrollment4 = await prisma.enrollment.create({
    data: { studentId: student2.id, courseId: course1.id, completedLessonIds: [] },
  });
  const enrollment5 = await prisma.enrollment.create({
    data: { studentId: student2.id, courseId: course4.id, completedLessonIds: [] },
  });
  const enrollment6 = await prisma.enrollment.create({
    data: { studentId: student3.id, courseId: course2.id, completedLessonIds: [] },
  });
  const enrollment7 = await prisma.enrollment.create({
    data: { studentId: student3.id, courseId: course3.id, completedLessonIds: [] },
  });
  const enrollment8 = await prisma.enrollment.create({
    data: { studentId: student3.id, courseId: course4.id, completedLessonIds: [] },
  });

  console.log(`✅ Created 8 enrollments`);

  console.log('📖 Creating lessons with assignments...');
  
  const lesson1_1 = await prisma.lesson.create({
    data: {
      title: 'HTML Basics',
      content: 'Learn the structure of HTML documents, tags, attributes, and semantic HTML5 elements.',
      fileId: lessonFile1.id,
      courseId: course1.id,
    },
  });

  const lesson1_2 = await prisma.lesson.create({
    data: {
      title: 'CSS Styling',
      content: 'Master CSS selectors, properties, flexbox, and grid layout for responsive designs.',
      fileId: lessonFile2.id,
      courseId: course1.id,
      assignment: {
        create: {
          title: 'Build a Personal Portfolio',
          description: 'Create a personal portfolio website using HTML and CSS.',
          dueDate: new Date('2025-12-15'),
          maxPoints: 100,
        },
      },
    },
  });

  const lesson1_3 = await prisma.lesson.create({
    data: {
      title: 'JavaScript Fundamentals',
      content: 'Introduction to JavaScript syntax, variables, functions, and DOM manipulation.',
      fileId: lessonFile3.id,
      courseId: course1.id,
      assignment: {
        create: {
          title: 'Interactive Form Validation',
          description: 'Implement client-side form validation using JavaScript.',
          dueDate: new Date('2025-12-20'),
          maxPoints: 100,
        },
      },
    },
  });

  const lesson2_1 = await prisma.lesson.create({
    data: {
      title: 'Closures and Scope',
      content: 'Deep understanding of JavaScript closures, lexical scope, and execution context.',
      fileId: lessonFile4.id,
      courseId: course2.id,
    },
  });

  const lesson2_2 = await prisma.lesson.create({
    data: {
      title: 'Async Programming',
      content: 'Master Promises, async/await, and handling asynchronous operations in JavaScript.',
      fileId: lessonFile5.id,
      courseId: course2.id,
      assignment: {
        create: {
          title: 'Promise Chain Exercise',
          description: 'Create a series of async operations using Promise chains and async/await.',
          dueDate: new Date('2025-12-18'),
          maxPoints: 100,
        },
      },
    },
  });

  const lesson3_1 = await prisma.lesson.create({
    data: {
      title: 'SQL Basics',
      content: 'Learn SQL queries, joins, aggregations, and data manipulation.',
      fileId: lessonFile6.id,
      courseId: course3.id,
    },
  });

  const lesson3_2 = await prisma.lesson.create({
    data: {
      title: 'Database Normalization',
      content: 'Understanding normal forms and designing efficient database schemas.',
      fileId: lessonFile7.id,
      courseId: course3.id,
      assignment: {
        create: {
          title: 'Database Schema Design',
          description: 'Design a normalized database schema for an e-commerce application.',
          dueDate: new Date('2025-12-22'),
          maxPoints: 100,
        },
      },
    },
  });

  const lesson4_1 = await prisma.lesson.create({
    data: {
      title: 'React Native Basics',
      content: 'Getting started with React Native, components, and styling.',
      fileId: lessonFile8.id,
      courseId: course4.id,
      assignment: {
        create: {
          title: 'Todo App',
          description: 'Build a simple Todo application using React Native.',
          dueDate: new Date('2025-12-25'),
          maxPoints: 100,
        },
      },
    },
  });

  console.log(`✅ Created 8 lessons with 5 assignments`);

  console.log('📝 Updating enrollments with completed lessons...');
  
  await prisma.enrollment.update({
    where: { id: enrollment1.id },
    data: { completedLessonIds: [lesson1_1.id, lesson1_2.id] },
  });
  
  await prisma.enrollment.update({
    where: { id: enrollment2.id },
    data: { completedLessonIds: [lesson2_1.id] },
  });
  
  await prisma.enrollment.update({
    where: { id: enrollment4.id },
    data: { completedLessonIds: [lesson1_1.id] },
  });
  
  await prisma.enrollment.update({
    where: { id: enrollment6.id },
    data: { completedLessonIds: [lesson2_1.id, lesson2_2.id] },
  });

  console.log(`✅ Updated enrollments with completed lessons`);

  console.log('📤 Creating submissions...');

  const assignments = await prisma.assignment.findMany();
  const assignment1 = assignments.find(a => a.title === 'Build a Personal Portfolio')!;
  const assignment2 = assignments.find(a => a.title === 'Interactive Form Validation')!;
  const assignment3 = assignments.find(a => a.title === 'Promise Chain Exercise')!;
  const assignment4 = assignments.find(a => a.title === 'Database Schema Design')!;
  
  await prisma.submission.create({
    data: {
      fileId: submissionFile1.id,
      submissionText: 'Here is my portfolio project with responsive design.',
      grade: 95,
      feedback: 'Excellent work! Great design and clean code.',
      studentId: student1.id,
      assignmentId: assignment1.id,
    },
  });

  await prisma.submission.create({
    data: {
      fileId: submissionFile2.id,
      grade: 88,
      feedback: 'Good work, but could improve on responsive design.',
      studentId: student2.id,
      assignmentId: assignment1.id,
    },
  });

  await prisma.submission.create({
    data: {
      fileId: submissionFile3.id,
      submissionText: 'Implemented form validation with email and password checks.',
      studentId: student1.id,
      assignmentId: assignment2.id,
    },
  });

  await prisma.submission.create({
    data: {
      fileId: submissionFile4.id,
      grade: 92,
      feedback: 'Well done! Good understanding of async concepts.',
      studentId: student3.id,
      assignmentId: assignment3.id,
    },
  });

  await prisma.submission.create({
    data: {
      submissionText: 'Created ER diagram and SQL schema for e-commerce database.',
      studentId: student1.id,
      assignmentId: assignment4.id,
    },
  });

  await prisma.submission.create({
    data: {
      fileId: submissionFile5.id,
      submissionText: 'Database schema with users, products, orders tables.',
      grade: 85,
      feedback: 'Good schema design. Consider adding more indexes for performance.',
      studentId: student3.id,
      assignmentId: assignment4.id,
    },
  });

  console.log(`✅ Created 6 submissions`);

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log('   - 6 Users (1 Admin, 2 Teachers, 3 Students)');
  console.log('   - 4 Courses (with imagePath)');
  console.log('   - 8 Enrollments (with completedLessonIds)');
  console.log('   - 8 Lessons with 5 Assignments (with file relations)');
  console.log('   - 6 Submissions (with file relations)');
  console.log('   - 19 File Metadata entries');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
