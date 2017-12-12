class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def flat_errors
    self.errors.values.flatten
  end
end
