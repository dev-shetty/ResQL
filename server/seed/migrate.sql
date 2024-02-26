DROP TABLE IF EXISTS RESCUER_DISASTER;
DROP TABLE IF EXISTS RESCUER_SKILLS;
DROP TABLE IF EXISTS RESCUER;
DROP TABLE IF EXISTS SKILLS;
DROP TABLE IF EXISTS RESOURCE;
DROP TABLE IF EXISTS DONATION;
DROP TABLE IF EXISTS ORGANIZATION CASCADE;
DROP TABLE IF EXISTS AUTHORITY CASCADE;
DROP TABLE IF EXISTS DISASTER CASCADE;


CREATE TABLE AUTHORITY(
    id varchar(8) PRIMARY KEY,
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password text NOT NULL,
    phone varchar(10),
    city varchar(20) NOT NULL,
    state varchar(20),
    country varchar(20)
);

CREATE TABLE DISASTER(
    id varchar(8) PRIMARY KEY,
    authority_id varchar(8) REFERENCES AUTHORITY(id) ON DELETE CASCADE,
    type varchar(20),
    name varchar(50) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    city varchar(20) NOT NULL,
    state varchar(20) NOT NULL,
    country varchar(20) NOT NULL,
    people_affected INT,
    severity INT NOT NULL
);

CREATE TABLE ORGANIZATION(
    id varchar(8) PRIMARY KEY,
    name varchar(50) NOT NULL,
    phone varchar(10),
    email varchar(50) NOT NULL,
    password text NOT NULL,
    city varchar(20) NOT NULL,
    state varchar(20),
    country varchar(20)
);

CREATE TABLE RESOURCE(
    id varchar(8),
    org_id varchar(8) REFERENCES ORGANIZATION(id) ON DELETE CASCADE,
    name varchar(50) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id, org_id)
);

CREATE TABLE DONATION(
    id varchar(8),
    org_id varchar(8) REFERENCES ORGANIZATION(id) ON DELETE CASCADE,
    name varchar(50) NOT NULL,
    amount FLOAT NOT NULL,
    PRIMARY KEY(id, org_id)
);

CREATE TABLE RESCUER(
    id varchar(8) PRIMARY KEY,
    name varchar(50) NOT NULL,
    phone varchar(10),
    email varchar(50) NOT NULL,
    city varchar(20) NOT NULL,
    password text NOT NULL,
    state varchar(20),
    country varchar(20)
);

CREATE TABLE SKILLS(
    id varchar(8) PRIMARY KEY,
    skill varchar(50) NOT NULL
);

-- Junction of Rescuer and Skills
CREATE TABLE RESCUER_SKILLS(
    rescuer_id varchar(8) REFERENCES RESCUER(id) ON DELETE CASCADE,
    skill_id varchar(8) REFERENCES SKILLS(id) ON DELETE CASCADE,
    PRIMARY KEY(rescuer_id, skill_id)
);

-- Junction of Rescuer and Disasters
CREATE TABLE RESCUER_DISASTER(
    rescuer_id varchar(8) REFERENCES RESCUER(id) ON DELETE CASCADE,
    disaster_id varchar(8) REFERENCES DISASTER(id) ON DELETE CASCADE,
    PRIMARY KEY(rescuer_id, disaster_id)
);

