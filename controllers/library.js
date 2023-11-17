const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

let validationRules = {
    title: 'required|string',
    artist: 'required|string',
    album: 'required|string',
    duration: 'required|string',
    release_year: 'required|string',
    single: 'required|boolean'
}

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('library').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    })
}

const getById = async (req, res) => {
    const songId = { _id: new ObjectId(req.params.id) }
    const result = await mongodb.getDatabase().db().collection('library').find(songId);
    result.toArray().then((song) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(song);
    })
}

const addSong = async (req, res) => {

    const newSong = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        duration: req.body.duration,
        release_year: req.body.release_year,
        single: req.body.single
    }

    await validator(newSong, validationRules, {}, (err, status) => {
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            mongodb.getDatabase().db().collection('library').insertOne(newSong).then((result) => {
                res.json(result);
            })
        }
    }).catch( err => console.log(err));
}

const updateSong = async (req, res) => {
    const songId = { _id: new ObjectId(req.params.id) }


    const newValues = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        duration: req.body.duration,
        release_year: req.body.release_year,
        single: req.body.single
    }

    await validator(newValues, validationRules, {}, (err, status) => {
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            mongodb.getDatabase().db().collection('library').updateOne(songId, { $set: newValues }).then((result) => {
                res.json(result);
            })
        }
    }).catch( err => console.log(err));  
}

const deleteSong = async (req, res) => {
    const songId = { _id: new ObjectId(req.params.id) }

    mongodb.getDatabase().db().collection('library').deleteOne(songId).then((result) => {
        res.json(result);
    })
}

module.exports = {
    getAll,
    getById,
    addSong,
    updateSong,
    deleteSong,
}