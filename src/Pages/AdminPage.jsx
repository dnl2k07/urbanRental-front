import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import UserTable from "../components/UserTable";
import CarTable from "../components/CarTable";
import ReservationsTable from "../components/ReservationsTable";
import CategoriesTable from "../components/CategoriesTable";
import ReservationsModal from "../components/ReservationsModal";
import CategoriesModal from "../components/CategoriesModal";
import ModalInput from "../components/ModalInput";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

import {
  getAllUsers,
  deleteUser,
  userEdit,
  getAllCars,
  deleteCar,
  updateCar,
  NewCarwithimg,
  // Reservations
  getAllReservations,
  updateReservation,
  deleteReservation,
  // Categories
  getAllCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} from "../usersFolder/users";

export default function Admin() {
  // Auth state
  const { user, loading, onLogout } = useAuth();

  // General error state
  const [generalerror, setGeneralError] = useState("");

  // ==================== USER STATE ====================
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);

  // ==================== CAR STATE ====================
  const [allCars, setAllCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [category_id, setCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [license_plate, setLicensePlate] = useState("");
  const [year, setYear] = useState("");
  const [price_per_day, setPricePerDay] = useState("");
  const [img, setImg] = useState([]);
  const [showCarModal, setShowCarModal] = useState(false);
  const [showNewCarModal, setShowNewCarModal] = useState(false);

  // ==================== RESERVATION STATE ====================
  const [allReservations, setAllReservations] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // ==================== CATEGORY STATE ====================
  const [allCategories, setAllCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  // ==================== FILTER STATE ====================
  const [filterBrand, setFilterBrand] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-danger">Loading..</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // ==================== USER FUNCTIONS ====================
  async function loadUsers() {
    const data = await getAllUsers();
    console.log("API Response:", data);

    if (data.error) {
      console.log("Error from API:", data.error);
      return setGeneralError(data.error);
    }
    if (!data.result) {
      console.log("No result found in response");
      return setAllUsers([]);
    }
    return setAllUsers(data.result);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(user) {
    setGeneralError("");
    const confirmDelete = window.confirm(
      `Biztos törölni akarod a ${user.username} nevü felhasználot?`
    );

    if (!confirmDelete) {
      return;
    }
    const data = await deleteUser(user.user_id);
    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    setAllUsers((prev) => prev.filter((x) => x.user_id !== user.user_id));
  }

  async function handleEdit(user) {
    setGeneralError("");
    setSelectedUser(user);
    setUsername(user.username || "");
    setEmail(user.email || "");
    setRole(user.role || "");
    setShowUserModal(true);
  }

  async function editUser(user_id) {
    setGeneralError("");

    const data = await userEdit(user_id, username, email, role);

    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    alert("Sikeres módosítás");
    setShowUserModal(false);
    loadUsers();
  }

  // ==================== CAR FUNCTIONS ====================
  async function loadCars() {
    setGeneralError("");
    const data = await getAllCars();
    console.log("API Response:", data);

    if (data.error) {
      console.log("Error from API:", data.error);
      return setGeneralError(data.error);
    }
    if (!data.result) {
      console.log("No result found in response");
      return setAllCars([]);
    }
    return setAllCars(data.result);
  }

  useEffect(() => {
    loadCars();
  }, []);

  async function handleCarDelete(car) {
    setGeneralError("");
    const confirmDelete = window.confirm(`Are you sure you want to delete ${car.vehicle_id}?`);

    if (!confirmDelete) {
      return;
    }
    const data = await deleteCar(car.vehicle_id);
    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    loadCars();
  }

  async function handleCarEdit(car) {
    setGeneralError("");
    setSelectedCar(car);
    setCategoryId(car.category_id || "");
    setBrand(car.brand || "");
    setModel(car.model || "");
    setColor(car.color || "");
    setTransmission(car.transmission || "");
    setLicensePlate(car.license_plate || "");
    setYear(car.year || "");
    setPricePerDay(car.price_per_day || "");
    setShowCarModal(true);
  }

  async function editCar(vehicle_id) {
    setGeneralError("");

    const data = await updateCar(
      vehicle_id,
      category_id,
      brand,
      model,
      color,
      transmission,
      license_plate,
      year,
      price_per_day
    );

    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    alert("Sikeres módosítás");
    setShowCarModal(false);
    loadCars();
  }

  async function handleNewcar() {
    setGeneralError("");
    setSelectedCar({
      category_id: "",
      brand: "",
      model: "",
      color: "",
      transmission: "",
      license_plate: "",
      year: "",
      price_per_day: "",
    });
    setCategoryId("");
    setBrand("");
    setModel("");
    setColor("");
    setTransmission("");
    setLicensePlate("");
    setYear("");
    setPricePerDay("");
    setImg([]);
    setShowNewCarModal(true);
  }

  async function NewCarwithimgupload() {
    setGeneralError("");

    const data = await NewCarwithimg(
      category_id,
      brand,
      model,
      color,
      transmission,
      license_plate,
      year,
      price_per_day,
      img
    );

    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    alert("Successfull upload");
    setShowNewCarModal(false);
    loadCars();
  }

  // ==================== RESERVATION FUNCTIONS ====================
  async function loadReservations() {
    setGeneralError("");
    const data = await getAllReservations();

    if (data.error) {
      console.log("Error from API:", data.error);
      return setGeneralError(data.error);
    }
    return setAllReservations(data);
  }

  useEffect(() => {
    loadReservations();
  }, []);

  async function handleReservationEdit(reservation) {
    setGeneralError("");
    setSelectedReservation(reservation);
    setShowReservationModal(true);
  }

  async function handleReservationDelete(reservation) {
    setGeneralError("");
    const confirmDelete = window.confirm(
      `Are you sure you want to delete reservation #${reservation.reservation_id}?`
    );

    if (!confirmDelete) {
      return;
    }
    const data = await deleteReservation(reservation.reservation_id);
    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    loadReservations();
  }

  async function handleUpdateReservation() {
    setGeneralError("");

    const data = await updateReservation(
      selectedReservation.reservation_id,
      selectedReservation.user_id,
      selectedReservation.vehicle_id,
      selectedReservation.pickup_date,
      selectedReservation.return_date,
      selectedReservation.status
    );

    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    alert("Sikeres módosítás");
    setShowReservationModal(false);
    loadReservations();
  }


  // ==================== CATEGORY FUNCTIONS ====================
  async function loadCategories() {
    setGeneralError("");
    const data = await getAllCategories();

    if (data.error) {
      console.log("Error from API:", data.error);
      return setGeneralError(data.error);
    }
    return setAllCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleCategoryEdit(category) {
    setGeneralError("");
    setSelectedCategory(category);
    setShowCategoryModal(true);
  }

  async function handleCategoryDelete(category) {
    setGeneralError("");
    const confirmDelete = window.confirm(
      `Are you sure you want to delete category #${category.category_id} (${category.name})?`
    );

    if (!confirmDelete) {
      return;
    }
    const data = await deleteCategory(category.category_id);
    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    loadCategories();
  }

  async function handleUpdateCategory() {
    setGeneralError("");

    const data = await updateCategory(selectedCategory.category_id, selectedCategory.name);

    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    alert("Sikeres módosítás");
    setShowCategoryModal(false);
    loadCategories();
  }

  async function handleNewCategory() {
    setSelectedCategory(null);
    setShowNewCategoryModal(true);
  }

  async function handleCreateCategory(name) {
    setGeneralError("");

    const data = await createCategory(name);

    if (data.error) {
      setGeneralError(data.error);
      return alert(data.error);
    }
    alert("Sikeres hozzáadás");
    setShowNewCategoryModal(false);
    loadCategories();
  }

  // ==================== FILTER FUNCTIONS ====================
  async function handleFilterCars() {
    const filters = {};
    if (filterBrand) filters.brand = filterBrand;
    if (filterModel) filters.model = filterModel;
    if (filterMinPrice) filters.min_price = filterMinPrice;
    if (filterMaxPrice) filters.max_price = filterMaxPrice;

    setGeneralError("");
    const data = await getAllCars();
    
    // Apply client-side filtering
    let filteredCars = [...allCars];
    if (filters.brand) {
      filteredCars = filteredCars.filter(car => car.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }
    if (filters.model) {
      filteredCars = filteredCars.filter(car => car.model.toLowerCase().includes(filters.model.toLowerCase()));
    }
    if (filters.min_price) {
      filteredCars = filteredCars.filter(car => parseFloat(car.price_per_day) >= parseFloat(filters.min_price));
    }
    if (filters.max_price) {
      filteredCars = filteredCars.filter(car => parseFloat(car.price_per_day) <= parseFloat(filters.max_price));
    }

    setAllCars(filteredCars);
  }

  async function handleClearFilter() {
    setFilterBrand("");
    setFilterModel("");
    setFilterMinPrice("");
    setFilterMaxPrice("");
    loadCars();
  }

  return (
    <div>
      <NavBar user={user} onLogout={onLogout}></NavBar>
      <div className="container">
        {generalerror && <div className="text-center bg-danger p-2 mb-3">{generalerror}</div>}
        
        <h1 className="text-center my-3">Admin Panel</h1>

        {/* Car Filter Section */}
        <div className="card mb-4 p-3">
          <h5>Filter Cars</h5>
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Brand..."
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Model..."
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                value={filterMinPrice}
                onChange={(e) => setFilterMinPrice(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex gap-2">
              <button className="btn btn-primary" onClick={handleFilterCars}>
                Filter
              </button>
              <button className="btn btn-secondary" onClick={handleClearFilter}>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* User Controls */}
        <h3>User Controls</h3>
        <UserTable allUsers={allUsers} onEdit={handleEdit} onDelete={handleDelete} />
        
        {/* Car Controls */}
        <h3 className="mt-4">Car Controls</h3>
        <CarTable
          allCars={allCars}
          onEdit={handleCarEdit}
          onDelete={handleCarDelete}
          onAdd={handleNewcar}
        />

        {/* Categories Section */}
        <h3 className="mt-4">Car Categories</h3>
        <CategoriesTable
          allCategories={allCategories}
          onEdit={handleCategoryEdit}
          onDelete={handleCategoryDelete}
        />
        
        {/* Add Category Button */}
        <button
          className="btn btn-success mb-3"
          onClick={handleNewCategory}
        >
          + Add New Category
        </button>

        {/* Reservations Section */}
        <h3 className="mt-4">Reservations</h3>
        {allReservations && (
          <ReservationsTable
            allReservations={allReservations}
            onEdit={handleReservationEdit}
            onDelete={handleReservationDelete}
          />
        )}
        
        
      </div>

      {/* User Edit Modal */}
      {showUserModal && selectedUser && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="mb-3">Edit User #{selectedUser.user_id}</h5>
              
              <ModalInput
                label={"Username:"}
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={selectedUser.username}
              />

              <ModalInput
                label={"Email:"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedUser.email}
              />

              <ModalInput
                label={"Role:"}
                type={"text"}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={selectedUser.role || "user/admin"}
              />

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
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

      {/* Car Edit Modal */}
      {showCarModal && selectedCar && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="mb-3">Edit Car #{selectedCar.vehicle_id}</h5>
              
              <ModalInput
                label={"Category ID:"}
                type={"text"}
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder={selectedCar.category_id || "1"}
              />

              <ModalInput
                label={"Brand:"}
                type={"text"}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder={selectedCar.brand || "Toyota"}
              />

              <ModalInput
                label={"Model:"}
                type={"text"}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={selectedCar.model || "Camry"}
              />

              <ModalInput
                label={"Color:"}
                type={"text"}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder={selectedCar.color || "Red"}
              />

              <ModalInput
                label={"Transmission:"}
                type={"text"}
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                placeholder={selectedCar.transmission || "Automatic"}
              />

              <ModalInput
                label={"License Plate:"}
                type={"text"}
                value={license_plate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder={selectedCar.license_plate || "ABC-123"}
              />

              <ModalInput
                label={"Year:"}
                type={"number"}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={selectedCar.year || "2022"}
              />

              <ModalInput
                label={"Price Per Day:"}
                type={"number"}
                value={price_per_day}
                onChange={(e) => setPricePerDay(e.target.value)}
                placeholder={selectedCar.price_per_day || "50"}
              />

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowCarModal(false);
                  setSelectedCar(null);
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

      {/* New Car Modal */}
      {showNewCarModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="mb-3">Add New Car</h5>
              
              <ModalInput
                label={"Category ID:"}
                type={"text"}
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder={"1"}
              />

              <ModalInput
                label={"Brand:"}
                type={"text"}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder={"Toyota"}
              />

              <ModalInput
                label={"Model:"}
                type={"text"}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={"Camry"}
              />

              <ModalInput
                label={"Color:"}
                type={"text"}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder={"Red"}
              />

              <ModalInput
                label={"Transmission:"}
                type={"text"}
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                placeholder={"Automatic"}
              />

              <ModalInput
                label={"License Plate:"}
                type={"text"}
                value={license_plate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder={"ABC-123"}
              />

              <ModalInput
                label={"Year:"}
                type={"number"}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={"2022"}
              />

              <ModalInput
                label={"Price Per Day:"}
                type={"number"}
                value={price_per_day}
                onChange={(e) => setPricePerDay(e.target.value)}
                placeholder={"50"}
              />

              <label className="form-label fw-bold">Images:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImg(files);
                }}
              />

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowNewCarModal(false);
                  setSelectedCar(null);
                  setCategoryId("");
                  setBrand("");
                  setModel("");
                  setColor("");
                  setTransmission("");
                  setLicensePlate("");
                  setYear("");
                  setPricePerDay("");
                  setImg([]);
                }}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={NewCarwithimgupload}
              >
                Upload New Car
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reservations Modal */}
      {showReservationModal && selectedReservation && (
        <ReservationsModal
          showModal={showReservationModal}
          selectedReservation={selectedReservation}
          onClose={() => {
            setShowReservationModal(false);
            setSelectedReservation(null);
          }}
          onRefresh={loadReservations}
        />
      )}

      

      {/* Categories Modal (Edit) */}
      {showCategoryModal && selectedCategory && (
        <CategoriesModal
          showModal={showCategoryModal}
          selectedCategory={selectedCategory}
          onClose={() => {
            setShowCategoryModal(false);
            setSelectedCategory(null);
          }}
          onRefresh={loadCategories}
        />
      )}

      {/* New Category Modal */}
      {showNewCategoryModal && (
        <CategoriesModal
          showModal={showNewCategoryModal}
          selectedCategory={null}
          onClose={() => {
            setShowNewCategoryModal(false);
            setSelectedCategory(null);
          }}
          onRefresh={loadCategories}
        />
      )}

      <Footer></Footer>
    </div>
  );
}