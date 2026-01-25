# Wedding E-Vite API

A Python FastAPI application that uses Google Sheets as a database for managing wedding guests and RSVPs.

## Features

- ✅ Full CRUD operations for guest management
- ✅ Google Sheets as database (no traditional database needed)
- ✅ RSVP management
- ✅ Guest statistics and analytics
- ✅ Email-based guest lookup
- ✅ CORS enabled for frontend integration
- ✅ Auto-generated API documentation (Swagger UI)

## Prerequisites

- Python 3.8 or higher
- Google Cloud Platform account
- Google Sheets API enabled
- Service account credentials

## Google Sheets Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API** and **Google Drive API**

### 2. Create Service Account Credentials

1. Go to **IAM & Admin** > **Service Accounts**
2. Click **Create Service Account**
3. Give it a name (e.g., "wedding-evite-api")
4. Grant it **Editor** role
5. Click **Done**
6. Click on the service account you just created
7. Go to **Keys** tab
8. Click **Add Key** > **Create New Key**
9. Choose **JSON** format
10. Download the credentials file and save it as `credentials.json` in the `api/` folder

### 3. Create and Share Google Sheet

1. Create a new Google Sheet
2. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. Share the sheet with the service account email (found in `credentials.json`)
   - Give it **Editor** permissions
   - The email looks like: `your-service-account@your-project.iam.gserviceaccount.com`

### 4. Sheet Structure

The API will automatically create a worksheet named "Guests" with the following columns:
- `id` - Unique identifier
- `name` - Guest's full name
- `email` - Guest's email address
- `phone` - Guest's phone number
- `num_guests` - Number of people in party
- `rsvp_status` - Status (pending/confirmed)
- `dietary_restrictions` - Any dietary requirements
- `plus_one_name` - Name of plus one
- `attending` - Whether attending (true/false)
- `message` - Message to the couple
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Installation

1. **Clone the repository and navigate to the api folder:**
   ```bash
   cd api
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   - `GOOGLE_CREDENTIALS_FILE`: Path to your credentials.json file
   - `SPREADSHEET_ID`: Your Google Sheets ID

5. **Place your `credentials.json` file in the api folder**

## Running the API

### Development Mode

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at:
- API: http://localhost:8000
- Interactive API docs (Swagger UI): http://localhost:8000/docs
- Alternative API docs (ReDoc): http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /` - Check if API is running

### Guests Management
- `GET /api/guests` - Get all guests
- `GET /api/guests/{guest_id}` - Get a specific guest by ID
- `GET /api/guests/email/{email}` - Get a guest by email
- `POST /api/guests` - Create a new guest
- `PUT /api/guests/{guest_id}` - Update a guest
- `DELETE /api/guests/{guest_id}` - Delete a guest

### RSVP
- `POST /api/rsvp/{guest_id}` - Update guest's RSVP response

### Statistics
- `GET /api/stats` - Get guest and RSVP statistics

## Example API Usage

### Create a Guest

```bash
curl -X POST "http://localhost:8000/api/guests" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "num_guests": 2
  }'
```

### Submit RSVP

```bash
curl -X POST "http://localhost:8000/api/rsvp/{guest_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "attending": true,
    "num_guests": 2,
    "dietary_restrictions": "Vegetarian",
    "plus_one_name": "Jane Doe",
    "message": "Looking forward to celebrating with you!"
  }'
```

### Get Statistics

```bash
curl "http://localhost:8000/api/stats"
```

## Integration with Frontend

### Example React Native/Expo Integration

```typescript
const API_BASE_URL = 'http://localhost:8000';

// Get guest by email
export async function getGuestByEmail(email: string) {
  const response = await fetch(`${API_BASE_URL}/api/guests/email/${email}`);
  if (!response.ok) throw new Error('Guest not found');
  return response.json();
}

// Submit RSVP
export async function submitRSVP(guestId: string, rsvpData: any) {
  const response = await fetch(`${API_BASE_URL}/api/rsvp/${guestId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rsvpData)
  });
  if (!response.ok) throw new Error('Failed to submit RSVP');
  return response.json();
}

// Get statistics
export async function getStats() {
  const response = await fetch(`${API_BASE_URL}/api/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}
```

## Project Structure

```
api/
├── main.py              # FastAPI application and endpoints
├── models.py            # Pydantic models for data validation
├── sheets_service.py    # Google Sheets integration service
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variables template
├── .env                # Your environment variables (create this)
├── credentials.json    # Google service account credentials (create this)
└── README.md           # This file
```

## Error Handling

The API includes comprehensive error handling:
- `400 Bad Request` - Invalid input or duplicate email
- `404 Not Found` - Guest not found
- `500 Internal Server Error` - Server or Google Sheets errors

## Security Considerations

1. **Never commit credentials.json or .env files to version control**
2. Add them to .gitignore:
   ```
   .env
   credentials.json
   venv/
   __pycache__/
   *.pyc
   ```
3. Use environment variables for sensitive configuration
4. In production, update CORS settings to only allow your frontend domain
5. Consider adding authentication/authorization for production use

## Deployment

### Option 1: Railway / Render / Fly.io

1. Add credentials as environment variables or secrets
2. Set up the required environment variables
3. Deploy using their CLI or GitHub integration

### Option 2: Docker

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t wedding-api .
docker run -p 8000:8000 --env-file .env wedding-api
```

## Troubleshooting

### Connection Issues
- Verify credentials.json is in the correct location
- Ensure the service account email has access to the Google Sheet
- Check that the Spreadsheet ID is correct

### Import Errors
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Verify you're using Python 3.8 or higher

### CORS Errors
- Update CORS_ORIGINS in .env to include your frontend URL
- Or modify the CORS middleware in main.py

## License

MIT License - feel free to use for your wedding!

## Support

For issues or questions, please check the API documentation at http://localhost:8000/docs
