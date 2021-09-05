const Exceptions = require('../exceptions/playlists');

class PlaylistsService {
  constructor({ playlistsModel, producerService, cacheService }) {
    this._model = playlistsModel;
    this._producerService = producerService;
    this._cacheService = cacheService;
    this._queue = process.env.PLAYLISTS_EXPORTS_QUEUE;
  }

  _cachedSongsKey = (playlistId) => `songs:${playlistId}`;

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
    await this._deleteCachedSongs(playlistId);
  }

  async getSongs(playlistId, userId) {
    await this._verifyPlaylistAccess(playlistId, userId);

    const cache = await this._getCachedSongs(playlistId);
    if (cache) {
      return cache;
    }

    const songs = await this._model.getSongs(playlistId);
    await this._setCachedSongs(playlistId, songs);

    return songs;
  }

  async deleteSong(playlistId, userId, songId) {
    await this._verifyPlaylistAccess(playlistId, userId);
    const deletedId = await this._model.deleteSongById(playlistId, songId);

    if (!deletedId) {
      throw new Exceptions.SongNotFound();
    }

    await this._deleteCachedSongs(playlistId);
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

  async exports(playlistId, userId, targetEmail) {
    await this._verifyPlaylistAccess(playlistId, userId);
    const message = JSON.stringify({ playlistId, targetEmail });
    await this._producerService.sendMessage(this._queue, message);
  }

  async _getCachedSongs(playlistId) {
    const key = this._cachedSongsKey(playlistId);
    return this._cacheService.get(key);
  }

  async _setCachedSongs(playlistId, songs) {
    const key = this._cachedSongsKey(playlistId);
    await this._cacheService.set(key, JSON.stringify(songs));
  }

  async _deleteCachedSongs(playlistId) {
    const key = this._cachedSongsKey(playlistId);
    await this._cacheService.delete(key);
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
