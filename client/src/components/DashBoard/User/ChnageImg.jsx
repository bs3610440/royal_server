import axios from 'axios'
import { useState, useRef } from 'react'
import { LocalUrl } from '../../../GlobalUrl'
import { showErrorToast, showSuccessToast } from '../../Notification/ToastNofication'
import { useAuth } from '../../../context/AllContext'

export default function ChangeImg() {
  const { profile, setProfile } = useAuth()
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const change_img = async (imgFile) => {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('userToken')

    const formData = new FormData()
    formData.append('profileImg', imgFile)

    setIsLoading(true)

    try {
      const url = `${LocalUrl}change_profile_img/${id}`

      const response = await axios.put(url, formData, { headers: { 'x-api-key': token } })

      if (response.status === 200) {
        showSuccessToast(response?.data?.msg || 'Successfully changed image')
        setProfile({ ...profile, profileImg: response?.data?.DB?.profileImg })
        setSelectedImage(null)
        setPreviewUrl(null)
      }

    }
    catch (err) { showErrorToast(err.response?.data?.msg || "Failed to change image") }
    finally { setIsLoading(false) }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      // Create preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  const handleChangeClick = () => {
    if (selectedImage) {
      change_img(selectedImage)
    } else {
      showErrorToast("Please select an image first")
    }
  }

  const handleCancel = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Profile Image Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white text-center">
              Profile Picture
            </h2>
          </div>

          <div className="p-6">
            {/* Current Profile Image Display */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={previewUrl || profile?.profileImg?.secure_url || 'https://via.placeholder.com/200x200?text=No+Image'}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
                {previewUrl && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Preview
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <label className="w-full">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {selectedImage ? selectedImage.name : 'Click to select or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleChangeClick}
                  disabled={!selectedImage || isLoading}
                  className={`
                    flex-1 py-2 px-4 rounded-lg font-medium text-white transition-all
                    ${!selectedImage || isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                    }
                  `}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    'Change Profile Picture'
                  )}
                </button>

                {selectedImage && (
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Info Section */}
            {!selectedImage && profile?.profileImg && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Click the button above to change your profile picture
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}