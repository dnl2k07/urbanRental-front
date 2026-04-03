import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import UserTable from "../components/UserTable";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  userEdit,
  getAllCars,
  deleteCar,
  updateCar,
  NewCarwithimg,
} from "../users";
import CarTable from "../components/CarTable";
import ModalInput from "../components/ModalInput";

export default function Admin() {
  //usestates
  //auth
  const { user, loading, onLogout } = useAuth();
  //console.log(user);
  //user
  const [allUsers, setAllUsers] = useState(null);
  const [generalerror, setgeneralerror] = useState("");
  const [selectedUser, setselectedUser] = useState(null);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [showModal, setshowModal] = useState(false);

  //caredittable
  const [allvehicle, setallvehicle] = useState([]);
  const [selectedCar, setselectedCar] = useState(null);
  const [category_id, setCategory_id] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [license_plate, setLicensePlate] = useState("");
  const [year, setYear] = useState("");
  const [price_per_day, setPricePerDay] = useState("");
  const [img, setimg] = useState([]);
  const [showCarModal, setshowCarModal] = useState(false);
  const [showNewCarModal, setshowNewCarModal] = useState(false);

  //end of usestates

  //functions
  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-danger">Loading..</div>
      </div>
    );
  }

  //user functions
  async function loadUsers() {
    const data = await getAllUsers();
    console.log("API Response:", data);

    if (data.error) {
      console.log("Error from API:", data.error);

      return setgeneralerror(data.error);
    }
    console.log("Setting users to:", data.result);
    // Ensure we handle the case where result might be undefined or null
    if (!data.result) {
      console.log("No result found in response");
      return setAllUsers([]);
    }
    return setAllUsers(data.result);
  }
  useEffect(() => {
    loadUsers();
  }, []);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  async function handleDelete(user) {
    setgeneralerror("");
    const confirmDelete = window.confirm(
      `Biztos törölni akarod a ${user.username} nevü felhasználot`,
    );

    if (!confirmDelete) {
      return;
    }
    const data = await deleteUser(user.user_id);
    if (data.error) {
      setgeneralerror(data.error);
      return alert(data.error);
    }
    setAllUsers((prev) => prev.filter((x) => x.user_id !== user.user_id));
    //or just loadUsers()
  }
  async function handleEdit(user) {
    setgeneralerror("");
    setselectedUser(user);
    setshowModal(true);
  }
  async function editUser(user_id) {
    setgeneralerror("");

    const data = await userEdit(user_id, username, email, role);

    if (data.error) {
      setgeneralerror(data.error);
      return alert(data.error);
    }
    alert("sikeres modositás");
    return loadUsers();
  }

  //car functions

  async function loadCars() {
    setgeneralerror("");
    const data = await getAllCars();
    console.log("API Response:", data);

    if (data.error) {
      console.log("Error from API:", data.error);
      return setgeneralerror(data.error);
    }
    //console.log("Setting users to:", data.result);
    // Ensure we handle the case where result might be undefined or null
    if (!data.result) {
      console.log("No result found in response");
      return setallvehicle([]);
    }
    return setallvehicle(data.result);
  }
  useEffect(() => {
    loadCars();
  }, []);

  async function handleCarDelete(car) {
    setgeneralerror("");
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${car.vehicle_id} `,
    );

    if (!confirmDelete) {
      return;
    }
    const data = await deleteCar(car.vehicle_id);
    if (data.error) {
      setgeneralerror(data.error);
      return alert(data.error);
    }
    loadCars();
  }
  async function handleCarEdit(car) {
    setgeneralerror("");
    setselectedCar(car);
    setCategory_id(car.category_id || "");
    setBrand(car.brand || "");
    setModel(car.model || "");
    setColor(car.color || "");
    setTransmission(car.transmission || "");
    setLicensePlate(car.license_plate || "");
    setYear(car.year || "");
    setPricePerDay(car.price_per_day || "");
    setshowCarModal(true);
  }
  async function editCar(vehicle_id) {
    setgeneralerror("");

    const data = await updateCar(
      vehicle_id,
      category_id,
      brand,
      model,
      color,
      transmission,
      license_plate,
      year,
      price_per_day,
    );

    if (data.error) {
      setgeneralerror(data.error);
      return alert(data.error);
    }
    alert("sikeres modositás");
    return loadCars();
  }

  //this will fail if the database doesnt have a category coresponding to it idk how to fix it
  //todo add a message when it fails to upload wiht wrong or missing category id

  async function handleNewcar(car) {
    setgeneralerror("");
    // Initialize with empty values for a new car
    setselectedCar({
      category_id: "",
      brand: "",
      model: "",
      color: "",
      transmission: "",
      license_plate: "",
      year: "",
      price_per_day: "",
    });
    setCategory_id("");
    setBrand("");
    setModel("");
    setColor("");
    setTransmission("");
    setLicensePlate("");
    setYear("");
    setPricePerDay("");
    setimg([]);
    setshowNewCarModal(true);
  }
  async function NewCarwithimgupload() {
    setgeneralerror("");

    const data = await NewCarwithimg(
      category_id,
      brand,
      model,
      color,
      transmission,
      license_plate,
      year,
      price_per_day,
      img,
    );

    if (data.error) {
      setgeneralerror(data.error);
      return alert(data.error);
    }
    alert("successfull upload");
    return loadCars();
  }

  return (
    <div>
      <NavBar user={user} onLogout={onLogout}></NavBar>
      <div className="container">
        <div className=" text-center bg-danger">{generalerror}</div>
        <h1 className="text-center my-3">Admin panel</h1>
        <h3>User controls</h3>
        <UserTable
          allUsers={allUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <h3>Car Controls</h3>
        <CarTable
          allCars={[allvehicle]}
          onEdit={handleCarEdit}
          onDelete={handleCarDelete}
          onAdd={handleNewcar}
        ></CarTable>
        <h3>Car category</h3>
        {/* //table that handles rentals statuses edit delete completed */}
        <h3>Reservations</h3>
        {/* //table that handles reservations edit delete */}
        <h3>Rentals</h3>
        {/* //table that handles rentals statuses edit delete completed */}
      </div>
      {/* usermodal */}
      {showModal && selectedUser && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <ModalInput
                label={"Username:"}
                type={"text"}
                defaultValue={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder={"valaki"}
              ></ModalInput>

              <ModalInput
                label={"Email:"}
                type={"email"}
                defaultValue={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder={"valami@gmail.com"}
              ></ModalInput>

              <ModalInput
                label={"Role:"}
                type={"text"}
                defaultValue={role}
                onChange={(e) => setrole(e.target.value)}
                placeholder={"user/admin"}
              ></ModalInput>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setshowModal(false);
                  setselectedUser(null);
                }}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editUser(selectedUser.user_id)}
              >
                Modify
              </button>
            </div>
          </div>
        </div>
      )}
      {/* //car model for editing */}
      {showCarModal && selectedCar && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <ModalInput
                label={"Category ID:"}
                type={"text"}
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
                placeholder={"1"}
              ></ModalInput>

              <ModalInput
                label={"Brand:"}
                type={"text"}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder={"Toyota"}
              ></ModalInput>

              <ModalInput
                label={"Model:"}
                type={"text"}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={"Camry"}
              ></ModalInput>

              <ModalInput
                label={"Color:"}
                type={"text"}
                defaultValue={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder={"Red"}
              ></ModalInput>

              <ModalInput
                label={"Transmission:"}
                type={"text"}
                defaultValue={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                placeholder={"Automatic"}
              ></ModalInput>

              <ModalInput
                label={"License Plate:"}
                type={"text"}
                defaultValue={license_plate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder={"ABC-123"}
              ></ModalInput>

              <ModalInput
                label={"Year:"}
                type={"number"}
                defaultValue={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={"2022"}
              ></ModalInput>

              <ModalInput
                label={"Price Per Day:"}
                type={"number"}
                defaultValue={price_per_day}
                onChange={(e) => setPricePerDay(e.target.value)}
                placeholder={"50"}
              ></ModalInput>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setshowCarModal(false);
                setselectedCar(null);
              }}
            >
              Close
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => editCar(selectedCar.vehicle_id)}
            >
              Modify
            </button>
            </div>
          </div>
        </div>
      )}

      {/* //car modal for new car */}
      {showNewCarModal && selectedCar&& (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <ModalInput
                label={"Category ID:"}
                type={"text"}
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
                placeholder={"1"}
              ></ModalInput>

              <ModalInput
                label={"Brand:"}
                type={"text"}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder={"Toyota"}
              ></ModalInput>

              <ModalInput
                label={"Model:"}
                type={"text"}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={"Camry"}
              ></ModalInput>

              <ModalInput
                label={"Color:"}
                type={"text"}
                defaultValue={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder={"Red"}
              ></ModalInput>

              <ModalInput
                label={"Transmission:"}
                type={"text"}
                defaultValue={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                placeholder={"Automatic"}
              ></ModalInput>

              <ModalInput
                label={"License Plate:"}
                type={"text"}
                defaultValue={license_plate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder={"ABC-123"}
              ></ModalInput>

              <ModalInput
                label={"Year:"}
                type={"number"}
                defaultValue={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={"2022"}
              ></ModalInput>

              <ModalInput
                label={"Price Per Day:"}
                type={"number"}
                defaultValue={price_per_day}
                onChange={(e) => setPricePerDay(e.target.value)}
                placeholder={"50"}
              ></ModalInput>

              <label className="form-label fw-bold">img:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setimg(files);
                }}
              />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setshowNewCarModal(false);
                setselectedCar(null);
                // Reset form fields
                setCategory_id("");
                setBrand("");
                setModel("");
                setColor("");
                setTransmission("");
                setLicensePlate("");
                setYear("");
                setPricePerDay("");
                setimg([]);
              }}
            >
              Close
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => NewCarwithimgupload()}
            >
              Upload new car
            </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
