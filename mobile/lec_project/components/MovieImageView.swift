import SwiftUI

struct MovieImageView: View {
    let imageString: String?
    let height: CGFloat?
    let cornerRadius: CGFloat
    let aspectRatio: CGFloat?
    
    init(imageString: String?, height: CGFloat? = nil, cornerRadius: CGFloat = 8, aspectRatio: CGFloat? = nil) {
        self.imageString = imageString
        self.height = height
        self.cornerRadius = cornerRadius
        self.aspectRatio = aspectRatio ?? (height == nil ? 2/3 : nil)
    }
    
    var body: some View {
        Group {
            if let imageString = imageString {
                if imageString.hasPrefix("http://") || imageString.hasPrefix("https://") {
                    if let url = URL(string: imageString) {
                        AsyncImage(url: url) { phase in
                            switch phase {
                            case .empty:
                                Group {
                                    if let height = height {
                                        Rectangle()
                                            .fill(Color.gray.opacity(0.3))
                                            .frame(height: height)
                                    } else if let aspectRatio = aspectRatio {
                                        Rectangle()
                                            .fill(Color.gray.opacity(0.3))
                                            .aspectRatio(aspectRatio, contentMode: .fit)
                                    } else {
                                        Rectangle()
                                            .fill(Color.gray.opacity(0.3))
                                    }
                                }
                                .frame(maxWidth: .infinity)
                                .overlay(
                                    ProgressView()
                                )
                            case .success(let image):
                                Group {
                                    if let height = height {
                                        image
                                            .resizable()
                                            .scaledToFill()
                                            .frame(height: height)
                                    } else if let aspectRatio = aspectRatio {
                                        image
                                            .resizable()
                                            .scaledToFill()
                                            .aspectRatio(aspectRatio, contentMode: .fit)
                                    } else {
                                        image
                                            .resizable()
                                            .scaledToFill()
                                    }
                                }
                                .frame(maxWidth: .infinity)
                                .clipped()
                                .cornerRadius(cornerRadius)
                            case .failure:
                                placeholderView
                            @unknown default:
                                placeholderView
                            }
                        }
                    } else {
                        placeholderView
                    }
                } else {
                    if let imageData = extractBase64Data(from: imageString),
                       let uiImage = UIImage(data: imageData) {
                        Group {
                            if let height = height {
                                Image(uiImage: uiImage)
                                    .resizable()
                                    .scaledToFill()
                                    .frame(height: height)
                            } else if let aspectRatio = aspectRatio {
                                Image(uiImage: uiImage)
                                    .resizable()
                                    .scaledToFill()
                                    .aspectRatio(aspectRatio, contentMode: .fit)
                            } else {
                                Image(uiImage: uiImage)
                                    .resizable()
                                    .scaledToFill()
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .clipped()
                        .cornerRadius(cornerRadius)
                    } else {
                        placeholderView
                    }
                }
            } else {
                placeholderView
            }
        }
    }
    
    private var placeholderView: some View {
        Group {
            if let height = height {
                Rectangle()
                    .fill(Color.gray.opacity(0.3))
                    .frame(height: height)
            } else if let aspectRatio = aspectRatio {
                Rectangle()
                    .fill(Color.gray.opacity(0.3))
                    .aspectRatio(aspectRatio, contentMode: .fit)
            } else {
                Rectangle()
                    .fill(Color.gray.opacity(0.3))
            }
        }
        .frame(maxWidth: .infinity)
        .cornerRadius(cornerRadius)
        .overlay(
            Image(systemName: "photo")
                .foregroundColor(.gray)
        )
    }
    
    private func extractBase64Data(from base64String: String) -> Data? {
        var base64 = base64String
        
        if base64String.hasPrefix("data:image") {
            if let commaIndex = base64String.firstIndex(of: ",") {
                base64 = String(base64String[base64String.index(after: commaIndex)...])
            }
        }
        
        base64 = base64.trimmingCharacters(in: .whitespacesAndNewlines)
        
        return Data(base64Encoded: base64, options: .ignoreUnknownCharacters)
    }
}

#Preview {
    MovieImageView(imageString: nil)
}

