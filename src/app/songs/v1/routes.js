const routes = ({ handler, validator }) => [
    {
        method: 'POST',
        path: '/songs',
        options: {
            handler: handler.postSong,
            validate: {
                payload: validator.songPayload,
            },
        },
    },
    {
        method: 'GET',
        path: '/songs',
        options: {
            handler: handler.getSongs,
        },
    },
    {
        method: 'GET',
        path: '/songs/{id}',
        options: {
            handler: handler.getSongById,
        },
    },
    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: handler.putSongById,
        options: {
            validate: {
                payload: validator.songPayload,
            },
        },
    },
    {
        method: 'DELETE',
        path: '/songs/{id}',
        options: {
            handler: handler.deleteSongById,
        },
    },
];

module.exports = routes;
