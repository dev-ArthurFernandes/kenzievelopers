CREATE TYPE OS AS ENUM ("Windows", "Linux", "MacOS");

CREATE TABLE developers(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE developer_infos(
    "id" SERIAL PRIMARY KEY,
    "developerSince" DATE NOR NULL,
    "preferredOS" OS NOT NULL,
    "developerId" INTEGER NOT NULL UNIQUE,
    FOREIGN KEY ("developerId") REFERENCES "developers" ("id") ON DELETE SET NULL
);

CREATE TABLE projects(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "estimatedTime" VARCHAR(120) NOT NULL,
    "repository" VARCHAR(120) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "developerId" INTEGER,
    FOREIGN KEY ("developerId") REFERENCES "developers" ("id") ON DELETE SET NULL
);

CREATE TABLE technologies(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30) NOT NULL
);

CREATE TABLE projects_technologies(
    "id" SERIAL PRIMARY KEY,
    "addedIn" DATE NOT NULL,
    "technologyId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    FOREIGN KEY ("technologyId") REFERENCES "technologies" ("id") ON DELETE SET NULL,
    FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE
);

INSERT INTO
    "technologies"("name")
VALUES
    ("JavaScript"),
    ("Python"),
    ("React"),
    ("Express.js"),
    ("HTML"),
    ("CSS"),
    ("Django"),
    ("PostgreSQL"),
    ("MongoDB");