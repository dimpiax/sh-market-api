/* global Mongo,print,exit,cat:true */

// functions
function openFile(uri) {
    try {
        const text = cat(uri) // possible weak approach on non-unix systems
        return JSON.parse(text)
    } catch (err) {
        throw err
    }
}

// config
const inputFile = 'adverts.json'
const dbName = 'advertisement-prototype'

// execution
const conn = new Mongo()
const db = conn.getDB(dbName)

print()
print('\x1b[1mScript:\x1b[0m adverts insertion from file, removes \x1b[4mall\x1b[0m previous existed')
print(`\x1b[1mFile:\x1b[0m ${inputFile}`)
print('---\n')

let json
try {
    json = openFile(inputFile)
} catch (err) {
    print(`\x1b[31m${err.name}:\x1b[0m ${err.message}`)
    quit(1)
}

// info
const count = db.adverts.count({})
print('\x1b[1mInfo:\x1b[0m')
print(`- adverts count: db(${count}), file(${json.adverts.length})`)

// safety check
const safetySeconds = 3
print('\n\x1b[1mPre-execution:\x1b[0m')
print(`Script is being to start insertion after \x1b[4m${safetySeconds} seconds\x1b[0m.\nYou can abort process by Ctrl+C\n`)
let seconds = Array.from(Array(safetySeconds).keys()).reverse()
seconds.map(function(el) {
    sleep(1000) // 1 second
    print(`\x1b[2m${el+1}\x1b[0m`)
})

db.adverts.drop()
db.adverts.insert(json.adverts)

print(`\n\x1b[32m\x1b[1m${json.adverts.length}\x1b[0m\x1b[32m documents has been inserted\x1b[0m \u{1F680}`)
