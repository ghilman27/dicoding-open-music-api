const Exceptions = require('../exceptions/playlists');

class PlaylistsService {
  constructor({ playlistsModel }) {
    this._playlistModel = playlistsModel;
    // this._collabModel = collaborationModel;
  }

  async addPlaylist(name, owner) {
    return this._playlistModel.addPlaylist(name, owner);
  }

  async getPlaylists(owner) {
    return this._playlistModel.getPlaylists(owner);
  }

  async deletePlaylist(playlistId, owner) {
    await this._verifyPlaylistOwner(playlistId, owner);
    const deletedId = this._playlistModel.deletePlaylistById(playlistId);

    if (!deletedId) {
      throw new Exceptions.PlaylistNotFound();
    }
  }

  async addSong(playlistId, userId, songId) {
    // await this._verifyPlaylistAccess(playlistId, userId);
    await this._verifyPlaylistOwner(playlistId, userId);
    await this._playlistModel.addSong(playlistId, songId);
  }

  async getSongs(playlistId, userId) {
    // await this._verifyPlaylistAccess(playlistId, userId);
    await this._verifyPlaylistOwner(playlistId, userId);
    return this._playlistModel.getSongs(playlistId);
  }

  async deleteSong(playlistId, userId, songId) {
    // await this._verifyPlaylistAccess(playlistId, userId);
    await this._verifyPlaylistOwner(playlistId, userId);
    const deletedId = await this._playlistModel.deleteSongById(
      playlistId,
      songId,
    );

    if (!deletedId) {
      throw new Exceptions.SongNotFound();
    }
  }

  async _verifyPlaylistOwner(playlistId, owner) {
    const playlist = await this._playlistModel.getPlaylistById(playlistId);

    if (!playlist) {
      throw new Exceptions.PlaylistNotFound();
    }

    if (playlist.owner !== owner) {
      throw new Exceptions.NotPlaylistOwner();
    }
  }

  // async _verifyPlaylistAccess(playlistId, userId) {
  //   try {
  //     await this._verifyPlaylistOwner(playlistId, userId);
  //   } catch (error) {
  //     if (error instanceof Exceptions.PlaylistNotFound) {
  //       throw error;
  //     }

  //     const isExists = await this._collabModel.isExists(playlistId, userId);
  //     if (!isExists) {
  //       throw new Exceptions.NotCollaborator();
  //     }
  //   }
  // }
}

module.exports = PlaylistsService;
