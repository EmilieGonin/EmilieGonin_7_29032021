module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })
}
