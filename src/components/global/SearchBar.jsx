import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { Search } from "lucide-react";

const SearchBar = ({
  onSubmit,
  value: controlledValue,
  onChange,
  initialQuery = "",
  className,
  placeholder,
}) => {
  const [internalValue, setInternalValue] = useState(initialQuery);

  // A component is controlled when its value is determined by the parent.
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // If the component is uncontrolled, sync its internal state if the initialQuery changes.
  useEffect(() => {
    if (!isControlled) {
      setInternalValue(initialQuery);
    }
  }, [initialQuery, isControlled]);

  const handleInputChange = (name, val) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full sm:max-w-md">
      <FormInput
        name="searchQuery"
        value={value}
        handleInputChange={handleInputChange}
        placeholder={placeholder}
        required
        type="search"
        className={`pl-3 pr-10 py-2 sm:py-3 w-full rounded-lg border border-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 ${className}`}
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2"
        type="submit"
      >
        <Search className=" w-4 h-4 text-slate-700 cursor-pointer" />
      </button>
    </form>
  );
};
export default SearchBar;
