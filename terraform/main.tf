variable "do_token" {
  description = "DigitalOcean API Token"
  type        = string
  sensitive   = true
}

resource "digitalocean_droplet" "alwaysthere_protocol" {
  image    = "ubuntu-22-04-x64"
  name     = "alwaysthere-protocol-prod"
  region   = "blr1"
  size     = "s-2vcpu-4gb"
  ssh_keys = [] # Add your SSH key IDs here

  tags = ["alwaysthere-protocol", "production"]

  # Basic user data to install Docker automatically
  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
              add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              apt-get update
              apt-get install -y docker-ce
              systemctl enable docker
              systemctl start docker
              curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              EOF
}

output "droplet_ip" {
  value = digitalocean_droplet.alwaysthere_protocol.ipv4_address
}
