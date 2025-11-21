import React, { useState } from 'react'
import { User } from '../../services/apis'
import { connectionApi } from '../../services/apiconnector'
import { Camera, Save, Trash2, AlertTriangle } from 'lucide-react'
const AdditionalDetails = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const [additionalDetails, setAdditionalDetails] = useState({
    about: '',
    contactNumber: '',
    dateofBirth: '',
    gender: ''
  })

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload profile picture
  async function changeImage() {
    if (!profileImage) {
      alert('Please select an image first')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
       const data=formData.append('displayImage', profileImage)
       console.log(data)
      const response = await connectionApi(
        User.UPDATE_PROFILE,
        'PUT',
        null,
        null,
        formData
      )
     
      if (response) {
        alert('Profile picture updated successfully!')
        setProfileImage(null)
      } else {
        alert('Failed to update profile picture')
      }
    } catch (error) {
      console.error('Error updating profile picture:', error)
      alert('An error occurred while updating profile picture')
    } finally {
      setLoading(false)
    }
  }

  // Update additional details
  async function updateAdditionalDetails(e) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await connectionApi(
        User.UPDATE_ADDITIONAL_DETAILS,
        'PUT',
        null,
        null,
        {   
            about:additionalDetails.about,
            contactNumber:additionalDetails.contactNumber,
            dateofBirth:additionalDetails.dateofBirth,
            gender:additionalDetails.gender
         }
      )
      console.log(response)
      if (response) {
        alert('Additional details updated successfully!')
      } 
    } catch (error) {
      console.error('Error updating additional details:', error)
      alert('An error occurred while updating details')
    } finally {
      setLoading(false)
    }
  }

  // Delete account permanently
  async function deleteAccount() {
    setLoading(true)
    try {
      const response = await connectionApi(
        User.DELETE_USER,
        'DELETE',
        null,
        null,
        {}
      )
      console.log(response)
      if (response) {
        alert('Account deleted successfully')
        // Redirect to login or home page
        window.location.href = '/login'
      } 
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('An error occurred while deleting account')
    } finally {
      setLoading(false)
      setShowDeleteModal(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAdditionalDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Picture Section */}
      <div className="bg-slate rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Profile Picture</h2>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          <button
            onClick={changeImage}
            disabled={loading || !profileImage}
            className="flex items-center gap-2 bg-blue-500 text-black px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Uploading...' : 'Update Picture'}
          </button>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="bg-slate rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Additional Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Bio
            </label>
            <textarea
              name="about"
              value={additionalDetails.about}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={additionalDetails.contactNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateofBirth"
                value={additionalDetails.dateofBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

         

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={additionalDetails.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
    
             
            </select>
          </div>

          <button
            onClick={updateAdditionalDetails}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-slate rounded-lg shadow-md p-6 border-2 border-red-200">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Danger Zone</h2>
        <p className="text-white mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold text-white">Confirm Account Deletion</h3>
            </div>
            
            <p className="text-white mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone
              and all your data will be permanently removed.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 transition"
              >
                {loading ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdditionalDetails
