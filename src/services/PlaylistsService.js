const Exceptions = require('../exceptions/playlists');

class PlaylistsService {
  constructor({ playlistsModel }) {
    this._model = playlistsModel;
  }

  async addPlaylist(name, owner) {
    return this._model.addPlaylist(name, owner);
  }

  async getPlaylists(owner) {
    return this._model.getPlaylists(owner);
  }

  async deletePlaylist(playlistId, owner) {
    await this._verifyPlaylistOwner(playlistId, owner);
    const deletedId = await this._model.deletePlaylistById(playlistId);

    if (!deletedId) {
      throw new Exceptions.PlaylistNotFound();
    }
  }

  async addSong(playlistId, userId, songId) {
    await this._verifyPlaylistAccess(playlistId, userId);
    await this._model.addSong(playlistId, songId);
  }

  async getSongs(playlistId, userId) {
    await this._verifyPlaylistAccess(playlistId, userId);
    return this._model.getSongs(playlistId);
  }

  async deleteSong(playlistId, userId, songId) {
    await this._verifyPlaylistAccess(playlistId, userId);
    const deletedId = await this._model.deleteSongById(playlistId, songId);

    if (!deletedId) {
      throw new Exceptions.SongNotFound();
    }
  }

  async addCollaboration(playlistId, ownerId, userId) {
    await this._verifyPlaylistOwner(playlistId, ownerId);
    return this._model.addCollaboration(playlistId, userId);
  }

  async deleteCollaboration(playlistId, ownerId, userId) {
    await this._verifyPlaylistOwner(playlistId, ownerId);
    const deletedId = await this._model.deleteCollaboration(playlistId, userId);

    if (!deletedId) {
      throw new Exceptions.CollaborationNotFound();
    }
  }

  async _verifyPlaylistOwner(playlistId, owner) {
    const playlist = await this._model.getPlaylistById(playlistId);

    if (!playlist) {
      throw new Exceptions.PlaylistNotFound();
    }

    if (playlist.owner !== owner) {
      throw new Exceptions.NotPlaylistOwner();
    }
  }

  async _verifyPlaylistAccess(playlistId, userId) {
    try {
      await this._verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof Exceptions.PlaylistNotFound) {
        throw error;
      }

      const isExists = await this._model.isCollaborationExists(
        playlistId,
        userId,
      );

      if (!isExists) {
        throw new Exceptions.NotCollaborator();
      }
    }
  }
}

module.exports = PlaylistsService;
