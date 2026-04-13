import Gomb from "./Gomb";

export default function RentalsTable({ allRentals, onEdit, onDelete }) {
  console.log("RentalsTable received rentals:", allRentals);

  if (!allRentals || !Array.isArray(allRentals.result)) {
    return <div>No rentals available</div>;
  }

  const rentals = allRentals.result;

  if (rentals.length === 0) {
    return <div>No rentals found</div>;
  }

  return (
    <>
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr className="text-center">
            <th>rental_id</th>
            <th>reservation_id</th>
            <th>vehicle_id</th>
            <th>user_id</th>
            <th>start_time</th>
            <th>expected_return</th>
            <th>actual_return</th>
            <th>status</th>
            <th>damage_notes</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr className="text-center" key={rental.rental_id}>
              <td>{rental.rental_id}</td>
              <td>{rental.reservation_id}</td>
              <td>{rental.vehicle_id}</td>
              <td>{rental.user_id}</td>
              <td>{rental.start_time}</td>
              <td>{rental.expected_return}</td>
              <td>{rental.actual_return}</td>
              <td>{rental.status}</td>
              <td>{rental.damage_notes || "N/A"}</td>
              <td className="d-flex justify-content-evenly">
                <Gomb
                  buttonClass="btn btn-sm btn-warning"
                  content="Modify"
                  onClick={() => onEdit(rental)}
                />
                <Gomb
                  buttonClass="btn btn-sm btn-danger"
                  content="Delete"
                  onClick={() => onDelete(rental)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}