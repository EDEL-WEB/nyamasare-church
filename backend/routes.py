from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Announcement, Event, Department, Sermon
from auth import role_required
from datetime import datetime

api_bp = Blueprint('api', __name__)

# Announcements
@api_bp.route('/announcements', methods=['GET'])
@jwt_required()
def get_announcements():
    announcements = Announcement.query.filter_by(is_active=True).order_by(Announcement.created_at.desc()).all()
    return jsonify([{
        'id': a.id,
        'title': a.title,
        'content': a.content,
        'created_at': a.created_at.isoformat(),
        'author': f"{User.query.get(a.author_id).first_name} {User.query.get(a.author_id).last_name}"
    } for a in announcements])

@api_bp.route('/announcements', methods=['POST'])
@role_required(['admin', 'leader'])
def create_announcement():
    data = request.get_json()
    announcement = Announcement(
        title=data['title'],
        content=data['content'],
        author_id=get_jwt_identity()
    )
    db.session.add(announcement)
    db.session.commit()
    return jsonify({'message': 'Announcement created'}), 201

@api_bp.route('/announcements/<int:id>', methods=['PUT'])
@role_required(['admin', 'leader'])
def update_announcement(id):
    announcement = Announcement.query.get_or_404(id)
    data = request.get_json()
    announcement.title = data['title']
    announcement.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Announcement updated'})

@api_bp.route('/announcements/<int:id>', methods=['DELETE'])
@role_required(['admin', 'leader'])
def delete_announcement(id):
    announcement = Announcement.query.get_or_404(id)
    announcement.is_active = False
    db.session.commit()
    return jsonify({'message': 'Announcement deleted'})

# Events
@api_bp.route('/events', methods=['GET'])
@jwt_required()
def get_events():
    events = Event.query.order_by(Event.event_date.desc()).all()
    return jsonify([{
        'id': e.id,
        'title': e.title,
        'description': e.description,
        'event_date': e.event_date.isoformat(),
        'location': e.location,
        'organizer': f"{User.query.get(e.organizer_id).first_name} {User.query.get(e.organizer_id).last_name}"
    } for e in events])

@api_bp.route('/events', methods=['POST'])
@role_required(['admin', 'leader'])
def create_event():
    data = request.get_json()
    event = Event(
        title=data['title'],
        description=data['description'],
        event_date=datetime.fromisoformat(data['event_date']),
        location=data['location'],
        organizer_id=get_jwt_identity()
    )
    db.session.add(event)
    db.session.commit()
    return jsonify({'message': 'Event created'}), 201

@api_bp.route('/events/<int:id>', methods=['PUT'])
@role_required(['admin', 'leader'])
def update_event(id):
    event = Event.query.get_or_404(id)
    data = request.get_json()
    event.title = data['title']
    event.description = data['description']
    event.event_date = datetime.fromisoformat(data['event_date'])
    event.location = data['location']
    db.session.commit()
    return jsonify({'message': 'Event updated'})

@api_bp.route('/events/<int:id>', methods=['DELETE'])
@role_required(['admin', 'leader'])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted'})

# Departments
@api_bp.route('/departments', methods=['GET'])
@jwt_required()
def get_departments():
    departments = Department.query.all()
    return jsonify([{
        'id': d.id,
        'name': d.name,
        'description': d.description,
        'member_count': len(d.members)
    } for d in departments])

@api_bp.route('/departments', methods=['POST'])
@role_required(['admin'])
def create_department():
    data = request.get_json()
    department = Department(
        name=data['name'],
        description=data['description'],
        leader_id=data.get('leader_id')
    )
    db.session.add(department)
    db.session.commit()
    return jsonify({'message': 'Department created'}), 201

@api_bp.route('/departments/<int:id>', methods=['PUT'])
@role_required(['admin'])
def update_department(id):
    department = Department.query.get_or_404(id)
    data = request.get_json()
    department.name = data['name']
    department.description = data['description']
    db.session.commit()
    return jsonify({'message': 'Department updated'})

@api_bp.route('/departments/<int:id>', methods=['DELETE'])
@role_required(['admin'])
def delete_department(id):
    department = Department.query.get_or_404(id)
    db.session.delete(department)
    db.session.commit()
    return jsonify({'message': 'Department deleted'})

# Sermons
@api_bp.route('/sermons', methods=['GET'])
@jwt_required()
def get_sermons():
    sermons = Sermon.query.order_by(Sermon.sermon_date.desc()).all()
    return jsonify([{
        'id': s.id,
        'title': s.title,
        'speaker': s.speaker,
        'scripture': s.scripture,
        'audio_url': s.audio_url,
        'video_url': s.video_url,
        'sermon_date': s.sermon_date.isoformat()
    } for s in sermons])

@api_bp.route('/sermons', methods=['POST'])
@role_required(['admin', 'leader'])
def create_sermon():
    data = request.get_json()
    sermon = Sermon(
        title=data['title'],
        speaker=data['speaker'],
        scripture=data.get('scripture'),
        audio_url=data.get('audio_url'),
        video_url=data.get('video_url'),
        sermon_date=datetime.fromisoformat(data['sermon_date']).date()
    )
    db.session.add(sermon)
    db.session.commit()
    return jsonify({'message': 'Sermon created'}), 201

@api_bp.route('/sermons/<int:id>', methods=['PUT'])
@role_required(['admin', 'leader'])
def update_sermon(id):
    sermon = Sermon.query.get_or_404(id)
    data = request.get_json()
    sermon.title = data['title']
    sermon.speaker = data['speaker']
    sermon.scripture = data.get('scripture')
    sermon.audio_url = data.get('audio_url')
    sermon.video_url = data.get('video_url')
    sermon.sermon_date = datetime.fromisoformat(data['sermon_date']).date()
    db.session.commit()
    return jsonify({'message': 'Sermon updated'})

@api_bp.route('/sermons/<int:id>', methods=['DELETE'])
@role_required(['admin', 'leader'])
def delete_sermon(id):
    sermon = Sermon.query.get_or_404(id)
    db.session.delete(sermon)
    db.session.commit()
    return jsonify({'message': 'Sermon deleted'})

# Members (Admin only)
@api_bp.route('/members', methods=['GET'])
@role_required(['admin'])
def get_members():
    members = User.query.filter_by(is_active=True).all()
    return jsonify([{
        'id': m.id,
        'email': m.email,
        'first_name': m.first_name,
        'last_name': m.last_name,
        'role': m.role,
        'department': m.department.name if m.department else None
    } for m in members])

@api_bp.route('/members/<int:id>', methods=['PUT'])
@role_required(['admin'])
def update_member(id):
    member = User.query.get_or_404(id)
    data = request.get_json()
    member.first_name = data['first_name']
    member.last_name = data['last_name']
    member.role = data['role']
    member.department_id = data.get('department_id')
    db.session.commit()
    return jsonify({'message': 'Member updated'})

@api_bp.route('/members/<int:id>', methods=['DELETE'])
@role_required(['admin'])
def delete_member(id):
    member = User.query.get_or_404(id)
    member.is_active = False
    db.session.commit()
    return jsonify({'message': 'Member deleted'})