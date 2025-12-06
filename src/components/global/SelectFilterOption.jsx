/**
 * A reusable select dropdown component for filtering.
 * @param {object} props - The component's props.
 * @param {string} props.value - The currently selected value.
 * @param {Function} props.onChange - The function to call when the selection changes. It receives the setter and the event object.
 * @param {string} props.label - The placeholder text for the default option.
 * @param {string[]} props.options - An array of strings to populate the select options.
 * @param {Function} [props.setter] - An optional state setter function, passed to the onChange handler.
 * @param {string} [props.name] - The name attribute for the select element.
 * @returns {JSX.Element} The rendered select filter component.
 */
const SelectFilterOption = ({ value, onChange, label, options, setter, name }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(setter, e)}
      className="w-1/2 md:w-auto px-1 py-1 md:px-3 md:py-2 border border-gray-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
    >
      <option value="">{label}</option>
      {options.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}
export default SelectFilterOption
