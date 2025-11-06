import { useState } from 'react'
import FormInput from './FormInput'
import { Search } from 'lucide-react'

const SearchBar = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    searchQuery: '',
  })
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData.searchQuery)
  }
  return (
    <form onSubmit={handleSubmit} className="relative w-full sm:max-w-md">
      <FormInput
        name="searchQuery"
        value={formData.searchQuery}
        handleInputChange={handleInputChange}
        placeholder="Search University by name..."
        type="search"
        required
        className="pl-3 pr-10 py-2 sm:py-3 w-full rounded-lg border border-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2"
        type="submit"
      >
        <Search className=" w-4 h-4 text-slate-700 cursor-pointer" />
      </button>
    </form>
  )
}
export default SearchBar
