class Room < ApplicationRecord
  before_create :generate_slug

  has_secure_password validations: false

  has_many :permissions
  has_many :users, through: :permissions
  has_many :messages

  validates :password,
    length: { in: 6..20, message: 'Password must be between 6 and 20 characters long' },
    allow_blank: true

  validates :name,
    presence: true,
    uniqueness: { message: 'A room by this name has already been created' },
    length: { in: 6..20, message: 'Name must be between 6 and 20 characters long' }

  attr_accessor :private
  def attributes
    super.merge(private: self.password_digest?)
  end

  def authenticate!(password)
    BCrypt::Password.new(self.password_digest) == password
  end

  def user_permitted?(user)
    self.users.include?(user)
  end

  def safe
    self.attributes.except('password_digest')
  end

  private
  def generate_slug
    new_slug_base = self.name.gsub(/\W+/, ' ').gsub(/[^a-zA-Z0-9]/, '-')
    slugs = Room.order('id DESC').pluck(:slug)
    if slugs.any?
      slugs.each do |slug|
        next if !slug
        slug_segments = slug.split('-')
        num = slug_segments.pop
        slug_base = slug_segments.join('-')
        if slug_base == new_slug_base
          new_num = (num.to_i + 1).to_s
          self.slug = "#{new_slug_base}-#{new_num}"
          break
        else
          self.slug = new_slug(new_slug_base)
        end
      end
    else
      self.slug = new_slug(new_slug_base)
    end
  end

  def new_slug(base)
    "#{base}-1"
  end
end
