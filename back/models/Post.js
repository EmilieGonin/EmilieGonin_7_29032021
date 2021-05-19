module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    file: {
      type: DataTypes.TEXT
    }
  })
}
