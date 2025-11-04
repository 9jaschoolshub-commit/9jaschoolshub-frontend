const FormInput = ({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  type,
  min,
  required,
  disabled,
  className,
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="text-xs md:text-sm">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={placeholder}
        type={type}
        min={min}
        required={required}
        disabled={disabled}
        className={`${className} text-sm md:text-base`}
      />
    </div>
  )
}
export default FormInput
