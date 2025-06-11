import sys
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def analyze_skills(data):
    user_skills = data['user_skills']
    job_requirements = data['job_requirements']
    
    user_skills_list = [s.strip().lower() for s in user_skills.split(',')]
    job_skills_list = [s.strip().lower() for s in job_requirements.split(',')]
    
    user_skills_set = set(user_skills_list)
    job_skills_set = set(job_skills_list)
    
    vectorizer = CountVectorizer().fit_transform([
        ' '.join(user_skills_list), 
        ' '.join(job_skills_list)
    ])
    vectors = vectorizer.toarray()
    similarity = cosine_similarity([vectors[0]], [vectors[1]])[0][0]
    
    missing_skills = job_skills_set - user_skills_set
    matched_skills = job_skills_set & user_skills_set
    
    return {
        'similarity_score': round(float(similarity), 2),
        'gap_analysis': {
            'missing_skills': sorted(list(missing_skills)),
            'matched_skills': sorted(list(matched_skills))
        }
    }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No input data provided'}))
        sys.exit(1)

    input_data = json.loads(sys.argv[1])
    result = analyze_skills(input_data)
    print(json.dumps(result))
    sys.stdout.flush()
