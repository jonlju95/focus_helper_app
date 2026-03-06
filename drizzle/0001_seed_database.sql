INSERT OR IGNORE INTO categories (id, name, color_bg, color_text, entity_type)
VALUES ('02ba6774-9c8b-4c4a-80b7-e6fc18307017', 'Transport', '#ddeef8', '#3a7fc1', 'EXPENSE'),
       ('613ba763-81ae-4e96-bd6c-4fdc7d299e77', 'Appointment', '#fde8d8', '#c4622d', 'ACTIVITY'),
       ('615d3d9b-6453-4d78-89dd-fce5db66ef3f', 'Other', '#ede8e0', '#7a6a5a', 'EXPENSE'),
       ('705b9cb8-6b37-4370-9280-9fd27b9d09ce', 'Work', '#f0e8fd', '#8a3ac1', 'ACTIVITY'),
       ('78f5ef4d-91b3-4eeb-986b-e4450dd35633', 'Home', '#fdf3d8', '#c49028', 'EXPENSE'),
       ('83689b9d-240e-441a-b8ff-cf5fce0a8835', 'Food & Drink', '#fde8d8', '#c4622d', 'EXPENSE'),
       ('84ca8c11-cb58-4fab-9cd4-db47993f0f3f', 'Personal', '#e8f5e8', '#3a9a5a', 'ACTIVITY'),
       ('87608b25-3621-450f-87bf-bf4633174631', 'Meeting', '#ddeef8', '#3a7fc1', 'ACTIVITY'),
       ('923cd4a1-b7a6-4b38-9eae-51d36827c26c', 'Health', '#fde8f8', '#c13a9a', 'EXPENSE'),
       ('96d028c4-f3f0-4752-9c9a-30f280787092', 'Errand', '#fdf3d8', '#c49028', 'ACTIVITY'),
       ('abbdff99-e31e-440a-9ec8-f98942b4f893', 'Groceries', '#e8f5e8', '#3a9a5a', 'EXPENSE'),
       ('b501ecd9-5b6a-45bd-943f-5abe11db8f64', 'Note', '#fde8f8', '#c13a9a', 'ACTIVITY'),
       ('fedfcc34-2789-4829-9923-dc95e95f925e', 'Subscriptions', '#f0e8fd', '#8a3ac1', 'EXPENSE');
--> statement-breakpoint
INSERT OR IGNORE INTO reminder_types (id, name)
VALUES ('22a9b3b6-ea54-4cd9-8497-69726fb07159', 'Reminders'),
       ('4924a4df-053c-40c7-bfb1-af9f866f9aa6', 'Shopping'),
       ('836c5c46-e46e-42e5-88bc-2c6bb605cb07', 'Notes');
