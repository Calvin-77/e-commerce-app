import { useState, useEffect } from 'react'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data untuk sementara
  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      setMovies([
        {
          id: 1,
          title: "The Avengers",
          genre: "Action",
          year: 2012,
          price: 15000,
          description: "Earth's mightiest heroes must come together"
        },
        {
          id: 2,
          title: "Inception",
          genre: "Sci-Fi",
          year: 2010,
          price: 12000,
          description: "A mind-bending thriller about dreams"
        },
        {
          id: 3,
          title: "The Dark Knight",
          genre: "Action",
          year: 2008,
          price: 13000,
          description: "Batman faces the Joker in Gotham City"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])


  const handleEditMovie = (movieId) => {
    // Edit functionality
    console.log('Edit movie:', movieId)
  }

  const handleDeleteMovie = (movieId) => {
    // Delete functionality
    console.log('Delete movie:', movieId)
  }

  const handleAddMovie = () => {
    // Add movie functionality
    console.log('Add new movie')
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-600 mb-2">Dashboard</h1>
            <p className="text-gray-600">Selamat datang kembali di Movie Admin</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Film</p>
                <p className="text-3xl font-bold text-gray-900">{movies.length}</p>
                <div className="flex items-center mt-2">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-green-600 text-sm font-medium">+12% dari bulan lalu</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m8 0H7m8 0v3a1 1 0 01-1 1H8a1 1 0 01-1-1V4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Penjualan</p>
                <p className="text-3xl font-bold text-gray-900">Rp {movies.reduce((sum, movie) => sum + movie.price, 0).toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-green-600 text-sm font-medium">+8% dari bulan lalu</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pesanan Hari Ini</p>
                <p className="text-3xl font-bold text-gray-900">87</p>
                <div className="flex items-center mt-2">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-green-600 text-sm font-medium">+23% dari kemarin</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pertumbuhan</p>
                <p className="text-3xl font-bold text-purple-600">+15.2%</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium">Target tercapai</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Film Terlaris</h2>
        </div>

        {/* Movies List */}
        <div className="space-y-4">
          {movies.map((movie, index) => (
            <div key={movie.id} className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors duration-200">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{movie.title}</h3>
                  <p className="text-gray-600 mt-1">{movie.genre}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">Rp {movie.price.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">{150 + index * 30} terjual</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {movies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m8 0H7m8 0v3a1 1 0 01-1 1H8a1 1 0 01-1-1V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No movies found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Start building your movie collection by adding your first movie to the library.</p>
            <button
              onClick={handleAddMovie}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Movie
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
