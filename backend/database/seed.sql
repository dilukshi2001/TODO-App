USE todo_app;

INSERT INTO users (name, email, password)
VALUES
(
  'Dilukshi Nimasha',
  'dilukshi@gmail.com',
  '$2a$10$wHhA3wtUnyS5B8MuDpiH1eqL97D1y7DcDpEx6Fv6PXB3NqQivCmjG'
),
(
  'Test User',
  'test@gmail.com',
  '$2a$10$wHhA3wtUnyS5B8MuDpiH1eqL97D1y7DcDpEx6Fv6PXB3NqQivCmjG'
);

INSERT INTO todos (user_id, title, description, status)
VALUES
(
  1,
  'Complete interview task',
  'Finish the todo app with authentication and CRUD features.',
  'pending'
),
(
  1,
  'Prepare project explanation',
  'Understand backend and frontend communication.',
  'completed'
),
(
  2,
  'Test authentication',
  'Check login and JWT functionality.',
  'pending'
);