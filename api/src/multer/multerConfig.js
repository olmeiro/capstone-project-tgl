const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "/uploads"))
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop() // = png o jpg
        cb(null, `${Date.now()}.${ext}`)
    }
});

const upload = multer({ storage })

module.exports = upload;