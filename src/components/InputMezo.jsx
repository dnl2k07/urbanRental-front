export default function InputMezo({ label, type, placeholder, value, setValue }) {
    return (
        <div className="mb-3">
            <label className="mb-1">{label}</label>
            <input 
                className="form-control"
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}