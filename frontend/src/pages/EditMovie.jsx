import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../hooks/useToast'

function EditMovie() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    year: '',
    price: '',
    video: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingMovie, setLoadingMovie] = useState(true)
  const [errors, setErrors] = useState({})

  // Load movie data when component mounts
  useEffect(() => {
    loadMovieData()
  }, [id])

  const loadMovieData = async () => {
    try {
      setLoadingMovie(true)
      
      const token = localStorage.getItem('authToken')
      if (!token) {
        showToast('Anda harus login terlebih dahulu', 'error')
        navigate('/movies')
        return
      }
      
      const response = await fetch(`http://localhost:5000/movies/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.status === 'success') {
        const movie = data.data.movie
        
        setFormData({
          title: movie.title,
          synopsis: movie.synopsis,
          year: movie.year.toString(),
          price: movie.price.toString(),
          video: movie.video,
          image: movie.image || ''
        })
      } else {
        showToast('Gagal memuat data film', 'error')
        navigate('/movies')
      }
      
    } catch (error) {
      console.error('Error loading movie:', error)
      showToast('Gagal memuat data film', 'error')
      navigate('/movies')
    } finally {
      setLoadingMovie(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Judul film harus diisi'
    }
    
    if (!formData.synopsis.trim()) {
      newErrors.synopsis = 'Sinopsis harus diisi'
    }
    
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Tahun harus valid'
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Harga harus lebih dari 0'
    }
    
    if (!formData.video.trim()) {
      newErrors.video = 'URL video harus diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        showToast('Anda harus login terlebih dahulu', 'error')
        return
      }

      // Prepare data according to MovieDetails entity structure
      const movieData = {
        title: formData.title.trim(),
        synopsis: formData.synopsis.trim(),
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        video: formData.video.trim(),
        image: formData.image.trim() || null
      }
      
      console.log('Updated movie data:', movieData)
      
      const response = await fetch(`http://localhost:5000/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === 'success') {
        // Show success toast
        showToast('Film berhasil diperbarui!', 'success')
        
        // Navigate back to movie management
        navigate('/movies')
      } else {
        showToast(data.message || 'Gagal memperbarui film', 'error')
      }
      
    } catch (error) {
      console.error('Error updating movie:', error)
      showToast('Terjadi kesalahan saat memperbarui film', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/movies')
  }

  if (loadingMovie) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data film...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Edit Film
              </h1>
              <p className="text-gray-600">Perbarui informasi film</p>
            </div>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Batal
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Dasar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Film *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan judul film"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                  </div>

                  {/* Year */}
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                      Tahun Rilis *
                    </label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.year ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="2024"
                    />
                    {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                  </div>

                  {/* Price */}
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      Harga (Rp) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="50000"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Deskripsi</h2>
                <div>
                  <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700 mb-2">
                    Sinopsis *
                  </label>
                  <textarea
                    id="synopsis"
                    name="synopsis"
                    value={formData.synopsis}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.synopsis ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan sinopsis film"
                  />
                  {errors.synopsis && <p className="mt-1 text-sm text-red-600">{errors.synopsis}</p>}
                </div>
              </div>

              {/* Media */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Video URL */}
                  <div>
                    <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
                      URL Video *
                    </label>
                    <input
                      type="url"
                      id="video"
                      name="video"
                      value={formData.video}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.video ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://example.com/video.mp4"
                    />
                    {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                  </div>

                  {/* Image URL */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      URL Gambar Poster
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://example.com/poster.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Memperbarui...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Perbarui Film
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EditMovie
