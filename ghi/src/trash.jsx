// return (
//     <div className="task-comments-container">
//         <h1 className="comments-title">Comments</h1>
//         <button
//             type="button"
//             data-bs-toggle="modal"
//             data-bs-target="#add-comment"
//             className="add-comment-btn"
//         >
//             Add Comment
//         </button>
//         <div>
//             <CreateComment />
//         </div>
//         <table className="comments-table">
//             <thead>
//                 <tr>
//                     <th>Comment</th>
//                     <th>User</th>
//                     <th>Created On</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.comments.map((comment) => (
//                     <tr key={comment.id} className="comment-row">
//                         <td colSpan="4">
//                             <div className="comment-row-wrapper">
//                                 <div className="comment-details">
//                                     <GetSingleUser comment={comment} />
//                                 </div>
//                                 {user.id === comment.user_id && (
//                                     <div className="comment-actions">
//                                         <button
//                                             type="button"
//                                             data-bs-toggle="modal"
//                                             data-bs-target="#edit-comment"
//                                             className="edit-comment-btn"
//                                         >
//                                             <img
//                                                 src="/pencil-square.svg"
//                                                 alt="Edit"
//                                                 width="16"
//                                                 height="16"
//                                             />
//                                         </button>
//                                         <div>
//                                             <EditComment comment={comment} />
//                                         </div>
//                                         <button
//                                             type="button"
//                                             data-bs-toggle="modal"
//                                             data-bs-target="#delete-comment"
//                                             className="delete-comment-btn"
//                                         >
//                                             <img
//                                                 src="/trash3.svg"
//                                                 alt="Delete"
//                                                 width="16"
//                                                 height="16"
//                                             />
//                                         </button>
//                                         <div>
//                                             <DeleteComment comment={comment} />
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// )

// .task-comments-container {
//     padding: 20px;
// }

// .comments-title {
//     font-size: 24px;
//     margin-bottom: 20px;
// }

// .add-comment-btn {
//     background-color: #024950;
//     color: #fff;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     margin-bottom: 20px;
// }

// .comments-table {
//     width: 100%;
//     border-collapse: collapse;
// }

// .comments-table th,
// .comments-table td {
//     padding: 8px;
//     text-align: left;
//     border-bottom: 1px solid #d9cdc4;
// }

// .comment-row {
//     cursor: pointer;
//     overflow: hidden;
// }

// .comment-row-wrapper {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     background-color: #faf9f6;
//     color: #07757f;
//     border-radius: 10px;
//     padding: 10px;
//     margin-bottom: 10px;
//     overflow: hidden;
// }

// .comment-row-wrapper:hover {
//     background-color: #dbdad8;
// }

// .comment-details {
//     flex: 1;
//     padding: 8px;
// }

// .comment-actions {
//     display: flex;
//     align-items: center;
// }

// .edit-comment-btn,
// .delete-comment-btn {
//     background-color: #718c70; /* Edit */
//     border: none;
//     color: white;
//     padding: 5px 10px;
//     border-radius: 5px;
//     cursor: pointer;
// }

// .delete-comment-btn {
//     background-color: #c44900; /* Delete */
// }

// .edit-comment-btn:hover,
// .delete-comment-btn:hover {
//     opacity: 0.8;
// }

// .edit-comment-btn img,
// .delete-comment-btn img {
//     filter: invert(18%) sepia(64%) saturate(593%) hue-rotate(326deg)
//         brightness(94%) contrast(88%);
// }
