const Boom = require('@hapi/boom');
const MESSAGES = require('../../../config/messages');
const Exceptions = require('../../../exceptions/playlists');

class PlaylistHandler {
  constructor({ service }) {
    this._service = service;
  }

  postPlaylist = async (request, h) => {
    const { id: userId } = request.auth.credentials;
    const { name } = request.payload;

    const playlistId = await this._service.addPlaylist(name, userId);

    return h
      .response({
        message: MESSAGES.PLAYLISTS_POST_PLAYLIST_SUCCESS,
        data: {
          playlistId,
        },
      })
      .code(201);
  };

  getPlaylists = async (request, h) => {
    const { id: userId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(userId);
    return h
      .response({
        data: {
          playlists,
        },
      })
      .code(200);
  };

  deletePlaylist = async (request, h) => {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId } = request.params;

      await this._service.deletePlaylist(playlistId, userId);

      return h
        .response({ message: MESSAGES.PLAYLISTS_DELETE_PLAYLIST_SUCCESS })
        .code(200);
    } catch (error) {
      throw this._handleError(error);
    }
  };

  postSong = async (request, h) => {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this._service.addSong(playlistId, userId, songId);

      return h
        .response({ message: MESSAGES.PLAYLISTS_POST_SONG_SUCCESS })
        .code(201);
    } catch (error) {
      throw this._handleError(error);
    }
  };

  getSongs = async (request, h) => {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId } = request.params;

      const songs = await this._service.getSongs(playlistId, userId);

      return h.response({ data: { songs } }).code(200);
    } catch (error) {
      throw this._handleError(error);
    }
  };

  deleteSong = async (request, h) => {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this._service.deleteSong(playlistId, userId, songId);

      return h
        .response({ message: MESSAGES.PLAYLISTS_DELETE_PLAYLIST_SUCCESS })
        .code(200);
    } catch (error) {
      throw this._handleError(error);
    }
  };

  _handleError = (error) => {
    if (error instanceof Exceptions.PlaylistNotFound) {
      return Boom.badRequest(MESSAGES.PLAYLISTS_PLAYLIST_NOT_FOUND);
    }
    if (error instanceof Exceptions.SongNotFound) {
      return Boom.badRequest(MESSAGES.PLAYLISTS_SONG_NOT_FOUND);
    }
    if (error instanceof Exceptions.NotPlaylistOwner) {
      return Boom.forbidden(MESSAGES.PLAYLISTS_PLAYLIST_FORBIDDEN);
    }
    // if (error instanceof Exceptions.NotCollaborator) {
    //   return Boom.forbidden(MESSAGES.PLAYLISTS_PLAYLIST_FORBIDDEN);
    // }

    // Uncaught Error
    return error;
  };
}

module.exports = PlaylistHandler;
