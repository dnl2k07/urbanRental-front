import Gomb from "./Gomb";
export default function CarTable({ allCars, onEdit, onDelete, onAdd }) {
  console.log("CarTable received users:", allCars);

  // Handle case when allcars is null or undefined
  if (!allCars) {
    console.log("No cars to display");
    return <div>No cars available</div>;
  }

  return (
    <>
      <Gomb
        buttonClass="btn btn-sm btn-success"
        content="Add New car"
        onClick={() => onAdd(car)}
      />
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr className="text-center">
            <th>vehicle_id</th>
            <th>category_id</th>
            <th>brand</th>
            <th>model</th>
            <th>color</th>
            <th>transmission</th>
            <th>license_plate</th>
            <th>year</th>
            <th>price_per_day</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {allCars.map((car) => (
            <tr className="text-center" key={car.vehicle_id}>
              <td>{car.vehicle_id}</td>
              <td>{car.category_id}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.color}</td>
              <td>{car.transmission}</td>
              <td>{car.license_plate}</td>
              <td>{car.year}</td>
              <td>{car.price_per_day}</td>
              <td className="d-flex justify-content-evenly">
                <Gomb
                  buttonClass="btn btn-sm btn-warning"
                  content="Modify"
                  onClick={() => onEdit(car)}
                />
                <Gomb
                  buttonClass="btn btn-sm btn-danger"
                  content="Delete"
                  onClick={() => onDelete(car)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
