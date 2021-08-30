const Boom = require('@hapi/boom');
const MESSAGES = require('../../../config/messages');
const Exceptions = require('../../../exceptions/playlists');

class CollaborationsHandler {
  constructor({ service }) {
    this._service = service;
  }

  postCollaboration = async (request, h) => {
    try {
      const { id: ownerId } = request.auth.credentials;
      const { playlistId, userId } = request.payload;

      const collaborationId = await this._service.addCollaboration(
        playlistId,
        ownerId,
        userId,
      );

      return h
        .response({
          message: MESSAGES.COLLABORATIONS_POST_SUCCESS,
          data: {
            collaborationId,
          },
        })
        .code(201);
    } catch (error) {
      throw this._handleError(error);
    }
  };

  deleteCollaboration = async (request, h) => {
    try {
      const { id: ownerId } = request.auth.credentials;
      const { playlistId, userId } = request.payload;

      await this._service.deleteCollaboration(playlistId, ownerId, userId);

      return h
        .response({
          message: MESSAGES.COLLABORATIONS_DELETE_SUCCESS,
        })
        .code(200);
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
    if (error instanceof Exceptions.CollaborationNotFound) {
      return Boom.badRequest(MESSAGES.COLLABORATIONS_NOT_FOUND);
    }

    // Uncaught Error
    return error;
  };
}

module.exports = CollaborationsHandler;
