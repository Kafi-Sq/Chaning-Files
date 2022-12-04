const fs = require('fs');
const prompt = require('prompt-sync')();

const pwd = prompt('Name of directory you want to alter(q to quit): ');
//const pwd = "right"
const fileNames = fs.readdirSync(`./data/${pwd}`)
const dir = `./data/${pwd}`;
const pseudoFileNames = fs.readdirSync(`./data/pseudo${pwd}`)

function reverseBack() {
    for (let fls of fileNames) {
        try {
            fs.unlinkSync(`./data/${pwd}/${fls}`);
        } catch (err) {
            console.error(err);
        }
    }
    for (let fls of pseudoFileNames) {
        fs.copyFile(`./data/pseudo${pwd}/${fls}`, `./data/${pwd}/${fls}`, (err) => {
            if (err) {
                console.log(err.message)
            }
        })
    }
}

function changeFileNames() {
    const time = new Date()
    time.setDate(time.getDate()-10)
    fs.readdir(dir, (err, files) => {
        let names = [], i = 0;
        while (names.length < files.length) {
            var r = Math.floor(Math.random() * files.length) + 1;
            if (names.indexOf(r) === -1) names.push(r);
        }
        console.log(`There are ${files.length} files in this directory`)

        for (let fls of fileNames) {
            try {
                fs.utimesSync(`./data/${pwd}/${fls}`, time, time);
            } catch (err) {
                fs.closeSync(fs.openSync(`./data/${pwd}/${fls}`, 'w'));
            }
            console.log(`Changed date to: ${time}`)

            let oldName = `./data/${pwd}/${fls}`
            let newName = `./data/${pwd}/${names[i]}.gif`
            fs.rename(oldName, newName, err => {
                if (err) {
                    console.log(err.message)
                }

                console.log(`Renamed ${fls} to ${newName} successfully.`)
            })
            i++
        }
        names = []
    });
}

if (fileNames[0] === "1.gif") {
    reverseBack()
} else {
    changeFileNames()
}