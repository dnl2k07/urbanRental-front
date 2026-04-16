import { useState } from "react";
import ModalInput from "./ModalInput";
import { updateCategory, createCategory } from "../usersFolder/users";

export default function CategoriesModal({
  showModal,
  selectedCategory,
  onClose,
  onRefresh
}) {
  if (!showModal) return null;

  const isEdit = !!selectedCategory;
  const [name, setName] = useState(selectedCategory ? selectedCategory.name : "");

  const handleSubmit = async () => {
    let data;
    if (isEdit && selectedCategory.category_id) {
      data = await updateCategory(selectedCategory.category_id, name);
    } else {
      data = await createCategory(name);
    }

    if (data.error) {
      alert(data.error);
      return;
    }
    alert(isEdit ? "Sikeres módosítás" : "Sikeres hozzáadás");
    if (onRefresh) onRefresh();
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="mb-3">
            {isEdit ? `Edit Category #${selectedCategory.category_id}` : "Add New Category"}
          </h5>

          <ModalInput
            label={"Name:"}
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isEdit && selectedCategory ? selectedCategory.name : "Sedan, SUV, Truck..."}
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
            onClick={handleSubmit}
          >
            {isEdit ? "Modify" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}