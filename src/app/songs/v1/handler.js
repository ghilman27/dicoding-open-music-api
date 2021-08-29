const MESSAGES = require('../../../config/messages');
const NotFoundError = require('../../../exceptions/NotFoundError');

class SongsHandler {
  constructor({ service }) {
    this._service = service;
  }

  postSong = async (request, h) => {
    const songId = await this._service.addSong(request.payload);
    const response = h.response({
      message: MESSAGES.SONGS_POST_SUCCESS,
      data: { songId },
    });
    response.code(201);
    return response;
  };

  getSongs = async () => {
    const songs = await this._service.getSongs();
    return { data: { songs } };
  };

  getSongById = async (request) => {
    const song = await this._service.getSongById(request.params.id);

    if (!song) {
      throw new NotFoundError(MESSAGES.SONGS_GET_NOT_FOUND);
    }

    return { data: { song } };
  };

  putSongById = async (request) => {
    const songId = await this._service.editSongById(
      request.params.id,
      request.payload,
    );

    if (!songId) {
      throw new NotFoundError(MESSAGES.SONGS_PUT_NOT_FOUND);
    }

    return { message: MESSAGES.SONGS_PUT_SUCCESS };
  };

  deleteSongById = async (request) => {
    const songId = await this._service.deleteSongById(request.params.id);

    if (!songId) {
      throw new NotFoundError(MESSAGES.SONGS_DELETE_NOT_FOUND);
    }

    return { message: MESSAGES.SONGS_DELETE_SUCCESS };
  };
}

module.exports = SongsHandler;
