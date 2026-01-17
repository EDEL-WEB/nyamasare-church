-- Create database
CREATE DATABASE sda_church;

-- Connect to the database
\c sda_church;

-- Create user roles enum type
CREATE TYPE user_roles AS ENUM ('admin', 'leader', 'member');

-- Create tables (these will be created by SQLAlchemy, but this shows the structure)
-- Users table
-- Departments table  
-- Announcements table
-- Events table
-- Sermons table

-- Insert sample data
-- This will be handled by the Flask app initialization