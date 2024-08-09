steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE tasks(
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(300) NOT NULL,
            description VARCHAR(1000),
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            due_date DATE NOT NULL,
            priority INTEGER CONSTRAINT priority_check CHECK (priority IN (1, 2, 3)) NOT NULL,
            status VARCHAR(100) DEFAULT 'active' NOT NULL,
            assigner_id INTEGER REFERENCES users (id),
            assignee_id INTEGER REFERENCES users (id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tasks;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments(
            id SERIAL PRIMARY KEY NOT NULL,
            comment VARCHAR(300) NOT NULL,
            user_id INTEGER REFERENCES users (id),
            task_id INTEGER REFERENCES tasks (id),
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """,
    ],
]
