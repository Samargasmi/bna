#!/bin/bash

echo "Starting BNA Backend Application..."
echo ""
echo "Building the project..."
mvn clean install
if [ $? -ne 0 ]; then
    echo "Build failed! Please check the errors above."
    exit 1
fi

echo ""
echo "Build successful! Starting the application..."
echo ""
echo "The application will be available at: http://localhost:8080"
echo "H2 Database Console: http://localhost:8080/h2-console"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""
mvn spring-boot:run
