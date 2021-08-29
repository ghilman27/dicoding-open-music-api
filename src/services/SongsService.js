class SongsService {
  constructor({ songsModel }) {
    this._model = songsModel;
  }

  addSong = async (song) => {
    const id = await this._model.add(song);
    return id;
  };

  getSongs = async () => {
    const songs = await this._model.getAll();
    return songs;
  };

  getSongById = async (id) => {
    const song = await this._model.getById(id);
    return song;
  };

  editSongById = async (id, updatedSong) => {
    const songId = await this._model.updateById(id, updatedSong);
    return songId;
  };

  deleteSongById = async (id) => {
    const songId = await this._model.deleteById(id);
    return songId;
  };
}

module.exports = SongsService;
