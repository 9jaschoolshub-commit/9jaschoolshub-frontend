const SelectFilterOption = ({ value, onChange, label, options, setter }) => {
  return (
    <select
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
