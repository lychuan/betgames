const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const moment = require('moment')

const db = require('../../models/db')
const Error = require('../types/error')
const Draw = require('../types/draw')

module.exports = {
  Query: {
    draws: {
      type: new GraphQLList(Draw.Type),
      args: {
        gameId: {
          name: 'gameId',
          type: GraphQLInt
        },
        date: {
          name: 'date',
          type: GraphQLString
        },
        drawNumber: {
          name: 'drawNumber',
          type: GraphQLString
        }
      },
      resolve: (root, { gameId, date, drawNumber }) => {
        return new Promise((resolve, reject) => {
          let where = {
            winner: {
              $ne: null
            }
          }

          if (gameId) {
            where.gameId = gameId
          }

          if (date) {
            console.log(moment(date).startOf('day').utc().format('YYYY-MM-DD HH:mm:ss'), moment(date).endOf('day').utc().format('YYYY-MM-DD HH:mm:ss'))
            where.updatedAt = {
              $gte: moment(date).startOf('day'),
              $lte: moment(date).endOf('day')
            }
          }

          if (drawNumber) {
            where.drawNumber = drawNumber
          }

          db.Draw.findAll({
            where: where,
            order: [
              ['id', 'DESC']
            ]
          }).then(draws => {
            resolve(draws)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    latestDraw: {
      type: new GraphQLObjectType({
        name: 'LatestDrawResponse',
        fields: {
          draw: {
            type: Draw.Type
          },
          errors: {
            type: new GraphQLList(Error.Type)
          }
        }
      }),
      args: { 
        gameId: { 
          name: 'gameId', 
          type: GraphQLInt
        }
      },
      resolve: (root, { gameId }) => {
        return new Promise((resolve, reject) => {
          let errors = []

          if (!gameId) {
            errors.push({
              key: 'gameId',
              msg: 'game id is required'
            })
          }

          if (errors.length == 0) {
            db.Draw.findOne({
              where: {
                gameId: gameId
              },
              order: [
                ['id', 'DESC']
              ],
              logging: false
            }).then(draw => {
              resolve({ draw })
            })
          } else {
            resolve({ errors })
          } 
        })
      }
    }
  }
}