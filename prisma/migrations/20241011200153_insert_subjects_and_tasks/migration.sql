-- This is an empty migration.

-- Вставка данных в таблицу subjects
INSERT INTO subjects (name, link, created_at, updated_at)
VALUES 
('Поддержка и тестирование программных модулей', 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09', NOW(), NOW()),
('Разработка программных модулей', 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09', NOW(), NOW()),
('Разработка мобильных приложений', 'https://zoom.us/j/8204557587?pwd=MUpQMFNMUVNNWXB6SUhYU0MreWdCdz09', NOW(), NOW()),
('Безопасность жизнедеятельности', 'https://zoom.us/j/4898102962?pwd=RjFvUnRVVXFVRGhiOGZRYmdsc3ZOdz09', NOW(), NOW()),
('Технология разработки и защиты баз данных', 'https://zoom.us/j/7463860716?pwd=NTJnMXIrMHlPRnlCUEJSZlR1cmVCdz09', NOW(), NOW()),
('Психология общения', 'https://zoom.us/j/2615158278?pwd=Vnk0L3EycnVUeTNFYlJ2RWZxNURJQT09', NOW(), NOW()),
('Системное программирование Node.js', 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09', NOW(), NOW()),
('Стандартизация, сертификация и техническое документоведение', 'https://zoom.us/j/6480814148?pwd=SjJaeWkvelg0Y3JWYmdsRG9veElLQT09', NOW(), NOW());

-- Понедельник
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-10-14T09:00:00Z', '{ODIN, ZOOM}', 1, NOW(), NOW()), -- startOdinOnline, Zoom class for testing
('2024-10-14T10:10:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-14T10:45:00Z', '{ODIN, ZOOM}', 2, NOW(), NOW()), -- startOdinOnline, Zoom class for programming
('2024-10-14T12:45:00Z', '{ODIN, ZOOM}', 3, NOW(), NOW()), -- startOdinOnline, Zoom class for mobile development
('2024-10-14T14:30:00Z', '{ODIN, ZOOM}', 4, NOW(), NOW()), -- startOdinOnline, Zoom class for securityLife
('2024-10-14T14:50:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-14T19:00:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-14T23:15:00Z', '{HH}', NULL, NOW(), NOW()); -- runHHBot

-- Вторник
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-10-15T09:00:00Z', '{ODIN, ZOOM}', 2, NOW(), NOW()), -- startOdinOnline, Zoom class for programming
('2024-10-15T10:10:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-15T10:45:00Z', '{ODIN, ZOOM}', 4, NOW(), NOW()), -- startOdinOnline, Zoom class for securityLife
('2024-10-15T14:50:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-15T19:10:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-15T23:15:00Z', '{HH}', NULL, NOW(), NOW()); -- runHHBot

-- Среда
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-10-16T09:00:00Z', '{ODIN, ZOOM}', 3, NOW(), NOW()), -- startOdinOnline, Zoom class for mobile development
('2024-10-16T10:10:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-16T10:45:00Z', '{ODIN, ZOOM}', 5, NOW(), NOW()), -- startOdinOnline, Zoom class for db
('2024-10-16T12:45:00Z', '{ODIN, ZOOM}', 6, NOW(), NOW()), -- startOdinOnline, Zoom class for psychology
('2024-10-16T14:50:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-16T19:10:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-16T23:15:00Z', '{HH}', NULL, NOW(), NOW()); -- runHHBot

-- Четверг
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-10-17T10:10:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-17T14:20:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-17T14:30:00Z', '{ODIN, ZOOM}', 7, NOW(), NOW()), -- startOdinOnline, Zoom class for system programming
('2024-10-17T16:15:00Z', '{ODIN, ZOOM}', 7, NOW(), NOW()), -- startOdinOnline, Zoom class for system programming (second session)
('2024-10-17T18:45:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-17T23:40:00Z', '{HH}', NULL, NOW(), NOW()); -- runHHBot

-- Пятница
INSERT INTO tasks (start_time, types, subject_id, created_at, updated_at)
VALUES 
('2024-10-18T00:20:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-18T10:10:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-18T01:58:00Z', '{ODIN, HH}', NULL, NOW(), NOW()), -- startOdinOnline, runHHBot (test case)
('2024-10-18T12:45:00Z', '{ODIN, ZOOM}', 2, NOW(), NOW()), -- startOdinOnline, Zoom class for programming
('2024-10-18T14:20:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-18T14:30:00Z', '{ODIN, ZOOM}', 4, NOW(), NOW()), -- startOdinOnline, Zoom class for securityLife
('2024-10-18T16:15:00Z', '{ODIN, ZOOM}', 8, NOW(), NOW()), -- startOdinOnline, Zoom class for docs
('2024-10-18T18:40:00Z', '{HH}', NULL, NOW(), NOW()), -- runHHBot
('2024-10-18T23:00:00Z', '{HH}', NULL, NOW(), NOW()); -- runHHBot
