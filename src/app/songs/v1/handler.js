const MESSAGES = require('../../../config/messages');

class SongsHandler {
    constructor({ service }) {
        this._service = service;
    }

    postSong = async (request, h) => {
        const songId = await this._service.addSong(request.payload);
        const response = h.response({
            message: MESSAGES.SONGS_POST_SUCCESS,
            data: {
                songId,
            },
        });
        response.code(201);
        return response;
    };

    getSongs = async () => {
        const songs = await this._service.getSongs();
        return {
            data: {
                songs,
            },
        };
    };

    getSongById = async (request) => {
        const { id } = request.params;
        const song = await this._service.getSongById(id);
        return {
            data: {
                song,
            },
        };
    };

    putSongById = async (request) => {
        const { id } = request.params;
        await this._service.editSongById(id, request.payload);
        return {
            message: MESSAGES.SONGS_PUT_SUCCESS,
        };
    };

    deleteSongById = async (request) => {
        const { id } = request.params;
        await this._service.deleteSongById(id);
        return {
            message: MESSAGES.SONGS_DELETE_SUCCESS,
        };
    };
}

module.exports = SongsHandler;
