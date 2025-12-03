# Use nginx alpine for a lightweight web server
FROM nginx:alpine

# Copy the web directory to nginx html directory
COPY web/ /usr/share/nginx/html/

# Copy documentation and other content to be served
COPY docs/ /usr/share/nginx/html/docs/
COPY outline/ /usr/share/nginx/html/outline/
COPY scripts/ /usr/share/nginx/html/scripts/
COPY production/ /usr/share/nginx/html/production/
COPY legal/ /usr/share/nginx/html/legal/
COPY pitch/ /usr/share/nginx/html/pitch/
COPY *.md /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
