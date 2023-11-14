const supertest = require('supertest');
const {app, server} = require("../server/index.js"); 
const { closeDatabaseConnection } = require("../server/config/db.js")
const Artist = require('../server/models/Artist');
const Review = require('../server/models/Review');
const Song = require('../server/models/Song');
const User = require('../server/models/User');

jest.mock('../server/models/Artist', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../server//models/Review', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../server/models/Song', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../server/models/User', () => ({
    findOne: jest.fn(),
    findById: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();

    Artist.find = jest.fn().mockReturnThis();
    Artist.sort = jest.fn().mockReturnThis();
    Artist.skip = jest.fn().mockReturnThis();
    Artist.limit = jest.fn().mockImplementation(() => Promise.resolve([
        {
            alternate_names: ['Alternate Name 1', 'Alternate Name 2'],
            description: ['Description 1', 'Description 2'],
            id: 1,
            image_url: 'http://example.com/image1.jpg',
            name: 'Artist 1',
            average_rating: 4.5,
            number_of_ratings: 100
        },
        {
            alternate_names: ['Alternate Name 3', 'Alternate Name 4'],
            description: ['Description 3', 'Description 4'],
            id: 2,
            image_url: 'http://example.com/image2.jpg',
            name: 'Artist 2',
            average_rating: 4.0,
            number_of_ratings: 80
        }
    ]));
    Artist.findOne.mockResolvedValue({
        alternate_names: ['Alternate Name 1', 'Alternate Name 2'],
        description: ['Description 1', 'Description 2'],
        id: 1,
        image_url: 'http://example.com/image1.jpg',
        name: 'Artist 1',
        average_rating: 4.5,
        number_of_ratings: 100
    });

    Song.find = jest.fn().mockReturnThis();
    Song.sort = jest.fn().mockReturnThis();
    Song.skip = jest.fn().mockReturnThis();
    Song.limit = jest.fn().mockImplementation(() => Promise.resolve([
        {
            artist_names: "Artist 1",
            description: ["Description of the song 1", "More about the song"],
            header_image_url: "http://example.com/song1-image.jpg",
            id: 1,
            release_date: "2023-01-01",
            title: "Song Title 1",
            primary_artist_id: 101,
            average_rating: 4.5,
            number_of_ratings: 200,
            lyrics: "Lyrics of song 1"
        },
        {
            artist_names: "Artist 2",
            description: ["Description of the song 2", "More about the song"],
            header_image_url: "http://example.com/song2-image.jpg",
            id: 2,
            release_date: "2023-01-02",
            title: "Song Title 2",
            primary_artist_id: 102,
            average_rating: 4.0,
            number_of_ratings: 150,
            lyrics: "Lyrics of song 2"
        }
    ]));
    Song.findOne.mockResolvedValue({
        artist_names: "Artist 1",
        description: ["Description of the song 1", "More about the song"],
        header_image_url: "http://example.com/song1-image.jpg",
        id: 1,
        release_date: "2023-01-01",
        title: "Song Title 1",
        primary_artist_id: 101,
        average_rating: 4.5,
        number_of_ratings: 200,
        lyrics: "Lyrics of song 1"
    });

    User.findOne.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
        favorites: [
            {
                type: 'song',
                targetId: 1
            },
            {
                type: 'artist',
                targetId: 1
            }
        ]
    });
    User.findById.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
        favorites: [
            {
                type: 'song',
                targetId: 1
            },
            {
                type: 'artist',
                targetId: 1
            }
        ]
    });

    Review.find = jest.fn().mockReturnThis();
    Review.sort = jest.fn().mockReturnThis();
    Review.skip = jest.fn().mockReturnThis();
    Review.limit = jest.fn().mockImplementation(() => Promise.resolve([
        {
            username: 'testuser',
            content: 'Comment 1',
            rating: 4.5,
            targetType: 'song',
            targetId: 1
        },
        {
            username: 'testuser',
            content: 'Comment 2',
            rating: 4.5,
            targetType: 'artist',
            targetId: 1
        }
    ]));
    Review.findOne.mockResolvedValue({
        username: 'testuser',
        content: 'Comment 1',
        rating: 4.5,
        targetType: 'song',
        targetId: 1
    });
});


afterAll(async () => {
    await closeDatabaseConnection();
    server.close();
});


describe('GraphQL Schema', () => {
    describe('returns status 200 on correct gql queries and correct data', () => {
        test('getUser', async () => {
            const query = {
                query: `
                    query GetUser($id: ID!) {
                        getUser(id: $id) {
                            username
                            favorites {
                                type
                                targetId
                            }
                        }
                    }
                `,
                variables: { id: 1 },
            };

            const response = await supertest(app)
                .post('/graphql')
                .send(query);

            expect(response.status).toBe(200);
            expect(response.body.data.getUser).toBeDefined();
            expect(response.body.data.getUser.username).toBe('testuser');
            expect(response.body.data.getUser.favorites).toBeInstanceOf(Array);
            expect(response.body.data.getUser.favorites).toHaveLength(2);
            expect(response.body.data.getUser.favorites[0].type).toBe('song');
            expect(response.body.data.getUser.favorites[0].targetId).toBe(1);
            expect(response.body.data.getUser.favorites[1].type).toBe('artist');
            expect(response.body.data.getUser.favorites[1].targetId).toBe(1);
        });

        test('getTopArtists', async () => {
            const query = {
                query: `
                    query {
                        getTopArtists(limit: 5) {
                            name
                            average_rating
                        }
                    }
                `
            };
        
            const response = await supertest(app).post('/graphql').send(query);
        
            expect(response.status).toBe(200);
            expect(response.body.data.getTopArtists).toBeInstanceOf(Array);
            expect(response.body.data.getTopArtists).toHaveLength(2);
            expect(response.body.data.getTopArtists[0].name).toBe('Artist 1');
        });
        

        test('getSongById', async () => {
            const query = {
                query: `
                    query GetSongById($id: ID!) {
                        getSongById(id: $id) {
                            title
                            lyrics
                        }
                    }
                `,
                variables: { id: 1 },
            };
        
            const response = await supertest(app).post('/graphql').send(query);
        
            expect(response.status).toBe(200);
            expect(response.body.data.getSongById).toBeDefined();
        });
        
    });

});
