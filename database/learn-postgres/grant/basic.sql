CREATE DATABASE backenddb;
CREATE USER backend WITH PASSWORD 'bepassword';
GRANT ALL PRIVILEGES ON database backenddb to backend;

-- Note: Connect to 'backenddb' with 'postgres' account to grant permission
GRANT ALL ON SCHEMA public TO backend;
GRANT ALL ON ALL TABLES IN SCHEMA public TO backend;

