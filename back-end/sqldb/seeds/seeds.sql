INSERT INTO learners (first_name, last_name, email, password)
VALUES (
    'learner',
    'one',
    'learnerone@gmail.com',
    '$2b$10$OH5.yeKnb6m4.wrQVCijQOyFGlU/x3aBoB22lfNByzRMai33TBWmu'
  ),
  /**password:learnerone**/
  (
    'learner',
    'two',
    'learnertwo@gmail.com',
    '$2b$10$LXMcvGHR3smpnVLErJvxCuT4fK4MjZkfiFN6sxDq6xWVu65AJtKW.'
  ),
  /**password:learnertwo**/
  (
    'learner',
    'three',
    'learnerthree@gmail.com',
    '$2b$10$3GC4qbP73kr161VFsYKNb./fy24XN10yTrqpFgIy93bRvPKrosrbu'
  ),
  (
    'learner',
    'demo',
    'learnerdemo@gmail.com',
    '$2b$10$L14s9t1qiV3wiNazflUg/uGeYmrxIxVGqCpV2PHtadc/UxxgVd6CG'
  );
   /**password:learnerdemo**/
INSERT INTO educators (first_name, last_name, email, password)
VALUES (
    'educator',
    'one',
    'educatorone@gmail.com',
    '$2b$10$i7D19/tUttR/YOlzE5kH/OYnquIGmWrqQ3YI1hT.P23kxPUbGKJb6'
  ),
  /**password:educatorone**/
  (
    'educator',
    'demo',
    'educatordemo@gmail.com',
    '$2b$10$3QQb0vcJRufGIfX21m4NWuoIHrHpXLqeWtYCcmxlSld8yyf.n7bpy'
  );
/**password:educatordemo**/
INSERT INTO courses (
    name,
    code,
    description,
    image_url,
    material_url,
    image_file_format,
    material_file_format
  )
VALUES(
    'Algebra',
    '101',
    'This is the course description for Algebra.',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426343/courses/arh5ho32usfg1gjew3ri.jpg',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426344/courses/atf6sogoxgeywwbnh2vj.png',
    'jpg',
    'png'
  ),
  (
    'Science',
    '102',
    'This is the course description for Science.',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426380/courses/s0nkqjvsrqohuquhko5a.jpg',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426381/courses/hnnbogtze9cn9xqq7at4.png',
    'jpg',
    'png'
  ),
  (
    'Chemistry',
    '103',
    'This is the course description for Chemistry.',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426450/courses/v23akrmv2opt7svm0rwk.jpg',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426451/courses/pq15ngomrswbei8odbru.jpg',
    'jpg',
    'jpg'
  ),
  (
    'Literature',
    '104',
    'This is the course description for Literature.',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426506/courses/wrp30qxj5z89t3eatv2o.jpg',
    'https://res.cloudinary.com/c0ur-e/image/upload/v1616426507/courses/v5hryyo6ob92vuqrgs9e.jpg',
    'jpg',
    'jpg'
  );
INSERT INTO educators_courses (educator_id, course_id)
VALUES(1, 1),
  (1, 2),
  (2, 3),
  (2, 4);
INSERT INTO learners_courses (learner_id, course_id)
VALUES(1, 4),
  (1, 3),
  (1, 2),
  (1, 1),
  (2, 4),
  (2, 1),
  (3, 4),
  (3, 2),
  (4, 2),
  (4, 3);