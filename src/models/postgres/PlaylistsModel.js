const BaseModel = require('./BaseModel');

class PlaylistsModel extends BaseModel {
  constructor({ database }) {
    super({ database });
  }

  async addPlaylist(name, owner) {
    const id = `playlist-${this._generateId()}`;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._db.query(query);

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: `
        SELECT playlists.id, playlists.name, users.username 
        FROM playlists
          LEFT JOIN users ON users.id = playlists.owner
          LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
        WHERE playlists.owner = $1 OR collaborations.user_id = $1
      `,
      values: [owner],
    };

    const result = await this._db.query(query);
    return result.rows;
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0];
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0].id;
  }

  async addSong(playlistId, songId) {
    const id = `ps-${this._generateId()}`;

    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    await this._db.query(query);
  }

  async getSongs(playlistId) {
    const query = {
      text: `
        SELECT songs.id, songs.title, songs.performer 
        FROM songs
          LEFT JOIN playlistsongs ON songs.id = playlistsongs.song_id
        WHERE playlistsongs.playlist_id = $1
      `,
      values: [playlistId],
    };

    const result = await this._db.query(query);
    return result.rows;
  }

  async deleteSongById(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0].id;
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${this._generateId()}`;

    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this._db.query(query);
    return result.rows[0].id;
  }

  async isCollaborationExists(playlistId, userId) {
    const query = {
      text: 'SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._db.query(query);
    return result.rowCount !== 0;
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0].id;
  }
}

module.exports = PlaylistsModel;
