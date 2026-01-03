import SwiftUI
import SwiftData

struct MainView: View {
    init() {
        let appearance = UITabBarAppearance()
        
        appearance.backgroundColor = UIColor(red: 33/255, green: 17/255, blue: 17/255, alpha: 1)
        
        appearance.shadowColor = UIColor.gray.withAlphaComponent(0.3)
        appearance.shadowImage = nil
        
        appearance.stackedLayoutAppearance.normal.iconColor = UIColor.gray
        appearance.stackedLayoutAppearance.normal.titleTextAttributes = [
            NSAttributedString.Key.foregroundColor: UIColor.gray,
            NSAttributedString.Key.font: UIFont.systemFont(ofSize: 10)
        ]
        
        appearance.stackedLayoutAppearance.selected.iconColor = UIColor.red
        appearance.stackedLayoutAppearance.selected.titleTextAttributes = [
            NSAttributedString.Key.foregroundColor: UIColor.red,
            NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 10)
        ]
        
        appearance.stackedLayoutAppearance.normal.badgeBackgroundColor = UIColor.red
        appearance.stackedLayoutAppearance.normal.badgeTextAttributes = [
            NSAttributedString.Key.foregroundColor: UIColor.white
        ]
        
        UITabBar.appearance().standardAppearance = appearance
        UITabBar.appearance().scrollEdgeAppearance = appearance
        
        UITabBar.appearance().tintColor = UIColor.red
        
        UITabBar.appearance().unselectedItemTintColor = UIColor.gray
    }
    
    var body: some View {
        TabView {
            NavigationStack {
                HomeView()
            }
            .tabItem {
                Label("Home", systemImage: "house.fill")
            }

            NavigationStack {
                LibraryView()
            }
            .tabItem {
                Label("Library", systemImage: "books.vertical.fill")
            }

            NavigationStack {
                ProfileView()
            }
            .tabItem {
                Label("Profile", systemImage: "person.fill")
            }
        }
        .navigationBarBackButtonHidden(true)
    }
}

#Preview {
    MainView()
        .modelContainer(for: Item.self, inMemory: true)
}
