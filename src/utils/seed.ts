import prisma from '../config/prisma';
import { Role } from '../generated/prisma/client';

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

  console.log('👥 Creating users...');
  
  const teacher1 = await prisma.user.create({
    data: {
      email: 'john.doe@school.com',
      password: 'password123',
      name: 'John Doe',
      role: Role.TEACHER,
      profileImageURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: 'jane.smith@school.com',
      password: 'password123',
      name: 'Jane Smith',
      role: Role.TEACHER,
      profileImageURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    },
  });

  const student1 = await prisma.user.create({
    data: {
      email: 'alice@student.com',
      password: 'password123',
      name: 'Alice Johnson',
      role: Role.STUDENT,
      profileImageURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: 'bob@student.com',
      password: 'password123',
      name: 'Bob Williams',
      role: Role.STUDENT,
      profileImageURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: 'charlie@student.com',
      password: 'password123',
      name: 'Charlie Brown',
      role: Role.STUDENT,
      profileImageURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@school.com',
      password: 'admin123',
      name: 'Admin User',
      role: Role.ADMIN,
      profileImageURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  });

  console.log(`✅ Created ${6} users`);

  console.log('📚 Creating courses...');
  
  const course1 = await prisma.course.create({
    data: {
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
      teacherId: teacher1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript concepts including async programming, closures, and modern ES6+ features.',
      teacherId: teacher1.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Database Design',
      description: 'Learn how to design and implement relational databases using SQL and PostgreSQL.',
      teacherId: teacher2.id,
    },
  });

  const course4 = await prisma.course.create({
    data: {
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native and Flutter.',
      teacherId: teacher2.id,
    },
  });

  console.log(`✅ Created ${4} courses`);

  console.log('📝 Creating enrollments...');
  
  await prisma.enrollment.createMany({
    data: [
      { studentId: student1.id, courseId: course1.id },
      { studentId: student1.id, courseId: course2.id },
      { studentId: student1.id, courseId: course3.id },
      { studentId: student2.id, courseId: course1.id },
      { studentId: student2.id, courseId: course4.id },
      { studentId: student3.id, courseId: course2.id },
      { studentId: student3.id, courseId: course3.id },
      { studentId: student3.id, courseId: course4.id },
    ],
  });

  console.log(`✅ Created ${8} enrollments`);

  console.log('📖 Creating lessons...');
  
  const lesson1_1 = await prisma.lesson.create({
    data: {
      title: 'HTML Basics',
      content: 'Learn the structure of HTML documents, tags, attributes, and semantic HTML5 elements.',
      type: 'lecture',
      materialFileURL: 'https://example.com/materials/html-basics.pdf',
      courseId: course1.id,
    },
  });

  const lesson1_2 = await prisma.lesson.create({
    data: {
      title: 'CSS Styling',
      content: 'Master CSS selectors, properties, flexbox, and grid layout for responsive designs.',
      type: 'lecture',
      materialFileURL: 'https://example.com/materials/css-styling.pdf',
      courseId: course1.id,
    },
  });

  const lesson1_3 = await prisma.lesson.create({
    data: {
      title: 'JavaScript Fundamentals',
      content: 'Introduction to JavaScript syntax, variables, functions, and DOM manipulation.',
      type: 'assignment',
      materialFileURL: 'https://example.com/materials/js-fundamentals.pdf',
      courseId: course1.id,
    },
  });

  const lesson2_1 = await prisma.lesson.create({
    data: {
      title: 'Closures and Scope',
      content: 'Deep understanding of JavaScript closures, lexical scope, and execution context.',
      type: 'lecture',
      materialFileURL: 'https://example.com/materials/closures.pdf',
      courseId: course2.id,
    },
  });

  const lesson2_2 = await prisma.lesson.create({
    data: {
      title: 'Async Programming',
      content: 'Master Promises, async/await, and handling asynchronous operations in JavaScript.',
      type: 'assignment',
      materialFileURL: 'https://example.com/materials/async-js.pdf',
      courseId: course2.id,
    },
  });

  const lesson3_1 = await prisma.lesson.create({
    data: {
      title: 'SQL Basics',
      content: 'Learn SQL queries, joins, aggregations, and data manipulation.',
      type: 'lecture',
      materialFileURL: 'https://example.com/materials/sql-basics.pdf',
      courseId: course3.id,
    },
  });

  const lesson3_2 = await prisma.lesson.create({
    data: {
      title: 'Database Normalization',
      content: 'Understanding normal forms and designing efficient database schemas.',
      type: 'assignment',
      materialFileURL: 'https://example.com/materials/normalization.pdf',
      courseId: course3.id,
    },
  });

  const lesson4_1 = await prisma.lesson.create({
    data: {
      title: 'React Native Basics',
      content: 'Getting started with React Native, components, and styling.',
      type: 'lecture',
      materialFileURL: 'https://example.com/materials/rn-basics.pdf',
      courseId: course4.id,
    },
  });

  console.log(`✅ Created ${8} lessons`);

  console.log('📋 Creating assignments...');
  
  const assignment1 = await prisma.assignment.create({
    data: {
      title: 'Build a Personal Portfolio',
      description: 'Create a personal portfolio website using HTML and CSS.',
      dueDate: new Date('2025-12-15'),
      maxPoints: 100,
      lessonId: lesson1_2.id,
    },
  });

  const assignment2 = await prisma.assignment.create({
    data: {
      title: 'Interactive Form Validation',
      description: 'Implement client-side form validation using JavaScript.',
      dueDate: new Date('2025-12-20'),
      maxPoints: 100,
      lessonId: lesson1_3.id,
    },
  });

  const assignment3 = await prisma.assignment.create({
    data: {
      title: 'Promise Chain Exercise',
      description: 'Create a series of async operations using Promise chains and async/await.',
      dueDate: new Date('2025-12-18'),
      maxPoints: 100,
      lessonId: lesson2_2.id,
    },
  });

  const assignment4 = await prisma.assignment.create({
    data: {
      title: 'Database Schema Design',
      description: 'Design a normalized database schema for an e-commerce application.',
      dueDate: new Date('2025-12-22'),
      maxPoints: 100,
      lessonId: lesson3_2.id,
    },
  });

  const assignment5 = await prisma.assignment.create({
    data: {
      title: 'Todo App',
      description: 'Build a simple Todo application using React Native.',
      dueDate: new Date('2025-12-25'),
      maxPoints: 100,
      lessonId: lesson4_1.id,
    },
  });

  console.log(`✅ Created ${5} assignments`);

  console.log('📤 Creating submissions...');
  
  await prisma.submission.create({
    data: {
      submissionFileURL: 'https://github.com/alice/portfolio',
      grade: 95,
      feedback: 'Excellent work! Great design and clean code.',
      studentId: student1.id,
      assignmentId: assignment1.id,
    },
  });

  await prisma.submission.create({
    data: {
      submissionFileURL: 'https://github.com/bob/portfolio',
      grade: 88,
      feedback: 'Good work, but could improve on responsive design.',
      studentId: student2.id,
      assignmentId: assignment1.id,
    },
  });

  await prisma.submission.create({
    data: {
      submissionFileURL: 'https://github.com/alice/form-validation',
      studentId: student1.id,
      assignmentId: assignment2.id,
    },
  });

  await prisma.submission.create({
    data: {
      submissionFileURL: 'https://github.com/charlie/async-exercise',
      grade: 92,
      feedback: 'Well done! Good understanding of async concepts.',
      studentId: student3.id,
      assignmentId: assignment3.id,
    },
  });

  await prisma.submission.create({
    data: {
      submissionFileURL: 'https://github.com/alice/db-schema',
      studentId: student1.id,
      assignmentId: assignment4.id,
    },
  });

  await prisma.submission.create({
    data: {
      submissionFileURL: 'https://github.com/charlie/db-schema',
      grade: 85,
      feedback: 'Good schema design. Consider adding more indexes for performance.',
      studentId: student3.id,
      assignmentId: assignment4.id,
    },
  });

  console.log(`✅ Created ${6} submissions`);

  console.log('📁 Creating file metadata...');

  await prisma.fileMetadata.createMany({
    data: [
      { fileName: 'html-basics.pdf', fileSize: 1024000, fileType: 'application/pdf' },
      { fileName: 'css-styling.pdf', fileSize: 2048000, fileType: 'application/pdf' },
      { fileName: 'js-fundamentals.pdf', fileSize: 1536000, fileType: 'application/pdf' },
      { fileName: 'intro-video.mp4', fileSize: 50000000, fileType: 'video/mp4' },
    ],
  });

  console.log(`✅ Created ${4} file metadata entries`);

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log('   - 6 Users (1 Admin, 2 Teachers, 3 Students)');
  console.log('   - 4 Courses');
  console.log('   - 8 Enrollments');
  console.log('   - 8 Lessons');
  console.log('   - 5 Assignments');
  console.log('   - 6 Submissions');
  console.log('   - 4 File Metadata entries');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
