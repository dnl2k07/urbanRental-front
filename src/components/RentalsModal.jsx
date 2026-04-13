import { useState } from "react";
import ModalInput from "./ModalInput";
import { updateRental } from "../users";

export default function RentalsModal({
  showModal,
  selectedRental,
  onClose,
  onRefresh
}) {
  if (!showModal || !selectedRental) return null;

  const [reservation_id, setReservationId] = useState(selectedRental.reservation_id);
  const [vehicle_id, setVehicleId] = useState(selectedRental.vehicle_id);
  const [start_time, setStartTime] = useState(selectedRental.start_time || "");
  const [expected_return, setExpectedReturn] = useState(selectedRental.expected_return || "");
  const [actual_return, setActualReturn] = useState(selectedRental.actual_return || "");
  const [status, setStatus] = useState(selectedRental.status);
  const [damage_notes, setDamageNotes] = useState(selectedRental.damage_notes || "");

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="mb-3">Edit Rental #{selectedRental.rental_id}</h5>

          <ModalInput
            label={"Reservation ID:"}
            type={"text"}
            value={reservation_id}
            onChange={(e) => setReservationId(e.target.value)}
            placeholder={selectedRental.reservation_id}
          />

          <ModalInput
            label={"Vehicle ID:"}
            type={"text"}
            value={vehicle_id}
            onChange={(e) => setVehicleId(e.target.value)}
            placeholder={selectedRental.vehicle_id}
          />

          <ModalInput
            label={"Start Time:"}
            type={"datetime-local"}
            value={start_time}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <ModalInput
            label={"Expected Return:"}
            type={"datetime-local"}
            value={expected_return}
            onChange={(e) => setExpectedReturn(e.target.value)}
          />

          <ModalInput
            label={"Actual Return:"}
            type={"datetime-local"}
            value={actual_return}
            onChange={(e) => setActualReturn(e.target.value)}
          />

          <div className="mb-3">
            <label className="form-label fw-bold">Status:</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active_rental">Active Rental</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <ModalInput
            label={"Damage Notes:"}
            type={"text"}
            value={damage_notes}
            onChange={(e) => setDamageNotes(e.target.value)}
            placeholder="Any damage notes..."
          />

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
            onClick={() => handleUpdate(selectedRental.user_id)}
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );

  async function handleUpdate(user_id) {
    const data = await updateRental(
      user_id,
      reservation_id,
      vehicle_id,
      start_time,
      expected_return,
      actual_return,
      status,
      damage_notes
    );

    if (data.error) {
      alert(data.error);
      return;
    }
    alert("Sikeres módosítás");
    onRefresh();
  }
}