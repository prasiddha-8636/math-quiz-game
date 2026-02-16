import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Score

class QuestionView(APIView):
    def get(self, request):
        questions = []
        for _ in range(10):
            a = random.randint(1, 20)
            b = random.randint(1, 20)
            op = random.choice(['+', '-', '*'])
            if op == '+':
                ans = a + b
            elif op == '-':
                ans = a - b
            else:
                ans = a * b
            
            options = [ans, ans + random.randint(1, 5), ans - random.randint(1, 5), ans + random.randint(6, 10)]
            random.shuffle(options)
            
            questions.append({
                'question': f"{a} {op} {b} = ?",
                'answer': ans,
                'options': list(set(options)) # Ensure unique options
            })
        return Response(questions)

class ScoreView(APIView):
    def post(self, request):
        username = request.data.get('username', 'Anonymous')
        score = request.data.get('score')
        total = request.data.get('total')
        
        if score is not None and total is not None:
            Score.objects.create(username=username, score=score, total_questions=total)
            return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'error'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        scores = Score.objects.all().order_by('-created_at')[:10]
        data = [{'username': s.username, 'score': s.score, 'total': s.total_questions, 'date': s.created_at} for s in scores]
        return Response(data)
