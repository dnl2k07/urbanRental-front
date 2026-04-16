import { useState } from "react";
import ModalInput from "./ModalInput";
import { updateReservation } from "../usersFolder/users";

export default function ReservationsModal({
  showModal,
  selectedReservation,
  onClose,
  onRefresh
}) {
  if (!showModal || !selectedReservation) return null;

  const [user_id, setUserId] = useState(selectedReservation.user_id);
  const [vehicle_id, setVehicleId] = useState(selectedReservation.vehicle_id);
  const [pickup_date, setPickupDate] = useState(selectedReservation.pickup_date);
  const [return_date, setReturnDate] = useState(selectedReservation.return_date);
  const [status, setStatus] = useState(selectedReservation.status);

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="mb-3">Edit Reservation #{selectedReservation.reservation_id}</h5>

          <ModalInput
            label={"User ID:"}
            type={"text"}
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            placeholder={selectedReservation.user_id}
          />

          <ModalInput
            label={"Vehicle ID:"}
            type={"text"}
            value={vehicle_id}
            onChange={(e) => setVehicleId(e.target.value)}
            placeholder={selectedReservation.vehicle_id}
          />

          <ModalInput
            label={"Pickup Date:"}
            type={"datetime-local"}
            value={pickup_date}
            onChange={(e) => setPickupDate(e.target.value)}
          />

          <ModalInput
            label={"Return Date:"}
            type={"datetime-local"}
            value={return_date}
            onChange={(e) => setReturnDate(e.target.value)}
          />

          <div className="mb-3">
            <label className="form-label fw-bold">Status:</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleUpdate(selectedReservation.reservation_id)}
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );

  async function handleUpdate(reservation_id) {
    const data = await updateReservation(
      reservation_id,
      user_id,
      vehicle_id,
      pickup_date,
      return_date,
      status
    );

    if (data.error) {
      alert(data.error);
      return;
    }
    alert("Sikeres módosítás");
    onRefresh();
  }
}