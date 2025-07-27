export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label for={label} className="text-left font-medium text-gray-700">
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
      />
    </div>
  );
}
