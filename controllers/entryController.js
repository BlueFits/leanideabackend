const mongoose = require("mongoose");

const Entry = require("../models/Entry");

exports.addEntry = async (req, res, next) => {
    const { category, description, userId, title } = req.body;

    const entryInstance = new Entry({
        title,
        category,
        description,
        user: userId ? userId : null,
        isPrivate : userId ? true : false,
    });

    entryInstance.save((err, result) => {
        if (err) {return next(err);};
        res.status(200).send(result);
    });
};

exports.updateEntry = async (req, res, next) => {
    const { description, entryId } = req.body;

    const update = {
        $set: {
            description
        }
    };

    await Entry.findByIdAndUpdate(entryId, update, {}, (err, result) => {
        if (err) {return next(err);}
        res.status(200).send(result);
    });
};

exports.removeEntry = async (req, res, next) => {
    const { entryId } = req.body;

    let cleanedId = entryId.toString().trim();
    const id = mongoose.Types.ObjectId(cleanedId);

    await Entry.findByIdAndRemove(id, {}, (err, result) => {
        if (err) {return next(err);}
        if (!result) {
            console.log("Cannot find result");
        } else {
            res.status(200).send(result);
        }
    });
};

exports.updatePrivacy = async (req, res, next) => {
    const { userId, isPrivate, entryId } = req.body;

    if (userId) {
        console.log("This runs");
        const result = await Entry.updateMany({ user: userId }, { isPrivate });
        res.status(200).send("Changed: " + result.n + " Modified: " + result.nModified);

    } else if (entryId) {
        console.log("Entry Update runs");

        const update = {
            $set: {
                isPrivate
            }
        };

        await Entry.findByIdAndUpdate(entryId, update, {}, (err, entry) => {
            if (err) {return next(err);}
            console.log(entry);
            res.status(200).send(entry);
        });

    } else {
        res.status(422).send("Invalid Request");
    }
    

};

exports.getPublicEntries = async (req, res, next) => {
    const { userId } = req.params;

    await Entry.find({ user: userId }).exec((err, entries) => {
        if (err) {return next(err);}

        let filteredEntries = entries.filter(entry => !entry.isPrivate);

        res.status(200).send(filteredEntries);
    });
};

exports.getAllEntries = async (req, res, next) => {
    const { userId } = req.params;

    await Entry.find({ user: userId }).exec((err, entries) => {
        if (err) { return next(err); }
        res.status(200).send(entries);
    });
};