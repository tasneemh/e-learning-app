-- table for learners... 
INSERT INTO learners (first_name, last_name, email, password) 
VALUES ('learner', 'one', 'learnerone@gmail.com', '$2b$10$68DV4LMhjEro5XmCBG8qSum81detBrwlJw18x8hR19a6iyvsJK4s2'),/**password:learnerone**/
('learner', 'two', 'learnertwo@gmail.com', '$2b$10$1A5lw5QlxdqnJhY.63/y1eDlsLDDoGChgTY4gb4myMMWHf78L3jLG'),/**password:learnertwo**/
('learner', 'three','learnerthree@gmail.com','$2b$10$R6JjzsUCALWyZSmCpyFSuugXJeQpiyF0HqxandujJCwZnrYQEH.im');/**password:learnerthree**/

INSERT INTO educators (first_name, last_name, email, password) 
VALUES ('educator', 'one', 'educatorone@gmail.com', '$2b$10$A16s.l8gm5XTv2w5dJsVpu.aOweBetegDxhOL/Jn1TlUlcH014gVq'),/**password:educatorone**/
('educator', 'two', 'educatortwo@gmail.com', '$2b$10$0z1Aq.1n.ZtmyM4mFD/lguMncsJ2hL66GeWR/9BPlMQzBr7UTWbka'),/**password:educatortwo**/
('educator', 'three', 'educatorthree@gmail.com', '$2b$10$0ph/R6hrbTbRZj3RwS8T4.YnQWd2xCyGZqRMqCG/nVhSg9bj5/K5y');/**password:educatorthree**/




SELECT DISTINCT learners.*, courses.* FROM learners
JOIN learners_courses ON learners.id = learners_courses.course_id
JOIN courses ON learners_courses.course_id = courses.id
JOIN educators_courses ON courses.id = educators_courses.educator_id
    where educators_courses.educator_id= 1
    GROUP by courses.id, learners.id;
    

