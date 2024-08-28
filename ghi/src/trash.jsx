// return (
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar">
//         <div className="container-fluid">
//             <img
//                 src="/logo.png"
//                 alt="Logo"
//                 style={{ width: '100px', height: 'auto' }}
//             />
//             <div className="d-flex flex-grow-1">
//                 <div className="d-flex flex-grow-1">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         {user && (
//                             <>
//                                 <li className="nav-item">
//                                     <NavLink
//                                         to="/dashboard"
//                                         className="nav-link btn btn-light"
//                                         end
//                                     >
//                                         Dashboard
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink
//                                         to="/tasks/mine"
//                                         className="nav-link btn btn-light"
//                                     >
//                                         My Created Tasks
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink
//                                         to="/assigned-tasks/mine"
//                                         className="nav-link btn btn-light"
//                                     >
//                                         My Assigned Tasks
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink
//                                         to="/tasks"
//                                         className="nav-link btn btn-light"
//                                         end
//                                     >
//                                         All Tasks
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink
//                                         to="/tasks/create"
//                                         className="nav-link btn btn-light"
//                                     >
//                                         Create Task
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink
//                                         to="/tasks/history"
//                                         className="nav-link btn btn-light"
//                                     >
//                                         Task History
//                                     </NavLink>
//                                 </li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//                 {user && (
//                     <div className="d-flex">
//                         <button
//                             className="btn signout-button me-2"
//                             onClick={() => {
//                                 signout()
//                             }}
//                         >
//                             Sign Out
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     </nav>
// )

// .custom-navbar {
//     background-color: #003135;
// }

// .nav-link {
//     color: #fff;
// }

// .nav-link.active {
//     background-color: #b2dbd1;
//     color: #003135;
// }

// .signout-button {
//     background-color: #964734;
//     border: none;
//     color: #fff;
// }

// .signout-button:hover {
//     background-color: #7a3a2c;
// }
