from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone
from pymongo import MongoClient
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data using pymongo to avoid Djongo ORM issues
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()
        db.teams.drop()
        db.users.drop()

        # Create users (superheroes)
        marvel_heroes = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'first_name': 'Tony', 'last_name': 'Stark'},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'first_name': 'Steve', 'last_name': 'Rogers'},
            {'username': 'spiderman', 'email': 'spidey@marvel.com', 'first_name': 'Peter', 'last_name': 'Parker'},
        ]
        dc_heroes = [
            {'username': 'batman', 'email': 'batman@dc.com', 'first_name': 'Bruce', 'last_name': 'Wayne'},
            {'username': 'superman', 'email': 'superman@dc.com', 'first_name': 'Clark', 'last_name': 'Kent'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'first_name': 'Diana', 'last_name': 'Prince'},
        ]
        marvel_users = [User.objects.create(**hero) for hero in marvel_heroes]
        dc_users = [User.objects.create(**hero) for hero in dc_heroes]

        # Create teams with member references
        marvel_team = Team.objects.create(
            name='Team Marvel',
            members=[str(u._id) for u in marvel_users]
        )
        dc_team = Team.objects.create(
            name='Team DC',
            members=[str(u._id) for u in dc_users]
        )

        # Create workouts
        Workout.objects.create(name='Push Ups', description='Do 20 push ups', difficulty='Easy')
        Workout.objects.create(name='Running', description='Run 5km', difficulty='Medium')
        Workout.objects.create(name='Deadlift', description='Deadlift 100kg', difficulty='Hard')

        # Create activities
        Activity.objects.create(user=marvel_users[0], activity_type='Push Ups', duration=10, calories_burned=50, date=timezone.now().date())
        Activity.objects.create(user=dc_users[0], activity_type='Running', duration=30, calories_burned=300, date=timezone.now().date())
        Activity.objects.create(user=marvel_users[1], activity_type='Deadlift', duration=20, calories_burned=200, date=timezone.now().date())

        # Create leaderboard entries
        Leaderboard.objects.create(user=marvel_users[0], points=100, rank=1)
        Leaderboard.objects.create(user=dc_users[0], points=90, rank=2)
        Leaderboard.objects.create(user=marvel_users[1], points=80, rank=3)

        # Create unique index on email field
        db.users.create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
