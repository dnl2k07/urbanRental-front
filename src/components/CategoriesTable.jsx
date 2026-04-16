import Gomb from "./Gomb";

export default function CategoriesTable({ allCategories, onEdit, onDelete }) {
  console.log("CategoriesTable received categories:", allCategories);

  if (!allCategories || !Array.isArray(allCategories.result)) {
    return <div>No categories available</div>;
  }

  const categories = allCategories.result;

  if (categories.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <>
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr className="text-center">
            <th>category_id</th>
            <th>name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr className="text-center" key={category.category_id}>
              <td>{category.category_id}</td>
              <td>{category.name}</td>
              <td className="d-flex justify-content-evenly">
                <Gomb
                  buttonClass="btn btn-sm btn-warning"
                  content="Modify"
                  onClick={() => onEdit(category)}
                />
                <Gomb
                  buttonClass="btn btn-sm btn-danger"
                  content="Delete"
                  onClick={() => onDelete(category)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}