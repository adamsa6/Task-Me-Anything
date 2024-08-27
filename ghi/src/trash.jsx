return (
    <div>
        <div>
            <h1>{task.title}:</h1>
            <p>{task.description}</p>
        </div>
        <div>
            <ul>
                <li>Created On: {task.created_on}</li>
                <li>Due Date: {task.due_date}</li>
                <li>
                    Assignee: {users.assignee.last_name},{' '}
                    {users.assignee.first_name}
                </li>
                <li>
                    Assigner: {users.assigner.last_name},{' '}
                    {users.assigner.first_name}
                </li>
                <li>Priority Level: {task.priority}</li>
                <li>status: {task.status}</li>
            </ul>
        </div>
        <div>
            <InProgressButton key={task.id} task={task} />
            <DeleteButton task={task} />
            <CompletedButton task={task} />
            {userData.id == users.assigner.id && (
                <button onClick={handleEditClick}>Edit Task</button>
            )}
        </div>
        <div>
            <ListTaskComments key={task.id} task={task} />
        </div>
        <div
            className="modal fade"
            id="myModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-2"
                            id="staticBackdropLabel"
                        >
                            Congrats
                        </h1>
                    </div>
                    <div>
                        <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                        >
                            Heres a JOKE to celebrate a job well done!
                        </h1>
                    </div>
                    <div className="modal-body fs-4">
                        <h1>{joke}</h1>
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={handleNavigateClick}
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
