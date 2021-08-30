module.exports = {
  // response status payload
  CLIENT_ERROR_STATUS: 'fail',
  INTERNAL_ERROR_STATUS: 'error',
  SUCCESS_STATUS: 'success',

  // songs message
  SONGS_POST_SUCCESS: 'Lagu berhasil ditambahkan',
  SONGS_PUT_SUCCESS: 'lagu berhasil diperbarui',
  SONGS_DELETE_SUCCESS: 'lagu berhasil dihapus',
  SONGS_PUT_NOT_FOUND: 'Gagal memperbarui lagu. Id tidak ditemukan',
  SONGS_DELETE_NOT_FOUND: 'Gagal menghapus lagu. Id tidak ditemukan',
  SONGS_GET_NOT_FOUND: 'Lagu tidak ditemukan',

  // users messages
  USERS_REGISTER_SUCCESS: 'User berhasil ditambahkan',
  USERS_USERNAME_EXISTS: 'Gagal menambahkan user. Username sudah digunakan',

  // authentications messages
  AUTH_LOGIN_SUCCESS: 'Authentication berhasil ditambahkan',
  AUTH_LOGIN_WRONG_PASSWORD: 'Password salah',
  AUTH_LOGIN_WRONG_USERNAME: 'Username tidak terdaftar',
  AUTH_REFRESH_TOKEN_SUCCESS: 'Authentication berhasil diperbarui',
  AUTH_REFRESH_TOKEN_NOT_FOUND: 'Refresh token tidak ditemukan',
  AUTH_REFRESH_TOKEN_INVALID_SIGNATURE: 'Refresh token signature tidak valid',
  AUTH_LOGOUT_SUCCESS: 'Refresh token berhasil dihapus',

  // playlists messages
  PLAYLISTS_POST_PLAYLIST_SUCCESS: 'Playlist berhasil ditambahkan',
  PLAYLISTS_DELETE_PLAYLIST_SUCCESS: 'Playlist berhasil ditambahkan',
  PLAYLISTS_POST_SONG_SUCCESS: 'Lagu berhasil ditambahkan ke playlist',
  PLAYLISTS_PLAYLIST_NOT_FOUND: 'Playlist tidak ditemukan',
  PLAYLISTS_PLAYLIST_FORBIDDEN: 'Anda tidak berhak mengakses resource ini',
  PLAYLISTS_SONG_NOT_FOUND: 'Lagu tidak ditemukan',

  // // collaborations messages
  // COLLABORATIONS_POST_SUCCESS: 'Kolaborasi berhasil ditambahkan',
  // COLLABORATIONS_DELETE_SUCCESS: 'Kolaborasi berhasil dihapus',
  // COLLABORATIONS_PLAYLIST_NOT_FOUND: 'Playlist tidak ditemukan',
  // COLLABORATIONS_PLAYLIST_FORBIDDEN: 'Anda tidak berhak mengakses resource ini',
  // COLLABORATIONS_COLLABORATION_NOT_FOUND: 'Playlist tidak ditemukan',
};
