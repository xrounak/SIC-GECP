-- 
-- COMPREHENSIVE SEED DATA
-- Run this AFTER running schema.sql
--

-- Clear existing data to avoid duplicates (Optional - remove if you want to append)
truncate table event_registrations cascade;
truncate table join_applications cascade;
truncate table gallery cascade;
truncate table events cascade;
truncate table members cascade;

--
-- 1. MEMBERS (20 Entries)
--
insert into members (id, name, role, domain, image_url) values
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Sarah Johnson', 'President', 'Management', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Michael Chen', 'Tech Lead', 'Web Development', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Emily Davis', 'Design Head', 'UI/UX', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'David Wilson', 'Event Coordinator', 'Management', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Lisa Anderson', 'Technical Secretary', 'AI/ML', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'James Rockwell', 'Treasurer', 'Finance', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'Priya Patel', 'Logistics Lead', 'Operations', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Marcus Thompson', 'Web Developer', 'Web Development', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Jessica Lee', 'Content Writer', 'Creative', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Alex Rivera', 'Operations Member', 'Operations', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Samantha Chang', 'Designer', 'UI/UX', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Jordan Smith', 'App Developer', 'App Development', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'Taylor Kim', 'AI Researcher', 'AI/ML', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'Morgan Casey', 'Robotics Lead', 'Robotics', 'https://images.unsplash.com/photo-1504593811423-6ec66e5677a8?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'Casey Jordan', 'Cybersec Analyst', 'Cybersecurity', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'Riley Quinn', 'Social Media', 'Marketing', 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'Quinn Avery', 'Video Editor', 'Creative', 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'Avery Blake', 'General Member', 'Management', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a29', 'Blake Taylor', 'Flutter Dev', 'App Development', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300&h=300'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a30', 'Drew Morgan', 'Python Dev', 'AI/ML', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=300&h=300');

--
-- 2. EVENTS (12 Entries - 6 Upcoming, 6 Past)
--
insert into events (id, title, description, date, venue, status) values
-- Upcoming
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Tech Talk: AI in 2024', 'Join us for an insightful session on the future of Artificial Intelligence.', now() + interval '5 days', 'Auditorium A', 'upcoming'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Web Dev Workshop', 'Hands-on workshop on building modern web applications.', now() + interval '12 days', 'Computer Lab 3', 'upcoming'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b13', 'Hackathon Kickoff', 'The annual SIC Hackathon begins! 24 hours of innovation.', now() + interval '20 days', 'Main Hall', 'upcoming'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b14', 'Cybersecurity Bootcamp', 'Learn the basics of ethical hacking and network defense.', now() + interval '25 days', 'Seminar Hall 2', 'upcoming'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b15', 'Robotics Showcase', 'Exhibition of student-made robots and automation projects.', now() + interval '30 days', 'Central Courtyard', 'upcoming'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b16', 'Guest Lecture: Cloud Computing', 'Expert from Google Cloud discusses serverless architecture.', now() + interval '40 days', 'Auditorium B', 'upcoming'),
-- Past
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b17', 'Intro to Python', 'A beginner-friendly session on Python programming basics.', now() - interval '10 days', 'Seminar Hall 1', 'past'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b18', 'Design Thinking Workshop', 'How to approach problem-solving with a designer mindset.', now() - interval '25 days', 'Lab 4', 'past'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b19', 'Annual Coding Contest', 'Competitive programming contest with cash prizes.', now() - interval '45 days', 'Computer Centre', 'past'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b20', 'Startup Weekend', '3-day entrepreneurship event for student founders.', now() - interval '60 days', 'Incubation Center', 'past'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b21', 'IoT Workshop', 'Building smart devices using Arduino and Raspberry Pi.', now() - interval '75 days', 'Hardware Lab', 'past'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Cloud 101', 'Introduction to AWS and Azure services.', now() - interval '90 days', 'Auditorium A', 'past');

--
-- 3. GALLERY (10 Entries)
--
insert into gallery (image_url, caption, created_at) values
('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80', 'Tech Talk 2023 Audience', now() - interval '5 days'),
('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80', 'Hackathon Winners 2023', now() - interval '10 days'),
('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80', 'Web Dev Workshop Action', now() - interval '15 days'),
('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80', 'Community Meetup Group Photo', now() - interval '20 days'),
('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80', 'Team Brainstorming Session', now() - interval '25 days'),
('https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80', 'Keynote Speech at Summit', now() - interval '30 days'),
('https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80', 'Robotics Lab Visit', now() - interval '35 days'),
('https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80', 'Coding Contest Finals', now() - interval '40 days'),
('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80', 'Gadget Review Session', now() - interval '45 days'),
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80', 'Late Night Hackathon Pizza', now() - interval '50 days');

