import Gomb from "./Gomb";

export default function ReservationsTable({ allReservations, onEdit, onDelete }) {
  console.log("ReservationsTable received reservations:", allReservations);

  if (!allReservations || !Array.isArray(allReservations.result)) {
    return <div>No reservations available</div>;
  }

  const reservations = allReservations.result;

  if (reservations.length === 0) {
    return <div>No reservations found</div>;
  }

  return (
    <>
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr className="text-center">
            <th>reservation_id</th>
            <th>user_id</th>
            <th>vehicle_id</th>
            <th>pickup_date</th>
            <th>return_date</th>
            <th>status</th>
            <th>created_at</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr className="text-center" key={reservation.reservation_id}>
              <td>{reservation.reservation_id}</td>
              <td>{reservation.user_id}</td>
              <td>{reservation.vehicle_id}</td>
              <td>{reservation.pickup_date}</td>
              <td>{reservation.return_date}</td>
              <td>{reservation.status}</td>
              <td>{reservation.created_at}</td>
              <td className="d-flex justify-content-evenly">
                <Gomb
                  buttonClass="btn btn-sm btn-warning"
                  content="Modify"
                  onClick={() => onEdit(reservation)}
                />
                <Gomb
                  buttonClass="btn btn-sm btn-danger"
                  content="Delete"
                  onClick={() => onDelete(reservation)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}