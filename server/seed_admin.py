from app.app import app
from app.models import db, Parent
from werkzeug.security import generate_password_hash

with app.app_context():
    existing = Parent.query.filter_by(email="admin@school.com").first()

    if existing:
        print("Admin already exists")
    else:
        admin = Parent(
            email="admin@school.com",
            full_name="System Administrator",
            password_hash=generate_password_hash("Admin@123"),
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin user created")
