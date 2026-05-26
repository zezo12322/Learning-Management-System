-- OptimaTech LMS - Database Initialization
-- هذا الملف يُشغَّل تلقائياً عند أول تشغيل لـ PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- for text search

-- Create development database if not exists
-- (يتم إنشاؤها تلقائياً من خلال POSTGRES_DB في docker-compose)

\echo '✅ OptimaTech LMS Database initialized successfully'
