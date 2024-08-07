steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE tasks(
            task_id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(300) NOT NULL,
            description VARCHAR(1000),
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            due_date DATE NOT NULL,
            priority INTEGER CONSTRAINT priority_check CHECK (priority IN (1, 2, 3)) NOT NULL,
            status VARCHAR(100) DEFAULT 'active' NOT NULL,
            assigner_id INTEGER REFERENCES users (user_id),
            assignee_id INTEGER REFERENCES users (user_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tasks;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments(
            comment_id SERIAL PRIMARY KEY NOT NULL,
            comment VARCHAR(300) NOT NULL,
            user_id VARCHAR(1000),
            task_id INTEGER REFERENCES users (user_id),
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """
    ]
]
