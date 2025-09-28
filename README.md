

### setup a new python virtual environment
- cd backend
- python3 -m venv myenv
- source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
- pip install -r requirements.txt
- deactivate  # To exit the virtual environment
### run the server
- cd backend
- source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
- uvicorn main:app --reload

### startup the frontend 
- cd frontend
- npm install
- npm run dev
- go to on `https://localhost:5173` your browser