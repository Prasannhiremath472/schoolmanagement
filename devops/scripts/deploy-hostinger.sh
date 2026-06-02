#!/bin/bash
# Hostinger VPS Deployment Script
# Run this once to set up the server from scratch

set -e

echo "🚀 Starting School ERP deployment on Hostinger VPS..."

# ─── 1. System Updates ────────────────────────────────────────────────────────
echo "📦 Updating system packages..."
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git wget ufw fail2ban

# ─── 2. Install Docker ───────────────────────────────────────────────────────
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi

# ─── 3. Install Docker Compose ──────────────────────────────────────────────
echo "🐳 Installing Docker Compose..."
if ! command -v docker compose &> /dev/null; then
  DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/')
  curl -L "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi

# ─── 4. Firewall Setup ───────────────────────────────────────────────────────
echo "🔒 Setting up firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ─── 5. Create App Directory ─────────────────────────────────────────────────
echo "📁 Setting up application directory..."
mkdir -p /opt/school-erp
cd /opt/school-erp

# ─── 6. Create .env File ─────────────────────────────────────────────────────
if [ ! -f .env ]; then
  cat > .env << 'EOF'
# Application
NODE_ENV=production
PORT=4000
DOMAIN=schoolerp.com
SSL_EMAIL=admin@schoolerp.com

# Database
DB_USER=postgres
DB_PASSWORD=CHANGE_ME_STRONG_PASSWORD
CENTRAL_DATABASE_URL=postgresql://postgres:CHANGE_ME_STRONG_PASSWORD@postgres:5432/school_erp_central

# Redis
REDIS_PASSWORD=CHANGE_ME_REDIS_PASSWORD

# JWT (use strong random values: openssl rand -hex 32)
JWT_SECRET=CHANGE_ME_JWT_SECRET_32_CHARS_MIN
JWT_REFRESH_SECRET=CHANGE_ME_REFRESH_SECRET_32_CHARS

# Storage
S3_ENDPOINT=https://s3.ap-south-1.amazonaws.com
S3_REGION=ap-south-1
S3_BUCKET=school-erp-media
S3_ACCESS_KEY=YOUR_S3_ACCESS_KEY
S3_SECRET_KEY=YOUR_S3_SECRET_KEY

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
EOF
  echo "⚠️  Please edit /opt/school-erp/.env with your actual values!"
fi

# ─── 7. SSL Certificate ──────────────────────────────────────────────────────
echo "🔐 Setting up SSL..."
mkdir -p /opt/certbot
docker run -it --rm \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/www/certbot:/var/www/certbot" \
  -p 80:80 \
  certbot/certbot certonly \
  --standalone \
  --email admin@schoolerp.com \
  --agree-tos \
  --no-eff-email \
  -d schoolerp.com \
  -d www.schoolerp.com \
  -d api.schoolerp.com \
  -d app.schoolerp.com

# ─── 8. Configure Auto-renewal ───────────────────────────────────────────────
(crontab -l 2>/dev/null; echo "0 12 * * * docker run --rm -v /etc/letsencrypt:/etc/letsencrypt certbot/certbot renew --quiet && docker exec school_erp_nginx nginx -s reload") | crontab -

# ─── 9. Setup PM2 (for non-Docker option) ────────────────────────────────────
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

# ─── 10. Create Backup Script ────────────────────────────────────────────────
cat > /opt/school-erp/backup.sh << 'BACKUP_EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/school-erp"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup all school databases
docker exec school_erp_postgres pg_dumpall -U postgres | gzip > "$BACKUP_DIR/full_backup_$DATE.sql.gz"

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "✅ Backup completed: full_backup_$DATE.sql.gz"
BACKUP_EOF
chmod +x /opt/school-erp/backup.sh

# Add daily backup cron
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/school-erp/backup.sh >> /var/log/school-erp-backup.log 2>&1") | crontab -

echo ""
echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit /opt/school-erp/.env with your actual credentials"
echo "2. Copy docker-compose.yml to /opt/school-erp/"
echo "3. Run: docker compose up -d"
echo "4. Run migrations: docker compose exec api npx prisma migrate deploy --schema=prisma/central.prisma"
echo "5. Create super admin: docker compose exec api node dist/database/seeds/seed.js"
