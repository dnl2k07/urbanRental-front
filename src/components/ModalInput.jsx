export default function ModalInput({label, type,defaultValue, onChange,placeholder }) {
  return (
    <>
      <label className="form-label fw-bold">{label}</label>
      <input
        type={type}
        className="form-control"
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