--
-- 4. JOIN APPLICATIONS (20 Entries)
--
insert into join_applications (name, email, branch, year, skills, motivation, created_at) values
('John Doe', 'john.d@example.com', 'CSE', '2', 'Python, React', 'Love coding', now() - interval '1 hour'),
('Jane Smith', 'jane.s@example.com', 'IT', '3', 'Java, Spring', 'Want to build enterprise apps', now() - interval '2 hours'),
('Robert Brown', 'robert.b@example.com', 'ECE', '2', 'Arduino, IoT', 'Interested in hardware', now() - interval '5 hours'),
('Alice Johnson', 'alice.j@example.com', 'CSE', '1', 'HTML, CSS', 'Learning web dev', now() - interval '1 day'),
('Charlie Wilson', 'charlie.w@example.com', 'ME', '4', 'CAD, 3D Printing', 'Robotics enthusiast', now() - interval '1 day'),
('Eva Davis', 'eva.d@example.com', 'CSE', '2', 'Machine Learning', 'AI research', now() - interval '2 days'),
('Frank Miller', 'frank.m@example.com', 'EEE', '3', 'Circuit Design', 'Electronics projects', now() - interval '2 days'),
('Grace Lee', 'grace.l@example.com', 'CSE', '1', 'Python basics', 'Beginner looking to learn', now() - interval '3 days'),
('Henry White', 'henry.w@example.com', 'IT', '2', 'Cybersecurity', 'CTF player', now() - interval '3 days'),
('Ivy Green', 'ivy.g@example.com', 'ECE', '3', 'Signal Processing', 'Communications tech', now() - interval '4 days'),
('Jack Black', 'jack.b@example.com', 'CSE', '4', 'Full Stack', 'Looking for team', now() - interval '4 days'),
('Kelly Blue', 'kelly.b@example.com', 'ME', '2', 'SolidWorks', 'Mechanical design', now() - interval '5 days'),
('Liam Red', 'liam.r@example.com', 'CSE', '3', 'Cloud Computing', 'AWS certified', now() - interval '5 days'),
('Mia Orange', 'mia.o@example.com', 'IT', '1', 'Java', 'Programming logic', now() - interval '6 days'),
('Noah Purple', 'noah.p@example.com', 'EEE', '2', 'Power Systems', 'Renewable energy', now() - interval '6 days'),
('Olivia Yellow', 'olivia.y@example.com', 'CSE', '3', 'Data Science', 'Big data analytics', now() - interval '7 days'),
('Paul Pink', 'paul.p@example.com', 'ECE', '4', 'Embedded Systems', 'Microcontrollers', now() - interval '7 days'),
('Quincy Gray', 'quincy.g@example.com', 'IT', '2', 'Networking', 'Cisco certified', now() - interval '8 days'),
('Rachel Brown', 'rachel.b@example.com', 'CSE', '1', 'C++', 'Competitive coding', now() - interval '8 days'),
('Sam White', 'sam.w@example.com', 'ME', '3', 'Automobile', 'Electric vehicles', now() - interval '9 days');

--
-- 5. EVENT REGISTRATIONS (Linked to Upcoming Events)
-- (Linking to 'Tech Talk: AI in 2024' -> b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11)
-- (Linking to 'Web Dev Workshop' -> b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12)
--
insert into event_registrations (event_id, name, email, created_at) values
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'John Doe', 'john.d@example.com', now() - interval '10 minutes'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Jane Smith', 'jane.s@example.com', now() - interval '20 minutes'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Alice Johnson', 'alice.j@example.com', now() - interval '30 minutes'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Bob Williams', 'bob.w@example.com', now() - interval '40 minutes'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Charlie Brown', 'charlie.b@example.com', now() - interval '50 minutes'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Eva Davis', 'eva.d@example.com', now() - interval '1 hour'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Frank Miller', 'frank.m@example.com', now() - interval '2 hours'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Grace Lee', 'grace.l@example.com', now() - interval '3 hours'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Henry White', 'henry.w@example.com', now() - interval '4 hours'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Ivy Green', 'ivy.g@example.com', now() - interval '5 hours'),
-- More registrations for AI Talk
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Jack Black', 'jack.b@example.com', now() - interval '6 hours'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Kelly Blue', 'kelly.b@example.com', now() - interval '7 hours'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Liam Red', 'liam.r@example.com', now() - interval '8 hours'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Mia Orange', 'mia.o@example.com', now() - interval '9 hours'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Noah Purple', 'noah.p@example.com', now() - interval '10 hours');
