#!/bin/bash

# Backend setup and run script for JalSetu

echo "Setting up JalSetu Backend..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Run the FastAPI server
echo "Starting FastAPI server on http://localhost:8000"
echo "API documentation available at http://localhost:8000/docs"
python main.py