-- Inserting Data to the table
INSERT INTO AUTHORITY (id, name, email, password, phone, city, state, country) 
VALUES 
    ('A1B2C3D4', 'Rahul Kumar', 'rahul@example.com', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', '9876543210', 'Mangalore', 'Karnataka', 'India'),
    ('E5F6G7H8', 'Priya Sharma', 'priya@example.com', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', '8765432109', 'Puttur', 'Karnataka', 'India'),
    ('I9J1K2L3', 'Amit Patel', 'amit@example.com', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', '7654321098', 'Udupi', 'Karnataka', 'India'),
    ('M4N5O6P7', 'Deepika Singh', 'deepika@example.com', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', '6543210987', 'Mulky', 'Karnataka', 'India'),
    ('Q8R9S1T2', 'Rajesh Gupta', 'rajesh@example.com', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', '5432109876', 'Mangalore', 'Karnataka', 'India');

INSERT INTO DISASTER (id, authority_id, type, name, description, date, city, state, country, people_affected, severity) 
VALUES 
    ('D1E2S3A4', 'A1B2C3D4', 'Flood', 'Karnataka Floods', 'Heavy rainfall causing flooding in various parts of Karnataka.', '2024-02-20', 'Mangalore', 'Karnataka', 'India', 1000, 8),
    ('F5I6R7E8', 'E5F6G7H8', 'Earthquake', 'Udupi Earthquake', 'A moderate earthquake struck Udupi, causing structural damage.', '2024-01-15', 'Udupi', 'Karnataka', 'India', 500, 6),
    ('T9S1U2N3', 'Q8R9S1T2', 'Cyclone', 'Mangalore Cyclone', 'A cyclonic storm hit Mangalore, resulting in heavy rain and strong winds.', '2024-03-10', 'Mangalore', 'Karnataka', 'India', 1500, 9),
    ('N4A5T6U7', 'I9J1K2L3', 'Wildfire', 'Puttur Wildfire', 'A wildfire broke out in the forests near Puttur, threatening nearby villages.', '2024-04-05', 'Puttur', 'Karnataka', 'India', 300, 7),
    ('D8I9S1A2', 'M4N5O6P7', 'Drought', 'Mulky Drought', 'Persistent drought conditions in Mulky causing water scarcity.', '2024-05-20', 'Mulky', 'Karnataka', 'India', 2000, 10);

INSERT INTO ORGANIZATION (id, name, phone, email, password, city, state, country) 
VALUES 
    ('ORG1A234', 'Relief Foundation', '9876543210', 'info@relief.org', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Mangalore', 'Karnataka', 'India'),
    ('ORG5I678', 'Helping Hands NGO', '8765432109', 'help@hands.org', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Puttur', 'Karnataka', 'India'),
    ('ORG9E123', 'Emergency Aid Society', '7654321098', 'aid@society.org', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Udupi', 'Karnataka', 'India'),
    ('ORG4U567', 'Disaster Relief Alliance', '6543210987', 'relief@alliance.org', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Mulky', 'Karnataka', 'India'),
    ('ORGS9123', 'Humanitarian Group', '5432109876', 'humanity@group.org', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Mangalore', 'Karnataka', 'India');

INSERT INTO RESOURCE (id, org_id, name, quantity)
VALUES 
    ('R1E2S3O4', 'ORG1A234', 'Food Packets', 1000),
    ('R5E6L7I8', 'ORG5I678', 'Medicine Kits', 500),
    ('R9E1S2C3', 'ORG9E123', 'Water Bottles', 2000),
    ('R4E5L6I7', 'ORG4U567', 'Blankets', 300),
    ('R8O9P1E2', 'ORGS9123', 'Clothes', 800);

INSERT INTO DONATION (id, org_id, name, amount)
VALUES 
    ('D1O2N3R4', 'ORG1A234', 'Aarav Patel', 5000.00),
    ('D5O6N7A8', 'ORG5I678', 'Saanvi Reddy', 3000.00),
    ('D9O1N2E3', 'ORG9E123', 'Aaradhya Sharma', 7000.00),
    ('D4O5N6A7', 'ORG4U567', 'Vivaan Gupta', 2000.00),
    ('D8O9N1E2', 'ORGS9123', 'Ishaan Kumar', 6000.00);

INSERT INTO RESCUER (id, name, phone, email, city, password, state, country) 
VALUES 
    ('R1E2S3C4', 'Deveesh Shetty', '9876543210', 'deveesh@example.com', 'Mangalore', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Karnataka', 'India'),
    ('R5E6S7C8', 'Rohan', '8765432109', 'rohan@example.com', 'Puttur', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Karnataka', 'India'),
    ('R9E1S2C3', 'Rahul Singh', '7654321098', 'rahul@example.com', 'Udupi', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Karnataka', 'India'),
    ('R4E5S6C7', 'Meenakshi Nair', '6543210987', 'meenakshi@example.com', 'Mulky', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Karnataka', 'India'),
    ('R8E9S1C2', 'Divya Patel', '5432109876', 'divya@example.com', 'Mangalore', '$2a$10$WsEBLDD6RwMh2eumanDUjuM5keCxTl3eQFRVDAGyDA5sT6ZnkYb1W', 'Karnataka', 'India');

INSERT INTO SKILLS (id, skill) 
VALUES 
    ('S1K2I3L4', 'First Aid'),
    ('S5K6I7L8', 'Search and Rescue'),
    ('S9K1I2L3', 'Communication'),
    ('S4K5I6L7', 'Fire Fighting'),
    ('S8K9I1L2', 'Navigation');

INSERT INTO RESCUER_SKILLS (rescuer_id, skill_id)
VALUES 
    ('R1E2S3C4', 'S1K2I3L4'),
    ('R1E2S3C4', 'S5K6I7L8'),
    ('R5E6S7C8', 'S9K1I2L3'),
    ('R5E6S7C8', 'S4K5I6L7'),
    ('R5E6S7C8', 'S8K9I1L2'),
    ('R9E1S2C3', 'S1K2I3L4'),
    ('R4E5S6C7', 'S5K6I7L8'),
    ('R8E9S1C2', 'S4K5I6L7');

INSERT INTO RESCUER_DISASTER (rescuer_id, disaster_id)
VALUES 
    ('R1E2S3C4', 'D1E2S3A4'),
    ('R1E2S3C4', 'F5I6R7E8'),
    ('R5E6S7C8', 'N4A5T6U7'),
    ('R9E1S2C3', 'D8I9S1A2'),
    ('R8E9S1C2', 'T9S1U2N3');

