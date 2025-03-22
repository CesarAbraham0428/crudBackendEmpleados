const multer = require("multer");

// Validaciones
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Configuración de almacenamiento en memoria para almacenar como Buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato no permitido. Solo JPEG, PNG y JPG."));
    }
  },
});

module.exports = upload;
