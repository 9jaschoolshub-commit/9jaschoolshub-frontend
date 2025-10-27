import { useState } from "react"
import { universityAPI } from "../services/universityApi"
import { toast } from "react-toastify"
import { University } from "lucide-react"

const Dashboard = () => {
    const [formData, setFormData] = useState({
        unversityName: '',
        type: 'Federal',
        location: 'Lagos',
        programmes: '',
        schoolFees: '',
        website: "",
        email: '',
        phone: '',
        requirements: '',
        notes: '',
    })

    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        //Prepare data to send 
        const payload = {
            UniversityName: formData.unversityName,
            type: formData.type,
            location: formData.location,    
            programmes: formData.programmes.split(',').map((course) => course.trim()),
            schoolFees: formData.schoolFees,
            website: formData.website,
            email: formData.email,
            phone: formData.phone,
            requirements: formData.requirements.split(',').map((item) => item.trim()),
            notes: formData.notes,
            image: imageFile
        }

        try {
            await universityAPI.createUniversity(payload);
            toast.success("University created successfully!")
            setFormData({
                unversityName: '',
                type: 'Federal',
                location: 'Lagos',
                programmes: '',
                schoolFees: '',
                website: "",
                email: '',
                phone: '',
                requirements: '',
                notes: '',
            })
            setImageFile(null);
        }catch (error) {
            toast.error(error.message || "Failed to create university");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="ml-6 p-10">
        <h1 className="text-3xl font-bold">Add New University</h1>

        <form action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="university" className="font-semibold">University</label>
                <input 
                type="text"
                name="university"
                value={formData.unversityName}
                onChange={handleChange}
                placeholder="Enter your university"
                className="px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="universityType" className="font-semibold">University Type</label>
                <select 
                name="universityType"
                value={formData.type}
                className="px-3 py-2 border border-gray-300 rounded-lg cursor-pointer">
                    <option value="Federal">Federal</option>
                    <option value="State">State</option>
                    <option value="Private">Private</option>
                </select>
            </div>
            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="location" className="font-semibold">Location</label>
                <select 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg cursor-pointer">
                    <option value="Abia">Abia</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Adamawa">Adamawa</option>
                    <option value="Awka-Ibom">Awka Ibom</option>
                    <option value="Anambra">Anambra</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Ebonyi">Ebonyi</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Jos">Jos</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nasarawa">Nasarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Sokoto">Sokoto</option>
                    <option value="Taraba">Taraba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamfara</option>
                </select>
            </div>
            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="coursesOffered" className="font-semibold">Courses Offered(comma-separated)</label>
                <input 
                type="text"
                value={formData.programmes}
                onChange={handleChange}
                placeholder="Enter courses"
                className="px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="tuitionFee" className="font-semibold">Tuition Fee</label>
                <div className="flex justify-between items-center gap-2">
                <input 
                type="number"
                name="tuitionFee"
                value={formData.schoolFees}
                onChange={handleChange}
                placeholder="min"
                className="px-3 py-2 border border-gray-300 max-w-[255px] rounded-lg" />
                <input 
                type="number"
                name="tuitionFee"
                value={formData.schoolFees}
                onChange={handleChange}
                placeholder="max"
                className="px-3 py-2 border border-gray-300 rounded-lg max-w-[255px]" />
                </div>
            </div>

            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="website" className="font-semibold">University Website</label>
                <input 
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter University Website"
                className="px-3 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="email" className="font-semibold">University Email</label>
                <input 
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter University Email"
                className="px-3 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="phone" className="font-semibold">Phone Number</label>
                <input 
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone"
                className="px-3 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="requirements" className="font-semibold">Requirements</label>
                <input 
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Enter Requirements"
                className="px-3 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="flex flex-col gap-0.5 mt-4 max-w-xl">
                <label htmlFor="notes" className="font-semibold">Notes</label>
                <input 
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder=""
                className="px-3 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="flex justify-center items-center">
                <input 
                type="file" 
                name="image" 
                onChange={handleFileChange}
                className=""
                id="" />
            </div>

            <div className="flex justify-between items-center mt-6 max-w-xl">
                <button className="flex items-center text-orange-400 px-4 py-2 rounded border border-orange-400 hover:bg-gray-300 cursor-pointer">
                    upload CSV of universities
                </button>
                <button
                type="submit"
                disabled={loading}
                className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 cursor-pointer"
                >
                    {loading ? 'Submitting...' : 'Save'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Dashboard