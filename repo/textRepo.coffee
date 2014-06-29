fs = require('fs')

class TextRepo
  @NOT_FOUND = 'not found'
  records : null
  path : ''
  hash : {}
  constructor: (@path)->

  setupHash : (records)->
    for item in records
      key = item.split(' ')[0].toLowerCase()
      @hash[key] = item

  queryByKey: (value)->
    value = value.toLowerCase()
    if !@records
      @records = fs.readFileSync(@path).toString().split("\n")
      @setupHash(@records)
    for hashKey of @hash
      if hashKey.indexOf(value) > -1
        return @hash[hashKey]
    return TextRepo.NOT_FOUND

  module.exports = TextRepo