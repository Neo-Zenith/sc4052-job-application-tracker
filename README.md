# Define upstream block with the two web servers
upstream backend_servers {
    server localhost:8080;  # IP address and port of the first web server
    server 10.0.0.2:80;  # IP address and port of the second web server
}

# HTTP server block
server {
    listen 80;  # Listen on port 80

    # Define location block to handle requests
    location / {
        proxy_pass http://backend_servers;  # Pass requests to the upstream servers
        proxy_redirect off;  # Disable automatic redirects
        proxy_set_header Host $host;  # Set the Host header to the original request's host
        proxy_set_header X-Real-IP $remote_addr;  # Set the X-Real-IP header to the client's IP address
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # Set the X-Forwarded-For header to include the client's IP address
        proxy_set_header X-Forwarded-Proto $scheme;  # Set the X-Forwarded-Proto header to the original request's scheme (HTTP or HTTPS)
    }
}