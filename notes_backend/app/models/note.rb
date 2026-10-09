class Note < ApplicationRecord
  validates :colors, :position, presence: true

  # Optional: validate they're valid JSON
  validate :colors_is_json, :position_is_json

  private

  def colors_is_json
    JSON.parse(colors)
  rescue JSON::ParserError
    errors.add(:colors, "must be valid JSON")
  end

  def position_is_json
    JSON.parse(position)
  rescue JSON::ParserError
    errors.add(:position, "must be valid JSON")
  end
end