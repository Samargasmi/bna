@echo off
echo Starting BNA Backend Application...
echo.
echo Building the project...
call mvn clean install
if %errorlevel% neq 0 (
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo Build successful! Starting the application...
echo.
echo The application will be available at: http://localhost:8080
echo H2 Database Console: http://localhost:8080/h2-console
echo.
echo Press Ctrl+C to stop the application
echo.
call mvn spring-boot:run
pause
