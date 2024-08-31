const multer = require('multer');


const storage = multer.memoryStorage(); //create a storage
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only accept image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});//by default upload to created storage

module.exports = upload;