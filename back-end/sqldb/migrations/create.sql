DROP TABLE IF EXISTS learners CASCADE;
DROP TABLE IF EXISTS educators CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS learners_courses CASCADE;
DROP TABLE IF EXISTS educators_courses CASCADE;
DROP TABLE IF EXISTS accessrights;

CREATE TABLE learners (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE educators (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(255),
  description TEXT,
  image_url VARCHAR,
  material_url VARCHAR,
  image_file_format VARCHAR,
  material_file_format VARCHAR,
  created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE learners_courses(
  id SERIAL PRIMARY KEY NOT NULL,
  learner_id INTEGER REFERENCES learners(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  date_of_enrollment TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE educators_courses(
  id SERIAL PRIMARY KEY NOT NULL,
  educator_id INTEGER REFERENCES educators(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE accessrights(
  id SERIAL PRIMARY KEY NOT NULL,
  substitute_id INTEGER REFERENCES educators(id) ON DELETE CASCADE,
  educator_course_id INTEGER REFERENCES educators_courses(id) ON DELETE CASCADE
);
