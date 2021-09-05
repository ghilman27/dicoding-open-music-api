const Boom = require('@hapi/boom');
const MESSAGES = require('../../../config/messages');
const Exceptions = require('../../../exceptions/playlists');

class ExportsHandler {
  constructor({ service }) {
    this._service = service;
  }

  exportsPlaylists = async (request, h) => {
    try {
      const { id: userId } = request.auth.credentials;
      const { targetEmail } = request.payload;
      const { playlistId } = request.params;

      await this._service.exports(playlistId, userId, targetEmail);

      return h
        .response({
          message: MESSAGES.EXPORTS_PLAYLIST_SUCCESS,
        })
        .code(201);
    } catch (error) {
      throw this._handleError(error);
    }
  };

  _handleError = (error) => {
    if (error instanceof Exceptions.PlaylistNotFound) {
      return Boom.badRequest(MESSAGES.PLAYLISTS_PLAYLIST_NOT_FOUND);
    }
    if (error instanceof Exceptions.NotPlaylistOwner) {
      return Boom.forbidden(MESSAGES.PLAYLISTS_PLAYLIST_FORBIDDEN);
    }
    if (error instanceof Exceptions.NotCollaborator) {
      return Boom.forbidden(MESSAGES.PLAYLISTS_PLAYLIST_FORBIDDEN);
    }

    // Uncaught Error
    return error;
  };
}

module.exports = ExportsHandler;
