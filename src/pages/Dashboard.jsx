import { useState, useEffect } from 'react'
import { universityAPI } from '../services/universityApi'
import { getApiKeyFromServer } from '../services/apiKeyService'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from '@clerk/clerk-react'
import filterData from '../data/filterData'
import { toast } from 'react-toastify'
import sideImage from '../assets/images/bottom-image.jpg'
// import useStore from "../hooks/useStore";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    universityId: '',
    unversityName: '',
    type: 'Federal',
    location: 'Lagos',
    programmes: '',
    schoolFees: '',
    website: '',
    email: '',
    phone: '',
    requirements: '',
    notes: '',
    image: null,
  })
  const [loading, setLoading] = useState(false)
  const [actionType, setActionType] = useState('add')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedUniversity, setSelectedUniversity] = useState(null)
  const { getToken, isSignedIn } = useAuth()

  const actionTypes = [
    { option: 'add', label: 'add university' },
    { option: 'update', label: 'update university' },
    { option: 'delete', label: 'delete university' },
  ]

  const uniLocation = filterData.universityLocation
  const uniType = filterData.universityType

  useEffect(() => {
    const setup = async () => {
      if (isSignedIn) {
        try {
          // Get and save auth token from Clerk to Zustand
          // const token = await getToken();
          // save to Zustand logic here

          // Fetch and save API key
          await getApiKeyFromServer()
        } catch (error) {
          toast.error('Failed to initialize admin session.')
          console.error('error message:', error)
        }
      }
    }
    setup()
  }, [isSignedIn, getToken])

  const handleChange = (e) => {
    if (!e.isTrusted) {
      return
    }

    const { name, value, type, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }))
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    // Clear selected university and results if search query changes
    setSelectedUniversity(null)
    setSearchResults([])
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    setLoading(true)
    try {
      const results = await universityAPI.searchUniversities(searchQuery)
      console.log('search results:', results)

      setSearchResults(results.data || [])
    } catch (error) {
      if (error.message === 'No universities match your search criteria.') {
        setSearchResults([]) // Ensure results are cleared
        toast.info('No universities found matching your search.')
      } else {
        toast.error('Failed to search university.')
        console.error('Search error:', error)
        setSearchResults([])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university)
    setFormData({
      universityId: university._id,
      unversityName: university.university_name,
      type: university.type,
      location: university.location,
      // Flatten the courses from all faculties into a single string
      programmes: university.notable_programs
        .flatMap((faculty) => faculty.Courses.map((course) => course.course))
        .join(', '),
      schoolFees: university.school_fees_range,
      website: university.website,
      email: university.email,
      phone: university.phone_number,
      // Requirements are nested inside courses, so we can't easily populate this.
      // will address later
      requirements: '',
      notes: university.notes,
      image: null,
    })
  }

  const handleCsvUpload = () => {
    // This is a placeholder for the CSV upload logic.

    toast.info('CSV upload functionality is not yet implemented.')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (actionType === 'add') {
        const payload = new FormData()
        payload.append('UniversityName', formData.unversityName)
        payload.append('type', formData.type)
        payload.append('location', formData.location)
        payload.append(
          'programmes',
          formData.programmes
            .split(',')
            .map((course) => course.trim())
            .join(',')
        )
        payload.append('schoolFees', formData.schoolFees)
        payload.append('website', formData.website)
        payload.append('email', formData.email)
        payload.append('phone', formData.phone)
        payload.append(
          'requirements',
          formData.requirements
            .split(',')
            .map((item) => item.trim())
            .join(',')
        )
        payload.append('notes', formData.notes)
        if (formData.image) {
          payload.append('image', formData.image)
        }

        await universityAPI.createUniversity(payload)
        toast.success('University created successfully!')
        resetForm()
      } else if (actionType === 'update') {
        if (!formData.universityId) {
          toast.error('Please enter a University to update.')
          return
        }

        const payload = new FormData()

        // Compare formData with selectedUniversity and append only changed fields
        if (formData.unversityName !== selectedUniversity.university_name) {
          payload.append('UniversityName', formData.unversityName)
        }
        if (formData.type !== selectedUniversity.type) {
          payload.append('type', formData.type)
        }
        if (formData.location !== selectedUniversity.location) {
          payload.append('location', formData.location)
        }

        const originalProgrammes = selectedUniversity.notable_programs
          .flatMap((faculty) => faculty.Courses.map((course) => course.course))
          .join(', ')
        if (formData.programmes !== originalProgrammes) {
          payload.append(
            'programmes',
            formData.programmes
              .split(',')
              .map((c) => c.trim())
              .join(',')
          )
        }

        if (formData.schoolFees !== selectedUniversity.school_fees_range) {
          payload.append('schoolFees', formData.schoolFees)
        }
        if (formData.website !== selectedUniversity.website) {
          payload.append('website', formData.website)
        }
        if (formData.email !== selectedUniversity.email) {
          payload.append('email', formData.email)
        }
        if (formData.phone !== selectedUniversity.phone_number) {
          payload.append('phone', formData.phone)
        }
        if (formData.notes !== selectedUniversity.notes) {
          payload.append('notes', formData.notes)
        }
        // Requirements are not pre-filled, so any input is considered a change
        if (formData.requirements) {
          payload.append(
            'requirements',
            formData.requirements
              .split(',')
              .map((r) => r.trim())
              .join(',')
          )
        }
        // Always append a new image if one is selected
        if (formData.image) {
          payload.append('image', formData.image)
        }

        await universityAPI.updateUniversity(formData.universityId, payload)
        toast.success('University updated successfully!')
        resetForm()
      } else if (actionType === 'delete') {
        if (!formData.universityId) {
          toast.error('Please enter a University ID to delete.')
          return
        }
        if (
          window.confirm('Are you sure you want to delete this university?')
        ) {
          await universityAPI.deleteUniversity(formData.universityId)
          toast.success('University deleted successfully!')
          resetForm()
        }
      }
    } catch (error) {
      toast.error(error.message || `Failed to ${actionType} university`)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      universityId: '',
      unversityName: '',
      type: 'Federal',
      location: 'Lagos',
      programmes: '',
      schoolFees: '',
      website: '',
      email: '',
      phone: '',
      requirements: '',
      notes: '',
      image: null,
    })
    setSelectedUniversity(null)
    setSearchResults([])
    setSearchQuery('')
  }

  // Determine if the university details form should be shown
  const showUniversityDetailsForm =
    actionType === 'add' || selectedUniversity !== null

  return (
    <div>
      <SignedOut>
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mb-6">Please sign in to continue.</p>
            <SignInButton className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer" />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="p-4 md:p-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column: Form */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold capitalize">
                  {actionType} University
                </h1>
                <UserButton />
              </div>

              <select
                name="actionType"
                id="actionType"
                value={actionType}
                onChange={(e) => {
                  setActionType(e.target.value)
                  resetForm() // Reset form when action type changes
                }}
                className="mt-4 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer capitalize"
              >
                {actionTypes.map((act) => (
                  <option key={act.option} value={act.option}>
                    {act.label}
                  </option>
                ))}
              </select>

              {(actionType === 'update' || actionType === 'delete') && (
                <div className="mt-6 max-w-xl">
                  <label htmlFor="searchUniversity" className="font-semibold">
                    Search University by Name or Location
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      name="searchUniversity"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Enter university name to search"
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={loading}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </button>
                  </div>

                  {loading && (
                    <div className="border border-gray-200 rounded-lg mt-2 p-3 space-y-3 animate-pulse">
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  )}

                  {!loading && searchResults.length > 0 && (
                    <ul className="border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto">
                      {searchResults.map((uni) => (
                        <li
                          key={uni._id}
                          onClick={() => handleSelectUniversity(uni)}
                          className="p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                        >
                          {uni.university_name} ({uni.location})
                        </li>
                      ))}
                    </ul>
                  )}

                  {actionType !== 'add' && !selectedUniversity && (
                    <p className="text-gray-600 mt-2">
                      Please search for and select a university to {actionType}.
                    </p>
                  )}
                </div>
              )}

              {showUniversityDetailsForm && (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 mt-4"
                >
                  {actionType !== 'delete' && (
                    <>
                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="university" className="font-semibold">
                          University Name
                        </label>
                        <input
                          type="text"
                          name="unversityName"
                          value={formData.unversityName}
                          onChange={handleChange}
                          placeholder="Enter your university"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label
                          htmlFor="universityType"
                          className="font-semibold"
                        >
                          University Type
                        </label>
                        <select
                          name="type"
                          onChange={handleChange}
                          value={formData.type}
                          className="px-3 py-2 border border-gray-300 rounded-lg cursor-pointer"
                        >
                          {uniType.map((uni) => (
                            <option
                              key={uni}
                              value={uni.toLowerCase()}
                              className="capitalize"
                            >
                              {formData.type || uni}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="location" className="font-semibold">
                          Location
                        </label>
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="px-3 py-2 border border-gray-300 rounded-lg cursor-pointer"
                        >
                          {uniLocation.map((location) => (
                            <option
                              key={location}
                              value={location.toLowerCase()}
                              className="capitalize"
                            >
                              {formData.location || location}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label
                          htmlFor="coursesOffered"
                          className="font-semibold"
                        >
                          Courses Offered (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={formData.programmes}
                          name="programmes"
                          onChange={handleChange}
                          placeholder="Enter courses"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="tuitionFee" className="font-semibold">
                          Tuition Fee
                        </label>
                        <input
                          type="number"
                          name="schoolFees"
                          value={formData.schoolFees}
                          onChange={handleChange}
                          placeholder="Enter tuition fee"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="website" className="font-semibold">
                          University Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="Enter University Website"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="email" className="font-semibold">
                          University Email(s)
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter University Email"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="phone" className="font-semibold">
                          Phone Number(s)
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter Phone"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="requirements" className="font-semibold">
                          Requirements (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleChange}
                          placeholder="Enter Requirements"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="notes" className="font-semibold">
                          Notes
                        </label>
                        <input
                          type="text"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder=""
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                        <label htmlFor="image" className="font-semibold">
                          University Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {selectedUniversity?.image &&
                          actionType === 'update' && (
                            <>
                              <p className="text-sm text-gray-500 mt-1 mb-2">
                                Current image (Upload a new one to replace)
                              </p>
                              <img
                                src={selectedUniversity.image}
                                alt=""
                                className="h-[300px] w-[500px] rounded-md object-cover object-top"
                              />
                            </>
                          )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-between items-center mt-6 max-w-xl">
                    {actionType === 'add' && (
                      <button
                        type="button"
                        onClick={handleCsvUpload}
                        className="flex items-center text-orange-400 px-4 py-2 rounded border border-orange-400 hover:bg-gray-300 cursor-pointer"
                      >
                        upload CSV of universities
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${
                        actionType === 'delete'
                          ? 'bg-red-600 hover:bg-red-800'
                          : 'bg-orange-400 hover:bg-orange-700'
                      } text-white px-4 py-2 rounded cursor-pointer ml-auto`}
                    >
                      {loading
                        ? 'Submitting...'
                        : actionType === 'delete'
                        ? 'Delete'
                        : 'Save'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Image */}
            <div className="hidden md:flex items-center justify-center">
              <img
                src={sideImage}
                alt="Decorative"
                className="rounded-lg shadow-xl object-cover h-full max-h-[120vh]"
              />
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  )
}
