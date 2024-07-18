

/* ALTER TABLE `invoices` ADD `due_date` DATETIME NOT NULL; */

INSERT INTO `invoices` (`ref`, `due_date`, `company_id`, `created_at`, `updated_at`)
VALUES
    (   'F20220915-001', '2024-09-15', (SELECT id FROM companies WHERE name = 'Raviga'),         '2022-09-15', '2022-09-15'),
    (   'F20221030-002', '2024-10-30', (SELECT id FROM companies WHERE name = 'Dunder Mifflin'), '2022-10-30', '2022-10-30'),
    (   'F20220915-003', '2024-10-01', (SELECT id FROM companies WHERE name = 'Pierre Cailloux'), '2020-07-25','2020-07-25'),
    (   'F20220915-004', '2024-09-30', (SELECT id FROM companies WHERE name = 'Pied Pipper'), '2022-12-05', '2022-12-05'),
    (   'F20220915-005', '2024-12-05', (SELECT id FROM companies WHERE name = 'Raviga'), '2024-02-01', '2024-02-01'),
    (   'F20220915-001', '2024-09-10', (SELECT id FROM companies WHERE name = 'Mutiny'), '2021-09-27', '2021-09-27'),
    (   'F20220915-002', '2024-08-15', (SELECT id FROM companies WHERE name = 'Hooli'), '2020-06-25', '2020-06-25'),
    (   'F20220915-003', '2024-07-30', (SELECT id FROM companies WHERE name = 'Phoque Off'), '2022-10-11', '2022-10-11'),
    (   'F20220915-004', '2024-09-09', (SELECT id FROM companies WHERE name = 'Vanden Borre'), '2020-09-25', '2020-09-25'),
    (   'F20220915-005', '2024-11-27', (SELECT id FROM companies WHERE name = 'Dreamland'), '2021-09-25', '2021-09-25');




INSERT INTO `contacts` (`name`, `phone`, `email`, `company_id`, `created_at`, `updated_at`)
VALUES
    ('Richard Hendricks', '555-1234', 'richard@piedpiper.com', (SELECT id FROM companies WHERE name = 'Pied Pipper'), '2022-12-05', '2022-12-05'),
    ('Erlich Bachman',    '555-5678', 'erlich@aviato.com', (SELECT id FROM companies WHERE name = 'Pied Pipper'), '2022-12-05', '2022-12-05'),
    ('Monica Hall',       '555-9101', 'monica@raviga.com', (SELECT id FROM companies WHERE name = 'Raviga'), '2022-09-15', '2022-09-15'),
    ('Gavin Belson',      '555-6354', 'gavin@hooli.com', (SELECT id FROM companies WHERE name = 'Hooli'), '2020-06-25', '2020-06-25'),
    ('Jian Yang',         '555-8769', 'jian.yan@phoque.off', (SELECT id FROM companies WHERE name = 'Phoque Off'), '2022-10-11', '2022-10-11'),
    ('Bertram Gilfoyle',  '555-5447', 'gilfoy@piedpiper.com', (SELECT id FROM companies WHERE name = 'Pied Pipper'), '2022-12-05', '2022-12-05'),
    ('Tim David',         '555-4589', 'tim.david@jouet-jm.com', (SELECT id FROM companies WHERE name = 'Jouet Jean-Michel'), '2023-09-25', '2023-09-25'),
    ('Camille Lemonier',  '555-8710', 'cam.how@dunder-mifflin.net', (SELECT id FROM companies WHERE name = 'Dunder Mifflin'), '2021-10-25', '2021-10-25'),
    ('Gabriel Thomas',    '555-6330', 'gabriel.thomas@vanden-borre.com', (SELECT id FROM companies WHERE name = 'Vanden Borre'), '2020-09-25', '2020-09-25'),
    ('Pierre Martin',     '555-6587', 'pierre.martin@pierre-cailloux.off', (SELECT id FROM companies WHERE name = 'Pierre Cailloux'), '2020-07-25', '2020-07-25'),
    ('Julie Decroix',     '555-5434', 'julie.decroix@dreamland.com', (SELECT id FROM companies WHERE name = 'Dreamland'), '2021-09-25', '2021-09-25');

INSERT INTO `roles` (`name`, `created_at`, `updated_at`)
VALUES
    ('God user', '2018-01-31', '2018-01-31'),
    ('Moderator', '2018-01-31', '2018-01-31');

INSERT INTO `users` (`first_name`, `role_id`, `last_name`, `email`, `password`, `created_at`, `updated_at`)
VALUES
    ('Jean-Christian', (SELECT id FROM roles WHERE name = 'God user'), 'Ranu', 'J-Christ00@cogips.com', 'Ranu', '2018-01-31', '2018-01-31'),
    ('Muriel', (SELECT id FROM roles WHERE name = 'Moderator'), 'Perrache', 'Muriel@cogips.com', 'Perrache', '2018-01-31', '2018-01-31');
