module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })
}
