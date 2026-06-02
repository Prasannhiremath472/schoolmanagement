#!/bin/bash
# Run all seeds in order
# Usage: bash prisma/run-seeds.sh

set -e
echo "🌱 Running all seeds..."

# Generate Prisma clients first
echo "📦 Generating Prisma clients..."
npx prisma generate --schema=prisma/central.prisma
npx prisma generate --schema=prisma/school.prisma

# Run migrations on central DB
echo "🗄️ Running central DB migrations..."
npx prisma migrate deploy --schema=prisma/central.prisma

# Seed platform data
echo "1️⃣  Platform seed (super admin, plans, demo school)..."
npx ts-node -P tsconfig.seed.json prisma/seed.ts

# Seed test users
echo "2️⃣  Test users seed (all roles)..."
npx ts-node -P tsconfig.seed.json prisma/seed-test-users.ts

# Seed demo data
echo "3️⃣  Demo data seed (students, fees, exams, LMS, etc.)..."
npx ts-node -P tsconfig.seed.json prisma/seed-demo.ts

echo ""
echo "✅ All seeds completed! Start the server with: npm run start:dev"
