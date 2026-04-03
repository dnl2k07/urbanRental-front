import Gomb from "./Gomb";
export default function UserTable({allUsers,onEdit,onDelete}){
    console.log("UserTable received users:", allUsers);
    
    // Handle case when allUsers is null or undefined
    if (!allUsers) {
        console.log("No users to display");
        return <div>No users available</div>;
    }
    
    return (
        <table className="table table-striped table-hover table-dark">
            <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    <th>role</th>
                    <th>created_at</th>
                    <th>actions</th>

                </tr>
            </thead>
            <tbody>
                {allUsers.map(user=>(
                    <tr className="text-center" key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.created_at}</td>
                        <td className="d-flex justify-content-evenly">
                            <Gomb buttonClass='btn btn-sm btn-warning' content='Szerkeztés' onClick={()=>onEdit(user)}/>
                            <Gomb buttonClass='btn btn-sm btn-danger' content='tölés' onClick={()=>onDelete(user)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
