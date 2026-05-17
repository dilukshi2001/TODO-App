USE todo_app;

INSERT INTO users (name, email, password)
VALUES
(
  'Dilukshi Nimasha',
  'dilukshi@gmail.com',
  '$2b$10$wG/N7rWXr3QRH.Z.GM0Ubu7Qydv09KGCFkp.OQ2SVlyRk20vf7MQW'
),
(
  'Kasun Perera',
  'kasun@gmail.com',
  '$2b$10$wG/N7rWXr3QRH.Z.GM0Ubu7Qydv09KGCFkp.OQ2SVlyRk20vf7MQW'
),
(
  'Nadeesha Fernando',
  'nadeesha@gmail.com',
  '$2b$10$wG/N7rWXr3QRH.Z.GM0Ubu7Qydv09KGCFkp.OQ2SVlyRk20vf7MQW'
),
(
  'Ayesha Silva',
  'ayesha@gmail.com',
  '$2b$10$wG/N7rWXr3QRH.Z.GM0Ubu7Qydv09KGCFkp.OQ2SVlyRk20vf7MQW'
),
(
  'Tharindu Jayasinghe',
  'tharindu@gmail.com',
  '$2b$10$wG/N7rWXr3QRH.Z.GM0Ubu7Qydv09KGCFkp.OQ2SVlyRk20vf7MQW'
);

INSERT INTO todos (
  user_id,
  title,
  description,
  due_date,
  due_time,
  status
)
VALUES

(
  1,
  'Complete React frontend',
  'Finish responsive UI components and routing implementation.',
  '2026-05-18',
  '09:00:00',
  'pending'
),

(
  1,
  'Push project to GitHub',
  'Create proper commits and merge feature branches.',
  '2026-05-18',
  '11:30:00',
  'completed'
),

(
  1,
  'Prepare interview explanation',
  'Revise backend APIs, JWT flow and database communication.',
  '2026-05-19',
  '18:00:00',
  'pending'
),

(
  2,
  'Renew driving license',
  'Visit Werahera RMV office with required documents.',
  '2026-05-20',
  '08:30:00',
  'pending'
),

(
  2,
  'Pay electricity bill',
  'Pay monthly CEB bill using online banking.',
  '2026-05-17',
  '20:00:00',
  'completed'
),

(
  2,
  'Buy groceries',
  'Milk powder, rice, eggs and vegetables from Keells.',
  '2026-05-17',
  '17:00:00',
  'pending'
),

(
  3,
  'Submit ICT4153 report',
  'Finalize mobile application documentation and diagrams.',
  '2026-05-21',
  '23:00:00',
  'pending'
),

(
  3,
  'Attend group meeting',
  'Discuss backend API integration for final project.',
  '2026-05-18',
  '14:00:00',
  'completed'
),

(
  3,
  'Book hospital appointment',
  'Channel doctor for annual checkup.',
  '2026-05-22',
  '10:15:00',
  'pending'
),

(
  4,
  'Update LinkedIn profile',
  'Add recent hackathon achievements and internship experience.',
  '2026-05-18',
  '21:00:00',
  'completed'
),

(
  4,
  'Attend React workshop',
  'Join online frontend development webinar.',
  '2026-05-19',
  '19:30:00',
  'pending'
),

(
  4,
  'Plan Avurudu shopping',
  'Buy clothes and gifts for family members.',
  '2026-05-25',
  '16:00:00',
  'pending'
),

(
  5,
  'Service motorbike',
  'Change engine oil and check brakes before trip.',
  '2026-05-20',
  '09:30:00',
  'pending'
),

(
  5,
  'Complete presentation slides',
  'Finalize software engineering project presentation.',
  '2026-05-18',
  '22:00:00',
  'completed'
),

(
  5,
  'Call internet provider',
  'Report slow fibre connection issue.',
  '2026-05-17',
  '13:45:00',
  'pending'
);