-- Начинаем транзакцию
BEGIN;

-- Удаляем все задачи, у которых тип не равен 'HH'
DELETE FROM tasks
WHERE NOT ('HH' = ALL(types));

-- Понедельник
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-11-18T07:45:00Z', '{ODIN, KONTUR}', 2, NOW(), NOW()), -- startOdinOnline, Kontur class for programming
('2024-11-18T09:45:00Z', '{ODIN, KONTUR}', 1, NOW(), NOW()), -- startOdinOnline, Kontur class for testing
('2024-11-18T11:30:00Z', '{ODIN, KONTUR}', 4, NOW(), NOW()); -- startOdinOnline, Kontur class for securityLife

-- Вторник
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-11-19T07:45:00Z', '{ODIN, KONTUR}', 2, NOW(), NOW()), -- startOdinOnline, Kontur class for programming
('2024-11-19T11:30:00Z', '{ODIN, KONTUR}', 6, NOW(), NOW()), -- startOdinOnline, Kontur class for psychology
('2024-11-19T13:15:00Z', '{ODIN, ZOOM}', 10, NOW(), NOW()); -- startOdinOnline, Zoom class for second diploma

-- Среда
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-11-20T06:00:00Z', '{ODIN, ZOOM}', 3, NOW(), NOW()), -- startOdinOnline, Zoom class for mobile development
('2024-11-20T07:45:00Z', '{ODIN, KONTUR}', 5, NOW(), NOW()), -- startOdinOnline, Kontur class for databases
('2024-11-20T09:45:00Z', '{ODIN, KONTUR}', 6, NOW(), NOW()); -- startOdinOnline, Kontur class for psychology

-- Четверг
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-11-21T11:30:00Z', '{ODIN, KONTUR}', 7, NOW(), NOW()), -- startOdinOnline, Kontur class for system programming
('2024-11-21T13:15:00Z', '{ODIN, KONTUR}', 7, NOW(), NOW()); -- startOdinOnline, Kontur class for system programming (second session)

-- Пятница
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-11-22T09:45:00Z', '{ODIN, KONTUR}', 2, NOW(), NOW()), -- startOdinOnline, Kontur class for programming
('2024-11-22T11:30:00Z', '{ODIN, KONTUR}', 4, NOW(), NOW()), -- startOdinOnline, Kontur class for securityLife
('2024-11-22T13:15:00Z', '{ODIN, KONTUR}', 9, NOW(), NOW()); -- startOdinOnline, Kontur class for documentation

-- Завершаем транзакцию
COMMIT;
