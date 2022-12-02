const fs = require('fs');
const dir = './data/left';
const prompt = require('prompt-sync')();

const pwd = prompt('Name of directory you want to alter: ');

const fileNames = fs.readdirSync(`./data/${pwd}`)

function changeFileNames() {
    fs.readdir(dir, (err, files) => {
        console.log(files.length);
        let names = [], i = 0;
        while (names.length < files.length) {
            var r = Math.floor(Math.random() * files.length) + 1;
            if (names.indexOf(r) === -1) names.push(r);
        }
        console.log(names)


        for (let fls of fileNames) {
            let oldName = `./data/${pwd}/${fls}`
            let newName = `./data/${pwd}/${names[i]}.gif`
            fs.rename(oldName, newName, err => {
                if (err) {
                    throw err
                }

                console.log(`Renamed ${fls} to ${newName} successfully.`)
            })
            i++
        }
    });
}

changeFileNames()







