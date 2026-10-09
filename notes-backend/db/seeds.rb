# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

notes = [
  {
    colors: {
      id: "color-purple",
      colorHeader: "#FED0FD",
      colorBody: "#FEE5FD",
      colorText: "#18181A"
    },
    body: "This is the first text",
    position: { x: 163, y: 273 }
  },
  {
    colors: {
      id: "color-green",
      colorHeader: "#AFDA9F",
      colorBody: "#BCDEAF",
      colorText: "#18181A"
    },
    body: "Here is some more text",
    position: { x: 505, y: 10 }
  },
  {
    colors: {
      id: "color-blue",
      colorHeader: "#9BD1DE",
      colorBody: "#A6DCE9",
      colorText: "#18181A"
    },
    body: "Lets see if this works",
    position: { x: 305, y: 110 }
  }
]

notes.each do |note|
  Note.find_or_create_by!(
    colors: JSON.generate(note[:colors]),
    body: JSON.generate(note[:body]),
    position: JSON.generate(note[:position])
  )
end