import React, { useState } from 'react';
import { Modal, Button, Input, TextArea } from './UI';

export const AnnouncementForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ title: '', content: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting announcement:', error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Announcement' : 'Create Announcement'}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <TextArea
          label="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const EventForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    event_date: initialData?.event_date ? initialData.event_date.slice(0, 16) : '',
    location: initialData?.location || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', event_date: '', location: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting event:', error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Event' : 'Create Event'}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <TextArea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <Input
          label="Date & Time"
          type="datetime-local"
          value={formData.event_date}
          onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
          required
        />
        <Input
          label="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const SermonForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    speaker: initialData?.speaker || '',
    scripture: initialData?.scripture || '',
    audio_url: initialData?.audio_url || '',
    video_url: initialData?.video_url || '',
    sermon_date: initialData?.sermon_date || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ title: '', speaker: '', scripture: '', audio_url: '', video_url: '', sermon_date: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting sermon:', error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Sermon' : 'Create Sermon'}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          label="Speaker"
          value={formData.speaker}
          onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
          required
        />
        <Input
          label="Scripture"
          value={formData.scripture}
          onChange={(e) => setFormData({ ...formData, scripture: e.target.value })}
        />
        <Input
          label="Date"
          type="date"
          value={formData.sermon_date}
          onChange={(e) => setFormData({ ...formData, sermon_date: e.target.value })}
          required
        />
        <Input
          label="Audio URL"
          type="url"
          value={formData.audio_url}
          onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
        />
        <Input
          label="Video URL"
          type="url"
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const DepartmentForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', description: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting department:', error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Department' : 'Create Department'}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <TextArea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};