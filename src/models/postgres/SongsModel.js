const BaseModel = require('./BaseModel');
const NotFoundError = require('../../exceptions/NotFoundError');
const MESSAGES = require('../../config/messages');

class SongsModel extends BaseModel {
    constructor({ database }) {
        super({ database });
    }

    add = async ({ title, year, performer, genre, duration }) => {
        const id = `song-${this._generateId()}`;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [
                id,
                title,
                year,
                performer,
                genre,
                duration,
                insertedAt,
                updatedAt,
            ],
        };

        const result = await this._db.query(query);

        return result.rows[0].id;
    };

    getAll = async () => {
        const songs = await this._db.query(
            'SELECT id, title, performer FROM songs'
        );
        return songs.rows.map(this._mapQueryResultToModel);
    };

    getById = async (id) => {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };

        const song = await this._db.query(query);

        if (!song.rowCount) {
            throw new NotFoundError(MESSAGES.SONGS_GET_NOT_FOUND);
        }

        return song.rows.map(this._mapQueryResultToModel)[0];
    };

    updateById = async (id, { title, year, performer, genre, duration }) => {
        const updatedAt = new Date().toISOString();

        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
            values: [title, year, performer, genre, duration, updatedAt, id],
        };

        const result = await this._db.query(query);

        if (!result.rowCount) {
            throw new NotFoundError(MESSAGES.SONGS_PUT_NOT_FOUND);
        }

        return result.rows[0].id;
    };

    deleteById = async (id) => {
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._db.query(query);

        if (!result.rowCount) {
            throw new NotFoundError(MESSAGES.SONGS_DELETE_NOT_FOUND);
        }

        return result.rows[0].id;
    };
}

module.exports = SongsModel;
