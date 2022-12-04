// Hassen Hassen
// CSCI310
// 12.04.2022

const fs = require('fs')
const prompt = require('prompt-sync')()

// User input for what directory to read
const file = prompt('Which directory (left/right) do you want to change: ')
// Directories to read files off of
const files = fs.readdirSync(`./data/${file}`)

// Main function
function run() {
    // Current directory 
    const dir = `./data/${file}`
    // Undoing changes if changes already made
    if (files[0] === '1.gif') {
        undo()
    }
    // Setting the new date of files to 10 days in the past
    const date = new Date()
    date.setDate(date.getDate() - 10)

    fs.readdir(dir, (err, files) => {
        // Making the 1-n sequential format and re-ordering the files to a random order
        let reOrder = [], i = 0
        while (reOrder.length < files.length) {
            var r = Math.floor(Math.random() * files.length) + 1
            if (reOrder.indexOf(r) === -1) reOrder.push(r)
        }
        // Displaying how many files are in the current directory
        console.log(`Number of files: ${files.length}`)
        for (let curr of files) {
            // Setting the new date of files to 10 days in the past
            try {
                fs.utimesSync(`./data/${file}/${curr}`, date, date)
            } catch (err) {
                fs.closeSync(fs.openSync(`./data/${file}/${curr}`, 'w'))
            }
            console.log(`Changed date to: ${date}`)
            // Changing the names of files to a sequential 1-n format
            let prev = `./data/${file}/${curr}`
            let updated = `./data/${file}/${reOrder[i]}.gif`
            fs.rename(prev, updated, err => {
                if (err) {
                    console.log(err.message)
                }
                console.log(`Renamed ${curr} to ${updated} successfully.`)
            })
            i++
        }
    })
}

// Function to help the reordering and the new naming system
function undo() {
    // reads from a directory that has the original order and names
    const reverseFiles = fs.readdirSync(`./data/reverse${file}`)
    // Deletes everything in the current folder
    for (let curr of files) {
        try {
            fs.unlinkSync(`./data/${file}/${curr}`)
        } catch (err) {
            console.error(err)
        }
    }
    // Copies from the order and names from the other directory
    for (let curr of reverseFiles) {
        fs.copyFile(`./data/reverse${file}/${curr}`, `./data/${file}/${curr}`, (err) => {
            if (err) {
                console.log(err.message)
            }
        })
    }
}

run()