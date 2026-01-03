import Foundation

struct Config {
    
    #if targetEnvironment(simulator)
    static let baseURL = "http://localhost:5000"
    #else
    static let baseURL = "http://192.168.100.183:5000"
    #endif
    
}