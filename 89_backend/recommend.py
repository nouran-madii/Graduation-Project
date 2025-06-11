import sys
import json
import os
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

def convert_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

def main():
    # Step 1: Read user data (from stdin, passed by Node.js)
    input_data = json.loads(sys.stdin.read())
    user_title = input_data.get("title", "").strip().lower()

    if not user_title:
        print(json.dumps({"error": "Missing title"}))
        return

    # Step 2: Connect to MongoDB
    try:
        client = MongoClient("mongodb+srv://cavanny:Y2lL2HsWm3Qjf1Uv@cluster0.l6gvyzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        db = client["test"]
        jobs_collection = db["jobs"]
    except Exception as e:
        print(json.dumps({"error": f"DB connection failed: {str(e)}"}))
        return

    # Step 3: Fetch all jobs
    try:
        jobs = list(jobs_collection.find())
        print(f"[DEBUG] Number of jobs fetched: {len(jobs)}", file=sys.stderr)
        print(os.environ.get('DB_URI'), file=sys.stderr)
        if not jobs:
            print(json.dumps([]))
            return
    except Exception as e:
        print(json.dumps({"error": f"Failed to fetch jobs: {str(e)}"}))
        return

    # Step 4: Filter jobs with exact title match
    matched_jobs = [job for job in jobs if job.get("title", "").strip().lower() == user_title]

    # Step 5: Return matched jobs
    print(json.dumps(matched_jobs, default=convert_objectid))

if __name__ == "__main__":
    main()
