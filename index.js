const fs = require('fs')
const prompt = require('prompt-sync')()

const file = prompt('Which directory (left/right) do you want to change: ')
const files = fs.readdirSync(`./data/${file}`)
const reverseFiles = fs.readdirSync(`./data/reverse${file}`)

function run() {
    if(files[0] === '1.gif'){
        undo()
    }

    const dir = `./data/${file}`
    const date = new Date()
    date.setDate(date.getDate() - 10)

    fs.readdir(dir, (err, files) => {
        let names = [], i = 0
        while (names.length < files.length) {
            var r = Math.floor(Math.random() * files.length) + 1
            if (names.indexOf(r) === -1) names.push(r)
        }
        console.log(`There are ${files.length} files in this directory`)

        for (let curr of files) {
            try {
                fs.utimesSync(`./data/${file}/${curr}`, date, date)
            } catch (err) {
                fs.closeSync(fs.openSync(`./data/${file}/${curr}`, 'w'))
            }
            console.log(`Changed date to: ${date}`)

            let oldName = `./data/${file}/${curr}`
            let newName = `./data/${file}/${names[i]}.gif`
            fs.rename(oldName, newName, err => {
                if (err) {
                    console.log(err.message)
                }

                console.log(`Renamed ${curr} to ${newName} successfully.`)
            })
            i++
        }
    })
}

function undo() {
    for (let curr of files) {
        try {
            fs.unlinkSync(`./data/${file}/${curr}`)
        } catch (err) {
            console.error(err)
        }
    }
    for (let curr of reverseFiles) {
        fs.copyFile(`./data/reverse${file}/${curr}`, `./data/${file}/${curr}`, (err) => {
            if (err) {
                console.log(err.message)
            }
        })
    }
}

run()