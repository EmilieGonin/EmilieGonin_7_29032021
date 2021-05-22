module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    text: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty(value) {
          if (value === null && this.file === null) {
            throw new Error("Le post doit au moins contenir du texte ou un fichier.")
          }
        }
      }
    },
    file: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty(value) {
          if (value === null && this.text === null) {
            throw new Error("Le post doit au moins contenir du texte ou un fichier.")
          }
        }
      }
    }
  })
}
