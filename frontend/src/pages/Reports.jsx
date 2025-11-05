import { useState, useEffect } from 'react'

function Reports() {
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  // Mock data untuk laporan
  const reportsData = {
    month: {
      title: 'Laporan Bulanan',
      period: 'Desember 2024',
      revenue: 15000000,
      orders: 234,
      movies: 45,
      growth: 12.5
    },
    week: {
      title: 'Laporan Mingguan',
      period: 'Minggu ke-4 Desember 2024',
      revenue: 3750000,
      orders: 58,
      movies: 12,
      growth: 8.3
    }
  }

  const topMovies = [
    { id: 1, title: 'The Raid 3', sales: 45, revenue: 2475000 },
    { id: 2, title: 'Pengabdi Setan 2', sales: 42, revenue: 2100000 },
    { id: 3, title: 'Dilan 1991', sales: 38, revenue: 1710000 },
    { id: 4, title: 'Ayat-Ayat Cinta 3', sales: 35, revenue: 1680000 },
    { id: 5, title: 'Laskar Pelangi', sales: 32, revenue: 1280000 }
  ]

  const salesData = [
    { day: 'Sen', sales: 12, revenue: 600000 },
    { day: 'Sel', sales: 18, revenue: 900000 },
    { day: 'Rab', sales: 15, revenue: 750000 },
    { day: 'Kam', sales: 22, revenue: 1100000 },
    { day: 'Jum', sales: 25, revenue: 1250000 },
    { day: 'Sab', sales: 35, revenue: 1750000 },
    { day: 'Min', sales: 28, revenue: 1400000 }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const currentData = reportsData[selectedPeriod]

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
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
                Laporan
              </h1>
              <p className="text-gray-600">Analisis dan statistik penjualan film</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedPeriod === 'week'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Mingguan
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedPeriod === 'month'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Bulanan
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Pendapatan</p>
                <p className="text-3xl font-bold text-gray-900">Rp {currentData.revenue.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-green-600 text-sm font-medium">+{currentData.growth}% dari periode sebelumnya</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Pesanan</p>
                <p className="text-3xl font-bold text-gray-900">{currentData.orders}</p>
                <div className="flex items-center mt-2">
                  <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-blue-600 text-sm font-medium">+{currentData.growth}% dari periode sebelumnya</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Film Terjual</p>
                <p className="text-3xl font-bold text-gray-900">{currentData.movies}</p>
                <div className="flex items-center mt-2">
                  <svg className="w-4 h-4 text-purple-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-purple-600 text-sm font-medium">+{currentData.growth}% dari periode sebelumnya</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m8 0H7m8 0v3a1 1 0 01-1 1H8a1 1 0 01-1-1V4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pertumbuhan</p>
                <p className="text-3xl font-bold text-purple-600">+{currentData.growth}%</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium">Target tercapai</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Penjualan Harian</h3>
            <div className="space-y-4">
              {salesData.map((item, index) => (
                <div key={item.day} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{item.day}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(item.sales / 35) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-900 font-medium">{item.sales}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Movies */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Film Terlaris</h3>
            <div className="space-y-4">
              {topMovies.map((movie, index) => (
                <div key={movie.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{movie.title}</p>
                      <p className="text-xs text-gray-500">{movie.sales} terjual</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Rp {movie.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Period Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Periode</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Periode</p>
              <p className="text-lg font-semibold text-gray-900">{currentData.period}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rata-rata per Hari</p>
              <p className="text-lg font-semibold text-gray-900">
                Rp {Math.round(currentData.revenue / (selectedPeriod === 'week' ? 7 : 30)).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pertumbuhan</p>
              <p className="text-lg font-semibold text-green-600">+{currentData.growth}%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Reports
