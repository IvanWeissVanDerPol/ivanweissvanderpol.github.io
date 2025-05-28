# Start from a recent Ruby image.
# Check your Gemfile.lock for Ruby version compatibility if issues arise.
# Ruby 3.1.x should generally be fine for Bundler 2.6.x and Jekyll 3.x/4.x
FROM ruby:3.1-slim-bullseye

# Install build tools needed for some gems' native extensions
RUN apt-get update -qq && apt-get install -y build-essential

# Install the required Bundler version
RUN gem install bundler -v 2.6.3

# Set the working directory
WORKDIR /srv/jekyll

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install --jobs $(nproc) --retry 3

# Copy the rest of the application code
COPY . .

# Expose port 4000
EXPOSE 4000

# Default command to serve Jekyll
CMD ["bundle", "exec", "jekyll", "serve", "--watch", "--force_polling", "--verbose", "--livereload", "--host", "0.0.0.0"]
