/**
 * A reusable form input component.
 * @param {object} props - The component's props.
 * @param {string} props.name - The name and id of the input element.
 * @param {string} [props.label] - The label text for the input. If not provided, no label is rendered.
 * @param {string | number} props.value - The current value of the input.
 * @param {(name: string, value: string) => void} props.handleInputChange - The function to call when the input value changes.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {string} [props.type="text"] - The type of the input element (e.g., "text", "number", "password").
 * @param {number | string} [props.min] - The minimum value for a numeric input.
 * @param {boolean} [props.required] - Whether the input is required.
 * @param {boolean} [props.disabled] - Whether the input is disabled.
 * @param {string} [props.className] - Additional CSS classes to apply to the input element.
 * @returns {JSX.Element} The rendered form input component.
 */
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
