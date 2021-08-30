/* eslint-disable max-classes-per-file */
class NotPlaylistOwner extends Error {
  constructor(message = "You don't have access to this playlist") {
    super(message);
    this.name = 'PlaylistsForbidden';
  }
}

class PlaylistNotFound extends Error {
  constructor(message = 'Playlist Not Found') {
    super(message);
    this.name = 'PlaylistNotFound';
  }
}

class SongNotFound extends Error {
  constructor(message = 'Song Not Found') {
    super(message);
    this.name = 'SongNotFound';
  }
}

class NotCollaborator extends Error {
  constructor(message = 'Forbidden: Not a Collaborator') {
    super(message);
    this.name = 'NotCollaborator';
  }
}

class CollaborationNotFound extends Error {
  constructor(message = 'Collaboration Not Found') {
    super(message);
    this.name = 'CollaborationNotFound';
  }
}

module.exports = {
  NotPlaylistOwner,
  PlaylistNotFound,
  SongNotFound,
  NotCollaborator,
  CollaborationNotFound,
};
