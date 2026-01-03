struct User: Codable {
    let id: String
    let username: String
    let email: String
    let balance: Int?
    
    var balanceValue: Int {
        return balance ?? 0
    }
}

struct UserProfileResponse: Codable {
    let status: String
    let data: User
}
